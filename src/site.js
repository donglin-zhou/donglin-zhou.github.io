/* ===== 纯静态站点渐进增强 JS（无框架依赖）===== */
(function () {
  'use strict';

  // ===== 导航滚动阴影 =====
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== 移动端汉堡菜单 =====
  var hamburger = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var navEl = document.querySelector('.nav');
  if (hamburger && navEl) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', function () {
      var isOpen = navEl.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // 兼容旧 .mobile-menu 结构
      if (mobileMenu) {
        mobileMenu.classList.toggle('open', isOpen);
      }
    });

    // 点击导航链接后收起菜单（移动端）
    var mobileLinks = navEl.querySelectorAll('.nav-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navEl.classList.contains('open')) {
          navEl.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          if (mobileMenu) {
            mobileMenu.classList.remove('open');
          }
        }
      });
    });
  }

  // ===== 回到顶部 =====
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Tabs 切换（渐进增强） =====
  var tabGroups = document.querySelectorAll('[data-tabs]');
  if (tabGroups.length > 0) {
    document.documentElement.classList.add('js-tabs-on');

    tabGroups.forEach(function (group) {
      var buttons = group.querySelectorAll('[data-tab]');
      var section = group.closest('.page-section') || group.parentElement;
      var panels = section.querySelectorAll('[data-tab-panel]');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          panels.forEach(function (p) {
            if (p.getAttribute('data-tab-panel') === target) {
              p.classList.add('active');
            } else {
              p.classList.remove('active');
            }
          });
        });
      });

      var initialTab = (location.hash || '').replace('#', '');
      if (initialTab) {
        var initialBtn = Array.prototype.filter.call(buttons, function (b) { return b.getAttribute('data-tab') === initialTab; })[0];
        if (initialBtn) initialBtn.click();
      }
    });
  }

  // ===== 视频弹窗（渐进增强） =====
  var modal = document.getElementById('videoModal');
  var modalIframe = document.getElementById('modalIframe');
  var modalTitle = document.getElementById('modalTitle');
  var modalClose = document.getElementById('modalClose');
  var modalOriginalLink = document.getElementById('modalOriginalLink');
  var videoCards = document.querySelectorAll('.video-card');

  function openModal(title, embed, link) {
    if (!modal || !modalIframe) return;
    if (modalTitle) modalTitle.textContent = title;
    modalIframe.src = embed;
    if (modalOriginalLink) modalOriginalLink.href = link;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modalIframe.src = '';
    document.body.style.overflow = '';
  }

  if (modal && videoCards.length > 0) {
    videoCards.forEach(function (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (e) {
        if (e.target.closest('.video-original-link') || e.target.closest('.video-external-link a') || e.target.closest('a')) {
          return;
        }
        var embed = card.getAttribute('data-video-embed');
        var titleKeyEl = card.querySelector('.video-card-title[data-i18n]');
        var title = (window.SiteI18n && titleKeyEl)
          ? window.SiteI18n.t(titleKeyEl.getAttribute('data-i18n'))
          : card.getAttribute('data-video-title');
        var link = card.getAttribute('data-video-link') ||
          (card.querySelector('a.video-external-link') || {}).href;
        if (embed) {
          openModal(title, embed, link);
        } else if (link) {
          window.open(link, '_blank', 'noopener');
        }
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ===== 数字滚动动画（渐进增强 + prefers-reduced-motion 降级） =====
  // 设计原则：HTML 静态文本就是最终值（无 JS 也显示正确数字）
  // 当 JS 正常运行 + 未开启 reduce motion + 元素进入视口时，再从 0 滚动到目标值
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length > 0) {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // 直接显示最终值（HTML 里已经写好，什么也不用做）
    } else {
      // 保存最终值，再把显示置 0，准备动画
      statNumbers.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        el._target = target;
        el._suffix = suffix;
        el.innerHTML = '0' + (suffix ? '<sup>' + suffix + '</sup>' : '');
      });

      var animateNumber = function (el) {
        var target = el._target;
        var suffix = el._suffix;
        var duration = 1500;
        var startTime = null;

        var step = function (currentTime) {
          if (!startTime) startTime = currentTime;
          var elapsed = currentTime - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var easeProgress = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(easeProgress * target);
          el.innerHTML = current.toLocaleString() + (suffix ? '<sup>' + suffix + '</sup>' : '');
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.innerHTML = target.toLocaleString() + (suffix ? '<sup>' + suffix + '</sup>' : '');
          }
        };
        requestAnimationFrame(step);
      };

      var triggered = false;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateNumber(entry.target);
              observer.unobserve(entry.target);
              triggered = true;
            }
          });
        },
        { threshold: 0.3 }
      );

      statNumbers.forEach(function (el) {
        observer.observe(el);
      });

      // 兜底：如果加载时数字区已经在视口内，立即触发（防止 IntersectionObserver 首帧未触发）
      // 用 setTimeout 等一帧确保 observer 已绑定完成
      requestAnimationFrame(function () {
        if (triggered) return;
        statNumbers.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          if (rect.top < viewportHeight * 0.7 && rect.bottom > 0) {
            animateNumber(el);
            try { observer.unobserve(el); } catch (e) {}
          }
        });
      });
    }
  }

  // ===== 图片灯箱（点击“无链接”图片查看完整原图）=====
  (function () {
    var EXCLUDE_SEL = '.video-card,.video-play-btn,[data-video-embed],[data-video-link],.video-thumb';

    function isZoomable(img) {
      if (!img || img.tagName !== 'IMG') return false;
      if (img.closest('#imgLightbox')) return false;
      if (img.closest('a')) return false;
      if (img.closest(EXCLUDE_SEL)) return false;
      if (!img.src) return false;
      return true;
    }

    var box = document.createElement('div');
    box.id = 'imgLightbox';
    box.className = 'img-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<button class="img-lightbox-close" id="imgLightboxClose" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>' +
      '<figure class="img-lightbox-figure">' +
        '<img class="img-lightbox-img" alt="">' +
        '<figcaption class="img-lightbox-caption"></figcaption>' +
      '</figure>';
    document.body.appendChild(box);

    var lbImg = box.querySelector('.img-lightbox-img');
    var lbCap = box.querySelector('.img-lightbox-caption');
    var lbClose = box.querySelector('#imgLightboxClose');

    function open(img) {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || '';
      if (img.alt && img.alt.trim()) {
        lbCap.textContent = img.alt;
        lbCap.style.display = '';
      } else {
        lbCap.textContent = '';
        lbCap.style.display = 'none';
      }
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      box.classList.remove('open');
      lbImg.src = '';
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('open')) close();
    });

    // 事件委托：覆盖标签切换后显示的图片
    document.addEventListener('click', function (e) {
      if (isZoomable(e.target)) {
        e.preventDefault();
        open(e.target);
      }
    });

    // 初始光标提示
    document.querySelectorAll('img').forEach(function (img) {
      if (isZoomable(img)) img.style.cursor = 'zoom-in';
    });
  })();

})();
