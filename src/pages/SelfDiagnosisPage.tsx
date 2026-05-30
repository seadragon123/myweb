import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// 定义五种病症的特异性症状和辨证规则
const diseaseConfig = {
  "颈椎病": {
    mainSymptoms: [
      "颈部疼痛", "颈部僵硬", "上肢麻木", "头晕头痛", "颈部活动受限"
    ],
    secondarySymptoms: [
      "恶心呕吐", "视物模糊", "耳鸣", "手指麻木", "心悸胸闷"
    ],
    associatedSymptoms: [
      "遇寒加重", "遇热缓解", "晨起加重", "劳累后加重", "活动后减轻"
    ],
    syndromeTypes: {
      "风寒湿痹型": {
        mainSymptoms: ["颈部疼痛", "颈部僵硬"],
        secondarySymptoms: ["遇寒加重"],
        treatment: "建议祛风散寒、除湿通络，可考虑羌活胜湿汤加减。配合针灸治疗，主穴选风池、天柱、颈夹脊等穴位。"
      },
      "气滞血瘀型": {
        mainSymptoms: ["颈部疼痛", "上肢麻木"],
        secondarySymptoms: ["劳累后加重"],
        treatment: "建议活血化瘀、行气止痛，可考虑血府逐瘀汤加减。配合推拿治疗，重点在颈肩部进行按揉和弹拨手法。"
      },
      "肝肾不足型": {
        mainSymptoms: ["颈部疼痛", "头晕头痛"],
        secondarySymptoms: ["晨起加重"],
        treatment: "建议滋补肝肾、强壮筋骨，可考虑六味地黄丸加减。配合艾灸治疗，选取肾俞、肝俞等穴位。"
      }
    }
  },
  "腰背痛": {
    mainSymptoms: [
      "腰部酸痛", "腰部沉重感", "弯腰困难", "腰部刺痛", "活动受限"
    ],
    secondarySymptoms: [
      "腰膝酸软", "畏寒肢冷", "下肢麻木", "小便频数", "遗精带下"
    ],
    associatedSymptoms: [
      "遇寒加重", "遇热缓解", "阴雨天加重", "夜间加重", "活动后减轻"
    ],
    syndromeTypes: {
      "寒湿型": {
        mainSymptoms: ["腰部酸痛", "腰部沉重感"],
        secondarySymptoms: ["遇寒加重", "阴雨天加重"],
        treatment: "建议散寒除湿、温经通络，可考虑甘姜苓术汤加减。配合拔罐治疗，重点在腰阳关、肾俞等穴位。"
      },
      "湿热型": {
        mainSymptoms: ["腰部疼痛", "活动受限"],
        secondarySymptoms: ["遇热缓解"],
        treatment: "建议清热利湿、舒筋止痛，可考虑四妙散加减。配合针灸治疗，选取大肠俞、委中、阴陵泉等穴位。"
      },
      "瘀血型": {
        mainSymptoms: ["腰部刺痛", "弯腰困难"],
        secondarySymptoms: ["夜间加重"],
        treatment: "建议活血化瘀、理气止痛，可考虑身痛逐瘀汤加减。配合推拿治疗，采用按揉和弹拨手法。"
      },
      "肾虚型": {
        mainSymptoms: ["腰部酸痛", "腰膝酸软"],
        secondarySymptoms: ["畏寒肢冷", "小便频数"],
        treatment: "建议补肾壮阳、强筋健骨，可考虑金匮肾气丸加减。配合艾灸治疗，选取命门、肾俞、关元等穴位。"
      }
    }
  },
  "椎间盘突出": {
    mainSymptoms: [
      "腰痛", "下肢放射性疼痛", "腰部活动受限", "弯腰困难", "咳嗽时疼痛加重"
    ],
    secondarySymptoms: [
      "下肢麻木", "肌肉萎缩", "间歇性跛行", "鞍区麻木", "大小便障碍"
    ],
    associatedSymptoms: [
      "卧床减轻", "站立加重", "咳嗽加重", "喷嚏加重", "劳累后加重"
    ],
    syndromeTypes: {
      "气滞血瘀型": {
        mainSymptoms: ["腰痛", "下肢放射性疼痛"],
        secondarySymptoms: ["咳嗽加重"],
        treatment: "建议活血化瘀、行气止痛，可考虑身痛逐瘀汤加减。配合牵引治疗和针灸，选取肾俞、大肠俞、环跳等穴位。"
      },
      "肝肾亏虚型": {
        mainSymptoms: ["腰痛", "下肢麻木"],
        secondarySymptoms: ["劳累后加重"],
        treatment: "建议滋补肝肾、强筋健骨，可考虑独活寄生汤加减。配合推拿和功能锻炼，增强腰背肌力量。"
      }
    }
  },
  "坐骨神经痛": {
    mainSymptoms: [
      "臀部疼痛", "大腿后侧疼痛", "小腿外侧疼痛", "足背麻木", "弯腰困难"
    ],
    secondarySymptoms: [
      "下肢发凉", "夜间加重", "行走困难", "咳嗽时疼痛加重", "翻身困难"
    ],
    associatedSymptoms: [
      "遇寒加重", "遇热减轻", "活动后加重", "休息后减轻", "向下肢放射"
    ],
    syndromeTypes: {
      "寒湿型": {
        mainSymptoms: ["臀部疼痛", "大腿后侧疼痛"],
        secondarySymptoms: ["遇寒加重", "下肢发凉"],
        treatment: "建议散寒除湿、温经通络，可考虑乌头汤加减。配合针灸治疗，主穴取环跳、委中、阳陵泉等穴位。"
      },
      "血瘀型": {
        mainSymptoms: ["臀部疼痛", "向下肢放射"],
        secondarySymptoms: ["夜间加重"],
        treatment: "建议活血化瘀、通络止痛，可考虑桃红四物汤加减。配合推拿和拔罐治疗，缓解肌肉痉挛。"
      },
      "肝肾亏虚型": {
        mainSymptoms: ["臀部疼痛", "足背麻木"],
        secondarySymptoms: ["劳累后加重"],
        treatment: "建议滋补肝肾、强壮筋骨，可考虑左归丸加减。配合艾灸和功能锻炼，增强下肢肌力。"
      }
    }
  },
  "风湿痛风": {
    mainSymptoms: [
      "关节红肿热痛", "关节剧烈疼痛", "关节僵硬", "活动受限", "夜间加重"
    ],
    secondarySymptoms: [
      "发热", "口渴", "心烦", "小便黄赤", "关节畸形"
    ],
    associatedSymptoms: [
      "遇冷缓解", "遇热加重", "饮食不节诱发", "饮酒后加重", "反复发作"
    ],
    syndromeTypes: {
      "湿热蕴结型": {
        mainSymptoms: ["关节红肿热痛", "关节剧烈疼痛"],
        secondarySymptoms: ["发热", "口渴", "小便黄赤"],
        treatment: "建议清热利湿、通络止痛，可考虑四妙散加减。配合针灸治疗，选取阴陵泉、足三里、三阴交等穴位。急性期应卧床休息，抬高患肢。"
      },
      "痰瘀痹阻型": {
        mainSymptoms: ["关节疼痛", "关节畸形"],
        secondarySymptoms: ["反复发作"],
        treatment: "建议化痰逐瘀、通络止痛，可考虑双合汤加减。配合刺络拔罐治疗，促进局部瘀血排出。"
      },
      "肝肾亏虚型": {
        mainSymptoms: ["关节疼痛", "关节僵硬"],
        secondarySymptoms: ["活动受限"],
        treatment: "建议滋补肝肾、强壮筋骨，可考虑独活寄生汤加减。配合推拿和功能锻炼，改善关节功能。"
      }
    }
  }
};

