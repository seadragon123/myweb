import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClinicInfo, SiteSettings } from '@/types';
import { getClinicInfo, getSiteSettings } from '@/services/settingsApi';


export default function Footer() {
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clinicData, siteData] = await Promise.all([
          getClinicInfo(),
          getSiteSettings()
        ]);
        setClinicInfo(clinicData);
        setSiteSettings(siteData);
      } catch (error) {
        console.error('Failed to fetch footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null;

  return (
    <footer className="bg-[#F5F5DC] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 诊所信息 */}
          <div>
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">诊所信息</h3>
            <p className="text-[#333333] mb-2">
              <i className="fa-solid fa-map-marker-alt mr-2 text-[#4CAF50]"></i>
              {clinicInfo?.address || "湖南省衡阳市蒸湘区白云路中心医院傍"}
            </p>
            <p className="text-[#333333] mb-2">
              <i className="fa-solid fa-phone mr-2 text-[#4CAF50]"></i>
              {clinicInfo?.phone || "010-12345678"}
            </p>
            <p className="text-[#333333] mb-4">
              <i className="fa-solid fa-envelope mr-2 text-[#4CAF50]"></i>
              {siteSettings?.contactEmail || "phl0@163.com"}
            </p>

          {/* 微信二维码 */}
             <div className="mt-6">
                <p className="text-sm text-[#333333] mb-2">彭医生在线问诊</p>
               {/* <img 
                  src={"https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80logo%2C%E7%BB%BF%E8%89%B2%E5%92%8C%E6%A3%95%E8%89%B2%E4%B8%BA%E4%B8%BB%E8%89%B2%E8%B0%83%2C%E5%8C%85%E5%90%AB%E4%B8%AD%E5%8C%BB%E5%85%83%E7%B4%A0&sign=1ddca83a5ad285e2aa3f6cf4953e089b"} 
                  alt="WeChat QR Code" 
                  className="w-24 h-24 object-contain border-2 border-white shadow-md"
                />
                */}

               <img
                 src="/jk.png"           
                 alt="WeChat QR Code"
                 className="w-24 h-24 object-contain border-2 border-white shadow-md"
                />
              </div>
           

          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>首页
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>关于医生
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>治疗方法
                </Link>
              </li>
              <li>
                <Link to="/cases" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>康复案例
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-[#333333] hover:text-[#4CAF50] transition-colors"><i className="fa-solid fa-angle-right mr-2 text-sm"></i>健康科普
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>联系方式
                </Link>
              </li>
            </ul>
          </div>

          {/* 专长病症 */}
          <div>
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">专长病症</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/diseases/颈椎病" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>颈椎病
                </Link>
              </li>
              <li>
                <Link to="/diseases/腰背痛" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>腰背痛
                </Link>
              </li>
              <li>
                <Link to="/diseases/椎间盘突出" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>椎间盘突出
                </Link>
              </li>
              <li>
                <Link to="/diseases/坐骨神经痛" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>坐骨神经痛
                </Link>
              </li>
              <li>
                <Link to="/diseases/风湿痛风" className="text-[#333333] hover:text-[#4CAF50] transition-colors">
                  <i className="fa-solid fa-angle-right mr-2 text-sm"></i>风湿痛风
                </Link>
              </li>
            </ul>
          </div>

          {/* 营业时间 */}
          <div>
            <h3 className="text-lg font-bold text-[#8B4513] mb-4">营业时间</h3>
            {clinicInfo?.businessHours && (
              <ul className="space-y-2 text-[#333333]">
                <li className="flex justify-between">
                  <span>周一</span>
                  <span>{clinicInfo.businessHours.monday}</span>
                </li>
                <li className="flex justify-between">
                  <span>周二</span>
                  <span>{clinicInfo.businessHours.tuesday}</span>
                </li>
                <li className="flex justify-between">
                  <span>周三</span>
                  <span>{clinicInfo.businessHours.wednesday}</span>
                </li>
                <li className="flex justify-between">
                  <span>周四</span>
                  <span>{clinicInfo.businessHours.thursday}</span>
                </li>
                <li className="flex justify-between">
                  <span>周五</span>
                  <span>{clinicInfo.businessHours.friday}</span>
                </li>
                <li className="flex justify-between">
                  <span>周六</span>
                  <span>{clinicInfo.businessHours.saturday}</span>
                </li>
                <li className="flex justify-between">
                  <span>周日</span>
                  <span>{clinicInfo.businessHours.sunday}</span>
                </li>
              </ul>
            )}
            
            </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-[#e0d8b0] pt-8 text-center text-[#333333] text-sm">
          <p>{siteSettings?.copyright || "© 2025 中医诊所 版权所有"}</p>
        </div>
      </div>
    </footer>
  );
}