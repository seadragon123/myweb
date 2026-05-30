import { DoctorInfo, Disease, Treatment, Case, Article, Appointment, Review, ClinicInfo, SiteSettings, User } from '@/types';

// 医生信息
export const doctorInfo: DoctorInfo = {
  id: '1',
  name: '彭海龙医师',
  title: '中医经方专家',
  specialization: ['颈椎病', '腰背痛', '椎间盘突出', '坐骨神经痛', '风湿痛风'],
  introduction: '彭海龙医师，从事中医临床工作20余年，擅长运用中药、针灸、推拿等传统中医疗法治疗颈肩腰腿痛等各类慢性病症。曾在多家三甲医院进修学习，积累了丰富的临床经验。',
  certificates: [
    {
      id: 'c1',
      name: '中医执业医师资格证',
      issuingAuthority: '国家中医药管理局',
      issueDate: '2000-06-15',
      imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E6%89%A7%E4%B8%9A%E5%8C%BB%E5%B8%88%E8%B5%84%E6%A0%BC%E8%AF%81%2C%E8%AF%81%E4%B9%A6%E6%A0%B7%E5%BC%8F%2C%E7%99%BD%E5%BA%95%2C%E6%AD%A3%E5%BC%8F%E6%96%87%E4%BB%B6&sign=c92fab245e28e0d0f7254c267c343002'
    },
    {
      id: 'c2',
      name: '针灸推拿专业高级资格证',
      issuingAuthority: '中国针灸学会',
      issueDate: '2008-10-22',
      imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E9%92%88%E7%81%B8%E6%8E%A8%E6%8B%BF%E4%B8%93%E4%B8%9A%E9%AB%98%E7%BA%A7%E8%B5%84%E6%A0%BC%E8%AF%81%2C%E8%AF%81%E4%B9%A6%E6%A0%B7%E5%BC%8F%2C%E7%99%BD%E5%BA%95%2C%E6%AD%A3%E5%BC%8F%E6%96%87%E4%BB%B6&sign=ee6af4fd1c94fbac5de3e2a4f579cf41'
    }
  ],
  experience: [
    {
      id: 'e1',
      hospital: '北京中医药大学附属医院',
      position: '针灸科主治医师',
      startDate: '2000-07',
      endDate: '2008-06',
      description: '从事针灸临床工作，专注于颈肩腰腿痛的治疗研究'
    },
    {
      id: 'e2',
      hospital: '上海中医研究院',
      position: '推拿科副主任医师',
      startDate: '2008-07',
      endDate: '2015-05',
      description: '从事推拿临床与研究工作，发表相关论文10余篇'
    },
    {
      id: 'e3',
      hospital: '彭氏中医诊所',
      position: '创始人',
      startDate: '2015-06',
      endDate: null,
      description: '创办个人中医诊所，专注于颈肩腰腿痛的中医特色治疗'
    }
  ],
  academicAchievements: [
    {
      id: 'a1',
      title: '针灸治疗颈椎病的临床研究',
      type: 'paper',
      publication: '中国中医药学报',
      date: '2005-03',
      description: '探讨了针灸治疗颈椎病的疗效及机制'
    },
    {
      id: 'a2',
      title: '推拿手法治疗腰椎间盘突出症的疗效观察',
      type: 'paper',
      publication: '中医杂志',
      date: '2010-07',
      description: '分析了不同推拿手法对腰椎间盘突出症的治疗效果'
    },
    {
      id: 'a3',
      title: '中医外治法大全',
      type: 'book',
      publication: '人民卫生出版社',
      date: '2018-05',
      description: '系统介绍了中医外治法在骨伤科疾病中的应用'
    }
  ],
  philosophy: '中医治病，重在整体调理，辨证施治。通过疏通经络、调和气血、平衡阴阳，激发人体自身的 healing 能力，达到标本兼治的目的。'
};

