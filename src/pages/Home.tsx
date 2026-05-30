import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DoctorInfo, Case, Review, Disease } from '@/types';
import { getDoctorInfo, getCases, getReviews, getDiseases } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  // State for data
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [featuredCases, setFeaturedCases] = useState<Case[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Parallax effect for hero section
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorData, casesData, reviewsData, diseasesData] = await Promise.all([
          getDoctorInfo(),
          getCases(),
          getReviews(),
          getDiseases()
        ]);
        
        setDoctorInfo(doctorData);
        setFeaturedCases(casesData.slice(0, 3)); // Get first 3 cases
        setReviews(reviewsData);
        setDiseases(diseasesData);
      } catch (error) {
        console.error('Failed to fetch home page data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
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
      
      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative h-[80vh] bg-cover bg-center flex items-center"
          style={{
            backgroundImage: 'url(/banner.png)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
              >
                传承中医精髓<br />
                <span className="text-[#F5F5DC]">专治颈肩腰腿痛</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-white/90 mb-8"
              >
                {doctorInfo?.introduction || "专注于颈椎病、腰背痛、椎间盘突出等慢性疼痛的中医特色治疗，结合针灸、推拿、中药等疗法，为您提供专业、有效的康复方案。"}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  to="/appointment" 
                  className="bg-[#D32F2F] hover:bg-[#b71c1c] text-white px-8 py-3 rounded-full text-center font-medium transition-all transform hover:scale-105"
                >
                  立即预约 <i className="fa-solid fa-arrow-right ml-2"></i>
                </Link>
                <Link 
                  to="/about" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full text-center font-medium transition-all"
                >
                  了解医生 <i className="fa-solid fa-user-doctor ml-2"></i>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5F5DC] to-transparent"></div>
        </section>
        
        {/* Doctor Introduction Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-user-doctor mr-2 text-[#4CAF50]"></i>关于医生
              </h2>
              <div className="w-20 h-1 bg-[#4CAF50] mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <img 
                    src="/about.png" 
                    alt={doctorInfo?.name || "中医医生"} 
                    className="rounded-2xl shadow-lg w-full h-auto object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-[#4CAF50] text-white p-4 rounded-2xl shadow-lg hidden md:block">
                    <p className="text-xl font-bold">{doctorInfo?.experience.length || 0}+年</p>
                    <p className="text-sm">临床经验</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#333333] mb-4">
                  {doctorInfo?.name || "彭医师"} · {doctorInfo?.title || "中医针灸推拿专家"}
                </h3>
                
                <p className="text-[#333333] mb-6 leading-relaxed">
                  {doctorInfo?.introduction || "从事中医临床工作20余年，擅长运用针灸、推拿、中药等传统中医疗法治疗颈肩腰腿痛等各类慢性病症。曾在多家三甲医院进修学习，积累了丰富的临床经验。"}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e0d8b0]">
                    <p className="text-3xl font-bold text-[#4CAF50] mb-1">
                      {doctorInfo?.certificates.length || 0}+
                    </p>
                    <p className="text-[#333333]">专业资质</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e0d8b0]">
                    <p className="text-3xl font-bold text-[#4CAF50] mb-1">
                      {doctorInfo?.cases || 100}+
                    </p>
                    <p className="text-[#333333]">康复案例</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-bold text-[#8B4513] mb-2">诊疗理念</h4>
                  <p className="text-[#333333] italic">"{doctorInfo?.philosophy || "中医治病，重在整体调理，辨证施治。通过疏通经络、调和气血、平衡阴阳，激发人体自身的 healing 能力，达到标本兼治的目的。"}"</p>
                </div>
                
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-[#4CAF50] hover:text-[#388E3C] font-medium transition-colors"
                >
                  查看详细介绍 <i className="fa-solid fa-long-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Specialized Diseases Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-stethoscope mr-2 text-[#4CAF50]"></i>专长病症
              </h2>
              <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
              <p className="text-[#333333] max-w-2xl mx-auto">
                专注于颈肩腰腿痛等慢性病症的中医特色治疗，积累了丰富的临床经验，疗效显著
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {diseases.map((disease) => (
                <motion.div 
                  key={disease.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-[#F5F5DC] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                     // src={`https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%24%7BencodeURIComponent%28disease.name%29%7D+%E4%B8%AD%E5%8C%BB%E6%B2%BB%E7%96%97%2C%E5%8C%BB%E5%AD%A6%E6%8F%92%E7%94%BB%2C%E4%B8%93%E4%B8%9A%E5%9B%BE%E8%A7%A3&sign=c8469d6ca3bcd2542fb5416143a8051f`} 
                      src={"/zcbz.png"}
                      alt={disease.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-3 group-hover:text-[#4CAF50] transition-colors">
                      {disease.name}
                    </h3>
                    <p className="text-[#333333] mb-4 line-clamp-3">
                      {disease.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-medium text-[#4CAF50] mb-2">辨证分型:</h4>
                      <div className="flex flex-wrap gap-2">
                        {disease.辨证分型.slice(0, 3).map((syndrome, index) => (
                          <span key={index} className="bg-white text-[#333333] text-sm px-3 py-1 rounded-full shadow-sm">
                            {syndrome.name}
                          </span>
                        ))}
                        {disease.辨证分型.length > 3 && (
                          <span className="bg-white text-[#333333] text-sm px-3 py-1 rounded-full shadow-sm">
                            +{disease.辨证分型.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link 
                      to={`/diseases/${disease.name}`} 
                      className="block text-center bg-[#4CAF50] hover:bg-[#388E3C] text-white py-2 rounded-lg transition-colors"
                    >
                      了解详情 <i className="fa-solid fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </motion.div>
              ))}
              
                {/* 病症自测入口卡片 */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="h-48 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <i className="fa-solid fa-stethoscope text-3xl text-[#4CAF50]"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-[#8B4513] mb-2">病症自测</h3>
                      <p className="text-[#333333]">通过症状选择进行初步自我诊断</p>
                    </div>
                  </div>
                  <div className="p-6 mt-auto">
                    <Link 
                      to="/self-diagnosis" 
                      className="block text-center bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-lg transition-colors text-lg font-medium"
                    >
                      开始自测 <i className="fa-solid fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </motion.div>
              </div>
          </div>
        </section>
        
        {/* Treatment Methods Preview Section */}
        <section className="py-16 bg-[#F5F5DC]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-hand-holding-medical mr-2 text-[#4CAF50]"></i>特色疗法
              </h2>
              <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
              <p className="text-[#333333] max-w-2xl mx-auto">
                传承中医精髓，结合现代医学理念，提供多元化的中医特色治疗方法
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: '针灸治疗', 
                  description: '通过针刺特定穴位，疏通经络，调和气血，达到治疗目的',
                  icon: 'fa-solid fa-syringe'
                },
                { 
                  name: '推拿按摩', 
                  description: '运用特定手法作用于人体体表，放松肌肉，调整关节',
                  icon: 'fa-solid fa-hand-sparkles'
                },
                { 
                  name: '中药内服', 
                  description: '根据辨证论治原则，开具中药方剂，通过口服治疗疾病',
                  icon: 'fa-solid fa-mortar-pestle'
                },
                { 
                  name: '穴位贴敷', 
                  description: '将特制中药敷贴于穴位，通过穴位刺激和药物作用治疗疾病',
                  icon: 'fa-solid fa-bandage'
                }
              ].map((method, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mb-4">
                    <i className={`${method.icon} text-2xl text-[#4CAF50]`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#8B4513] mb-3">
                    {method.name}
                  </h3>
                  <p className="text-[#333333] mb-4">
                    {method.description}
                  </p>
                  <Link 
                    to="/treatments" 
                    className="text-[#4CAF50] hover:text-[#388E3C] font-medium text-sm transition-colors"
                  >
                    了解更多 <i className="fa-solid fa-angle-right ml-1"></i>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/treatments" 
                className="inline-block bg-[#8B4513] hover:bg-[#6d3610] text-white px-8 py-3 rounded-full transition-colors"
              >
                查看全部治疗方法
              </Link>
            </div>
          </div>
        </section>
        
        {/* Success Cases Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-check-circle mr-2 text-[#4CAF50]"></i>康复案例
              </h2>
              <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
              <p className="text-[#333333] max-w-2xl mx-auto">
                真实康复案例分享，见证中医治疗颈肩腰腿痛的显著效果
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCases.map((caseItem, index) => (
                <motion.div 
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#F5F5DC] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={caseItem.beforeImageUrl || `https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%24%7BencodeURIComponent%28caseItem.disease%29%7D+%E6%B2%BB%E7%96%97%E6%A1%88%E4%BE%8B%2C%E5%8C%BB%E5%AD%A6%E5%BD%B1%E5%83%8F%E5%9B%BE&sign=91406c801d75dec6aabaff944328e2f5`} 
                      alt={`${caseItem.patientName}的${caseItem.disease}治疗案例`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-[#8B4513]">
                        {caseItem.disease}康复案例
                      </h3>
                      <span className="bg-[#4CAF50] text-white text-xs px-2 py-1 rounded-full">
                        {caseItem.treatmentPeriod}疗程
                      </span>
                    </div>
                    <p className="text-[#333333] mb-2">
                      <span className="font-medium">患者:</span> {caseItem.patientName} ({caseItem.patientAge}岁)
                    </p>
                    <p className="text-[#333333] mb-4">
                      <span className="font-medium">症状:</span> {caseItem.symptoms}
                    </p>
                    <p className="text-[#333333] mb-4 line-clamp-3 flex-grow">
                      <span className="font-medium">治疗方案:</span> {caseItem.treatmentPlan}
                    </p>
                    <p className="text-[#333333] mb-4">
                      <span className="font-medium text-[#4CAF50]">治疗效果:</span> {caseItem.effect}
                    </p>
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
            
            <div className="text-center mt-12">
              <Link 
                to="/cases" 
                className="inline-block border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white px-8 py-3 rounded-full transition-colors"
              >
                查看更多案例
              </Link>
            </div>
          </div>
        </section>
        
        {/* Patient Reviews Section */}
        <section className="py-16 bg-[#F5F5DC] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-24 bg-white"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4CAF50]/10 rounded-full"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#8B4513]/10 rounded-full"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-star mr-2 text-[#4CAF50]"></i>患者评价
              </h2>
              <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
              <p className="text-[#333333] max-w-2xl mx-auto">
                听听患者的真实反馈，了解我们的治疗效果和服务质量
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#4CAF50]/20 flex items-center justify-center mr-4">
                      <i className="fa-solid fa-user text-[#4CAF50] text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#8B4513]">{review.patientName}</h4>
                      <p className="text-sm text-[#333333]">{review.disease} · {review.treatmentPeriod}</p>
                    </div>
                  </div>
                  
                  {/* Rating stars */}
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <p className="text-sm text-[#333333] mb-1">疗效:</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fa-solid fa-star ${i < review.rating.effectiveness ? 'text-yellow-400' : 'text-gray-300'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <div className="mr-4">
                      <p className="text-sm text-[#333333] mb-1">服务:</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fa-solid fa-star ${i < review.rating.serviceAttitude ? 'text-yellow-400' : 'text-gray-300'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#333333] mb-1">环境:</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fa-solid fa-star ${i < review.rating.environment ? 'text-yellow-400' : 'text-gray-300'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[#333333] italic mb-4">"{review.content}"</p>
                  
                  {/* Doctor's reply if exists */}
                  {review.reply && (
                    <div className="bg-[#F5F5DC] p-3 rounded-lg text-sm text-[#333333]">
                      <p className="font-medium text-[#4CAF50] mb-1">医生回复:</p>
                      <p>{review.reply}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Health Articles Preview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#8B4513] mb-4">
                <i className="fa-solid fa-book-medical mr-2 text-[#4CAF50]"></i>健康科普
              </h2>
              <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
              <p className="text-[#333333] max-w-2xl mx-auto">
                中医养生知识，颈椎保健操，食疗方推荐，助您远离颈肩腰腿痛
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: 'a1',
                  title: '颈椎保健操，远离颈椎病',
                  category: '养生保健',
                  summary: '介绍简单有效的颈椎保健操，帮助预防和缓解颈椎病',
                  imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E9%A2%88%E6%A4%8E%E4%BF%9D%E5%81%A5%E6%93%8D%2C%E4%BA%BA%E7%89%A9%E6%BC%94%E7%A4%BA%E9%A2%88%E6%A4%8E%E8%BF%90%E5%8A%A8%2C%E6%B8%85%E6%99%B0%E5%8A%A8%E4%BD%9C%E6%8C%87%E5%AF%BC&sign=02b543c65a258944dee754b040f4a132',
                  publishDate: '2024-01-15',
                  readCount: 2356
                },
                {
                  id: 'a2',
                  title: '中医食疗方，缓解腰背痛',
                  category: '食疗养生',
                  summary: '介绍几款缓解腰背痛的中医食疗方，简单易做，效果显著',
                  imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E4%B8%AD%E5%8C%BB%E9%A3%9F%E7%96%97%2C%E8%8D%AF%E8%86%B3%2C%E7%BC%93%E8%A7%A3%E8%85%B0%E8%83%8C%E7%97%9B%E7%9A%84%E9%A3%9F%E7%89%A9%2C%E5%81%A5%E5%BA%B7%E9%A5%AE%E9%A3%9F&sign=0153af233cf51d7e850a625bd4d4ad89',
                  publishDate: '2024-02-20',
                  readCount: 1876
                },
                {
                  id: 'a3',
                  title: '办公室人群如何预防颈肩腰腿痛',
                  category: '健康指南',
                  summary: '针对办公室人群，介绍预防颈肩腰腿痛的实用方法',
                  imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E5%8A%9E%E5%85%AC%E5%AE%A4%E5%81%A5%E5%BA%B7%2C%E6%AD%A3%E7%A1%AE%E5%9D%90%E5%A7%BF%2C%E9%A2%84%E9%98%B2%E9%A2%88%E8%82%A9%E8%83%8C%E7%97%9B%2C%E5%8A%9E%E5%85%AC%E7%8E%AF%E5%A2%83&sign=4295eea99e3175d6f0a6aa574151ccda',
                  publishDate: '2024-03-05',
                  readCount: 3245
                }
              ].map((article) => (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-[#F5F5DC] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-[#4CAF50] text-white text-xs px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        <i className="fa-solid fa-eye mr-1"></i> {article.readCount}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#8B4513] mb-3 hover:text-[#4CAF50] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[#333333] mb-4 flex-grow">
                      {article.summary}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm text-gray-500">
                        <i className="fa-solid fa-calendar mr-1"></i> {article.publishDate}
                      </span>
                      <Link 
                        to={`/articles/${article.id}`} 
                        className="text-[#4CAF50] hover:text-[#388E3C] font-medium text-sm transition-colors"
                      >
                        阅读全文 <i className="fa-solid fa-angle-right ml-1"></i>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/articles" 
                className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-full transition-colors"
              >
                查看更多文章
              </Link>
            </div>
          </div>
        </section>
        
        {/* Appointment CTA Section */}
        <section className="py-20 bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80%E5%80%99%E8%AF%8A%E5%8C%BA%2C%E5%AE%89%E9%9D%99%E8%88%92%E9%80%82%2C%E6%B8%A9%E9%A6%A8%E7%8E%AF%E5%A2%83%2C%E4%BC%A0%E7%BB%9F%E4%B8%AD%E5%8C%BB%E5%85%83%E7%B4%A0&sign=6b9f4cab46493497ea7fb75516d022cd)'
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              准备好开始您的康复之旅了吗？
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
            >
              立即预约，让我们的中医专家为您提供专业的诊疗服务，摆脱颈肩腰腿痛的困扰
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                to="/appointment" 
                className="bg-[#D32F2F] hover:bg-[#b71c1c] text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 inline-block"
              >  
                在线预约 <i className="fa-solid fa-calendar-check ml-2"></i>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}