export default function SelfDiagnosisPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState({
    main: [],
    secondary: [],
    associated: []
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从URL参数获取预选择的病症
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const disease = searchParams.get('disease');
    if (disease && Object.keys(diseaseConfig).includes(disease)) {
      setSelectedDisease(disease);
      setCurrentStep(2); // 直接进入症状选择步骤
    }
  }, [location]);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 更新进度条
  useEffect(() => {
    const calculateProgress = () => {
      switch(currentStep) {
        case 1: return 0;
        case 2: return 25;
        case 3: return 50;
        case 4: return 75;
        case 5: return 100;
        default: return 0;
      }
    };
    
    setProgress(calculateProgress());
  }, [currentStep]);

  // 选择症状
  const selectSymptom = (symptom: string, type: 'main' | 'secondary' | 'associated', isMultiple = false) => {
    setSelectedSymptoms(prev => {
      const newState = {...prev};
      
      if (isMultiple) {
        // 多选逻辑
        if (newState[type].includes(symptom)) {
          newState[type] = newState[type].filter(item => item !== symptom);
        } else {
          newState[type] = [...newState[type], symptom];
        }
      } else {
        // 单选逻辑
        newState[type] = [symptom];
      }
      
      return newState;
    });
  };

  // 下一步
  const nextStep = () => {
    if (currentStep === 1 && !selectedDisease) {
      toast.error('请选择要自测的病症');
      return;
    }
    
    if ((currentStep === 2 && selectedSymptoms.main.length === 0) && selectedDisease) {
      toast.error('请至少选择一个主要症状');
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  // 上一步
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // 确定证型
  const determineSyndrome = () => {
    if (!selectedDisease) return { name: "无法确定证型", treatment: "请先选择病症类型" };
    
    const config = diseaseConfig[selectedDisease];
    const allSymptoms = [...selectedSymptoms.main, ...selectedSymptoms.secondary];
    
    // 找出匹配度最高的证型
    let bestMatch = { name: "无法确定具体证型", matchCount: 0, treatment: "建议咨询专业中医师进行详细辨证论治。" };
    
    Object.entries(config.syndromeTypes).forEach(([syndromeName, syndrome]) => {
      let matchCount = 0;
      
      // 检查主症匹配
      syndrome.mainSymptoms.forEach(symptom => {
        if (selectedSymptoms.main.includes(symptom)) {
          matchCount += 2; // 主症匹配权重更高
        }
      });
      
      // 检查次症匹配
      syndrome.secondarySymptoms.forEach(symptom => {
        if (allSymptoms.includes(symptom)) {
          matchCount += 1;
        }
      });
      
      // 更新最佳匹配
      if (matchCount > bestMatch.matchCount) {
        bestMatch = { 
          name: syndromeName, 
          matchCount,
          treatment: syndrome.treatment
        };
      }
    });
    
    return bestMatch;
  };

  // 显示结果
  const showResult = () => {
    const syndrome = determineSyndrome();
    
    // 导航到结果页面
    navigate('/self-diagnosis/result', { 
      state: { 
        disease: selectedDisease,
        selectedSymptoms,
        diagnosisResult: {
          possibleCondition: selectedDisease || "中医辨证",
          possibleSyndrome: syndrome.name || "无法确定具体证型",
          recommendation: syndrome.treatment,
          advice: "以上仅为初步自测结果，具体诊断和治疗方案请咨询医生。建议您预约就诊，进行详细检查和专业治疗。"
        } 
      } 
    });
  };

  // 重新开始测试
  const restartTest = () => {
    setSelectedDisease(null);
    setSelectedSymptoms({
      main: [],
      secondary: [],
      associated: []
    });
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#8B4513] mb-2">中医病症自测系统</h1>
          <p className="text-[#4CAF50]">根据您的症状，初步判断可能的证型</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div 
              className="bg-[#4CAF50] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 步骤1 : 选择病症类型 */}
        <div className={`step ${currentStep === 1 ? 'block' : 'hidden'}`}>
          <h2 className="text-xl font-semibold text-[#8B4513] mb-6 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center mr-3">1</div>
            请选择要自测的病症类型
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {Object.keys(diseaseConfig).map(disease => (
              <div 
                key={disease}
                className={`symptom-card p-4 border rounded-lg bg-white transition-all cursor-pointer ${
                  selectedDisease === disease 
                    ? 'border-[#4CAF50] bg-[#dcfce7]' 
                    : 'border-gray-200 hover:shadow-md'
                }`}
                onClick={() => setSelectedDisease(disease)}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    selectedDisease === disease 
                      ? 'bg-[#4CAF50]' 
                      : 'border border-gray-300'
                  }`}>
                    <i className={`fas fa-check text-xs ${
                      selectedDisease === disease ? 'text-white' : 'text-transparent'
                    }`}></i>
                  </div>
                  <span>{disease}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button 
              onClick={nextStep}
              className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-colors"
            >
              下一步 <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        {/* 步骤2: 主要症状选择 */}
        {selectedDisease && (
          <div className={`step ${currentStep === 2 ? 'block' : 'hidden'}`}>
            <h2 className="text-xl font-semibold text-[#8B4513] mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center mr-3">2</div>
              请选择主要症状
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {diseaseConfig[selectedDisease].mainSymptoms.map(symptom => (
                <div 
                  key={symptom}
                  className={`symptom-card p-4 border rounded-lg bg-white transition-all cursor-pointer ${
                    selectedSymptoms.main.includes(symptom) 
                      ? 'border-[#4CAF50] bg-[#dcfce7]' 
                      : 'border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => selectSymptom(symptom, 'main', false)}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedSymptoms.main.includes(symptom) 
                        ? 'bg-[#4CAF50]' 
                        : 'border border-gray-300'
                    }`}>
                      <i className={`fas fa-check text-xs ${
                        selectedSymptoms.main.includes(symptom) ? 'text-white' : 'text-transparent'
                      }`}></i>
                    </div>
                    <span>{symptom}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button 
                onClick={prevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i> 上一步
              </button>
              <button 
                onClick={nextStep}
                className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-colors"
              >
                下一步 <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* 步骤3: 次要症状选择 */}
        {selectedDisease && (
          <div className={`step ${currentStep === 3 ? 'block' : 'hidden'}`}>
            <h2 className="text-xl font-semibold text-[#8B4513] mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center mr-3">3</div>
              请选择次要症状（可多选）
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {diseaseConfig[selectedDisease].secondarySymptoms.map(symptom => (
                <div 
                  key={symptom}
                  className={`symptom-card p-4 border rounded-lg bg-white transition-all cursor-pointer ${
                    selectedSymptoms.secondary.includes(symptom) 
                      ? 'border-[#4CAF50] bg-[#dcfce7]' 
                      : 'border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => selectSymptom(symptom, 'secondary', true)}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedSymptoms.secondary.includes(symptom) 
                        ? 'bg-[#4CAF50]' 
                        : 'border border-gray-300'
                    }`}>
                      <i className={`fas fa-check text-xs ${
                        selectedSymptoms.secondary.includes(symptom) ? 'text-white' : 'text-transparent'
                      }`}></i>
                    </div>
                    <span>{symptom}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button 
                onClick={prevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i> 上一步
              </button>
              <button 
                onClick={nextStep}
                className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-colors"
              >
                下一步 <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* 步骤4: 伴随症状选择 */}
        {selectedDisease && (
          <div className={`step ${currentStep === 4 ? 'block' : 'hidden'}`}>
            <h2 className="text-xl font-semibold text-[#8B4513] mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center mr-3">4</div>
              请选择伴随症状（可多选）
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {diseaseConfig[selectedDisease].associatedSymptoms.map(symptom => (
                <div 
                  key={symptom}
                  className={`symptom-card p-4 border rounded-lg bg-white transition-all cursor-pointer ${
                    selectedSymptoms.associated.includes(symptom) 
                      ? 'border-[#4CAF50] bg-[#dcfce7]' 
                      : 'border-gray-200 hover:shadow-md'
                  }`}
                  onClick={() => selectSymptom(symptom, 'associated', true)}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedSymptoms.associated.includes(symptom) 
                        ? 'bg-[#4CAF50]' 
                        : 'border border-gray-300'
                    }`}>
                      <i className={`fas fa-check text-xs ${
                        selectedSymptoms.associated.includes(symptom) ? 'text-white' : 'text-transparent'
                      }`}></i>
                    </div>
                    <span>{symptom}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button 
                onClick={prevStep}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i> 上一步
              </button>
              <button 
                onClick={nextStep}
                className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-colors"
              >
                查看结果 <i className="fas fa-clipboard-check ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* 结果页面 */}
        <div className={`step ${currentStep === 5 ? 'block' : 'hidden'}`}>
          <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-4 flex items-center">
              <i className="fa-solid fa-clipboard-check text-[#4CAF50] mr-3"></i> 辨证结果
            </h2>
            
            {selectedDisease && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#8B4513] mb-2">自测病症：{selectedDisease}</h3>
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#8B4513] mb-2">您选择的症状：</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.main.map(symptom => (
                  <div key={`main-${symptom}`} className="px-3 py-1 bg-[#4CAF50]/10 text-[#065f46] rounded-full text-sm">
                    {symptom}
                  </div>
                ))}
                {selectedSymptoms.secondary.map(symptom => (
                  <div key={`secondary-${symptom}`} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {symptom}
                  </div>
                ))}
                {selectedSymptoms.associated.map(symptom => (
                  <div key={`associated-${symptom}`} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {symptom}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#8B4513] mb-2">可能的证型：</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-[#333333]">
                  {determineSyndrome().name}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#8B4513] mb-2">治疗建议：</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-[#333333]">
                  {determineSyndrome().treatment}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={restartTest}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <i className="fas fa-redo mr-2"></i> 重新测试
            </button>
            <button 
              onClick={() => navigate('/appointment')}
              className="px-6 py-2 bg-[#D32F2F] text-white rounded-lg hover:bg-[#b71c1c] transition-colors"
            >
              <i className="fas fa-calendar-check mr-2"></i> 在线预约
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