// 专长病症
export const diseases: Disease[] = [
  {
    id: 'd1',
    name: '颈椎病',
    description: '颈椎病是指颈椎间盘退行性变、颈椎肥厚增生以及颈部损伤等引起颈椎骨质增生，或椎间盘脱出、韧带增厚，刺激或压迫颈脊髓、颈部神经、血管而产生一系列症状的临床综合征。',
    causes: '长期低头工作、不良姿势、颈部外伤、风寒湿邪侵袭、肝肾不足等',
    辨证分型: [
      {
        id: 's1',
        name: '风寒湿痹型',
        symptoms: ['颈肩部疼痛，遇寒加重，得温则减', '颈部活动受限', '恶寒怕冷', '舌质淡红，苔薄白', '脉浮紧'],
        pathogenesis: '风寒湿邪侵袭颈部经络，气血运行不畅，不通则痛'
      },
      {
        id: 's2',
        name: '气滞血瘀型',
        symptoms: ['颈肩部刺痛，固定不移', '夜间疼痛加重', '可有肢体麻木', '舌质紫暗，或有瘀斑', '脉弦涩'],
        pathogenesis: '外伤或劳损导致颈部气血瘀滞，经络不通'
      },
      {
        id: 's3',
        name: '肝肾不足型',
        symptoms: ['颈部酸痛，缠绵不愈', '腰膝酸软', '头晕耳鸣', '失眠多梦', '舌红少苔，脉细数'],
        pathogenesis: '肝肾亏虚，筋骨失养，颈部筋骨退变'
      }
    ],
    treatments: [
      {
        id: 't1',
        name: '针灸治疗',
        description: '通过针刺特定穴位，疏通经络，调和气血，缓解疼痛',
        steps: [
          '取穴：风池、天柱、颈夹脊、肩井、曲池、合谷',
          '毫针刺法，平补平泻',
          '留针20-30分钟',
          '每日或隔日一次，10次为一疗程'
        ],
        imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E9%92%88%E7%81%B8%E6%B2%BB%E7%96%97%E9%A2%88%E6%A4%8E%E7%97%85%2C%E5%8C%BB%E7%94%9F%E4%B8%BA%E6%82%A3%E8%80%85%E9%92%88%E7%81%B8%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83%2C%E6%B8%85%E6%99%B0%E5%B1%95%E7%A4%BA%E7%A9%B4%E4%BD%8D&sign=487e864b4ed5617a2f95ef8a7e77a480'
      },
      {
        id: 't2',
        name: '推拿手法',
        description: '运用特定手法，放松颈部肌肉，调整颈椎关节，改善局部血液循环',
        steps: [
          '放松手法：滚法、揉法放松颈肩部肌肉',
          '点穴：按揉风池、天柱、肩井等穴位',
          '整复手法：颈椎斜扳法、旋转复位法',
          '结束手法：拿捏、拍打颈肩部'
        ],
        imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E6%8E%A8%E6%8B%BF%E6%B2%BB%E7%96%97%E9%A2%88%E6%A4%8E%E7%97%85%2C%E5%8C%BB%E7%94%9F%E4%B8%BA%E6%82%A3%E8%80%85%E6%8E%A8%E6%8B%BF%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83&sign=b80d0296d4e88ad4c78d57667cf81452'
      },
      {
        id: 't3',
        name: '中药内服',
        description: '根据辨证分型，给予相应中药方剂内服治疗',
        steps: [
          '风寒湿痹型：羌活胜湿汤加减',
          '气滞血瘀型：血府逐瘀汤加减',
          '肝肾不足型：六味地黄丸加减',
          '每日一剂，水煎服，分早晚两次服用'
        ]
      }
    ],
    prevention: '避免长期低头工作，注意颈部保暖，选择合适的枕头，适当进行颈部功能锻炼，避免颈部外伤',
    faq: [
      {
        question: '颈椎病能根治吗？',
        answer: '颈椎病是一种退行性疾病，完全根治较为困难，但通过规范治疗和科学保养，可以有效缓解症状，控制病情进展，提高生活质量。'
      },
      {
        question: '颈椎病需要手术吗？',
        answer: '大多数颈椎病患者通过保守治疗（如针灸、推拿、中药等）可以获得满意疗效，只有少数严重病例（如出现明显神经受压症状）才需要考虑手术治疗。'
      }
    ]
  },
  {
    id: 'd2',
    name: '腰背痛',
    description: '腰背痛是指腰背部肌肉、筋膜、韧带、椎间盘等组织的疼痛，是临床常见症状之一',
    causes: '外感寒湿、湿热之邪，跌打损伤，劳损过度，肾虚失养等',
    辨证分型: [
      {
        id: 's4',
        name: '寒湿型',
        symptoms: ['腰部冷痛重着', '转侧不利', '遇寒加重，得温则减', '舌苔白腻', '脉沉紧'],
        pathogenesis: '寒湿之邪侵袭腰部，痹阻经络，气血运行不畅'
      },
      {
        id: 's5',
        name: '湿热型',
        symptoms: ['腰部疼痛，痛处伴有热感', '口苦口黏', '小便短赤', '舌苔黄腻', '脉濡数'],
        pathogenesis: '湿热之邪侵袭腰部，经络受阻，气血不畅'
      },
      {
        id: 's6',
        name: '瘀血型',
        symptoms: ['腰部刺痛，固定不移', '夜间加重', '舌质紫暗，或有瘀斑', '脉涩'],
        pathogenesis: '外伤或劳损导致瘀血内停，经络不通'
      },
      {
        id: 's7',
        name: '肾虚型',
        symptoms: ['腰部酸痛，缠绵不愈', '喜按喜揉', '腰膝酸软', '神疲乏力', '脉沉细'],
        pathogenesis: '肝肾亏虚，腰府失养'
      }
    ],
    treatments: [
      {
        id: 't4',
        name: '中药方剂',
        description: '根据辨证分型，给予相应中药方剂治疗',
        steps: [
          '寒湿型：独活寄生汤加减',
          '湿热型：四妙散加减',
          '瘀血型：身痛逐瘀汤加减',
          '肾虚型：六味地黄丸或金匮肾气丸加减'
        ]
      },
      {
        id: 't5',
        name: '针灸治疗',
        description: '针刺特定穴位，疏通经络，调和气血',
        steps: [
          '取穴：肾俞、大肠俞、委中、阿是穴',
          '根据证型加减穴位',
          '留针20-30分钟',
          '每日或隔日一次'
        ]
      }
    ],
    prevention: '注意腰部保暖，避免久坐久站，适当进行腰背肌锻炼，避免腰部外伤',
    faq: [
      {
        question: '腰痛应该多躺还是多活动？',
        answer: '急性腰痛期应适当休息，避免剧烈活动；缓解期应适当进行腰背肌功能锻炼，增强腰部稳定性，预防复发。'
      },
      {
        question: '肾虚腰痛有什么食疗方？',
        answer: '肾虚腰痛可食用核桃、黑芝麻、枸杞、山药等补肾食物，也可食用杜仲黑豆炖猪腰等食疗方。'
      }
    ]
  },
  {
    id: 'd3',
    name: '椎间盘突出',
    description: '椎间盘突出是指椎间盘的纤维环破裂，髓核组织突出或脱出，压迫神经根或脊髓，引起疼痛、麻木等症状',
    causes: '椎间盘退变，外伤，劳损，妊娠，遗传因素等',
    辨证分型: [
      {
        id: 's8',
        name: '气滞血瘀型',
        symptoms: ['腰腿刺痛', '痛有定处', '日轻夜重', '舌质紫暗', '脉弦涩'],
        pathogenesis: '外伤或劳损导致气血瘀滞，经络不通'
      },
      {
        id: 's9',
        name: '肝肾亏虚型',
        symptoms: ['腰腿酸痛，缠绵不愈', '腰膝酸软', '劳累后加重', '脉沉细'],
        pathogenesis: '肝肾亏虚，筋骨失养'
      },
      {
        id: 's10',
        name: '风寒湿痹型',
        symptoms: ['腰腿冷痛', '遇寒加重', '得温则减', '舌苔白腻', '脉沉紧'],
        pathogenesis: '风寒湿邪侵袭，痹阻经络'
      }
    ],
    treatments: [
      {
        id: 't6',
        name: '牵引治疗',
        description: '通过牵引装置，增加椎间隙宽度，减轻椎间盘压力',
        steps: [
          '患者取仰卧位',
          '设置适当牵引重量和时间',
          '每日一次，每次20-30分钟',
          '10次为一疗程'
        ]
      },
      {
        id: 't7',
        name: '针灸推拿',
        description: '针刺穴位配合推拿手法，缓解疼痛，改善症状',
        steps: [
          '针灸取穴：肾俞、大肠俞、环跳、委中、阳陵泉',
          '推拿手法：滚法、揉法、按法、斜扳法等',
          '每周2-3次'
        ]
      }
    ],
    prevention: '保持正确坐姿和站姿，避免长时间弯腰负重，加强腰背肌锻炼，控制体重',
    faq: [
      {
        question: '椎间盘突出能复位吗？',
        answer: '椎间盘突出后很难完全复位，但通过牵引、推拿等治疗，可以改变突出物与神经根的相对位置，减轻压迫，缓解症状。'
      },
      {
        question: '椎间盘突出患者可以运动吗？',
        answer: '椎间盘突出患者在急性发作期应休息，缓解期可适当进行游泳、小燕飞等对腰椎压力小的运动，增强腰背肌力量。'
      }
    ]
  },
  {
    id: 'd4',
    name: '坐骨神经痛',
    description: '坐骨神经痛是指沿坐骨神经分布区域，以臀部、大腿后侧、小腿后外侧，足背外侧为主的放射性疼痛。属中医"痹证"、"腰腿痛"范畴，主要因风寒湿邪侵袭、跌扑闪挫或劳损导致经络气血运行不畅，"不通则痛"。',
    causes: '风寒湿邪侵袭、跌扑闪挫、长期劳损、肝肾亏虚等',
    辨证分型: [
      {
        id: 's11',
        name: '寒湿型',
        symptoms: ['腰腿冷痛重着，遇寒加重，得温则减', '转侧不利', '恶寒怕冷', '舌质淡红，苔薄白', '脉浮紧'],
        pathogenesis: '风寒湿邪侵袭腰部经络，气血运行不畅，不通则痛'
      },
      {
        id: 's12',
        name: '血瘀型',
        symptoms: ['痛如针刺，痛处固定，夜间加重', '可有肢体麻木', '舌质紫暗，或有瘀斑', '脉弦涩'],
        pathogenesis: '外伤或劳损导致腰部气血瘀滞，经络不通'
      },
      {
        id: 's13',
        name: '肝肾亏虚型',
        symptoms: ['颈部酸痛，缠绵不愈', '腰膝酸软', '头晕耳鸣', '失眠多梦', '舌红少苔，脉细数'],
        pathogenesis: '肝肾亏虚，筋骨失养，颈部筋骨退变'
      }
    ],
    treatments: [
      {
        id: 't8',
        name: '针灸治疗',
        description: '通过针刺特定穴位，疏通经络，调和气血，缓解疼痛',
        steps: [
          '主穴：环跳、委中、阳陵泉、昆仑',
          '配穴：寒湿型加肾俞、命门；血瘀型加膈俞、血海；肝肾亏虚型加肝俞、太溪',
          '操作：毫针泻法，寒湿型可加灸，留针20-30分钟',
          '每日1次，10次为1疗程'
        ],
        imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E9%92%88%E7%81%B8%E6%B2%BB%E7%96%97%E9%A2%88%E6%A4%8E%E7%97%85%2C%E5%8C%BB%E7%94%9F%E4%B8%BA%E6%82%A3%E8%80%85%E9%92%88%E7%81%B8%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83%2C%E6%B8%85%E6%99%B0%E5%B1%95%E7%A4%BA%E7%A9%B4%E4%BD%8D&sign=487e864b4ed5617a2f95ef8a7e77a480'
      },
      {
        id: 't9',
        name: '推拿疗法',
        description: '运用特定手法，放松颈部肌肉，调整颈椎关节，改善局部血液循环',
        steps: [
          '放松手法：滚法、揉法放松颈肩部肌肉',
          '点穴：按揉风池、天柱、肩井等穴位',
          '整复手法：颈椎斜扳法、旋转复位法',
          '结束手法：拿捏、拍打颈肩部'
        ],
        imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E6%8E%A8%E6%8B%BF%E6%B2%BB%E7%96%97%E9%A2%88%E6%A4%8E%E7%97%85%2C%E5%8C%BB%E7%94%9F%E4%B8%BA%E6%82%A3%E8%80%85%E6%8E%A8%E6%8B%BF%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83&sign=b80d0296d4e88ad4c78d57667cf81452'
      },
      {
        id: 't10',
        name: '中药内服',
        description: '根据辨证分型，给予相应中药方剂内服治疗',
        steps: [
          '寒湿型：独活寄生汤加减',
          '血瘀型：血府逐瘀汤加减',
          '肝肾不足型：六味地黄丸加减',
          '每日一剂，水煎服，分早晚两次服用'
        ]
      }
    ],
    prevention: '注意腰部保暖，避免久坐久站，适当进行腰背肌锻炼，避免腰部外伤',
    faq: [
      {
        question: '坐骨神经痛能根治吗？',
        answer: '坐骨神经痛通过规范治疗和科学保养，可以有效缓解症状，控制病情进展，提高生活质量。部分患者可达到临床治愈。'
      },
      {
        question: '坐骨神经痛患者日常需要注意什么？',
        answer: '避免长时间保持同一姿势，注意腰部保暖，选择合适的床垫，适当进行康复锻炼，避免剧烈运动和负重。'
      }
    ]
  },
  {
    id: 'd5',
    name: '风湿痛风',
    description: '风湿痛风属中医"痹证"、"痛风"范畴，是由于嘌呤代谢紊乱或尿酸排泄减少导致血尿酸升高，尿酸盐结晶沉积在关节及周围组织引起的疾病。中医认为多由外感湿热之邪、饮食不节、情志失调、劳逸过度等因素所致。',
    causes: '外感湿热、饮食不节、情志失调、劳逸过度、先天不足等',
    辨证分型: [
      {
        id: 's14',
        name: '湿热蕴结型',
        symptoms: ['关节红肿热痛，疼痛剧烈，触之加剧', '口渴喜饮，心烦不安', '小便黄赤，大便干结', '舌质红，苔黄腻', '脉滑数'],
        pathogenesis: '湿热之邪侵袭人体，流注关节，气血运行不畅'
      },
      {
        id: 's15',
        name: '痰瘀痹阻型',
        symptoms: ['关节肿胀变形，疼痛固定不移', '肌肤麻木不仁', '舌质紫暗或有瘀斑，苔白腻', '脉弦涩'],
        pathogenesis: '病程日久，气血运行不畅，痰瘀互结，痹阻经络'
      },
      {
        id: 's16',
        name: '肝肾亏虚型',
        symptoms: ['关节疼痛反复发作，日久不愈', '腰膝酸软，头晕耳鸣', '神疲乏力，面色无华', '舌淡苔白，脉沉细弱'],
        pathogenesis: '久病体虚，肝肾亏虚，筋骨失养'
      }
    ],
    treatments: [
      {
        id: 't11',
        name: '中药治疗',
        description: '根据辨证分型，给予清热利湿、化痰逐瘀、补益肝肾等中药治疗',
        steps: [
          '湿热蕴结型：四妙散加减（苍术、黄柏、薏苡仁、牛膝）',
          '痰瘀痹阻型：双合汤加减（桃仁、红花、当归、川芎、白芍）',
          '肝肾亏虚型：独活寄生汤加减（独活、桑寄生、杜仲、牛膝）',
          '每日一剂，水煎服，分早晚两次服用'
        ],
        imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E8%8D%AF%E6%B1%A4%E5%89%82%2C%E7%A0%82%E9%94%85%2C%E4%B8%AD%E8%8D%AF%E6%9D%90%2C%E4%BC%A0%E7%BB%9F%E4%B8%AD%E5%8C%BB&sign=0c26e31aa46dcc4f3abbf8db1fcdafc7'
      },
      {
        id: 't12',
        name: '针灸治疗',
        description: '通过针刺特定穴位，疏通经络，调和气血，缓解疼痛',
        steps: [
          '主穴：足三里、阴陵泉、三阴交、阿是穴',
          '配穴：湿热蕴结加曲池、合谷；痰瘀痹阻加膈俞、血海；肝肾亏虚加肝俞、肾俞',
          '操作：毫针泻法，留针20-30分钟',
          '每日1次，10次为1疗程'
        ],
        imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E9%92%88%E7%81%B8%E6%B2%BB%E7%96%97%E9%A2%88%E6%A4%8E%E7%97%85%2C%E5%8C%BB%E7%94%9F%E4%B8%BA%E6%82%A3%E8%80%85%E9%92%88%E7%81%B8%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83%2C%E6%B8%85%E6%99%B0%E5%B1%95%E7%A4%BA%E7%A9%B4%E4%BD%8D&sign=487e864b4ed5617a2f95ef8a7e77a480'
      },
      {
        id: 't13',
        name: '穴位贴敷',
        description: '将中药加工成适当剂型，敷于体表特定部位，通过皮肤吸收达到治疗目的',
        steps: [
          '药物制备：将中药研末，用适当溶媒调成糊状',
          '贴敷部位：阿是穴、肾俞、足三里、三阴交',
          '贴敷时间：每次4-6小时，每日1次',
          '10次为1疗程'
        ],
        imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E7%A9%B4%E4%BD%8D%E8%B4%B4%E6%95%B7%E6%B2%BB%E7%96%97%2C%E4%B8%AD%E8%8D%AF%E8%B4%B4%E6%95%B7%E5%9C%A8%E7%A9%B4%E4%BD%8D%E4%B8%8A%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83&sign=e5b1c78723eb8867618e4dcf365dc337'
      }
    ],
    prevention: '控制饮食，避免高嘌呤食物，限制饮酒，多饮水，适当运动，保持良好心态，避免过度劳累和精神紧张',
    faq: [
      {
        question: '痛风患者能吃豆制品吗？',
        answer: '痛风患者可以适量食用豆制品。研究表明，豆制品不会明显增加血尿酸水平，反而可能有一定的保护作用。但需注意适量食用，避免过量。'
      },
      {
        question: '中医治疗痛风有什么优势？',
        answer: '中医治疗痛风注重整体调理，辨证施治，不仅能缓解急性发作期症状，还能改善体质，降低复发率，减少西药副作用，提高生活质量。'
      }
    ]
  }
];

