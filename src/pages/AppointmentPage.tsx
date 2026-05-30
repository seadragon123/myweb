import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { createAppointment, getAvailableTimeSlots } from '@/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Validation schema
const appointmentSchema = z.object({
  name: z.string().min(2, '姓名至少2个字符').max(20, '姓名不能超过20个字符'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号码'),
  diseaseDescription: z.string().min(5, '请简要描述您的症状').max(200, '描述不能超过200个字符'),
  appointmentDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: '请选择有效的日期',
  }),
  appointmentTime: z.string().min(1, '请选择预约时间')
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function AppointmentPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Initialize form with validation
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      phone: '',
      diseaseDescription: '',
      appointmentDate: format(new Date(), 'yyyy-MM-dd'),
      appointmentTime: ''
    }
  });
  
  // Watch appointmentDate changes
  const appointmentDate = watch('appointmentDate');
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fetch available time slots
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        setLoading(true);
        const slots = await getAvailableTimeSlots();
        setAvailableTimeSlots(slots);
      } catch (error) {
        console.error('Failed to fetch time slots:', error);
        toast.error('获取可预约时间段失败');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTimeSlots();
  }, []);
  
  // Update selectedDate when form date changes
  useEffect(() => {
    if (appointmentDate) {
      setSelectedDate(parseISO(appointmentDate));
    }
  }, [appointmentDate]);
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const startDate = today;
    const endDate = addDays(today, 14); // Show next 14 days
    
    // Disable past dates and Sundays
    for (let i = 0; i < 14; i++) {
      const currentDate = addDays(startDate, i);
      const dayOfWeek = currentDate.getDay();
      const isDisabled = currentDate < today || dayOfWeek === 0; // Disable Sundays (0 is Sunday)
      
      days.push(
        <button
          key={i}
          onClick={() => {
            if (!isDisabled) {
              const dateStr = format(currentDate, 'yyyy-MM-dd');
              reset({...watch(), appointmentDate: dateStr});
            }
          }}
          disabled={isDisabled}
          className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-colors ${
            isSameDay(currentDate, parseISO(appointmentDate))
              ? 'bg-[#4CAF50] text-white font-bold'
              : isDisabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'hover:bg-[#F5F5DC] text-[#333333]'
          }`}
        >
          <span>{format(currentDate, 'd')}</span>
          <span className="text-xs">{['日', '一', '二', '三', '四', '五', '六'][dayOfWeek]}</span>
        </button>
      );
    }
    
    return days;
  };
  
  // Handle form submission
  const onSubmit = async (data: AppointmentFormData) => {
    try {
      setSubmitting(true);
      
      // Submit appointment
      const newAppointment = await createAppointment(data);
      
      if (newAppointment) {
        // Show success message
        toast.success('预约提交成功！我们将尽快与您联系确认');
        setShowSuccessModal(true);
        
        // Reset form after successful submission
        reset({
          name: '',
          phone: '',
          diseaseDescription: '',
          appointmentDate: format(new Date(), 'yyyy-MM-dd'),
          appointmentTime: ''
        });
        
        // Close modal after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);
      } else {
        toast.error('预约提交失败，请稍后重试');
      }
    } catch (error) {
      console.error('Appointment submission error:', error);
      toast.error('预约提交失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Generate calendar header with month/year
  const renderCalendarHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#8B4513]">
          {format(parseISO(appointmentDate), 'yyyy年MM月')}
        </h3>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <Header isScrolled={isScrolled} />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-6">
            <i className="fa-solid fa-calendar-check mr-2 text-[#4CAF50]"></i>在线预约
          </h1>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-8"></div>
          <p className="text-xl text-[#333333] max-w-2xl mx-auto">
            请填写以下信息进行预约，我们将尽快与您联系确认
          </p>
        </section>
        
        {/* Appointment Form Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Calendar Sidebar */}
              <div className="lg:col-span-2 bg-[#F5F5DC] p-6">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
                  <i className="fa-solid fa-calendar mr-2 text-[#4CAF50]"></i>选择日期和时间
                </h2>
                
                {/* Calendar */}
                <div className="mb-8">
                  {renderCalendarHeader()}
                  
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500">
                        {day === '日' ? <span className="text-[#D32F2F]">{day}</span> : day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {generateCalendarDays()}
                  </div>
                </div>
                
                {/* Time Slots */}
                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-4">
                    <i className="fa-solid fa-clock mr-2 text-[#4CAF50]"></i>可预约时间段
                  </h3>
                  
                  {loading ? (
                    <div className="flex justify-center py-6">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#4CAF50]"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimeSlots.map((time) => (
                        <label 
                          key={time}
                          className={`border rounded-lg p-2 text-center cursor-pointer transition-colors ${
                            watch('appointmentTime') === time
                              ? 'border-[#4CAF50] bg-[#4CAF50]/10 text-[#4CAF50] font-medium'
                              : 'border-gray-200 hover:border-[#4CAF50] hover:bg-[#F5F5DC]'
                          }`}
                        >
                          <input
                            type="radio"
                            {...register('appointmentTime')}
                            value={time}
                            className="sr-only"
                          />
                          <span>{time}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {errors.appointmentTime && (
                    <p className="mt-2 text-sm text-red-600">{errors.appointmentTime.message}</p>
                  )}
                </div>
              </div>
              
              {/* Appointment Form */}
              <div className="lg:col-span-3 p-8">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
                  <i className="fa-solid fa-user-pen mr-2 text-[#4CAF50]"></i>预约信息
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-1">
                      姓名 <span className="text-[#D32F2F]">*</span>
                    </label>
                    <div className="relative">  
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fa-solid fa-user text-gray-400"></i>
                      </div>
                      <input
                        id="name"
                        type="text"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                        {...register('name')}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#333333] mb-1">
                      手机号码 <span className="text-[#D32F2F]">*</span>
                    </label>
                    <div className="relative">  
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fa-solid fa-phone text-gray-400"></i>
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                        {...register('phone')}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  {/* Disease Description Field */}
                  <div>
                    <label htmlFor="diseaseDescription" className="block text-sm font-medium text-[#333333] mb-1">
                      症状描述 <span className="text-[#D32F2F]">*</span>
                    </label>
                    <div className="relative">  
                      <div className="absolute top-3 left-3 text-gray-400">
                        <i className="fa-solid fa-file-text"></i>
                      </div>
                      <textarea
                        id="diseaseDescription"
                        rows={4}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                        placeholder="请简要描述您的症状或就诊需求..."
                        {...register('diseaseDescription')}
                      ></textarea>
                    </div>
                    {errors.diseaseDescription && (
                      <p className="mt-1 text-sm text-red-600">{errors.diseaseDescription.message}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">请简要描述您的主要症状，以便医生提前了解您的情况</p>
                  </div>
                  
                  {/* Selected Date and Time Summary */}
                  <div className="bg-[#F5F5DC] p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-[#333333] mb-2">
                      <i className="fa-solid fa-info-circle text-[#4CAF50] mr-2"></i>预约信息确认
                    </h3>
                    <p className="text-[#333333]">
                      <span className="font-medium">日期：</span>
                      {appointmentDate ? format(parseISO(appointmentDate), 'yyyy年MM月dd日') : '未选择'}
                    </p>
                    <p className="text-[#333333]">
                      <span className="font-medium">时间：</span>
                      {watch('appointmentTime') || '未选择'}
                    </p>
                  </div>
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      {submitting ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                          提交中...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-paper-plane mr-2"></i>
                          提交预约
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Appointment Notes Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">
              <i className="fa-solid fa-exclamation-circle mr-2 text-[#4CAF50]"></i>预约须知
            </h2>
            <ul className="space-y-2 text-[#333333]">
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                <span>预约提交后，我们将在1个工作日内通过电话与您确认详情</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                <span>请提前15分钟到达诊所，携带有效身份证件</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                <span>如您需要取消或更改预约，请提前24小时联系我们</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-check-circle text-[#4CAF50] mt-1 mr-2"></i>
                <span>初诊患者建议预留1-1.5小时就诊时间</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-[#4CAF50]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-check text-4xl text-[#4CAF50]"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#8B4513] mb-2">预约成功！</h3>
              <p className="text-[#333333] mb-6">
                您的预约已提交成功，我们将尽快与您联系确认详情
              </p>
              <div className="bg-[#F5F5DC] p-4 rounded-lg text-left mb-6">
                <p className="text-[#333333] mb-1">
                  <span className="font-medium">预约日期：</span>
                  {format(parseISO(appointmentDate), 'yyyy年MM月dd日')}
                </p>
                <p className="text-[#333333]">
                  <span className="font-medium">预约时间：</span>
                  {watch('appointmentTime')}
                </p>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                确定
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <Footer />
    </div>
  );
}
