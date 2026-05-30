import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAppointments, getReviews, getCases } from '@/services/api';
import { Appointment, Review, Case } from '@/types';

export default function Dashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [appointmentsData, reviewsData, casesData] = await Promise.all([
          getAppointments(),
          getReviews(),
          getCases()
        ]);
        
        setAppointments(appointmentsData);
        setReviews(reviewsData);
        setCases(casesData);
      } catch (error) {
        console.error('加载仪表盘数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed').length;
  const totalAppointments = appointments.length;
  const totalReviews = reviews.length;
  const totalCases = cases.length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-xl font-bold text-[#333333]">仪表盘</h1>
        <p className="text-gray-600 mt-1 text-sm">欢迎使用中医诊所管理系统</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <i className="fa-solid fa-clock text-yellow-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600">待确认预约</p>
              <p className="text-xl font-bold text-gray-900">{pendingAppointments}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <i className="fa-solid fa-calendar-check text-blue-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600">已确认预约</p>
              <p className="text-xl font-bold text-gray-900">{confirmedAppointments}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <i className="fa-solid fa-star text-green-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600">患者评价</p>
              <p className="text-xl font-bold text-gray-900">{totalReviews}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <i className="fa-solid fa-folder-open text-purple-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-600">康复案例</p>
              <p className="text-xl font-bold text-gray-900">{totalCases}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 最近预约 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">最近预约</h3>
          </div>
          <div className="p-6">
            {appointments.slice(0, 5).map((appointment, index) => (
              <div key={appointment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                    <p className="text-xs text-gray-500">{appointment.appointmentDate} {appointment.appointmentTime}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {appointment.status === 'pending' ? '待确认' :
                   appointment.status === 'confirmed' ? '已确认' :
                   appointment.status === 'completed' ? '已完成' : '已取消'}
                </span>
              </div>
            ))}
            {appointments.length === 0 && (
              <div className="text-center py-8">
                <i className="fa-solid fa-calendar-times text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-500">暂无预约数据</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">最近评价</h3>
          </div>
          <div className="p-6">
            {reviews.slice(0, 5).map((review, index) => (
              <div key={review.id} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{review.patientName}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{review.content}</p>
                  </div>
                </div>
                <div className="flex items-center ml-2">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star text-xs ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-8">
                <i className="fa-solid fa-star text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-500">暂无评价数据</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 快速操作 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">快速操作</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-[#4CAF50] hover:bg-green-50 transition-colors">
              <i className="fa-solid fa-calendar-check text-2xl text-[#4CAF50] mb-2"></i>
              <span className="text-sm font-medium text-gray-700">预约管理</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-[#4CAF50] hover:bg-green-50 transition-colors">
              <i className="fa-solid fa-star text-2xl text-[#4CAF50] mb-2"></i>
              <span className="text-sm font-medium text-gray-700">评价管理</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-[#4CAF50] hover:bg-green-50 transition-colors">
              <i className="fa-solid fa-stethoscope text-2xl text-[#4CAF50] mb-2"></i>
              <span className="text-sm font-medium text-gray-700">自测管理</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-[#4CAF50] hover:bg-green-50 transition-colors">
              <i className="fa-solid fa-cog text-2xl text-[#4CAF50] mb-2"></i>
              <span className="text-sm font-medium text-gray-700">网站设置</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 