// 治疗方法
export const treatmentMethods: Treatment[] = [
  {
    id: 'tm1',
    name: '针灸',
    description: '针灸是通过针刺人体穴位，调节气血，疏通经络，达到治疗疾病的目的',
    steps: [
      '辨证取穴：根据病情选择合适的穴位',
      '消毒：穴位局部皮肤消毒',
      '进针：采用适当的进针方法和角度',
      '行针：运用提插、捻转等手法得气',
      '留针：根据病情留针15-30分钟',
      '出针：消毒后缓慢出针，按压针孔'
    ],
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E9%92%88%E7%81%B8%E6%B2%BB%E7%96%97%2C%E9%93%B6%E9%92%88%2C%E7%A9%B4%E4%BD%8D%E5%9B%BE%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83&sign=7901c10643c2140cd71ae9a710778053'
  },
  {
    id: 'tm2',
    name: '推拿',
    description: '推拿是运用手法作用于人体体表特定部位，以调节机体生理、病理状况，达到治疗目的',
    steps: [
      '放松手法：滚法、揉法、拿法等放松肌肉',
      '点穴：按压特定穴位，疏通经络',
      '整复手法：根据病情采用适当的整复手法',
      '结束手法：轻揉、拍打等舒缓手法'
    ],
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E6%8E%A8%E6%8B%BF%E6%B2%BB%E7%96%97%2C%E5%8C%BB%E7%94%9F%E4%B8%BA%E6%82%A3%E8%80%85%E6%8E%A8%E6%8B%BF%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83&sign=01541d05be3b4e0205d97a38c838f50d'
  },
  {
    id: 'tm3',
    name: '中药内服',
    description: '根据辨证论治原则，开具中药方剂，通过口服达到治疗目的',
    steps: [
      '辨证：根据四诊资料进行辨证',
      '立法处方：根据辨证结果确定治疗法则，开具方剂',
      '中药煎煮：将中药加水浸泡后煎煮',
      '服用：每日一剂，分早晚两次服用'
    ],
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E8%8D%AF%E6%B1%A4%E5%89%82%2C%E7%A0%82%E9%94%85%2C%E4%B8%AD%E8%8D%AF%E6%9D%90%2C%E4%BC%A0%E7%BB%9F%E4%B8%AD%E5%8C%BB&sign=0c26e31aa46dcc4f3abbf8db1fcdafc7'
  },
  {
    id: 'tm4',
    name: '中药外敷',
    description: '将中药加工成适当剂型，敷于体表特定部位，通过皮肤吸收达到治疗目的',
    steps: [
      '药物制备：将中药研末，用适当溶媒调成糊状',
      '局部清洁：清洁敷药部位皮肤',
      '敷药：将药膏均匀敷于患处',
      '固定：用纱布或胶布固定',
      '换药：根据病情每日或隔日换药一次'
    ],
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E8%8D%AF%E5%A4%96%E6%95%B7%E6%B2%BB%E7%96%97%2C%E4%B8%AD%E8%8D%AF%E8%8D%AF%E8%86%8F%E6%95%B7%E5%9C%A8%E6%82%A3%E8%80%85%E9%A2%88%E9%83%A8%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83&sign=65db6d7ee31f4434467be8ddc0c0d32d'
  },
  {
    id: 'tm5',
    name: '穴位贴敷',
    description: '将特制的中药敷贴于特定穴位，通过穴位刺激和药物作用治疗疾病',
    steps: [
      '选择穴位：根据病情选择合适的穴位',
      '穴位清洁：清洁穴位皮肤',
      '贴敷：将中药贴敷于穴位上',
      '固定：用胶布固定',
      '贴敷时间：根据药物特性和患者反应确定贴敷时间'
    ],
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E7%A9%B4%E4%BD%8D%E8%B4%B4%E6%95%B7%E6%B2%BB%E7%96%97%2C%E4%B8%AD%E8%8D%AF%E8%B4%B4%E6%95%B7%E5%9C%A8%E7%A9%B4%E4%BD%8D%E4%B8%8A%2C%E4%B8%93%E4%B8%9A%E5%8C%BB%E7%96%97%E7%8E%AF%E5%A2%83&sign=e5b1c78723eb8867618e4dcf365dc337'
  }
];

