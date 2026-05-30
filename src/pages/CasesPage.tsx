import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Case } from '@/types';
import { getCases } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    // Handle scroll events for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch cases
    const fetchCases = async () => {
      try {
        const data = await getCases();
        setCases(data);
      } catch (error) {
        console.error('Failed to fetch cases:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCases();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] mb-4"></div>
          <p className="text-[#333333]">加载中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-check-circle mr-2 text-[#4CAF50]"></i>康复案例
          </h1>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-8"></div>
          <p className="text-xl text-[#333333] max-w-3xl mx-auto">
            真实康复案例分享，见证中医治疗颈肩腰腿痛的显著效果，为您提供治疗参考
          </p>
        </section>
        
        {/* Cases Grid Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((caseItem, index) => (
              <motion.div 
                key={caseItem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={caseItem.beforeImageUrl || `https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%24%7BencodeURIComponent%28caseItem.disease%29%7D+%E6%B2%BB%E7%96%97%E6%A1%88%E4%BE%8B%2C%E5%8C%BB%E5%AD%A6%E5%BD%B1%E5%83%8F%E5%9B%BE&sign=91406c801d75dec6aabaff944328e2f5`} 
                    alt={`${caseItem.patientName}的${caseItem.disease}治疗案例`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-[#8B4513]">
                      {caseItem.disease}康复案例
                    </h2>
                    <span className="bg-[#4CAF50] text-white text-xs px-2 py-1 rounded-full">
                      {caseItem.treatmentPeriod}疗程
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-[#333333] mb-2">
                      <span className="font-medium">患者:</span> {caseItem.patientName} ({caseItem.patientAge}岁)
                    </p>
                    <p className="text-[#333333] mb-2">
                      <span className="font-medium">症状:</span> {caseItem.symptoms}
                    </p>
                    <p className="text-[#333333] mb-2">
                      <span className="font-medium">治疗方案:</span> {caseItem.treatmentPlan}
                    </p>
                    <p className="text-[#333333]">
                      <span className="font-medium text-[#4CAF50]">治疗效果:</span> {caseItem.effect}
                    </p>
                  </div>
                  
                  {caseItem.testimonial && (
                    <div className="bg-[#F5F5DC] p-4 rounded-lg text-sm text-[#333333] mb-4 italic">
                      "{caseItem.testimonial.substring(0, 100)}..."
                    </div>
                  )}
                  
                  <Link 
                    to={`/cases/${caseItem.id}`} 
                    className="inline-block text-[#4CAF50] hover:text-[#388E3C] font-medium transition-colors mt-auto"
                  >
                    查看完整案例 <i className="fa-solid fa-arrow-right ml-1"></i>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Case Study Section */}
        {cases.length > 0 && (
          <section className="mb-20">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h2 className="text-3xl font-bold text-[#8B4513] mb-6">
                    典型案例深度解析
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#333333] mb-3">
                      {cases[0].patientName} - {cases[0].disease}
                    </h3>
                    <p className="text-[#333333] mb-4">
                      <span className="font-medium">年龄:</span> {cases[0].patientAge}岁
                    </p>
                    <p className="text-[#333333] mb-4">
                      <span className="font-medium">主要症状:</span> {cases[0].symptoms}
                    </p>
                    <p className="text-[#333333] mb-4">
                      <span className="font-medium">治疗方案:</span> {cases[0].treatmentPlan}
                    </p>
                    <p className="text-[#333333] mb-6">
                      <span className="font-medium">治疗效果:</span> {cases[0].effect}
                    </p>
                    
                    {cases[0].testimonial && (
                      <div className="bg-[#F5F5DC] p-4 rounded-lg text-[#333333] italic mb-6">
                        "{cases[0].testimonial}"
                      </div>
                    )}
                    
                    <Link 
                      to={`/cases/${cases[0].id}`} 
                      className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      查看完整案例 <i className="fa-solid fa-arrow-right ml-2"></i>
                    </Link>
                  </div>
                </div>
                
                <div className="relative h-64 lg:h-auto">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-4">
                    {cases[0].beforeImageUrl && (
                      <div className="bg-gray-100 rounded-xl overflow-hidden">
                        <img 
                          src={cases[0].beforeImageUrl} 
                          alt="治疗前" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-sm">
                          治疗前
                        </div>
                      </div>
                    )}
                    
                    {cases[0].afterImageUrl && (
                      <>
                        <div className="bg-gray-100 rounded-xl overflow-hidden">
                          <img 
                            src={cases[0].afterImageUrl} 
                            alt="治疗后" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-sm">
                            治疗后
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 rounded-xl overflow-hidden col-span-2">
                          <img 
                            src={`https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%24%7BencodeURIComponent%28cases%5B0%5D.disease%29%7D+%E4%B8%AD%E5%8C%BB%E6%B2%BB%E7%96%97%E6%95%88%E6%9E%9C%E5%AF%B9%E6%AF%94%2C%E5%8C%BB%E5%AD%A6%E5%9B%BE%E8%A7%A3&sign=fd849e99bc8c7df42161038ae673bc75`} 
                            alt="治疗效果对比" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-sm">
                            治疗效果对比
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-calendar-check mr-2 text-[#4CAF50]"></i>预约就诊
          </h2>
          <p className="text-[#333333] text-lg mb-8 max-w-2xl mx-auto">
            如果您也正在遭受类似病症的困扰，欢迎预约就诊，我们将为您提供专业的中医治疗方案
          </p>
          <Link 
            to="/appointment" 
            className="inline-block bg-[#D32F2F] hover:bg-[#b71c1c] text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105"
          >
            立即预约 <i className="fa-solid fa-arrow-right ml-2"></i>
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}