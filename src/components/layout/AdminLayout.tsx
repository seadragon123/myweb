import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast.success('已成功退出登录');
    navigate('/admin/login');
  };
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`bg-[#4CAF50] text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } fixed h-full z-30`}
      >
        <div className="flex items-center justify-between p-3 border-b border-white/20">
          <h1 className={`font-bold text-lg ${!isSidebarOpen && 'hidden'}`}>
            中医诊所管理系统
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:text-gray-200"
            aria-label="Toggle sidebar"
          >
            <i className={`fa-solid ${isSidebarOpen ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
          </button>
        </div>
        
        <nav className="mt-5">
          <ul>
            <li className="mb-1">
              <Link 
                to="/admin" 
                className="flex items-center p-3 hover:bg-[#388E3C] transition-colors text-sm"
              >
                <i className="fa-solid fa-tachometer-alt w-5 text-center"></i>
                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                  仪表盘
                </span>
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                to="/admin/content" 
                className="flex items-center p-3 hover:bg-[#388E3C] transition-colors text-sm"
              >
                <i className="fa-solid fa-file-text w-5 text-center"></i>
                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                  内容管理
                </span>
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                to="/admin/diagnosis" 
                className="flex items-center p-3 hover:bg-[#388E3C] transition-colors text-sm"
              >
                <i className="fa-solid fa-stethoscope w-5 text-center"></i>
                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                  自测管理
                </span>
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                to="/admin/appointments" 
                className="flex items-center p-3 hover:bg-[#388E3C] transition-colors text-sm"
              >
                <i className="fa-solid fa-calendar-check w-5 text-center"></i>
                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                  预约管理
                </span>
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                to="/admin/reviews" 
                className="flex items-center p-3 hover:bg-[#388E3C] transition-colors text-sm"
              >
                <i className="fa-solid fa-star w-5 text-center"></i>
                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                  评价管理
                </span>
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                to="/admin/settings" 
                className="flex items-center p-3 hover:bg-[#388E3C] transition-colors text-sm"
              >
                <i className="fa-solid fa-cog w-5 text-center"></i>
                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                  网站设置
                </span>
              </Link>
            </li>
            <li className="mb-1 mt-8">
              <button 
                onClick={handleLogout}
                className="flex items-center w-full p-3 hover:bg-[#388E3C] transition-colors text-left text-sm"
              >
                <i className="fa-solid fa-sign-out-alt w-5 text-center"></i>
                <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>
                  退出登录
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} flex-1 min-h-screen flex flex-col`}>
        {/* Header */}
        <header className="bg-white shadow-sm p-3 flex justify-between items-center sticky top-0 z-20">
          <h2 className="text-lg font-semibold text-[#333333]">
            <Outlet />
          </h2>
          <div className="flex items-center space-x-4">
            <button className="text-[#4CAF50] hover:text-[#388E3C]">
              <i className="fa-solid fa-bell text-lg"></i>
            </button>
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                <i className="fa-solid fa-user text-gray-600 text-sm"></i>
              </div>
              <span className="text-[#333333] hidden md:inline text-sm">管理员</span>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}