// 康复案例
export const cases: Case[] = [
  {
    id: 'case1',
    patientName: '李先生',
    patientAge: 45,
    gender: 'male',
    disease: '颈椎病',
    symptoms: '颈部疼痛伴右上肢麻木3个月，转头受限，夜间疼痛影响睡眠',
    treatmentPlan: '针灸+推拿+中药内服，每周3次，配合颈椎功能锻炼',
    treatmentPeriod: '1个月',
    effect: '颈部疼痛明显减轻，上肢麻木消失，颈部活动恢复正常',
    beforeImageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E9%A2%88%E6%A4%8E%E7%97%85%E6%82%A3%E8%80%85%E6%B2%BB%E7%96%97%E5%89%8D%2CX%E5%85%89%E7%89%87%E6%98%BE%E7%A4%BA%E9%A2%88%E6%A4%8E%E7%94%9F%E7%90%86%E6%9B%B2%E5%BA%A6%E5%8F%98%E7%9B%B4&sign=eb1b01d77315aefaf48233d425064b4b',
    afterImageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E9%A2%88%E6%A4%8E%E7%97%85%E6%82%A3%E8%80%85%E6%B2%BB%E7%96%97%E5%90%8E%2CX%E5%85%89%E7%89%87%E6%98%BE%E7%A4%BA%E9%A2%88%E6%A4%8E%E7%94%9F%E7%90%86%E6%9B%B2%E5%BA%A6%E6%94%B9%E5%96%84&sign=56c22662ccccbe7e260cce60a519df34',
    testimonial: '治疗效果非常好，之前的疼痛和麻木让我无法正常工作，现在已经基本恢复，可以正常生活和工作了。',
    date: '2024-03-15'
  },
  {
    id: 'case2',
    patientName: '王女士',
    patientAge: 38,
    gender: 'female',
    disease: '腰椎间盘突出',
    symptoms: '腰痛伴左下肢放射痛2周，弯腰困难，行走受限',
    treatmentPlan: '牵引+针灸+中药外敷，配合卧床休息',
    treatmentPeriod: '3周',
    effect: '腰痛和下肢放射痛明显缓解，可正常行走和弯腰',
    testimonial: '治疗前连走路都困难，经过彭医生的治疗，现在已经基本恢复，非常感谢张医生的精心治疗。',
    date: '2024-04-20'
  },
  {
    id: 'case3',
    patientName: '张先生',
    patientAge: 52,
    gender: 'male',
    disease: '慢性腰背痛',
    symptoms: '腰部酸痛反复发作5年，劳累后加重，休息后减轻',
    treatmentPlan: '推拿+中药内服+艾灸，配合腰背肌功能锻炼',
    treatmentPeriod: '2个月',
    effect: '腰痛明显减轻，发作频率减少，腰部力量增强',
    testimonial: '我的腰痛多年，尝试过很多方法效果都不好，经过彭医生的系统治疗，现在腰痛明显好转，生活质量大大提高。',
    date: '2024-05-10'
  }
];

