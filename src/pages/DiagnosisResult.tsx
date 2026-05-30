import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function DiagnosisResultPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { diagnosisResult, disease } = location.state || {};
  
  // 检查是否有诊断结果数据
  useEffect(() => {
    if (!diagnosisResult) {
      navigate('/self-diagnosis');
    }
  }, [diagnosisResult, navigate]);
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 如果没有诊断结果，显示加载中
  if (!diagnosisResult) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] mb-4"></div>
          <p className="text-[#333333]">加载中...</p>
        </div>
      </div>
    );
  }
  
  // 定义不同证型的治疗方法图标
  const getTreatmentIcon = (syndromeType) => {
    if (syndromeType.includes('风寒湿痹') || syndromeType.includes('寒湿')) {
      return 'fa-snowflake';
    } else if (syndromeType.includes('湿热')) {
      return 'fa-temperature-high';
    } else if (syndromeType.includes('血瘀')) {
      return 'fa-droplets';
    } else if (syndromeType.includes('肝肾亏虚') || syndromeType.includes('肾虚')) {
      return 'fa-heart';
    }
    return 'fa-stethoscope';
  };
  
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-stethoscope mr-2 text-[#4CAF50]"></i>诊断结果
          </h1>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-8"></div>
          <p className="text-xl text-[#333333] max-w-2xl mx-auto">
            根据您提供的症状，我们为您提供以下初步诊断结果
          </p>
        </section>
        
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 诊断结果卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#4CAF50] text-white p-6">
              <h2 className="text-2xl font-bold mb-2">初步诊断</h2>
              <p className="text-lg opacity-90">基于您的症状描述得出的初步中医辨证结果</p>
            </div>
            
            <div className="p-8">
              {disease && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#8B4513] mb-2">自测病症</h3>
                  <div className="bg-[#F5F5DC] p-3 rounded-lg inline-block">
                    <p className="text-lg font-medium text-[#333333]">{disease}</p>
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#8B4513] mb-4">
                  <i className="fa-solid fa-diagnoses mr-2 text-[#4CAF50]"></i>可能证型
                </h3>
                <div className="bg-[#F5F5DC] p-4 rounded-xl">
                  <div className="flex items-center">
                    <i className={`fa-solid ${getTreatmentIcon(diagnosisResult.possibleSyndrome)} text-2xl text-[#4CAF50] mr-3`}></i>
                    <div>
                      <p className="text-2xl font-bold text-[#333333]">{diagnosisResult.possibleSyndrome}</p>
                      <p className="text-sm text-gray-500 mt-1">点击了解更多关于此证型的信息</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#8B4513] mb-4">
                  <i className="fa-solid fa-prescription-bottle-alt mr-2 text-[#4CAF50]"></i>推荐治疗方向
                </h3>
                <div className="border-l-4 border-[#4CAF50] pl-4 py-2">
                  <p className="text-lg text-[#333333] leading-relaxed">{diagnosisResult.recommendation}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#8B4513] mb-4">
                  <i className="fa-solid fa-lightbulb mr-2 text-[#4CAF50]"></i>就医建议
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                  <p className="text-[#333333]">{diagnosisResult.advice}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/self-diagnosis')}
                  className="flex items-center justify-center px-6 py-3 border border-[#4CAF50] text-[#4CAF50] rounded-lg hover:bg-[#4CAF50] hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-redo mr-2"></i>
                  重新测试
                </button>
                <button
                  onClick={() => navigate('/appointment')}
                  className="flex items-center justify-center px-6 py-3 bg-[#D32F2F] text-white rounded-lg hover:bg-[#b71c1c] transition-colors"
                >
                  <i className="fa-solid fa-calendar-check mr-2"></i>
                  在线预约
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}