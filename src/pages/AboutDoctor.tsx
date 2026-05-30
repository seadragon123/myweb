import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DoctorInfo } from '@/types';
import { getDoctorInfo } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutDoctor() {
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    // Handle scroll events for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch doctor information
    const fetchDoctorInfo = async () => {
      try {
        const data = await getDoctorInfo();
        setDoctorInfo(data);
      } catch (error) {
        console.error('Failed to fetch doctor information:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctorInfo();
    
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
  
  if (!doctorInfo) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <p className="text-[#333333]">无法加载医生信息</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-user-doctor mr-3 text-[#4CAF50]"></i>关于医生
          </h1>
          <div className="w-24 h-1 bg-[#4CAF50] mx-auto mb-8"></div>
          <p className="text-xl text-[#333333] max-w-3xl mx-auto">
            {doctorInfo.introduction}
          </p>
        </section>
        
        {/* Doctor Profile Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1">
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img 
                    src="/about2.png" 
                    alt={doctorInfo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#4CAF50] text-white p-4 rounded-2xl shadow-lg hidden md:block">
                  <p className="text-xl font-bold">{doctorInfo.experience.length}+年</p>
                  <p className="text-sm">临床经验</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-[#8B4513] mb-6">
                <i className="fa-solid fa-id-card mr-2 text-[#4CAF50]"></i>医生简介
              </h2>
              
              <div className="space-y-6 text-[#333333]">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {doctorInfo.name} · {doctorInfo.title}
                  </h3>
                  <p className="leading-relaxed">
                    {doctorInfo.introduction}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[#8B4513]">
                    <i className="fa-solid fa-stethoscope mr-2 text-[#4CAF50]"></i>专业擅长
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {doctorInfo.specialization.map((item, index) => (
                      <span 
                        key={index} 
                        className="bg-white px-4 py-2 rounded-full shadow-sm text-[#333333] flex items-center"
                      >
                        <i className="fa-solid fa-check-circle text-[#4CAF50] mr-2"></i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[#8B4513]">
                    <i className="fa-solid fa-heart mr-2 text-[#4CAF50]"></i>诊疗理念
                  </h3>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#4CAF50] italic">
                    "{doctorInfo.philosophy}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Qualifications Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
              <i className="fa-solid fa-certificate mr-2 text-[#4CAF50]"></i>资质证书
            </h2>
            <div className="w-20 h-1 bg-[#4CAF50] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctorInfo.certificates.map((certificate) => (
              <motion.div 
                key={certificate.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#8B4513] mb-2">
                    {certificate.name}
                  </h3>
                  <p className="text-[#333333] mb-4">
                    <i className="fa-solid fa-building mr-2 text-[#4CAF50]"></i>
                    颁发机构: {certificate.issuingAuthority}
                  </p>
                  <p className="text-[#333333] mb-4">
                    <i className="fa-solid fa-calendar mr-2 text-[#4CAF50]"></i>
                    颁发日期: {certificate.issueDate}
                  </p>
                  <div className="mt-6">
                    <button 
                      className="text-[#4CAF50] hover:text-[#388E3C] font-medium flex items-center transition-colors"
                      onClick={() => {
                        // In a real application, this would open a modal with the certificate image
                        window.open(certificate.imageUrl, '_blank');
                      }}
                    >
                      查看证书 <i className="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Experience Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
              <i className="fa-solid fa-briefcase mr-2 text-[#4CAF50]"></i>执业经历
            </h2>
            <div className="w-20 h-1 bg-[#4CAF50] mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#4CAF50]/30 transform md:translate-x-px"></div>
            
            {doctorInfo.experience.map((exp, index) => (
              <motion.div 
                key={exp.id}
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
                    {exp.position}
                  </h3>
                  <h4 className="text-lg text-[#4CAF50] mb-3">
                    {exp.hospital}
                  </h4>
                  <p className="text-[#333333] mb-3">
                    {exp.startDate} - {exp.endDate || '至今'}
                  </p>
                  <p className="text-[#333333]">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Academic Achievements Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
              <i className="fa-solid fa-award mr-2 text-[#4CAF50]"></i>学术成果
            </h2>
            <div className="w-20 h-1 bg-[#4CAF50] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctorInfo.academicAchievements.map((achievement, index) => (
              <motion.div 
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mb-4">
                  {achievement.type === 'paper' ? (
                    <i className="fa-solid fa-file-lines text-[#4CAF50] text-xl"></i>
                  ) : achievement.type === 'book' ? (
                    <i className="fa-solid fa-book text-[#4CAF50] text-xl"></i>
                  ) : (
                    <i className="fa-solid fa-trophy text-[#4CAF50] text-xl"></i>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#8B4513] mb-3">
                  {achievement.title}
                </h3>
                <p className="text-[#333333] mb-2">
                  <i className="fa-solid fa-building-columns mr-2 text-[#4CAF50]"></i>
                  {achievement.publication}
                </p>
                <p className="text-[#333333] mb-4">
                  <i className="fa-solid fa-calendar mr-2 text-[#4CAF50]"></i>
                  {achievement.date}
                </p>
                <p className="text-[#333333]">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Philosophy Section */}
        <section className="mb-20">
          <div className="bg-cover bg-center rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%E4%B8%AD%E5%8C%BB%E5%8C%BB%E7%94%9F%E6%80%9D%E8%80%83%2C%E5%8F%A4%E5%85%B8%E4%B8%AD%E5%8C%BB%E4%B9%A6%E7%B1%8D%2C%E9%BB%91%E8%89%B2%E8%83%8C%E6%99%AF%2C%E6%B8%A9%E9%A6%A8%E6%B0%9B%E5%9B%B4&sign=27052a5c35df9fbcd3f8243578be37f3)'
              }}
            ></div>
            
            <div className="relative z-10 p-8 md:p-12 text-white max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">诊疗理念</h2>
              <p className="text-xl leading-relaxed italic">
                "{doctorInfo.philosophy}"
              </p>
            </div>
          </div>
        </section>
        
        {/* Appointment CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-calendar-check mr-2 text-[#4CAF50]"></i>预约就诊
          </h2>
          <p className="text-[#333333] text-lg mb-8 max-w-2xl mx-auto">
            如果您正在遭受颈肩腰腿痛的困扰，欢迎预约就诊，让我们为您提供专业的中医治疗方案
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