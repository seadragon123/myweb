import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Article } from '@/types';
import { getArticles } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    // Handle scroll events for header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Fetch articles
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(articles.map(article => article.category)))];
  
  // Filter articles by category
  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);
  
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
            <i className="fa-solid fa-book-medical mr-2 text-[#4CAF50]"></i>健康科普
          </h1>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-8"></div>
          <p className="text-xl text-[#333333] max-w-2xl mx-auto">
            中医养生知识，颈椎保健操，食疗方推荐，助您远离颈肩腰腿痛
          </p>
        </section>
        
        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-[#4CAF50] text-white'
                    : 'bg-white text-[#333333] hover:bg-[#F5F5DC]'
                }`}
              >
                {category === 'all' ? '全部文章' : category}
              </button>
            ))}
          </div>
        </section>
        
        {/* Articles Grid */}
        <section className="mb-20">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
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
                    <h2 className="text-xl font-bold text-[#8B4513] mb-3 hover:text-[#4CAF50] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[#333333] mb-4 flex-grow">
                      {article.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, i) => (
                        <span key={i} className="bg-[#F5F5DC] text-[#333333] text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center text-sm text-gray-500">
                        <i className="fa-solid fa-user mr-1"></i>
                        <span>{article.author}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        <i className="fa-solid fa-calendar mr-1"></i> {article.publishDate}
                      </span>
                    </div>
                    <Link 
                      to={`/articles/${article.id}`} 
                      className="inline-block mt-4 text-[#4CAF50] hover:text-[#388E3C] font-medium transition-colors"
                    >
                      阅读全文 <i className="fa-solid fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-[#F5F5DC] rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-file-text text-3xl text-[#4CAF50]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#8B4513] mb-2">暂无相关文章</h3>
              <p className="text-[#333333] mb-6">
                该分类下暂无文章，敬请期待
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-2 rounded-lg transition-colors"
              >
                查看全部文章
              </button>
            </div>
          )}
        </section>
        
        {/* Newsletter Section */}
        <section className="mb-16">
          <div className="bg-[#4CAF50] rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-10"
                 style={{
                   backgroundImage: 'url(https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%E4%B8%AD%E5%8C%BB%E5%8C%BB%E7%94%9F%E5%92%8C%E6%82%A3%E8%80%85%E4%BA%A4%E6%B5%81%2C%E5%81%A5%E5%BA%B7%E7%9F%A5%E8%AF%86%2C%E6%B8%A9%E9%A6%A8%E6%B0%9B%E5%9B%B4&sign=9314efb84836ca2df37a93d0821d4554)'
                 }}
            ></div>
            
            <div className="relative z-10 p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">订阅健康资讯</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                订阅我们的健康资讯，定期获取中医养生知识、颈椎保健方法和食疗推荐
              </p>

            {/* 微信二维码 */}
              <div className="mt-6" >
                <p className="text-lg text-[#ffffff] mb-2">微信公众号</p>
                <img 
                  src={"/gzh.png"} 
                  alt="WeChat QR Code" 
                  className="w-24 h-24 object-contain border-2 border-white shadow-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}