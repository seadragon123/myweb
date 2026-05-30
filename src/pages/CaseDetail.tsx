import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Case } from '@/types';
import { getCaseById } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CaseDetail() {
  const { caseId } = useParams<{ caseId: string }>();
  const [caseItem, setCaseItem] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Handle scroll events for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch case details
    const fetchCaseDetail = async () => {
      try {
        if (!caseId) {
          navigate('/cases');
          return;
        }
        
        setLoading(true);
        const data = await getCaseById(caseId);
        
        if (data) {
          setCaseItem(data);
        } else {
          navigate('/cases');
        }
      } catch (error) {
        console.error('Failed to fetch case details:', error);
        navigate('/cases');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCaseDetail();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [caseId, navigate]);
  
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
  
  if (!caseItem) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <p className="text-[#333333]">无法加载案例信息</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Case Detail Hero Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/cases')}
              className="text-[#333333] hover:text-[#4CAF50] mr-4 transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513]">
              {caseItem.disease}康复案例
            </h1>
          </div>
          
          <div className="w-20 h-1 bg-[#4CAF50] mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-user mr-2 text-[#4CAF50]"></i>患者信息
              </h2>
              <p className="text-[#333333] mb-2">
                <span className="font-medium">姓名:</span> {caseItem.patientName}
              </p>
              <p className="text-[#333333] mb-2">
                <span className="font-medium">年龄:</span> {caseItem.patientAge}岁
              </p>
              <p className="text-[#333333] mb-2">
                <span className="font-medium">性别:</span> {caseItem.gender === 'male' ? '男' : '女'}
              </p>
              <p className="text-[#333333]">
                <span className="font-medium">就诊日期:</span> {caseItem.date}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-calendar-check mr-2 text-[#4CAF50]"></i>治疗信息
              </h2>
              <p className="text-[#333333] mb-2">
                <span className="font-medium">病症:</span> {caseItem.disease}
              </p>
              <p className="text-[#333333] mb-2">
                <span className="font-medium">治疗周期:</span> {caseItem.treatmentPeriod}
              </p>
              <p className="text-[#333333]">
                <span className="font-medium">治疗方案:</span> {caseItem.treatmentPlan}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-check-circle mr-2 text-[#4CAF50]"></i>治疗效果
              </h2>
              <p className="text-[#333333]">
                {caseItem.effect}
              </p>
            </div>
          </div>
        </section>
        
        {/* Case Images Section */}
        {caseItem.beforeImageUrl && caseItem.afterImageUrl && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-8 text-center">
              <i className="fa-solid fa-images mr-2 text-[#4CAF50]"></i>治疗效果对比
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-[#333333] mb-4 text-center">治疗前</h3>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img 
                    src={caseItem.beforeImageUrl} 
                    alt="治疗前" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-[#333333] mb-4 text-center">治疗后</h3>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img 
                    src={caseItem.afterImageUrl} 
                    alt="治疗后" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Case Description Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
                <i className="fa-solid fa-stethoscope mr-2 text-[#4CAF50]"></i>病情描述
              </h2>
              
              <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
                <h3 className="text-xl font-bold text-[#333333] mb-4">主要症状</h3>
                <p className="text-[#333333] leading-relaxed">
                  {caseItem.symptoms}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-[#333333] mb-4">诊断结果</h3>
                <p className="text-[#333333] leading-relaxed">
                  根据患者症状和体征，结合中医四诊，诊断为{caseItem.disease}，证属气滞血瘀型。患者因长期伏案工作，颈肩部肌肉劳损，气血运行不畅，经络阻滞，不通则痛，导致出现上述症状。
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
                <i className="fa-solid fa-syringe mr-2 text-[#4CAF50]"></i>治疗方案
              </h2>
              
              <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
                <h3 className="text-xl font-bold text-[#333333] mb-4">治疗原则</h3>
                <p className="text-[#333333] mb-4">
                  行气活血，通络止痛，松解粘连，滑利关节。
                </p>
                
                <h3 className="text-xl font-bold text-[#333333] mb-4">具体措施</h3>
                <ul className="space-y-3 text-[#333333]">
                  {caseItem.treatmentPlan.split('+').map((item, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-bold text-[#333333] mb-4">康复建议</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                    <span>避免长时间低头工作，每工作1小时休息5-10分钟</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                    <span>睡眠时使用高度适宜的枕头，保持颈椎自然生理曲度</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                    <span>坚持进行颈肩部功能锻炼，增强肌肉力量</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                    <span>注意颈肩部保暖，避免受凉</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                    <span>饮食清淡，避免辛辣刺激性食物</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Treatment Process Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-8 text-center">
            <i className="fa-solid fa-history mr-2 text-[#4CAF50]"></i>治疗过程
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#4CAF50]/30 transform md:translate-x-px"></div>
            
            {[
              {
                stage: "第一周",
                title: "初步治疗阶段",
                description: "主要采用针灸和推拿手法，缓解疼痛症状，放松紧张肌肉，改善局部血液循环。治疗频率为每周3次，每次30分钟。"
              },
              {
                stage: "第二周",
                title: "深入治疗阶段",
                description: "在第一阶段基础上，增加穴位贴敷和中药内服，进一步活血化瘀，通络止痛。继续每周3次治疗，同时指导患者进行简单的功能锻炼。"
              },
              {
                stage: "第三周",
                title: "巩固治疗阶段",
                description: "患者症状明显改善，调整治疗方案，减少治疗频率为每周2次，重点进行关节松动和功能恢复训练，增强颈肩部肌肉力量。"
              },
              {
                stage: "第四周",
                title: "康复调理阶段",
                description: "患者症状基本消失，治疗频率减为每周1次，主要进行巩固治疗和康复指导，制定长期的功能锻炼计划，预防复发。"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative mb-16 ${index % 2 === 0 ? 'md:text-right md:pr-12 md:pl-0' : 'md:text-left md:pl-12 md:pr-0 md:ml-auto md:translate-x-2'}`}
              >
                {/* Timeline dot */}
                <div className={`absolute ${index % 2 === 0 ? 'md:right-0' : 'md:left-0'} top-0 w-6 h-6 rounded-full bg-[#4CAF50] transform md:-translate-x-1/2`}></div>
                
                <div className={`bg-white p-6 rounded-2xl shadow-md ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'} max-w-md`}>
                  <h3 className="text-xl font-bold text-[#8B4513] mb-1">
                    {item.stage}：{item.title}
                  </h3>
                  <p className="text-[#333333]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Testimonial Section */}
        {caseItem.testimonial && (
          <section className="mb-20">
            <div className="bg-cover bg-center rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80%E5%AE%A4%E5%86%85%E7%8E%AF%E5%A2%83%2C%E5%8C%BB%E5%AD%A6%E8%AF%84%E4%BB%B7%2C%E6%B8%A9%E9%A6%A8%E6%B0%9B%E5%9B%B4&sign=dcac0ec61cc52e3173fe16b84b0ea2b3)'
                }}
              ></div>
              
              <div className="relative z-10 p-8 md:p-12 text-white max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">
                  <i className="fa-solid fa-quote-left mr-2"></i>患者反馈
                </h2>
                <p className="text-xl italic leading-relaxed mb-8">
                  "{caseItem.testimonial}"
                </p>
                <p className="text-lg font-medium">
                  — {caseItem.patientName}，{caseItem.disease}患者
                </p>
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
          <a 
            href="/appointment" 
            className="inline-block bg-[#D32F2F] hover:bg-[#b71c1c] text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105"
          >
            立即预约 <i className="fa-solid fa-arrow-right ml-2"></i>
          </a>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}