import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center px-4">
          <div className="w-32 h-32 bg-[#4CAF50]/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-5xl font-bold text-[#4CAF50]">404</span>
          </div>
          
          <h1 className="text-4xl font-bold text-[#8B4513] mb-4">页面未找到</h1>
          <p className="text-[#333333] text-lg mb-8 max-w-md mx-auto">
            抱歉，您访问的页面不存在或已被移动。请检查您输入的网址是否正确。
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-3 rounded-full text-center font-medium transition-colors"
            >
              返回首页 <i className="fa-solid fa-home ml-2"></i>
            </Link>
            <Link 
              to="/contact" 
              className="bg-white border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/5 px-8 py-3 rounded-full text-center font-medium transition-colors"
            >
              联系我们 <i className="fa-solid fa-envelope ml-2"></i>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}