// 健康科普文章
export const articles: Article[] = [
  {
    id: 'a1',
    title: '颈椎保健操，远离颈椎病',
    category: '养生保健',
    summary: '介绍简单有效的颈椎保健操，帮助预防和缓解颈椎病',
    content: '颈椎保健操是预防和缓解颈椎病的有效方法，以下为您介绍一套简单易行的颈椎保健操：\n1. 颈部前屈后伸：缓慢前屈，下巴尽量贴近胸部，然后缓慢后伸，抬头望天，各保持5秒，重复10次。\n2. 颈部左右侧屈：头部缓慢向左侧屈，左耳尽量贴近左肩，然后右侧屈，右耳尽量贴近右肩，各保持5秒，重复10次。\n3. 颈部左右旋转：头部缓慢向左旋转，目光尽量看向左后方，然后向右旋转，目光尽量看向右后方，各保持5秒，重复10次。\n4. 耸肩运动：双肩缓慢向上耸起，然后缓慢放下，重复10次。\n5. 扩胸运动：双臂打开，然后缓慢向后扩展，感受背部肌肉拉伸，重复10次。\n\n注意事项：动作要缓慢柔和，避免剧烈运动；如有不适，应立即停止；每天坚持练习，效果更佳。',
    author: '彭医师',
    publishDate: '2024-01-15',
    readCount: 2356,
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E9%A2%88%E6%A4%8E%E4%BF%9D%E5%81%A5%E6%93%8D%2C%E4%BA%BA%E7%89%A9%E6%BC%94%E7%A4%BA%E9%A2%88%E6%A4%8E%E8%BF%90%E5%8A%A8%2C%E6%B8%85%E6%99%B0%E5%8A%A8%E4%BD%9C%E6%8C%87%E5%AF%BC&sign=02b543c65a258944dee754b040f4a132',
    tags: ['颈椎病', '保健操', '养生']
  },
  {
    id: 'a2',
    title: '中医食疗方，缓解腰背痛',
    category: '食疗养生',
    summary: '介绍几款缓解腰背痛的中医食疗方，简单易做，效果显著',
    content: '腰背痛是常见的健康问题，除了针灸、推拿等治疗方法外，中医食疗也有很好的辅助治疗作用。以下为您介绍几款缓解腰背痛的食疗方：\n1. 杜仲黑豆炖猪腰：杜仲15克，黑豆30克，猪腰1个。将猪腰洗净切块，与杜仲、黑豆一同放入砂锅中，加水适量，大火烧开后转小火炖1小时，加盐调味即可。具有补肾强腰的作用，适用于肾虚腰痛。\n2. 独活寄生汤：独活10克，桑寄生15克，杜仲10克，牛膝10克，细辛3克，秦艽10克，茯苓15克，肉桂5克，防风10克，川芎10克，人参10克，甘草5克，当归10克，芍药10克，干地黄15克，猪瘦肉200克。将上述药材用纱布包好，与猪瘦肉一同放入砂锅中，加水适量，大火烧开后转小火炖2小时，加盐调味即可。具有祛风湿、止痹痛、益肝肾、补气血的作用，适用于风寒湿痹所致的腰背痛。\n3. 山药枸杞粥：山药30克，枸杞15克，粳米100克。将山药去皮切块，与枸杞、粳米一同放入锅中，加水适量，煮成粥即可。具有补肝肾、强筋骨的作用，适用于肝肾不足所致的腰背痛。\n\n以上食疗方仅供参考，具体食用应根据个人体质和病情，在医生指导下进行。',
    author: '彭医师',
    publishDate: '2024-02-20',
    readCount: 1876,
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E9%A3%9F%E7%96%97%2C%E8%8D%AF%E8%86%B3%2C%E7%BC%93%E8%A7%A3%E8%85%B0%E8%83%8C%E7%97%9B%E7%9A%84%E9%A3%9F%E7%89%A9%2C%E5%81%A5%E5%BA%B7%E9%A5%AE%E9%A3%9F&sign=0153af233cf51d7e850a625bd4d4ad89',
    tags: ['腰背痛', '食疗', '中医养生']
  },
  {
    id: 'a3',
    title: '办公室人群如何预防颈肩腰腿痛',
    category: '健康指南',
    summary: '针对办公室人群，介绍预防颈肩腰腿痛的实用方法',
    content: '办公室人群由于长期久坐、缺乏运动，容易出现颈肩腰腿痛等问题。以下为您介绍一些实用的预防方法：\n1. 保持正确坐姿：背部挺直，腰部有支撑，双脚平放在地面，电脑屏幕与眼睛平齐或略低。\n2. 定时起身活动：每工作1小时，起身活动5-10分钟，做简单的伸展运动。\n3. 调整办公环境：选择符合人体工学的座椅和办公桌，调整电脑屏幕高度和距离。\n4. 加强锻炼：下班后进行适当的体育锻炼，如游泳、瑜伽、快走等，增强颈肩腰背部肌肉力量。\n5. 注意保暖：避免空调直吹颈肩腰部，注意保暖，防止风寒湿邪侵袭。\n6. 选择合适的枕头：睡眠时选择高度适中、软硬适度的枕头，保持颈椎自然生理曲度。\n7. 控制体重：避免肥胖，减轻腰部负担。\n8. 养成良好生活习惯：避免长时间低头看手机，避免久坐久站，避免过度劳累。\n\n通过以上方法，可以有效预防办公室颈肩腰腿痛的发生。如出现明显不适，应及时就医。',
    author: '彭医师',
    publishDate: '2024-03-05',
    readCount: 3245,
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%8A%9E%E5%85%AC%E5%AE%A4%E5%81%A5%E5%BA%B7%2C%E6%AD%A3%E7%A1%AE%E5%9D%90%E5%A7%BF%2C%E9%A2%84%E9%98%B2%E9%A2%88%E8%82%A9%E8%85%B0%E8%85%BF%E7%97%9B%2C%E5%8A%9E%E5%85%AC%E7%8E%AF%E5%A2%83&sign=6661cdc2f3c5179136061efab97bf5f7',
    tags: ['办公室健康', '颈肩腰腿痛', '预防']
  }
];

