import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getSiteSettings } from '@/services/settingsApi';
import { SiteSettings } from '@/types';

interface HeaderProps {
  isScrolled?: boolean;
}

export default function Header({ isScrolled = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteInfo, setSiteInfo] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSiteInfo(data);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) return null;

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled 
        ? "bg-white/90 backdrop-blur-md shadow-md py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {siteInfo?.logoUrl && (
              <img 
                src={"/logo3.png"} 
                alt="Logo" 
                className="h-10 w-auto"
              />
            )}
            <span className="text-xl font-bold text-[#4CAF50]">
              {siteInfo?.siteName || "中医诊所"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
            >
              首页
            </Link>
            <Link 
              to="/about" 
              className="text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
            >
              关于医生
            </Link>
              <div className="relative group">
                <button className="flex items-center text-[#333333] hover:text-[#4CAF50] transition-colors font-medium">
                  专长病症
                  <i className="fa-solid fa-chevron-down ml-1 text-xs"></i>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link 
                    to="/diseases/颈椎病" 
                    className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#F5F5DC] hover:text-[#4CAF50]"
                  >
                    颈椎病
                  </Link>
                  <Link 
                    to="/diseases/腰背痛" 
                    className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#F5F5DC] hover:text-[#4CAF50]"
                  >
                    腰背痛
                  </Link>
                  <Link 
                    to="/diseases/椎间盘突出" 
                    className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#F5F5DC] hover:text-[#4CAF50]"
                  >
                    椎间盘突出
                  </Link>
                  <Link 
                    to="/diseases/坐骨神经痛" 
                    className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#F5F5DC] hover:text-[#4CAF50]"
                  >
                    坐骨神经痛
                  </Link>
                  <Link 
                    to="/diseases/风湿痛风" 
                    className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#F5F5DC] hover:text-[#4CAF50]"
                  >
                    风湿痛风
                  </Link>
                  <Link 
                    to="/self-diagnosis" 
                    className="block px-4 py-2 text-sm text-[#D32F2F] hover:bg-[#F5F5DC] font-medium"
                  >
                    <i className="fa-solid fa-stethoscope mr-1"></i> 病症自测
                  </Link>
                </div>
              </div>
            <Link 
              to="/treatments" 
              className="text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
            >
              治疗方法
            </Link>
            <Link 
              to="/cases" 
              className="text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
            >
              康复案例
            </Link>
            <Link 
              to="/articles" 
              className="text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
            >
              健康科普
            </Link>
            <Link 
              to="/contact" 
              className="text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
            >
              联系方式
            </Link>
            <Link 
              to="/appointment" 
              className="bg-[#D32F2F] hover:bg-[#b71c1c] text-white px-5 py-2 rounded-full transition-colors font-medium"
            >
              在线预约
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#333333] hover:text-[#4CAF50]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              关于医生
            </Link>
            <div>
              <button className="flex items-center justify-between w-full py-2 text-[#333333] hover:text-[#4CAF50] transition-colors font-medium">
                <span>专长病症</span>
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </button>
              <div className="pl-4 mt-1 space-y-2">
                <Link 
                  to="/diseases/颈椎病" 
                  className="block py-1 text-sm text-[#333333] hover:text-[#4CAF50]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  颈椎病
                </Link>
                <Link 
                  to="/diseases/腰背痛" 
                  className="block py-1 text-sm text-[#333333] hover:text-[#4CAF50]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  腰背痛
                </Link>
                <Link 
                  to="/diseases/椎间盘突出" 
                  className="block py-1 text-sm text-[#333333] hover:text-[#4CAF50]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  椎间盘突出
                </Link>
                <Link 
                  to="/diseases/坐骨神经痛" 
                  className="block py-1 text-sm text-[#333333] hover:text-[#4CAF50]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  坐骨神经痛
                </Link>
                <Link 
                  to="/diseases/风湿痛风" 
                  className="block py-1 text-sm text-[#333333] hover:text-[#4CAF50]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  风湿痛风
                </Link>
              </div>
            </div>
            <Link 
              to="/treatments" 
              className="block py-2 text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              治疗方法
            </Link>
            <Link 
              to="/cases" 
              className="block py-2 text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              康复案例
            </Link>
            <Link 
              to="/articles" 
              className="block py-2 text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              健康科普
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-[#333333] hover:text-[#4CAF50] transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              联系方式
            </Link>
            <Link 
              to="/appointment" 
              className="block bg-[#D32F2F] hover:bg-[#b71c1c] text-white text-center px-5 py-3 rounded-full transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              在线预约
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}