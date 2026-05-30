import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getDiseases, getTreatmentMethods, getCases, getArticles } from '@/services/api';
import { Disease, Treatment, Case, Article } from '@/types';

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'diseases' | 'treatments' | 'cases' | 'articles'>('diseases');
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const [diseasesData, treatmentsData, casesData, articlesData] = await Promise.all([
          getDiseases(),
          getTreatmentMethods(),
          getCases(),
          getArticles()
        ]);
        
        setDiseases(diseasesData);
        setTreatments(treatmentsData);
        setCases(casesData);
        setArticles(articlesData);
      } catch (error) {
        console.error('加载内容数据失败:', error);
        toast.error('加载内容数据失败');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const tabs = [
    { id: 'diseases', name: '疾病管理', icon: 'fa-solid fa-disease', count: diseases.length },
    { id: 'treatments', name: '治疗方法', icon: 'fa-solid fa-hand-holding-medical', count: treatments.length },
    { id: 'cases', name: '康复案例', icon: 'fa-solid fa-folder-open', count: cases.length },
    { id: 'articles', name: '健康文章', icon: 'fa-solid fa-newspaper', count: articles.length }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-[#333333]">内容管理</h1>
        <p className="text-gray-600 mt-2">管理网站的所有内容，包括疾病、治疗方法、案例和文章</p>
      </div>

      {/* 标签页 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-[#4CAF50] text-[#4CAF50]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.name}</span>
                <span className="bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* 疾病管理 */}
          {activeTab === 'diseases' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">疾病管理</h3>
                <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#388E3C] transition-colors">
                  <i className="fa-solid fa-plus mr-2"></i>
                  添加疾病
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {diseases.map((disease, index) => (
                  <motion.div
                    key={disease.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#4CAF50] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{disease.name}</h4>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{disease.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {disease.symptoms.slice(0, 3).map((symptom, idx) => (
                        <span key={idx} className="bg-[#4CAF50] text-white text-xs px-2 py-1 rounded">
                          {symptom}
                        </span>
                      ))}
                      {disease.symptoms.length > 3 && (
                        <span className="text-xs text-gray-500">+{disease.symptoms.length - 3}个</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 治疗方法管理 */}
          {activeTab === 'treatments' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">治疗方法管理</h3>
                <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#388E3C] transition-colors">
                  <i className="fa-solid fa-plus mr-2"></i>
                  添加治疗方法
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {treatments.map((treatment, index) => (
                  <motion.div
                    key={treatment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#4CAF50] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{treatment.name}</h4>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{treatment.description}</p>
                    <div className="mt-3">
                      <span className="text-xs text-gray-500">适用症状: </span>
                      <span className="text-sm text-gray-700">{treatment.suitableSymptoms.join(', ')}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 康复案例管理 */}
          {activeTab === 'cases' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">康复案例管理</h3>
                <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#388E3C] transition-colors">
                  <i className="fa-solid fa-plus mr-2"></i>
                  添加案例
                </button>
              </div>
              
              <div className="space-y-4">
                {cases.map((caseItem, index) => (
                  <motion.div
                    key={caseItem.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#4CAF50] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{caseItem.patientName}</h4>
                        <p className="text-sm text-gray-500">{caseItem.disease}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{caseItem.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">治疗时间: {caseItem.treatmentDuration}</span>
                      <span className="text-xs text-gray-500">康复程度: {caseItem.recoveryLevel}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 健康文章管理 */}
          {activeTab === 'articles' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">健康文章管理</h3>
                <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#388E3C] transition-colors">
                  <i className="fa-solid fa-plus mr-2"></i>
                  添加文章
                </button>
              </div>
              
              <div className="space-y-4">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#4CAF50] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{article.title}</h4>
                        <p className="text-sm text-gray-500">{article.author} • {article.publishDate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{article.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-[#4CAF50] text-white text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{article.tags.length - 3}个标签</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 