// 预约
export const appointments: Appointment[] = [
  {
    id: 'ap1',
    patientName: '陈先生',
    phone: '13800138000',
    diseaseDescription: '颈部疼痛，转头困难',
    appointmentDate: '2024-06-10',
    appointmentTime: '09:30',
    status: 'confirmed',
    createdAt: '2024-06-05T14:30:00',
    notes: '希望进行针灸治疗'
  },
  {
    id: 'ap2',
    patientName: '刘女士',
    phone: '13900139000',
    diseaseDescription: '腰痛伴右下肢麻木',
    appointmentDate: '2024-06-10',
    appointmentTime: '10:30',
    status: 'confirmed',
    createdAt: '2024-06-06T09:15:00'
  },
  {
    id: 'ap3',
    patientName: '王先生',
    phone: '13700137000',
    diseaseDescription: '慢性腰背痛复发',
    appointmentDate: '2024-06-11',
    appointmentTime: '14:00',
    status: 'pending',
    createdAt: '2024-06-08T16:45:00'
  }
];

// 评价
export const reviews: Review[] = [
  {
    id: 'r1',
    patientName: '张女士',
    disease: '颈椎病',
    treatmentPeriod: '1个月',
    rating: {
      effectiveness: 5,
      serviceAttitude: 5,
      environment: 4
    },
    content: '彭医生治疗颈椎病的效果非常好，我的脖子疼了半年多，经过一个月的针灸推拿治疗，现在基本不痛了，活动也灵活多了。张医生态度和蔼，耐心细致，非常感谢！',
    date: '2024-04-15',
    status: 'approved',
    reply: '感谢您的信任和好评，祝您健康！',
    replyDate: '2024-04-16'
  },
  {
    id: 'r2',
    patientName: '李先生',
    disease: '腰椎间盘突出',
    treatmentPeriod: '3周',
    rating: {
      effectiveness: 4,
      serviceAttitude: 5,
      environment: 5
    },
    content: '彭医生治疗腰椎间盘突出的技术很好，我的腰痛和腿痛经过治疗明显缓解，现在可以正常走路了。诊所环境干净整洁，服务态度好，值得推荐！',
    date: '2024-05-02',
    status: 'approved',
    reply: '感谢您的好评，建议您继续坚持功能锻炼，巩固治疗效果。',
    replyDate: '2024-05-03'
  },
  {
    id: 'r3',
    patientName: '王先生',
    disease: '慢性腰背痛',
    treatmentPeriod: '2个月',
    rating: {
      effectiveness: 5,
      serviceAttitude: 5,
      environment: 5
    },
    content: '我的慢性腰背痛多年，尝试过很多方法效果都不理想，经过彭医生的系统治疗，现在腰痛明显好转，生活质量大大提高。张医生不仅医术精湛，而且耐心解答我的各种问题，非常感谢！',
    date: '2024-06-05',
    status: 'approved',
    reply: '感谢您的认可，祝您身体健康！',
    replyDate: '2024-06-06'
  }
];

