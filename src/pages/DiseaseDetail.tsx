import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disease } from '@/types';
import { getDiseaseById, getDiseases } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function DiseaseDetail() {
  const { diseaseName } = useParams<{ diseaseName: string }>();
  const [disease, setDisease] = useState<Disease | null>(null);
  const [relatedDiseases, setRelatedDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle scroll events for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch disease information
    const fetchDiseaseInfo = async () => {
      try {
        setLoading(true);
        
        // Get all diseases to find the one with matching name
        const allDiseases = await getDiseases();
        
        // Find the disease with matching name
        const foundDisease = allDiseases.find(d => d.name === diseaseName);
        
        if (foundDisease) {
          setDisease(foundDisease);
          
          // Get related diseases (other diseases)
          setRelatedDiseases(allDiseases.filter(d => d.id !== foundDisease.id).slice(0, 3));
        } else {
          console.error(`Disease not found: ${diseaseName}`);
          navigate('/404');
        }
      } catch (error) {
        console.error('Failed to fetch disease information:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (diseaseName) {
      fetchDiseaseInfo();
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [diseaseName, navigate]);
  
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
  
  if (!disease) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <p className="text-[#333333]">无法加载病症信息</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Disease Hero Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="text-[#333333] hover:text-[#4CAF50] mr-4 transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513]">
              {disease.name}
            </h1>
          </div>
          
          <div className="w-20 h-1 bg-[#4CAF50] mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#333333] mb-4">病症概述</h2>
              <p className="text-[#333333] leading-relaxed mb-6">
                {disease.description}
              </p>
              
              <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
                <h3 className="text-xl font-bold text-[#8B4513] mb-4">
                  <i className="fa-solid fa-exclamation-circle mr-2 text-[#4CAF50]"></i>病因病机
                </h3>
                <p className="text-[#333333]">
                  {disease.causes}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/self-diagnosis" 
                  className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <i className="fa-solid fa-stethoscope mr-2"></i>
                  病症自测
                </Link>
                <Link 
                  to="/appointment" 
                  className="bg-[#D32F2F] hover:bg-[#b71c1c] text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <i className="fa-solid fa-calendar-check mr-2"></i>
                  预约就诊
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img 
                  //src={`https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%24%7BencodeURIComponent%28disease.name%29%7D+%E4%B8%AD%E5%8C%BB%E6%B2%BB%E7%96%97%2C%E5%8C%BB%E5%AD%A6%E6%8F%92%E7%94%BB%2C%E4%B8%93%E4%B8%9A%E5%9B%BE%E8%A7%A3&sign=c8469d6ca3bcd2542fb5416143a8051f`} 
                 src={"/jbjz.png"}
                 alt={disease.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#4CAF50] text-white p-4 rounded-2xl shadow-lg hidden md:block">
                <p className="text-xl font-bold">中医特色疗法</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Syndrome Differentiation Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-8">
            <i className="fa-solid fa-sitemap mr-2 text-[#4CAF50]"></i>辨证分型
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disease.辨证分型.map((syndrome, index) => (
              <motion.div 
                key={syndrome.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-[#4CAF50] text-white p-4">
                  <h3 className="text-xl font-bold">{syndrome.name}</h3>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-[#333333] mb-3">症状表现</h4>
                  <ul className="space-y-2 mb-6">
                    {syndrome.symptoms.map((symptom, i) => (
                      <li key={i} className="flex items-start">
                        <i className="fa-solid fa-check text-[#4CAF50] mt-1 mr-2"></i>
                        <span className="text-[#333333]">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="text-lg font-bold text-[#333333] mb-3">病因病机</h4>
                  <p className="text-[#333333]">
                    {syndrome.pathogenesis}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Treatment Methods Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-8">
            <i className="fa-solid fa-hand-holding-medical mr-2 text-[#4CAF50]"></i>中医治疗方案
          </h2>
          
          <div className="space-y-12">
            {disease.treatments.map((treatment, index) => (
              <motion.div 
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {treatment.imageUrl && (
                    <div className="md:col-span-1">
                      <img 
                        src={treatment.imageUrl} 
                        alt={treatment.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className={`p-6 ${treatment.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}`}>
                    <h3 className="text-2xl font-bold text-[#8B4513] mb-4">
                      {treatment.name}
                    </h3>
                    
                    <p className="text-[#333333] mb-6">
                      {treatment.description}
                    </p>
                    
                    <h4 className="text-lg font-bold text-[#333333] mb-3">治疗步骤</h4>
                    <ol className="space-y-3 mb-6">
                      {treatment.steps.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-[#4CAF50] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                            {i + 1}
                          </div>
                          <span className="text-[#333333]">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Prevention Section */}
        <section className="mb-20">
          <div className="bg-cover bg-center rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%E4%B8%AD%E5%8C%BB%E9%A3%9F%E7%96%97%E9%A5%AE%E9%A3%9F%2C%E5%81%A5%E5%BA%B7%E9%A3%9F%E5%93%81%2C%E7%BB%BF%E8%89%B2%E8%83%8C%E6%99%AF%2C%E6%B8%A9%E9%A6%A8%E6%B0%9B%E5%9B%B4&sign=0c6ed1cebd47ce693caae89a1b52b68a)'
              }}
            ></div>
            
            <div className="relative z-10 p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">
                <i className="fa-solid fa-shield mr-2"></i>预防与调养
              </h2>
              <p className="text-xl leading-relaxed mb-8 max-w-3xl">
                {disease.prevention}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/articles" 
                  className="bg-white text-[#4CAF50] hover:bg-[#f0f0f0] px-6 py-3 rounded-lg transition-colors flex items-center font-medium"
                >
                  <i className="fa-solid fa-book-medical mr-2"></i>
                  查看健康科普文章
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-8">
            <i className="fa-solid fa-question-circle mr-2 text-[#4CAF50]"></i>常见问题
          </h2>
          
          <div className="space-y-6">
            {disease.faq.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#333333] mb-4">
                    Q: {item.question}
                  </h3>
                  <p className="text-[#333333]">
                    A: {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Related Diseases Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-8">
            <i className="fa-solid fa-link mr-2 text-[#4CAF50]"></i>相关病症
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedDiseases.map((relatedDisease) => (
              <motion.div 
                key={relatedDisease.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-[#F5F5DC] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={`https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%24%7BencodeURIComponent%28relatedDisease.name%29%7D+%E4%B8%AD%E5%8C%BB%E6%B2%BB%E7%96%97%2C%E5%8C%BB%E5%AD%A6%E6%8F%92%E7%94%BB%2C%E4%B8%93%E4%B8%9A%E5%9B%BE%E8%A7%A3&sign=29f175366c124ecbb5123e2c0384f3f7`} 
                    alt={relatedDisease.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#8B4513] mb-3 hover:text-[#4CAF50] transition-colors">
                    {relatedDisease.name}
                  </h3>
                  <p className="text-[#333333] mb-4 line-clamp-3">
                    {relatedDisease.description}
                  </p>
                  <Link 
                    to={`/diseases/${relatedDisease.name}`} 
                    className="block text-center bg-[#4CAF50] hover:bg-[#388E3C] text-white py-2 rounded-lg transition-colors"
                  >
                    了解详情 <i className="fa-solid fa-arrow-right ml-1"></i>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Appointment CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-calendar-check mr-2 text-[#4CAF50]"></i>预约就诊
          </h2>
          <p className="text-[#333333] text-lg mb-8 max-w-2xl mx-auto">
            如果您正在遭受{disease.name}的困扰，欢迎预约就诊，让我们为您提供专业的中医治疗方案
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