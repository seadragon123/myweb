import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getSelfDiagnosisQuestions } from '@/services/api';
import { SelfDiagnosisQuestion } from '@/types';

export default function DiagnosisManagement() {
  const [questions, setQuestions] = useState<SelfDiagnosisQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<SelfDiagnosisQuestion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 加载症状问题数据
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const data = await getSelfDiagnosisQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('加载症状问题失败:', error);
        toast.error('加载症状问题失败');
      } finally {
        setLoading(false);
      }
    };
    
    loadQuestions();
  }, []);
  
  // 处理编辑问题
  const handleEdit = (question: SelfDiagnosisQuestion) => {
    setEditingQuestion({...question});
    setIsModalOpen(true);
  };
  
  // 处理保存问题
  const handleSave = () => {
    if (!editingQuestion) return;
    
    // 在实际应用中，这里应该调用API保存修改
    setQuestions(questions.map(q => 
      q.id === editingQuestion.id ? editingQuestion : q
    ));
    
    toast.success('症状问题更新成功');
    setIsModalOpen(false);
    setEditingQuestion(null);
  };
  
  // 处理取消编辑
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };
  
  // 处理问题选项变更
  const handleOptionChange = (index: number, value: string) => {
    if (!editingQuestion) return;
    
    const newOptions = [...editingQuestion.options];
    newOptions[index].label = value;
    
    setEditingQuestion({
      ...editingQuestion,
      options: newOptions
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] mb-4"></div>
          <p className="text-[#333333]">加载中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#333333]">症状与辨证规则管理</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-[#8B4513]">症状问题管理</h3>
          <p className="text-gray-600">管理病症自测中的问题和选项</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {questions.map((question, index) => (
            <motion.div 
              key={question.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-[#333333] mb-2">
                    步骤 {index + 1}: {question.question}
                  </h4>
                  <div className="ml-4 space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div key={option.id} className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] mr-3">
                          {optIndex + 1}
                        </span>
                        <span className="text-gray-700">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(question)}
                  className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-colors"
                >
                  <i className="fa-solid fa-edit mr-1"></i> 编辑
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* 辨证规则管理 */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-[#8B4513]">辨证规则管理</h3>  
          <p className="text-gray-600">管理症状组合与证型的对应关系</p>
        </div>
        
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4CAF50]/10 rounded-full mb-4">
            <i className="fa-solid fa-sitemap text-2xl text-[#4CAF50]"></i>
          </div>
          <h4 className="text-xl font-medium text-[#333333] mb-2">辨证规则配置</h4>
          <p className="text-gray-600 mb-6">根据症状组合自动判断证型的规则设置</p>
          <button className="px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-colors">
            <i className="fa-solid fa-plus mr-2"></i> 添加辨证规则
          </button>
        </div>
      </div>
      
      {/* 编辑模态框 */}
      {isModalOpen && editingQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#8B4513]">编辑症状问题</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">问题文本</label>
                <input
                  type="text"
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({
                    ...editingQuestion,
                    question: e.target.value
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">问题选项</label>
                {editingQuestion.options.map((option, index) => (
                  <div key={option.id} className="flex items-center mb-3">
                    <span className="w-6 h-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] mr-3">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}