// 诊所信息
export const clinicInfo: ClinicInfo = {
  name: '彭氏中医诊所',
  address: '湖南省衡阳市白云路中心医院傍',
  phone: '16670957610',
  email: 'phl0@163.com',
  businessHours: {
    monday: '09:00-17:30',
    tuesday: '09:00-17:30',
    wednesday: '09:00-17:30',
    thursday: '09:00-17:30',
    friday: '09:00-17:30',
    saturday: '休息',
    sunday: '休息'
  },
  wechatQrCode: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81%2C%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80%2C%E7%AE%80%E7%BA%A6%E8%AE%BE%E8%AE%A1&sign=153e1296bfd46c1b5e7702617d3173e5',
  mapLocation: {
    latitude: 39.908823,
    longitude: 116.397470
  }
};

// 网站设置
export const siteSettings: SiteSettings = {
  siteName: '彭医师中医诊所',
  logoUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80logo%2C%E7%BB%BF%E8%89%B2%E5%92%8C%E6%A3%95%E8%89%B2%E4%B8%BA%E4%B8%BB%E8%89%B2%E8%B0%83%2C%E5%8C%85%E5%90%AB%E4%B8%AD%E5%8C%BB%E5%85%83%E7%B4%A0&sign=1ddca83a5ad285e2aa3f6cf4953e089b',
  faviconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80favicon%2C%E7%AE%80%E7%BA%A6%E8%AE%BE%E8%AE%A1%2C%E7%BB%BF%E8%89%B2&sign=48a8755a2f286e16a76ad6f5e496a815',
  seo: {
    title: '彭医师中医诊所 - 专业治疗颈椎病、腰背痛、椎间盘突出',
    description: '彭医师中医诊所专注于颈椎病、腰背痛、椎间盘突出等颈肩腰腿痛的中医治疗，采用针灸、推拿、中药等传统中医疗法，疗效显著。',
    keywords: ['中医', '针灸', '推拿', '颈椎病', '腰背痛', '椎间盘突出', '中医治疗']
  },
  contactEmail: 'info@zhangclinic.com',
  copyright: '© 2025 彭医师中医诊所 版权所有'
};

