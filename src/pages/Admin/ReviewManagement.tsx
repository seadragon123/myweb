import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getReviews, updateReviewStatus, replyToReview } from '@/services/api';
import { Review } from '@/types';

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        console.error('加载评价数据失败:', error);
        toast.error('加载评价数据失败');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const handleStatusUpdate = async (id: string, status: Review['status']) => {
    try {
      await updateReviewStatus(id, status);
      setReviews(reviews.map(review => 
        review.id === id ? { ...review, status } : review
      ));
      toast.success('评价状态更新成功');
    } catch (error) {
      console.error('更新评价状态失败:', error);
      toast.error('更新评价状态失败');
    }
  };

  const handleReply = async () => {
    if (!selectedReview || !replyText.trim()) return;

    try {
      await replyToReview(selectedReview.id, replyText);
      setReviews(reviews.map(review => 
        review.id === selectedReview.id 
          ? { ...review, reply: replyText, replyDate: new Date().toISOString() }
          : review
      ));
      toast.success('回复成功');
      setShowReplyModal(false);
      setReplyText('');
      setSelectedReview(null);
    } catch (error) {
      console.error('回复失败:', error);
      toast.error('回复失败');
    }
  };

  const getStatusText = (status: Review['status']) => {
    const statusMap = {
      pending: '待审核',
      approved: '已通过',
      rejected: '已拒绝'
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Review['status']) => {
    const colorMap = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colorMap[status];
  };

  const filteredReviews = reviews.filter(review => 
    filterStatus === 'all' || review.status === filterStatus
  );

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#333333]">评价管理</h1>
          <p className="text-gray-600 mt-2">管理患者评价，审核和回复患者反馈</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
          >
            <option value="all">全部状态</option>
            <option value="pending">待审核</option>
            <option value="approved">已通过</option>
            <option value="rejected">已拒绝</option>
          </select>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <i className="fa-solid fa-star text-blue-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总评价数</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <i className="fa-solid fa-clock text-yellow-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">待审核</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <i className="fa-solid fa-check text-green-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已通过</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <i className="fa-solid fa-times text-red-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">已拒绝</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 评价列表 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">评价列表</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{review.patientName}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                      {getStatusText(review.status)}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-solid fa-star text-sm ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{review.content}</p>
                  
                  {review.reply && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="fa-solid fa-reply text-[#4CAF50]"></i>
                        <span className="text-sm font-medium text-gray-700">医生回复</span>
                        <span className="text-xs text-gray-500">{review.replyDate}</span>
                      </div>
                      <p className="text-gray-700">{review.reply}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>评分: {review.rating}/5</span>
                    <span>评价时间: {review.reviewDate}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(review.id, 'approved')}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        <i className="fa-solid fa-check mr-1"></i>
                        通过
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(review.id, 'rejected')}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        <i className="fa-solid fa-times mr-1"></i>
                        拒绝
                      </button>
                    </>
                  )}
                  
                  {!review.reply && (
                    <button
                      onClick={() => {
                        setSelectedReview(review);
                        setShowReplyModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <i className="fa-solid fa-reply mr-1"></i>
                      回复
                    </button>
                  )}
                  
                  <button className="text-gray-600 hover:text-gray-800 text-sm">
                    <i className="fa-solid fa-edit mr-1"></i>
                    编辑
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <i className="fa-solid fa-star text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-500">暂无评价数据</p>
          </div>
        )}
      </div>

      {/* 回复模态框 */}
      {showReplyModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">回复评价</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">患者: {selectedReview.patientName}</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedReview.content}</p>
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="请输入回复内容..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              rows={4}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowReplyModal(false);
                  setReplyText('');
                  setSelectedReview(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                取消
              </button>
              <button
                onClick={handleReply}
                className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C]"
              >
                发送回复
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 