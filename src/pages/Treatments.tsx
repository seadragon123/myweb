import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Treatment } from '@/types';
import { getTreatmentMethods } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Treatments() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    // Handle scroll events for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch treatment methods
    const fetchTreatments = async () => {
      try {
        const data = await getTreatmentMethods();
        setTreatments(data);
      } catch (error) {
        console.error('Failed to fetch treatment methods:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTreatments();
    
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
            <i className="fa-solid fa-hand-holding-medical mr-2 text-[#4CAF50]"></i>中医特色治疗方法
          </h1>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-8"></div>
          <p className="text-xl text-[#333333] max-w-3xl mx-auto">
            传承中医精髓，结合现代医学理念，提供多元化的中医特色治疗方法，为您的健康保驾护航
          </p>
        </section>
        
        {/* Treatment Methods Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {treatments.map((treatment, index) => (
              <motion.div 
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {treatment.imageUrl && (
                    <div className="md:col-span-1">
                      <img 
                        src={treatment.imageUrl} 
                        alt={treatment.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className={`p-6 ${treatment.imageUrl ? 'md:col-span-1' : 'md:col-span-2'}`}>
                    <h2 className="text-2xl font-bold text-[#8B4513] mb-4">
                      {treatment.name}
                    </h2>
                    
                    <p className="text-[#333333] mb-6">
                      {treatment.description}
                    </p>
                    
                    <h3 className="text-xl font-bold text-[#333333] mb-3">治疗步骤</h3>
                    <ol className="space-y-2 mb-6">
                      {treatment.steps.map((step, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-[#4CAF50] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                            {i + 1}
                          </div>
                          <span className="text-[#333333]">{step}</span>
                        </li>
                      ))}
                    </ol>
                    
                    <div className="bg-[#F5F5DC] p-4 rounded-xl">
                      <h4 className="font-bold text-[#4CAF50] mb-2">适应症</h4>
                      <p className="text-[#333333]">
                        颈椎病、腰背痛、椎间盘突出、坐骨神经痛、风湿痛风等颈肩腰腿痛病症
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Treatment Combination Section */}
        <section className="mb-20">
          <div className="bg-cover bg-center rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%E4%B8%AD%E5%8C%BB%E6%B2%BB%E7%96%97%E7%BB%84%E5%90%88%2C%E9%92%88%E7%81%B8%E6%8E%A8%E6%8B%BF%E4%B8%AD%E8%8D%AF%2C%E5%8C%BB%E7%94%9F%E5%B7%A5%E4%BD%9C%E5%9B%BE&sign=07bee4d03b5ddae2dd37a026710f2fda)'
              }}
            ></div>
            
            <div className="relative z-10 p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">
                <i className="fa-solid fa-syringe mr-2"></i>个性化综合治疗方案
              </h2>
              <p className="text-xl leading-relaxed mb-8 max-w-3xl">
                根据患者具体病情和体质，制定个性化综合治疗方案，多种疗法有机结合，以达到最佳治疗效果
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">辨证施治</h3>
                  <p>根据中医理论，辨证分型，因人而异</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">多法并用</h3>
                  <p>针灸、推拿、中药等多种疗法结合</p>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">内外兼治</h3>
                  <p>内调外治相结合，标本兼治</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/appointment" 
                  className="bg-[#D32F2F] hover:bg-[#b71c1c] text-white px-8 py-3 rounded-full text-lg font-bold transition-all transform hover:scale-105 inline-block"
                >
                  预约就诊 <i className="fa-solid fa-calendar-check ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-[100px]">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-8 text-center">
            <i className="fa-solid fa-question-circle mr-2 text-[#4CAF50]"></i>常见问题
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "中医治疗需要多长时间才能见效？",answer: "中医治疗讲究辨证施治，因人而异，见效时间因病情轻重、病程长短、个体差异而异。一般来说，急性病症可能在几次治疗后就有明显改善，慢性病症则需要较长时间的调理，通常建议坚持治疗1-3个疗程（每个疗程10次）以获得稳定效果。"
              },
              {
                question: "针灸治疗会很痛吗？",
                answer: "针灸治疗时，大多数患者只会感到轻微的酸胀感或麻电感，这是“得气”的正常反应，通常是可以忍受的。我们会根据患者的耐受程度调整进针深度和手法，确保治疗过程舒适。"
              },
              {
                question: "治疗期间需要注意什么？",
                answer: "治疗期间应注意保暖，避免受凉；保持良好的生活习惯，避免长时间低头或久坐；饮食清淡，避免辛辣刺激性食物；遵医嘱进行适当的功能锻炼，以巩固治疗效果。如有不适或疑问，应及时与医生沟通。"
              },
              {
                question: "中医治疗可以与西医治疗同时进行吗？",
                answer: "在大多数情况下，中医治疗可以与西医治疗相辅相成。但在同时接受中西医治疗时，应告知医生您正在使用的药物和治疗方法，以便医生制定安全合理的综合治疗方案，避免潜在的相互作用。"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-[#8B4513] mb-3">
                  Q: {item.question}
                </h3>
                <p className="text-[#333333]">
                  A: {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}