// 管理员用户
export const adminUser: User = {
  id: 'u1',
  username: 'admin',
  password: 'admin123', // 模拟密码，实际应用中应加密存储
  role: 'admin',
  lastLogin: '2024-06-08T09:30:00'
};

// 可预约时间段
export const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

// 病症自测问题
export const selfDiagnosisQuestions = [
  {
    id: 'q1',
    question: '您的主要疼痛部位是哪里？',
    options: [
      { id: 'q1a1', text: '颈部', value: 'neck' },
      { id: 'q1a2', text: '肩部', value: 'shoulder' },
      { id: 'q1a3', text: '腰部', value: 'waist' },
      { id: 'q1a4', text: '腿部', value: 'leg' },
      { id: 'q1a5', text: '多个部位', value: 'multiple' }
    ]
  },
  {
    id: 'q2',
    question: '疼痛性质是什么？',
    options: [
      { id: 'q2a1', text: '酸痛', value: 'soreness' },
      { id: 'q2a2', text: '刺痛', value: 'stabbing' },
      { id: 'q2a3', text: '胀痛', value: 'swelling' },
      { id: 'q2a4', text: '冷痛', value: 'cold' },
      { id: 'q2a5', text: '热痛', value: 'hot' }
    ]
  },
  {
    id: 'q3',
    question: '疼痛在什么情况下加重？',
    options: [
      { id: 'q3a1', text: '受凉', value: 'cold' },
      { id: 'q3a2', text: '劳累', value: 'tired' },
      { id: 'q3a3', text: '久坐', value: 'sitting' },
      { id: 'q3a4', text: '弯腰', value: 'bending' },
      { id: 'q3a5', text: '活动', value: 'activity' }
    ]
  },
  {
    id: 'q4',
    question: '疼痛在什么情况下减轻？',
    options: [
      { id: 'q4a1', text: '热敷', value: 'hot_compress' },
      { id: 'q4a2', text: '休息', value: 'rest' },
      { id: 'q4a3', text: '按摩', value: 'massage' },
      { id: 'q4a4', text: '活动', value: 'activity' },
      { id: 'q4a5', text: '服药', value: 'medicine' }
    ]
  },
  {
    id: 'q5',
    question: '是否伴有其他症状？',
    options: [
      { id: 'q5a1', text: '肢体麻木', value: 'numbness' },
      { id: 'q5a2', text: '头晕头痛', value: 'dizziness' },
      { id: 'q5a3', text: '腰膝酸软', value: 'weakness' },
      { id: 'q5a4', text: '关节僵硬', value: 'stiffness' },
      { id: 'q5a5', text: '无其他症状', value: 'none' }
    ]
  }
];