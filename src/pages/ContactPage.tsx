import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClinicInfo } from '@/types';
import { getClinicInfo } from '@/services/settingsApi';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch clinic information
    const fetchClinicInfo = async () => {
      try {
        const data = await getClinicInfo();
        setClinicInfo(data);
      } catch (error) {
        console.error('Failed to fetch clinic information:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClinicInfo();
    
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
  
  if (!clinicInfo) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <p className="text-[#333333]">无法加载诊所信息</p>
      </div>
    );
  }
  


  // Generate map image URL with clinic location
  const mapPrompt = encodeURIComponent(`中国${clinicInfo.address}地图, 诊所位置标记, 清晰街道视图`);
  const mapImageUrl = `https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%24%7BmapPrompt%7D&sign=7906dbcda56790b5741d38c21b6122b5`;
  //const mapImageUrl = `https://ditu.google.com/maps?q=${mapPrompt}`;

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-address-card mr-2 text-[#4CAF50]"></i>联系方式
          </h1>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-8"></div>
          <p className="text-xl text-[#333333] max-w-2xl mx-auto">
            欢迎通过以下方式与我们联系，我们将竭诚为您服务
          </p>
        </section>
        
        {/* Contact Info Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map and Address */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <h2 className="text-2xl font-bold text-[#8B4513] p-6 border-b border-gray-100">
                  <i className="fa-solid fa-map-marker-alt mr-2 text-[#4CAF50]"></i>诊所位置
                </h2>
                <div className="aspect-video relative">
                  <img 
                    src={mapImageUrl} 
                    alt="诊所位置地图" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#D32F2F] text-white p-3 rounded-full shadow-lg transform -translate-y-4">
                      <i className="fa-solid fa-location-dot text-xl"></i>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#333333] mb-2">
                    <i className="fa-solid fa-map-pin text-[#4CAF50] mr-2"></i>
                    {clinicInfo.address}
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
                  <i className="fa-solid fa-phone mr-2 text-[#4CAF50]"></i>联系方式
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#4CAF50]/10 p-3 rounded-full mr-4">
                      <i className="fa-solid fa-phone text-[#4CAF50] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#333333] mb-1">电话咨询</h3>
                      <p className="text-[#333333] mb-1">{clinicInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#4CAF50]/10 p-3 rounded-full mr-4">
                      <i className="fa-solid fa-clock text-[#4CAF50] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#333333] mb-2">营业时间</h3>
                      <div className="grid grid-cols-2 gap-2 text-[#333333]">
                        <p>周一至周五: {clinicInfo.businessHours.monday}</p>
                        <p>周六: {clinicInfo.businessHours.saturday}</p>
                        <p>周日: {clinicInfo.businessHours.sunday}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#4CAF50]/10 p-3 rounded-full mr-4">
                      <i className="fa-brands fa-weixin text-[#4CAF50] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#333333] mb-2">微信咨询</h3>
                      <div className="flex items-center">
                        <div className="bg-white p-2 rounded-lg shadow-md border border-gray-100 mr-4">
                          <img 
                            src={"/wx.png"} 
                            alt="微信公众号二维码" 
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-[#333333] mb-1">扫码关注微信号</p>
                          <p className="text-sm text-gray-500">获取更多健康资讯</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Appointment CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-calendar-check mr-2 text-[#4CAF50]"></i>预约就诊
          </h2>
          <p className="text-[#333333] text-lg mb-8 max-w-2xl mx-auto">
            如需就诊，请提前预约。您可以通过电话、微信或在线预约系统进行预约
          </p>
          <a 
            href="/appointment" 
            className="inline-block bg-[#D32F2F] hover:bg-[#b71c1c] text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105"
          >
            在线预约 <i className="fa-solid fa-arrow-right ml-2"></i>
          </a>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
