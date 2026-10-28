/* ===== 图片加载失败优雅降级（捕获阶段，尽早注册，避免裂图图标） ===== */
document.addEventListener('error', function (e) {
  var t = e && e.target;
  if (t && t.tagName === 'IMG' && t.getAttribute && t.getAttribute('src') && !(t.closest && t.closest('#imgLightbox'))) {
    t.classList.add('img-failed');
  }
}, true);

/* ===== 多语言字典 & 切换逻辑（无依赖，全站共享）===== */
(function () {
  'use strict';

  var STORAGE_KEY = 'site_lang';
  var DEFAULT_LANG = 'en';

  // ===== 翻译字典 =====
  var dict = {
    zh: {
      // 通用导航 & 页脚
      'nav.home': '首页',
      'nav.academic': '学术',
      'nav.publications': '作品',
    'nav.practice': '实践',
  'practice.title': '实践 | 周东霖',
  'practice.metaDesc': '周东霖 - 实践：代表性专业奖项与实习经历',
  'practice.heroTitle': '专业实践',
  'practice.intro': '传媒专业是一个十分重视实践的学科，理论知识要在实践中得到验证和深化。我在本科期间，高质量完成了三段实习经历，涵盖传统媒体、外宣媒体、企业公关、活动策划等多岗位，锻炼了扎实的媒体实践技能，并荣获了多项高水平专业赛事奖项',
  'practice.awardsTitle': '代表性专业奖项',
  'practice.award1': '全国高校商业精英挑战赛创新创业竞赛创业计划赛道全国总决赛 一等奖',
  'practice.award2': '第二届“我眼中的新时代”大学生实践类思政作品入库成果展播活动',
  'practice.award3': '2026年湖北省新闻传播教育创新实践技能竞赛 新闻采编类 二等奖（图为大赛官方获奖公示，证书正在制作中）',
  'practice.award4': '2026年湖北省新闻传播教育创新实践技能竞赛 微视频类 二等奖（图为大赛官方获奖公示，证书正在制作中）',
  'practice.award5': '2025年大学生新文科实践创新大赛黄冈师范学院校赛一等奖',
  'practice.award6': '2024年中国国际大学生创新大赛黄冈师范学院校赛三等奖',
  'practice.award7': '2024年大学生新文科实践创新大赛黄冈师范学院校赛三等奖',
  'practice.award8': '国家级原创话剧《地脉寻踪》最佳制作人奖',
  'practice.internTitle': '实习经历',
  'practice.intern1.org': '梧桐树保险经纪有限公司',
  'practice.intern1.loc': '中国，武汉',
  'practice.intern1.time': '2026年7月 – 2026年9月',
  'practice.intern1.role': '公关策划助理',
  'practice.intern1.duties': '<li>协助开展媒介公关，支持企业打造对外形象、应对突发事件及日常舆情监测工作</li><li>参与企业大型活动的策划、起草及执行，协助统筹企业日常事务</li>',
  'practice.intern2.org': '武汉国际传播中心',
  'practice.intern2.loc': '中国，武汉',
  'practice.intern2.time': '2026年3月 – 2026年6月',
  'practice.intern2.role': '新媒体编辑',
  'practice.intern2.duties': '<li>参与“武汉发布”“武汉国传”“武汉外事港澳”等系列新媒体平台的日常运营，协助内容编辑与发布</li><li>实习期间编辑并发布 20 余篇融媒作品，涵盖适配不同传播平台的文本与视觉内容；参与创作的作品在全网累计获得超过 100 万次浏览量</li>',
  'practice.intern3.org': '黄冈市融媒体中心',
  'practice.intern3.loc': '中国，黄冈',
  'practice.intern3.time': '2025年6月 – 2025年7月',
  'practice.intern3.role': '记者助理',
  'practice.intern3.duties': '<li>协助新闻节目制作，现场参与拍摄与采访，对重大事件进行报道，实习期间独立完成了 10 余部短视频的全流程制作</li><li>实习期间撰写 20 余篇新闻报道，其中 1 篇发表于国家重点新闻网站中国网（China.com.cn），另有 10 余篇发表于省级主流媒体；为云上黄冈、黄州新闻及黄冈市文化和旅游局等平台提供优质文字及视频内容</li><li>制作一部文化类微纪录片，发布于央视频（中央广播电视总台新媒体平台）</li>',
  'practice.cert1': '武汉国际传播中心实习证明',
  'practice.cert2': '黄冈市融媒体中心实习证明',
  'practice.cert3': '梧桐树保险经纪有限公司实习证明',
  'practice.docTitle': '实习纪实',
  'practice.doc1': '我给实习团队成员讲解活动拍摄流程',
  'practice.doc2': '我实习期间在后台主持大型公演活动',
  'practice.doc3': '我实习期间随团队参观黄冈中电山水环保发电有限公司',
  'practice.doc4': '我在实习期间出镜口播董必武事迹',
      'nav.welfare': '公益',
      'nav.hobbies': '爱好',
      'nav.backToTop': '回到顶部',
      'nav.footerNav': '导航',
      'footer.role': '兼具内容生产能力与学术研究视野的复合型传媒人',
      'footer.contact': '联系我：',
      'footer.copyright': '© 2026 周东霖. 保留所有权利.',
      'lang.switch': '中文 / EN',
      'lang.aria': '切换语言',

      // ========== 首页 ==========
      'home.heroTag': '个人网站&作品集',
      'home.heroName': '周东霖',
      'home.heroTagline': '兼具内容生产能力与学术研究视野的复合型传媒人',
      'home.identity1': '中国青年网中青号创作者',
      'home.identity2': '国家级原创话剧《地脉寻踪》“最佳制作人”',
      'home.identity3': '黄冈师范学院媒介口语传播艺术研究中心研究员助理',
      'home.btnAcademic': '学术研究',
      'home.btnPublications': '媒体作品',
      'home.statsTitle': '成果与奖项',
      'home.statPapers': '学术论文',
      'home.statNews': '新闻通讯',
      'home.statVideo': '视频作品',
      'home.statAwards': '奖项证书',
      'home.aboutTitle': '背景与资质',
      'home.infoEdu': '教育背景',
      'home.infoEduValue': '黄冈师范学院播音与主持艺术专业本科（预计 2027 年 6 月毕业，获艺术学学士学位）',
      'home.infoCert': '资质证书',
      'home.certNcre': '全国计算机等级考试（NCRE）<strong>二级</strong>',
      'home.certPsc': '普通话水平测试（PSC）<strong>一级</strong>',
      'home.certIelts': '雅思（IELTS）<strong>6.0</strong>',
      'home.certCet6': '全国大学英语考试六级（CET6）<strong>454</strong>',
      'home.photoWallTitle': '个人照片墙',
      'home.photo1': '在黄冈师范学院第六次学生代表大会上作为大会委员发言',
      'home.photo2': '作为随行翻译和实习记者接待西班牙外宾',
      'home.photo3': '在红安县调研并参加座谈会',
      'home.photo4': '参加2025年黄冈半程马拉松',
      'home.photo5': '在武汉琴台音乐厅',
      'home.metaDesc': '周东霖 - 兼具内容生产能力与学术研究视野的复合型传媒人',
      'home.title': '周东霖个人网站&作品集',

      // ========== 学术页 ==========
      'academic.metaDesc': '周东霖 - 学术研究成果：论文与科研项目',
      'academic.title': '学术 | 周东霖',
      'academic.heroTitle': '学术研究',
      'academic.heroDesc': '立足传媒专业，常年扎根乡村振兴、普通话推广实践一线，从事文化传播、新媒体传播研究，致力于探索数智时代传播创新路径',
      'academic.tabPapers': '论文',
      'academic.tabProjects': '项目',
      // 论文 1
      'academic.paper1.title': '数智时代地方文化参与式传播路径创新探究——以大别山精神推普队实践为例',
      'academic.paper1.journal1': '《科技传播》',
      'academic.paper1.journal2': '（中国应用型扩展期刊）',
      'academic.paper1.abstractTag': '摘要',
      'academic.paper1.abstract': '以亨利·詹金斯的"参与式文化"理论为基础提出PIIC模式，旨在运用先进交互技术和传播手段来激发受众主动性，实现受众从文化的被动接受者转变为文化的参与者、反馈者和传播者，从而创新地方文化传播路径，并结合黄冈师范学院大别山精神推普队的实践，论证PIIC模式赋能地方文化传播的效果，为数智时代地方文化的活态传承与价值放大提供可复制的理论范式与实践路径。',
      'academic.paper1.role': '第一作者',
      'academic.paper1.read': '阅读原文',
      // 论文 2
      'academic.paper2.title': '高校自媒体平台对学生思政引领的现状及对策分析——以湖北省H高校为例',
      'academic.paper2.journal1': '《新闻传播》',
      'academic.paper2.journal2': '（省级一级期刊）',
      'academic.paper2.abstract': '随着互联网的迅猛发展，自媒体平台逐渐成为高校学生获取信息和表达观点的重要渠道。其在高校广大青年学生群体中的影响力已不容忽视，这对高校学生思想政治教育产生了深远的影响。国内各大高校也逐渐意识到自媒体平台在校园文化建设、校园舆情、学生思想政治教育等方面发挥着重要作用。本文将以湖北省H高校现阶段实际情况为例，探讨自媒体平台在高校学生思想政治教育中的角色定位，分析其对学生的影响与意义，并提出改进建议。',
      'academic.paper2.role': '第一作者',
      'academic.paper2.read': '阅读原文',
      // 论文 3
      'academic.paper3.title': '以"语"为桥 薪火相传——大别山精神推普队的"普通话+"实践与启示',
      'academic.paper3.journal1': '《黄冈日报》',
      'academic.paper3.journal2': '（中共黄冈市委机关报）',
      'academic.paper3.abstract': '针对大别山精神传播中存在的内涵时代适配不足、方言壁垒阻碍跨区传播、多元主体协同断层等现实挑战，黄冈师范学院大别山精神推普队创新构建"普通话+"传播模式。该模式以"语言为桥、精神为魂"，通过具身认知理论指导的情景剧活化历史叙事，结合空间生产理论的研学徒步构建连续性记忆图谱，运用语言经济学赋能直播带货实现产品符号价值跃升；并精准对接青少年、商户、从业者等对象，协同校社、校企、校媒资源形成合力。实践证明，"普通话+"模式不仅有效破解了红色精神"听不懂、传不开、用不上"的困境，也为新时代红色基因传承与乡村振兴提供了可复制的创新路径。',
      'academic.paper3.role': '第一作者',
      'academic.paper3.read': '阅读原文',
      // 论文 4
      'academic.paper4.title': '普通话赋能与精神传承——大别山精神推普队的"普通话+"传播实践与路径创新',
      'academic.paper4.journal1': '《侨星》',
      'academic.paper4.journal2': '（省级优秀期刊）',
      'academic.paper4.abstract': '大别山精神作为中国革命精神的重要组成部分，是红色文化传承与乡村振兴的重要精神资源。本文以黄冈师范学院大别山精神推普队的实践为案例，通过分析其在普通话推广与精神传播中构建的"普通话+"模式，探讨新时代大别山精神的传播机制。研究发现，推普队通过"普通话+红色教育""普通话+文旅融合""普通话+产业发展"的多元融合路径，形成"载体创新—受众分层—协同传播"的三维传播体系，有效破解了红色精神传播中的地域局限、语言障碍与形式单一等问题，为红色文化的活态传承与乡村振兴提供了实践范式。',
      'academic.paper4.role': '第一作者',
      'academic.paper4.read': '阅读原文',
      // 论文 5
      'academic.paper5.title': '在"一带一路"背景下加强黄冈"山坡"文化在东盟国家的传播对策',
      'academic.paper5.journal1': '《美丽中国》',
      'academic.paper5.abstract': '在"一带一路"倡议的推动下，黄冈"山坡"文化在东盟国家的传播具备条件。本文建议通过发挥官方机构主体作用、拓展传播平台、调动个体与群体参与、实现精准传播等措施，推动黄冈文化在东盟国家的传播，促进双方文化交流与合作，为高质量共建"一带一路"做出黄冈贡献。',
      'academic.paper5.role': '第三作者',
      // 论文 6
      'academic.paper6.title': '让农家书屋成为文化风景线',
      'academic.paper6.journal1': '《村委主任》',
      'academic.paper6.journal2': '（中国农家书屋重点期刊）',
      'academic.paper6.abstract': '随着乡村振兴战略的推进，农家书屋正成为基层文化服务与建设的重要阵地。文章对当下农家书屋发展中存在的文化功能弱化、阅读体验单调、数字化应用效果不佳、业务链单一等问题进行了系统总结，并以湖北省黄冈市黄州区陈策楼村为调查点，通过实地观察、调查访谈、问卷调查收集一手数据，运用统计学、AI进行分析，同时参考近年来成功案例，从主体意识、阅读体验、科技创新、运营创收四方面创造性提出运营新策略，尝试为农家书屋深度赋能乡村文化振兴和转型升级提供新的思路。',
      'academic.paper6.role': '第一作者',
      'academic.paper6.read': '阅读原文',

      // 项目
      'academic.projectsEyebrow': '项目纪实',
      'academic.projectsTitle': '项目纪实',
      'academic.projectsSubtitle': '田野调查、深度访谈、问卷调查，记录每一个研究的瞬间',
      // 项目1
      'academic.project1.name': '语传薪火：大别山智慧推普公益在行动',
      'academic.project1.time': '2026.03 – 至今',
      'academic.project1.role': '项目负责人',
      'academic.project1.level': '校级大学生创新训练项目',
      'academic.project1.results': '<strong class="contrib-title">主要贡献：</strong><ul class="contrib-list"><li>开展针对大别山区地方文化传播与普通话推广的实践调研，共收集了480余份问卷并进行了70余次访谈；运用模糊集定性比较分析法（fsQCA）研究制约大别山革命老区地方文化传播和普通话推广的核心因素</li><li>基于研究结果，提出 PIIC（Participation-Interaction-Immersion-Communication，参与-互动-沉浸-传播）模型</li><li>策划并开展了多项相关公益活动，累计吸引超过5,000名参与者；该项目还被各级媒体报道100余次</li></ul>',
      // 项目2
      'academic.project2.name': '数智时代高校传媒教育理念变革和路径创新研究',
      'academic.project2.time': '2025.12 – 至今',
      'academic.project2.role': '核心成员',
      'academic.project2.level': '湖北省高等教育学会教育科研项目',
      'academic.project2.results': '<strong class="contrib-title">主要贡献：</strong><ul class="contrib-list"><li>参与构建涵盖九个维度的研究框架，包括课程认知、学习需求、课程设计、教学形式、支持体系、评估方式、学习成果、学生反馈及教师反馈；参与制定研究方案与访谈提纲</li><li>对参与研究的学生、教师及高校管理人员开展了20余次深度访谈，并协助收集与分析问卷及访谈数据，为基于人工智能技术驱动的高校传媒教育改革研究提供支持</li></ul>',
      // 项目3
      'academic.project3.name': '"智媒"AI：名人数字化传播赋能文旅发展',
      'academic.project3.time': '2025.03 – 2026.06',
      'academic.project3.role': '项目负责人',
      'academic.project3.level': '校级大学生创新训练项目',
      'academic.project3.results': '<strong class="contrib-title">主要贡献：</strong><ul class="contrib-list"><li>牵头整合现有开源大语言模型、视觉生成引擎与音视频合成技术，将多模态AI技术嵌入传媒内容生产的各环节，构建历史语境下名人形象的多模态创作闭环</li><li>主导研发“智媒AI大模型”及数字媒体作品的制作，相关数字成果在各大媒体平台播出，并被收录至黄冈师范学院媒介口语传播艺术研究中心官网“名人数字馆”专栏；申请一项国家软件著作权登记</li></ul><a class="project-special-link" href="https://oralcomm.hgnu.edu.cn/main.htm" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>黄冈师范学院媒介口语传播艺术研究中心官网</a>',
      'academic.project3.linkText': '黄冈师范学院媒介口语传播艺术研究中心官网（名人数字馆）',
      // 项目4
      'academic.project4.name': '大别山地区"乡村希望书屋"新公益模式研究',
      'academic.project4.time': '2024.04 – 2025.06',
      'academic.project4.role': '项目负责人',
      'academic.project4.level': '湖北省大学生创新训练项目',
      'academic.project4.results': '<strong class="contrib-title">主要贡献：</strong><ul class="contrib-list"><li>开展针对农家书屋运营困境的实地调研，通过发放200余份调查问卷、走访36户农村家庭及对政府相关职能部门负责人进行2次深度访谈收集大量一手数据；采用SPSS软件进行定量分析，并运用人工智能工具辅助定性分析</li><li>结合传播学与管理学理论，提出一个涵盖书屋运营、受众体验、数字赋能及文化教育的“3+1”运营模式，并组织开展相关公益活动以支持该模式的落地实施</li><li>该本科创新训练计划成功获评省级项目认定</li></ul>',
      // 画廊
      'academic.gallery1': '尝试运用 PIIC 模式进行普通话教学',
      'academic.gallery2': '带领团队在红安县开展座谈调研',
      'academic.gallery3': '和团队在罗田县开展调研活动',
      'academic.gallery4': '和在黄冈工作的外籍人士交流调研',
      'academic.gallery5': '在罗田县开展田野调查，采访当地居民',
      'academic.gallery6': '在燕儿谷同政府工作人员开展深度访谈',
      'academic.gallery7': '陈策楼镇人民政府颁发给我团队的感谢信',
      'academic.gallery8': '红安县文化和旅游局颁发给我团队的感谢信',
      'academic.gallery9': '共青团黄冈市委、黄冈市学联颁发给我团队的感谢信',
      'academic.gallery10': '中共罗田县委宣传部颁发给我团队的感谢信',
      'academic.gallery11': '罗田县文化和旅游局颁发给我团队的感谢信',

      // ========== 出版页 ==========
      'publications.metaDesc': '周东霖 - 媒体作品：新闻、视频、评论',
      'publications.title': '作品 | 周东霖',
      'publications.heroTitle': '媒体作品',
      'publications.heroDesc': '精选代表性新闻通讯、视频制作、时事评论——用多元形式记录时代，传递声音',
      'publications.tabNews': '新闻',
      'publications.tabVideo': '视频',
      'publications.tabReview': '评论',
      // 视频
      'publications.video1.title': '"科学家精神百场讲坛"走进黄冈师范学院——李四光主题访谈',
      'publications.video1.desc': '作为国家级话剧《地脉寻踪》学生负责人、推普队学生领队，主持"科学家精神"主题访谈节目',
      'publications.video2.title': '一座城的味道',
      'publications.video2.desc': '参与制作的黄州美食纪录短片，聚焦烧梅、东坡肉、鱼圆子，展现黄州非遗魅力',
      'publications.video3.title': '《是这个理》"红IP"兴乡',
      'publications.video3.desc': '深度参与制作的电视节目，于湖北电视综合频道播出，以红色资源赋能乡村振兴',
      'publications.video4.title': '跨越山海续文脉，江城研学启新程',
      'publications.video4.desc': '2025年6月，斯里兰卡萨伯勒格穆沃大学孔子课堂 21 名师生赴武汉研学，感受荆楚文脉与都市活力',
      'publications.video5.title': '语传薪火——黄冈师范学院大别山推普队在行动',
      'publications.video5.desc': '2025年07月，团中央、教育部认定 全国大学生普通话推广实践团队大别山精神推普队暑期社会实践宣传片，在央视频、中教网等权威媒体平台播出',
      'publications.video6.title': '巧绘脸谱品国粹，海外学子悟中华',
      'publications.video6.desc': '2025年06月，斯里兰卡研学师生体验中国脸谱彩绘，感受戏曲脸谱文化',
      'publications.video7.title': '推普大别山',
      'publications.video7.desc': '大别山精神推普队创新 PIIC"参与-互动-沉浸-传播"四维模式，深入多地开展推普与文化传播',
      'publications.video8.title': '语润古村，文脉新声',
      'publications.video8.desc': '十五天行走大别山多个古村落。访青年创业者、听百姓家常、寻乡土文脉。以传媒专业之力，用镜头记录古村风貌，用文字讲好乡村故事。以青春小我，汇入乡村振兴时代洪流。让千年古村，听见青年新声。',
      'publications.video9.title': '地脉寻踪：一部科学报国的壮丽史诗',
      'publications.video9.desc': '国家级话剧《地脉寻踪》宣传片，纪念地质学家李四光 136 周年诞辰',
      'publications.videoFeatured': '精选',
      'publications.videoNewTab': '在新标签页打开',
      'publications.videoPlay': '点击播放',
      'publications.videoOriginal': '新标签页打开原片',
      'publications.videoNoscript': '在新标签页观看',
      'publications.modalClose': '关闭',
      'publications.modalOriginalBtn': '在新标签页打开原片',
      // 新闻标题
      'publications.news1.title': '"AI只是工具，要多问为什么"，西班牙首席研究员受聘黄冈师院，建言传媒教育要"以人为本"',
      'publications.news1.source': '极目新闻',
      'publications.news2.title': '黄冈师范学院两部原创话剧亮相荆楚科普大秀场',
      'publications.news2.source': '中国青年网校园通讯社',
      'publications.news3.title': '寿苏贺诞辰 青春传文脉——黄师推普队赋能东坡文化国际传播',
      'publications.news3.source': '大象新闻',
      'publications.news4.title': '黄师学子为团风中学三千多名师生献演《地脉寻踪》',
      'publications.news4.source': '荆楚网（湖北日报网）',
      'publications.news5.title': '跑一场马，识一座城——大别山跑团顺利完赛2025黄冈半程马拉松',
      'publications.news5.source': '大学生云报',
      'publications.news6.title': '东垸村从哪里来？又该到哪里去？黄冈师范学院大别山推普队走进东垸村的观察',
      'publications.news6.source': '中国青年网',
      'publications.news7.title': '蓉香美味馆：藏在烟火巷中的年味',
      'publications.news7.source': '中国网',
      'publications.news8.title': '产业赋能推普 红韵浸润乡村——大别山精神推普队解码燕儿谷经验密码',
      'publications.news8.source': '湖北日报',
      'publications.news9.title': '当"洋面孔"遇见"老传统"——黄冈师院130余名外籍师生畅享文化体验之旅',
      'publications.news9.source': '黄冈日报',
      'publications.news10.title': '从智慧推普到28个节目，遗爱湖社区的"六一"有点不一样',
      'publications.news10.source': '中华网',
      'publications.news11.title': '黄冈师院两部原创话剧亮相中科院科学节武汉专场',
      'publications.news11.source': '新华网',
      'publications.news12.title': '大别山推普队帮"洋面孔"解码中国非遗',
      'publications.news12.source': '湖北日报',
      // 评论
      'publications.review1.title': '武汉大学校门开放后，其他高校该何去何从',
      'publications.review1.source': '评论 · 中华网',
      'publications.review2.title': '艺术既要守住边界，也要给即兴留下空间',
      'publications.review2.source': '评论 · 凤凰网',

      // ========== 公益页 ==========
      'welfare.metaDesc': '周东霖 - 公益实践',
      'welfare.title': '公益 | 周东霖',
      'welfare.heroTitle': '公益事迹',
      'welfare.heroDesc': '运用传媒专业能力投身公益，用镜头和笔触传递温暖与力量',
      'welfare.story1.title': '"桐星守护"关爱孤独症儿童公益行动',
      'welfare.story1.desc': '作为大学生代表长期参与由梧桐树保险经纪有限公司发起的"桐星守护"公益行动，聚焦孤独症儿童群体开展形式多样的公益活动，用持续的陪伴与切实的帮扶，为患有孤独症的孩子们照亮成长之路',
      'welfare.story1.item1': '2024.08.16 参加孤独症儿童生日会，陪伴孤独症儿童聊天',
      'welfare.story1.item2': '2024.08.23 作为媒体志愿者参加孤独症儿童主题舞台剧《追星星的孩子》',
      'welfare.story1.item3': '与舞台剧志愿者、主办方及嘉宾合影',
      'welfare.story2.title': '媒体赋能、助力乡村振兴',
      'welfare.story2.desc': '本科期间扎根大别山，运用媒体专业知识助力乡村振兴。2024年12月20日，带领团队参加湖北农业博览会助农直播高校专场，借直播为农产品打开销路，创造"一秒成交 7 单"的成绩，获"优秀志愿者"称号',
      'welfare.story2.item1': '湖北农业博览会助农直播现场，介绍农产品',
      'welfare.story2.item2': '助农直播间截图',
      'welfare.story2.item3': '助农直播团队合影',
      'welfare.certsTitle': '公益证书与奖项',
      'welfare.cert1': '2026年获"最佳公益伙伴"称号',
      'welfare.cert2': '2025年起向联合国儿童基金会定期捐款，获一周年纪念证书',
      'welfare.cert3': '获孤独症儿童主题舞台剧《追星星的孩子》"爱心志愿者"称号',
      'welfare.cert4': '获湖北农业博览会助农直播"优秀志愿者"称号',

      // ========== 爱好页 ==========
      'hobbies.metaDesc': '周东霖 - 兴趣爱好：音乐与马拉松',
      'hobbies.title': '爱好 | 周东霖',
      'hobbies.heroTitle': '兴趣爱好',
      'hobbies.heroDesc': '音乐滋养心灵，运动锤炼意志——热爱让生活更有温度',
      'hobbies.music.title': '音乐',
      'hobbies.music.p1': '5 岁开始学习音乐，钢琴最为擅长，参加多项高水平钢琴赛事并获奖',
      'hobbies.music.p2': '现为<strong>虫虫钢琴平台认证音乐人</strong>，拥有一首原创钢琴曲《你好，未来》',
      'hobbies.music.p3': '亦擅长声乐、吉他、口琴，用多元的音乐形式表达生活的感悟',
      'hobbies.music.link': '原创钢琴曲《你好，未来》 — 前往聆听',
      'hobbies.music.photo1': '原创钢琴曲《你好，未来（生日版）》版权证明',
      'hobbies.music.photo2': '在武汉琴台音乐厅',
      'hobbies.run.title': '马拉松',
      'hobbies.run.p1': '热爱马拉松、乒乓球、跆拳道等运动，在奔跑中挑战自我',
      'hobbies.run.p2': '2024 年起参赛，已完赛两场<strong>中国田径协会认定的 A1 类赛事</strong>，包括中国马拉松大满贯、十大城市马拉松之一的"武汉马拉松"',
      'hobbies.run.photo1': '2025年3月武汉马拉松现场',
      'hobbies.run.photo2': '2025年11月黄冈半程马拉松现场',
      'hobbies.run.photo3': '2025年11月黄冈半程马拉松现场',
      'hobbies.run.photo4': '2025年武汉马拉松完赛证书',
      'hobbies.run.photo5': '2025年黄冈马拉松完赛证书',
    },

    en: {
      // 通用导航 & 页脚
      'nav.home': 'Home',
      'nav.academic': 'Academic',
      'nav.publications': 'Works',
    'nav.practice': 'Practice',
  'practice.title': 'Practice | Donglin Zhou',
  'practice.metaDesc': 'Donglin Zhou - Practice: representative professional awards and internship experience',
  'practice.heroTitle': 'Professional Practice',
  'practice.intro': 'Communication and media is a highly practice-oriented discipline in which theoretical knowledge is tested and deepened. During my undergraduate studies I completed three high-quality internships across traditional media, international communication, corporate public relations, and event planning, honing solid practical media skills, and I have won several awards in high-level professional competitions',
  'practice.awardsTitle': 'Representative Professional Awards',
  'practice.award1': 'China University Business Elite Challenge (CUBEC) Innovation and Entrepreneurship Competition, Entrepreneurship Plan Track, National Finals — First Prize',
  'practice.award2': 'The 2nd “New Era in My Eyes” College Students’ Practical Ideological and Political Works Collection and Showcase Event',
  'practice.award3': '2026 Hubei Provincial Journalism and Communication Education Innovation and Practical Skills Competition, News Gathering and Editing Category — Second Prize (shown: the official results announcement; the certificate is being issued)',
  'practice.award4': '2026 Hubei Provincial Journalism and Communication Education Innovation and Practical Skills Competition, Micro-video Category — Second Prize (shown: the official results announcement; the certificate is being issued)',
  'practice.award5': '2025 College Students’ New Liberal Arts Practice and Innovation Competition, Huanggang Normal University Campus Round — First Prize',
  'practice.award6': '2024 China International College Students’ Innovation Competition (CICSIC), Huanggang Normal University Campus Round — Third Prize',
  'practice.award7': '2024 College Students’ New Liberal Arts Practice and Innovation Competition, Huanggang Normal University Campus Round — Third Prize',
  'practice.award8': 'Best Producer Award for the national-level original play Tracing the Earth\'s Veins',
  'practice.internTitle': 'Internship Experience',
  'practice.intern1.org': 'Wutongshu Insurance Brokers Co., Ltd.',
  'practice.intern1.loc': 'Wuhan, China',
  'practice.intern1.time': 'July 2026 – September 2026',
  'practice.intern1.role': 'PR Planning Assistant',
  'practice.intern1.duties': '<li>Assisted with media relations, supporting the company’s external image, emergency response, and day-to-day public-opinion monitoring</li><li>Took part in the planning, drafting, and execution of major corporate events and helped coordinate the company’s daily affairs</li>',
  'practice.intern2.org': 'Wuhan International Communications Center',
  'practice.intern2.loc': 'Wuhan, China',
  'practice.intern2.time': 'March 2026 – June 2026',
  'practice.intern2.role': 'New Media Editor',
  'practice.intern2.duties': '<li>Participated in the day-to-day operation of new-media platforms including “Wuhan Release,” “Wuhan International Communications,” and “Wuhan Foreign Affairs, Hong Kong & Macao,” assisting with content editing and publishing</li><li>Edited and published more than 20 integrated-media works during the internship, covering text and visual content tailored to different platforms; co-created works drew a cumulative total of more than one million views across the internet</li>',
  'practice.intern3.org': 'Huanggang Convergence Media Center',
  'practice.intern3.loc': 'Huanggang, China',
  'practice.intern3.time': 'June 2025 – July 2025',
  'practice.intern3.role': 'Reporter Assistant',
  'practice.intern3.duties': '<li>Assisted with news programming, joining on-site filming and interviews and reporting on major events; independently completed the full production process for more than 10 short videos during the internship</li><li>Wrote more than 20 news reports during the internship: one was published on China.com.cn, a key national news website, and more than 10 others in mainstream provincial media; also supplied quality written and video content for platforms including Cloud Huanggang, Huangzhou News, and the Huanggang Municipal Bureau of Culture and Tourism</li><li>Produced a cultural micro-documentary published on Yangshipin, the new-media platform of China Media Group</li>',
  'practice.cert1': 'Internship Certificate — Wuhan International Communications Center',
  'practice.cert2': 'Internship Certificate — Huanggang Convergence Media Center',
  'practice.cert3': 'Internship Certificate — Wutongshu Insurance Brokers Co., Ltd.',
  'practice.docTitle': 'Internship in Action',
  'practice.doc1': 'Explaining the event filming workflow to members of my internship team',
  'practice.doc2': 'Hosting a large stage performance backstage during the internship',
  'practice.doc3': 'Visiting Huanggang SPIC Shanshui Environmental Protection Power Generation Co., Ltd. with the team during the internship',
  'practice.doc4': 'Appearing on camera to narrate the story of Dong Biwu during the internship',
      'nav.welfare': 'Charity',
      'nav.hobbies': 'Hobbies',
      'nav.backToTop': 'Back to top',
      'nav.footerNav': 'Navigation',
      'footer.role': 'A versatile media professional with both content production capabilities and academic research vision',
      'footer.contact': 'Contact me: ',
      'footer.copyright': '© 2026 Donglin Zhou. All rights reserved.',
      'lang.switch': '中文 / EN',
      'lang.aria': 'Switch language',

      // ========== 首页 ==========
      'home.heroTag': 'Personal Website & Portfolio',
      'home.heroName': 'Donglin Zhou',
      'home.heroTagline': 'A versatile media professional with both content production capabilities and academic research vision',
      'home.identity1': 'Creator on China Youth Network\'s "Youth Account"',
      'home.identity2': '\u201cBest Producer\u201d for the national-level original play Tracing the Earth\'s Veins',
      'home.identity3': 'Research Assistant, Media Oral Communication Art Research Center of Huanggang Normal University',
      'home.btnAcademic': 'Academic Research',
      'home.btnPublications': 'Media Works',
      'home.statsTitle': 'Achievements & Awards',
      'home.statPapers': 'Academic Papers',
      'home.statNews': 'News Reports',
      'home.statVideo': 'Video Works',
      'home.statAwards': 'Awards & Certificates',
      'home.aboutTitle': 'Background & Credentials',
      'home.infoEdu': 'Education',
      'home.infoEduValue': 'Bachelor\'s candidate in Broadcasting and Hosting Art, Huanggang Normal University (expected graduation: June 2027; Bachelor of Fine Arts degree)',
      'home.infoCert': 'Certifications',
      'home.certNcre': 'National Computer Rank Examination (NCRE) <strong>Level 2</strong>',
      'home.certPsc': 'Putonghua Proficiency Test (PSC) <strong>First Class (Level 1)</strong>',
      'home.certIelts': 'IELTS <strong>6.0</strong>',
      'home.certCet6': 'College English Test Band 6 (CET-6) <strong>454</strong>',
      'home.photoWallTitle': 'Photo Gallery',
      'home.photo1': 'Speaking as a committee member at the 6th Student Congress of Huanggang Normal University',
      'home.photo2': 'Receiving Spanish guests as interpreter and intern journalist',
      'home.photo3': 'Conducting field research and attending a symposium in Hong\'an County',
      'home.photo4': 'Running the 2025 Huanggang Half Marathon',
      'home.photo5': 'At Wuhan Qintai Concert Hall',
      'home.metaDesc': 'Donglin Zhou - A versatile media professional with content production and academic research capabilities',
      'home.title': 'Donglin Zhou Personal Website & Portfolio',

      // ========== 学术页 ==========
      'academic.metaDesc': 'Donglin Zhou - Academic research: papers and research projects',
      'academic.title': 'Academic | Donglin Zhou',
      'academic.heroTitle': 'Academic Research',
      'academic.heroDesc': 'Rooted in the Communication Studies discipline and deeply engaged in rural revitalization and Mandarin promotion, I research cultural communication and new media communication, striving to explore innovative paths for communication in the digital-intelligent era.',
      'academic.tabPapers': 'Papers',
      'academic.tabProjects': 'Projects',
      // 论文 1
      'academic.paper1.title': 'Innovative Paths of Participatory Communication for Local Culture in the Digital-Intelligent Era: A Case Study of the Dabie Mountains Mandarin-Promotion Team',
      'academic.paper1.journal1': 'Public Communication of Science & Technology',
      'academic.paper1.journal2': '(CACJ Chinese Applied Journals, Extended Tier)',
      'academic.paper1.abstractTag': 'Abstract',
      'academic.paper1.abstract': 'Based on Henry Jenkins\' theory of participatory culture, this paper proposes the PIIC model. It aims to stimulate audience initiative through advanced interactive technologies and communication methods, transforming audiences from passive recipients into participants, feedback providers, and disseminators of culture—thereby innovating local cultural communication pathways. Drawing on the practice of the Dabie Mountains Mandarin-Promotion Team at Huanggang Normal University, the paper demonstrates how the PIIC model empowers local cultural communication, providing a replicable theoretical paradigm and practical pathway for the living inheritance and value amplification of local culture in the digital-intelligent era.',
      'academic.paper1.role': 'First Author',
      'academic.paper1.read': 'Read original',
      // 论文 2
      'academic.paper2.title': 'Current Situation and Countermeasures of University Self-Media Platforms in Guiding Students Ideologically and Politically: A Case Study of a University H in Hubei Province',
      'academic.paper2.journal1': 'Journalism Communication',
      'academic.paper2.journal2': '(Provincial First-Level Journal)',
      'academic.paper2.abstract': 'With the rapid development of the Internet, self-media platforms have gradually become important channels for university students to access information and express opinions. Their influence among young students cannot be ignored, and they have exerted a profound impact on ideological and political education in universities. Universities across China have increasingly recognized the significant role of self-media platforms in campus culture building, campus public opinion, and students\' ideological and political education. Taking the current situation of a university H in Hubei Province as an example, this paper explores the role positioning of self-media platforms in ideological and political education, analyzes their impact and significance on students, and puts forward suggestions for improvement.',
      'academic.paper2.role': 'First Author',
      'academic.paper2.read': 'Read original',
      // 论文 3
      'academic.paper3.title': 'Language as a Bridge, Passed Down Like a Torch: The "Mandarin+" Practice and Insights of the Dabie Mountains Spirit Mandarin-Promotion Team',
      'academic.paper3.journal1': 'Huanggang Daily',
      'academic.paper3.journal2': '(Official newspaper of the CPC Huanggang Municipal Committee)',
      'academic.paper3.abstract': 'Addressing practical challenges in the dissemination of the Dabie Mountains Spirit—insufficient adaptation of its connotation to the times, dialect barriers hindering cross-regional communication, and fragmented collaboration among diverse actors—the Dabie Mountains Spirit Mandarin-Promotion Team at Huanggang Normal University has innovatively constructed a "Mandarin+" communication model. With "language as a bridge and spirit as its soul," the model revitalizes historical narratives through situational dramas guided by embodied cognition theory, builds continuous memory maps through study-tour hikes informed by space production theory, and leverages language economics to empower livestream commerce and elevate the symbolic value of products. By precisely targeting young people, merchants, and practitioners, and coordinating resources among schools, communities, enterprises, and media, the model has effectively overcome the dilemma of red culture "being unintelligible, unspreadable, and unuseful," providing a replicable innovation pathway for red gene inheritance and rural revitalization in the new era.',
      'academic.paper3.role': 'First Author',
      'academic.paper3.read': 'Read original',
      // 论文 4
      'academic.paper4.title': 'Mandarin Empowerment and Spiritual Inheritance: The "Mandarin+" Communication Practice and Path Innovation of the Dabie Mountains Spirit Mandarin-Promotion Team',
      'academic.paper4.journal1': 'Star Of Overseas Chinese',
      'academic.paper4.journal2': '(Provincial Excellent Journal)',
      'academic.paper4.abstract': 'As an important component of China\'s revolutionary spirit, the Dabie Mountains Spirit is a vital spiritual resource for red cultural inheritance and rural revitalization. Taking the practice of the Dabie Mountains Spirit Mandarin-Promotion Team at Huanggang Normal University as a case study, this paper explores the communication mechanism of the Dabie Mountains Spirit in the new era by analyzing the "Mandarin+" model constructed through Mandarin promotion and spiritual dissemination. The study finds that through the diverse integration pathways of "Mandarin+Red Education," "Mandarin+Culture and Tourism Integration," and "Mandarin+Industrial Development," the team has formed a three-dimensional communication system of "carrier innovation—audience stratification—collaborative communication," effectively breaking through regional limitations, language barriers, and monotonous forms in red spirit communication, and providing a practical paradigm for the living inheritance of red culture and rural revitalization.',
      'academic.paper4.role': 'First Author',
      'academic.paper4.read': 'Read original',
      // 论文 5
      'academic.paper5.title': 'Strategies to Strengthen the Spread of Huanggang "Hillside" Culture in ASEAN Countries under the Belt and Road Initiative',
      'academic.paper5.journal1': 'Amazing China',
      'academic.paper5.abstract': 'Driven by the Belt and Road Initiative, Huanggang\'s "Hillside" culture has the conditions to spread in ASEAN countries. This paper proposes measures such as leveraging the role of official institutions, expanding communication platforms, mobilizing individual and group participation, and achieving targeted communication, to promote the spread of Huanggang culture in ASEAN countries, facilitate cultural exchanges and cooperation between both sides, and contribute Huanggang\'s efforts to high-quality Belt and Road cooperation.',
      'academic.paper5.role': 'Third Author',
      // 论文 6
      'academic.paper6.title': 'Making Rural Libraries a Cultural Scenery',
      'academic.paper6.journal1': 'Cunwei Zhuren (Village Director)',
      'academic.paper6.journal2': '(Key Journal for Rural Libraries in China)',
      'academic.paper6.abstract': 'With the advancement of the rural revitalization strategy, rural libraries are becoming important positions for grassroots cultural services and construction. This article systematically summarizes current problems in rural library development, including weakened cultural functions, monotonous reading experiences, poor digital application outcomes, and singular business chains. Taking Chencelou Village in Huangzhou District, Huanggang City, Hubei Province as the research site, first-hand data were collected through on-site observation, interviews, and questionnaire surveys, analyzed using statistics and AI, and referenced against successful cases in recent years. From four dimensions—subject awareness, reading experience, technological innovation, and operation revenue—the paper creatively proposes new operational strategies, aiming to provide new ideas for rural libraries to deeply empower rural cultural revitalization and transformation.',
      'academic.paper6.role': 'First Author',
      'academic.paper6.read': 'Read original',

      // 项目
      'academic.projectsTitle': 'Project Documentation',
      'academic.projectsSubtitle': 'Fieldwork, in-depth interviews, and questionnaire surveys—capturing every moment of research.',
      // 项目1
      'academic.project1.name': 'Passing the Torch of Language: A Smart Mandarin-Promotion Public-Welfare Initiative in the Dabie Mountains (Yuchuan Xinhuo)',
      'academic.project1.time': 'Mar 2026 – Present',
      'academic.project1.role': 'Project Lead',
      'academic.project1.level': 'University-level Student Innovation Training Program',
      'academic.project1.results': '<strong class="contrib-title">Key Contributions:</strong><ul class="contrib-list"><li>Conducted field research on local-cultural communication and Mandarin promotion in the Dabie Mountains, collecting over 480 questionnaires and conducting 70+ interviews; applied fuzzy-set Qualitative Comparative Analysis (fsQCA) to examine the core factors constraining local-cultural communication and Mandarin promotion in the old revolutionary base area.</li><li>Based on the findings, proposed the PIIC (Participation-Interaction-Immersion-Communication) model.</li><li>Planned and delivered multiple related public-welfare activities, attracting more than 5,000 participants in total; the project was covered by media at various levels over 100 times.</li></ul>',
      // 项目2
      'academic.project2.name': 'Reform and Path Innovation of University Media Education in the Digital-Intelligent Era',
      'academic.project2.time': 'Dec 2025 – Present',
      'academic.project2.role': 'Core Member',
      'academic.project2.level': 'Educational Research Project of Hubei Higher Education Society',
      'academic.project2.results': '<strong class="contrib-title">Key Contributions:</strong><ul class="contrib-list"><li>Helped build a nine-dimension research framework covering curriculum awareness, learning needs, curriculum design, teaching formats, support systems, assessment methods, learning outcomes, student feedback, and teacher feedback; took part in developing the research plan and interview outlines.</li><li>Conducted 20+ in-depth interviews with participating students, teachers, and university administrators, and assisted in collecting and analyzing questionnaire and interview data to support research on AI-driven reform of university media education.</li></ul>',
      // 项目3
      'academic.project3.name': '"SmartMedia" AI: Empowering Culture and Tourism through the Digital Communication of Historical Figures (Zhi Mei)',
      'academic.project3.time': 'Mar 2025 – Jun 2026',
      'academic.project3.role': 'Project Lead',
      'academic.project3.level': 'University-level Student Innovation Training Program',
      'academic.project3.results': '<strong class="contrib-title">Key Contributions:</strong><ul class="contrib-list"><li>Led the integration of existing open-source Large Language Models (LLMs), visual-generation engines, and audio-video synthesis technologies, embedding multimodal AI into every stage of media content production to build a closed loop of multimodal creation for historical figures in their historical context.</li><li>Led the development of the "SmartMedia AI Model" and digital media works; the resulting digital outputs were broadcast on major media platforms and included in the "Digital Hall of Historical Figures" on the official website of the Media Oral Communication Art Research Center of Huanggang Normal University; one national software copyright registration was applied for.</li></ul><a class="project-special-link" href="https://oralcomm.hgnu.edu.cn/main.htm" target="_blank" rel="noopener"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>Media Oral Communication Art Research Center (HGNU) — Official Website</a>',
      'academic.project3.linkText': 'Digital Hall of Historical Figures — Media Oral Communication Art Research Center of Huanggang Normal University',
      // 项目4
      'academic.project4.name': 'A New Public-Welfare Model of "Rural Hope Libraries" in the Dabie Mountains',
      'academic.project4.time': 'Apr 2024 – Jun 2025',
      'academic.project4.role': 'Project Lead',
      'academic.project4.level': 'Hubei Provincial Student Innovation Training Program',
      'academic.project4.results': '<strong class="contrib-title">Key Contributions:</strong><ul class="contrib-list"><li>Conducted field research on the operational difficulties of rural bookhouses, gathering extensive first-hand data through 200+ questionnaires, visits to 36 rural households, and two in-depth interviews with heads of relevant government departments; carried out quantitative analysis with SPSS and AI-assisted qualitative analysis.</li><li>Drawing on communication and management theories, proposed a "3+1" operational model covering bookhouse operation, audience experience, digital empowerment, and culture-and-education, and organized public-welfare activities to support its implementation.</li><li>This undergraduate innovation training program was successfully recognized as a provincial-level project.</li></ul>',
      // 画廊
      'academic.gallery1': 'Teaching Mandarin using the PIIC model',
      'academic.gallery2': 'Leading the team in a symposium survey in Hong\'an County',
      'academic.gallery3': 'With the team conducting field research in Luotian County',
      'academic.gallery4': 'Conducting research interviews with expatriates working in Huanggang',
      'academic.gallery5': 'Fieldwork in Luotian County, interviewing local residents',
      'academic.gallery6': 'In-depth interview with government staff in Yan\'er Valley',
      'academic.gallery7': 'Letter of thanks presented to our team by the Chencelou Town People\'s Government',
      'academic.gallery8': 'Letter of thanks presented to our team by the Hong\'an County Bureau of Culture and Tourism',
      'academic.gallery9': 'Letter of thanks presented to our team by the Communist Youth League Huanggang Municipal Committee & Huanggang Student Federation',
      'academic.gallery10': 'Letter of thanks presented to our team by the Publicity Department of the CPC Luotian County Committee',
      'academic.gallery11': 'Letter of thanks presented to our team by the Luotian County Bureau of Culture and Tourism',

      // ========== 出版页 ==========
      'publications.metaDesc': 'Donglin Zhou - Media Works: news, videos, commentaries',
      'publications.title': 'Works | Donglin Zhou',
      'publications.heroTitle': 'Media Works',
      'publications.heroDesc': 'Selected representative news reports, video productions, and commentary pieces—recording the times and amplifying voices through diverse forms.',
      'publications.tabNews': 'News',
      'publications.tabVideo': 'Video',
      'publications.tabReview': 'Commentary',
      // 视频
      'publications.video1.title': 'Hundred Lectures on the Spirit of Scientists at Huanggang Normal University — Li Siguang Themed Interview',
      'publications.video1.desc': 'Hosting the "Spirit of Scientists" themed interview program as student lead of the national-level play Tracing the Earth\'s Veins and student leader of the Mandarin-Promotion Team',
      'publications.video2.title': 'The Taste of a City',
      'publications.video2.desc': 'Participated in this Huangzhou food documentary short, focusing on shaomei, Dongpo pork, and fish balls to showcase Huangzhou\'s intangible cultural heritage',
      'publications.video3.title': '"Red IP Revitalizes the Countryside" from TV Program This Is the Reason',
      'publications.video3.desc': 'Deeply involved in the production of this TV program broadcast on Hubei TV Comprehensive Channel, using red cultural resources to empower rural revitalization',
      'publications.video4.title': 'Across Mountains and Seas to Renew the Cultural Heritage: A Study Tour Begins in the River City',
      'publications.video4.desc': 'June 2025 — 21 teachers and students from the Confucius Classroom at Sabaragamuwa University of Sri Lanka embarked on a study tour in Wuhan, experiencing the cultural heritage of Chu and the vitality of the city',
      'publications.video5.title': 'Passing the Torch of Language: The Dabie Mountains Mandarin-Promotion Team in Action',
      'publications.video5.desc': 'July 2025 — A summer social practice promotional video for the Dabie Mountains Spirit Mandarin-Promotion Team, a national college student Mandarin-promotion practice team recognized by the Central Committee of the Communist Youth League and the Ministry of Education. Aired on authoritative media platforms including Yangshipin and China Education Network.',
      'publications.video6.title': 'Painting Facial Makeup, Savoring the National Essence: Overseas Students Experience Chinese Opera',
      'publications.video6.desc': 'June 2025 — Sri Lankan study tour students experience Chinese facial makeup painting and explore the culture of opera facial makeup',
      'publications.video7.title': 'Promoting Mandarin in the Dabie Mountains',
      'publications.video7.desc': 'The Dabie Mountains Spirit Mandarin-Promotion Team innovates the PIIC (Participation–Interaction–Immersion–Communication) four-dimensional model, carrying out Mandarin promotion and cultural communication across multiple locations',
      'publications.video8.title': 'Language Nourishes Ancient Villages: New Voices of the Cultural Heritage',
      'publications.video8.desc': 'Fifteen days walking through multiple ancient villages in the Dabie Mountains. Visiting young entrepreneurs, listening to villagers\' stories, tracing the local cultural heritage. Leveraging media expertise to capture village landscapes through the lens and tell rural stories through writing. Joining the great tide of rural revitalization as young individuals. Letting ancient villages hear the new voices of youth.',
      'publications.video9.title': 'Tracing the Earth\'s Veins: An Epic of Serving the Country through Science',
      'publications.video9.desc': 'Promotional video for the national play Tracing the Earth\'s Veins, commemorating the 136th birthday of geologist Li Siguang',
      'publications.videoFeatured': 'Featured',
      'publications.videoNewTab': 'Open in new tab',
      'publications.videoPlay': 'Click to play',
      'publications.videoOriginal': 'Open original in new tab',
      'publications.videoNoscript': 'Watch in new tab',
      'publications.modalClose': 'Close',
      'publications.modalOriginalBtn': 'Open original in new tab',
      // 新闻
      'publications.news1.title': '"AI is Just a Tool, We Must Ask Why": Spanish Chief Researcher Joins Huanggang Normal University, Advocating Human-Centered Media Education',
      'publications.news1.source': 'Jimu News',
      'publications.news2.title': 'Two Original Plays from Huanggang Normal University Staged at the Hubei Science Popularization Gala',
      'publications.news2.source': 'China Youth Network Campus News Agency',
      'publications.news3.title': 'Celebrating Su Dongpo\'s Birthday: Youth Pass On the Cultural Heritage — HNU Mandarin Team Empowers the International Communication of Dongpo Culture',
      'publications.news3.source': 'Daxiang News',
      'publications.news4.title': 'HNU Students Stage Tracing the Earth\'s Veins for Over 3,000 Teachers and Students at Tuanfeng Middle School',
      'publications.news4.source': 'Jingchu Net (Hubei Daily Network)',
      'publications.news5.title': 'Run a Marathon, Know a City: Dabie Running Team Completes the 2025 Huanggang Half Marathon',
      'publications.news5.source': 'University Student Cloud',
      'publications.news6.title': 'Where Does Donghuan Village Come From, and Where Is It Going? Observations from the Dabie Mountains Mandarin Team\'s Visit',
      'publications.news6.source': 'China Youth Network',
      'publications.news7.title': 'Rongxiang Delicacies: The Flavor of Chinese New Year in a Lively Alley',
      'publications.news7.source': 'China.org.cn',
      'publications.news8.title': 'Industry Empowers Mandarin Promotion, Red Culture Nourishes the Countryside: Decoding the Yan\'er Valley Model',
      'publications.news8.source': 'Hubei Daily',
      'publications.news9.title': 'When "Foreign Faces" Meet "Age-Old Traditions": Over 130 International Teachers and Students at HNU Enjoy a Cultural Experience Tour',
      'publications.news9.source': 'Huanggang Daily',
      'publications.news10.title': 'From Smart Mandarin Promotion to 28 Performances: A Different Children\'s Day in Yiai Lake Community',
      'publications.news10.source': 'China.com',
      'publications.news11.title': 'Two Original Plays from Huanggang Normal University at the Wuhan Session of the CAS Science Festival',
      'publications.news11.source': 'Xinhuanet',
      'publications.news12.title': 'Dabie Mountains Mandarin Team Helps "Foreign Faces" Decode China\'s Intangible Cultural Heritage',
      'publications.news12.source': 'Hubei Daily',
      // 评论
      'publications.review1.title': 'After Wuhan University Opens Its Gates, What Should Other Universities Do?',
      'publications.review1.source': 'Commentary · China.com',
      'publications.review2.title': 'Art Must Both Guard Its Boundaries and Leave Room for Improvisation',
      'publications.review2.source': 'Commentary · iFeng',

      // ========== 公益页 ==========
      'welfare.metaDesc': 'Donglin Zhou - Charity work',
      'welfare.title': 'Charity | Donglin Zhou',
      'welfare.heroTitle': 'Charity Stories',
      'welfare.heroDesc': 'Applying media expertise to public welfare, conveying warmth and strength through the lens and the written word.',
      'welfare.story1.title': 'Tongxing Guardian: Caring for Children with Autism',
      'welfare.story1.desc': 'Long-term participant, as a student representative, in the "Tongxing Guardian" public-welfare initiative launched by Wutongshu Insurance Brokers Co., Ltd. Focusing on children with autism through diverse forms of public-welfare activities, using sustained companionship and tangible support to light the path of growth for children with autism.',
      'welfare.story1.item1': 'Aug 16, 2024 — Joining a birthday party for children with autism, spending time chatting with them',
      'welfare.story1.item2': 'Aug 23, 2024 — Serving as a media volunteer at the autism-themed stage play Children Chasing Stars',
      'welfare.story1.item3': 'Group photo with stage play volunteers, organizers, and distinguished guests',
      'welfare.story2.title': 'Media Empowerment for Rural Revitalization',
      'welfare.story2.desc': 'During undergraduate studies, rooted in the Dabie Mountains, applying media expertise to advance rural revitalization. On December 20, 2024, led the team to participate in the agricultural livestreaming special session for universities at the Hubei Agricultural Expo, helping open up sales channels for agricultural products. Achieved "seven orders closed within a single second" and received the "Outstanding Volunteer" award.',
      'welfare.story2.item1': 'Live at the Hubei Agricultural Expo, introducing agricultural products',
      'welfare.story2.item2': 'Screenshot of the agricultural livestreaming studio',
      'welfare.story2.item3': 'Group photo of the agricultural livestreaming team',
      'welfare.certsTitle': 'Certificates & Awards',
      'welfare.cert1': '"Best Public-Welfare Partner" Award, 2026',
      'welfare.cert2': 'One-year anniversary certificate for regular donations to UNICEF since 2025',
      'welfare.cert3': '"Caring Volunteer" for the autism-themed stage play Children Chasing Stars',
      'welfare.cert4': '"Outstanding Volunteer" for the agricultural livestreaming at Hubei Agricultural Expo',

      // ========== 爱好页 ==========
      'hobbies.metaDesc': 'Donglin Zhou - Hobbies: music and marathon running',
      'hobbies.title': 'Hobbies | Donglin Zhou',
      'hobbies.heroTitle': 'Hobbies & Interests',
      'hobbies.heroDesc': 'Music nourishes the soul, sports forge the will—passion gives life its warmth.',
      'hobbies.music.title': 'Music',
      'hobbies.music.p1': 'Began studying music at age 5, with the piano as primary instrument. Won awards in multiple high-level piano competitions.',
      'hobbies.music.p2': 'Currently a <strong>certified musician on Worm Piano</strong>, with one original piano composition, Hello, the Future.',
      'hobbies.music.p3': 'Also skilled in vocal performance, guitar, and harmonica, expressing insights about life through diverse musical forms.',
      'hobbies.music.link': 'Hello, the Future (original piano piece) — Listen',
      'hobbies.music.photo1': 'Copyright certificate for original piano piece Hello, the Future (Birthday Version)',
      'hobbies.music.photo2': 'At Wuhan Qintai Concert Hall',
      'hobbies.run.title': 'Marathon',
      'hobbies.run.p1': 'Passionate about marathon, table tennis, and taekwondo—challenging myself with every stride.',
      'hobbies.run.p2': 'Started racing in 2024, having completed two <strong>Class A1 certified road races by the Chinese Athletics Association (CAA)</strong>, including the Wuhan Marathon—one of China Marathon Majors and one of the top ten city marathons in China.',
      'hobbies.run.photo1': 'Wuhan Marathon, March 2025',
      'hobbies.run.photo2': 'Huanggang Half Marathon, November 2025',
      'hobbies.run.photo3': 'Huanggang Half Marathon, November 2025',
      'hobbies.run.photo4': 'Wuhan Marathon finisher certificate, 2025',
      'hobbies.run.photo5': 'Huanggang Marathon finisher certificate, 2025',
    }
  };

  // ===== 语言状态 =====
  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (e) {}
    // 默认英文
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (lang !== 'zh' && lang !== 'en') return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    applyLang(lang);
    // 通知其他页面（同域）
    try {
      var event = new CustomEvent('langchange', { detail: { lang: lang } });
      document.dispatchEvent(event);
    } catch (e) {}
  }

  // ===== 应用翻译 =====
  function applyLang(lang) {
    var t = dict[lang] || dict[DEFAULT_LANG];
    var fallback = dict[DEFAULT_LANG];

    // 1) data-i18n 元素（文本 + HTML）
    var els = document.querySelectorAll('[data-i18n]');
    els.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t[key] !== undefined ? t[key] : (fallback[key] !== undefined ? fallback[key] : key);
      var asHtml = el.hasAttribute('data-i18n-html');
      if (asHtml) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    // 2) data-i18n-attr 属性翻译
    var attrEls = document.querySelectorAll('[data-i18n-attr]');
    attrEls.forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr') || '';
      var pairs = spec.split(',');
      pairs.forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length < 2) return;
        var attr = parts[0].trim();
        var key = parts.slice(1).join(':').trim();
        var val = t[key] !== undefined ? t[key] : (fallback[key] !== undefined ? fallback[key] : key);
        el.setAttribute(attr, val);
      });
    });

    // 3) <title> / meta description
    var titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) {
      var titleVal = t[titleKey] || fallback[titleKey] || titleKey;
      document.title = titleVal;
    }
    var descKey = document.documentElement.getAttribute('data-i18n-desc');
    if (descKey) {
      var descVal = t[descKey] || fallback[descKey] || descKey;
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', descVal);
    }

    // 4) <html lang>
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    // 5) body class 用于 CSS 适配
    document.body.classList.remove('lang-zh', 'lang-en');
    document.body.classList.add('lang-' + lang);

    // 6) 切换按钮状态
    var switches = document.querySelectorAll('[data-lang-toggle]');
    switches.forEach(function (btn) {
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.toggle('active-zh', lang === 'zh');
      btn.classList.toggle('active-en', lang === 'en');
    });
  }

  // ===== 绑定切换按钮 =====
  function bindToggles() {
    var switches = document.querySelectorAll('[data-lang-toggle]');
    switches.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var current = getLang();
        var next = current === 'zh' ? 'en' : 'zh';
        setLang(next);
      });
    });
  }

  // ===== 初始化 =====
  function init() {
    var lang = getLang();
    applyLang(lang);
    bindToggles();
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 暴露给其他脚本
  window.SiteI18n = {
    getLang: getLang,
    setLang: setLang,
    t: function (key) {
      var lang = getLang();
      var d = dict[lang] || dict[DEFAULT_LANG];
      return d[key] || dict[DEFAULT_LANG][key] || key;
    },
    dict: dict
  };
})();
