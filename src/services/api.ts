import { 
  DoctorInfo, Disease, Treatment, Case, Article, 
  Appointment, Review, ClinicInfo, SiteSettings, User 
} from '@/types';
import { 
  doctorInfo, diseases, treatmentMethods, cases, articles, 
  appointments, reviews, clinicInfo, siteSettings, adminUser,
  selfDiagnosisQuestions, availableTimeSlots
} from '@/mock/data';

// 模拟API请求延迟
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// 获取医生信息
export const getDoctorInfo = async (): Promise<DoctorInfo> => {
  await delay();
  return { ...doctorInfo };
};

// 获取所有病症
export const getDiseases = async (): Promise<Disease[]> => {
  await delay();
  return [...diseases];
};

// 获取单个病症
export const getDiseaseById = async (id: string): Promise<Disease | undefined> => {
  await delay();
  return diseases.find(disease => disease.id === id);
};

// 获取治疗方法
export const getTreatmentMethods = async (): Promise<Treatment[]> => {
  await delay();
  return [...treatmentMethods];
};

// 获取康复案例
export const getCases = async (): Promise<Case[]> => {
  await delay();
  return [...cases];
};

// 获取单个案例
export const getCaseById = async (id: string): Promise<Case | undefined> => {
  await delay();
  return cases.find(caseItem => caseItem.id === id);
};

// 获取健康科普文章
export const getArticles = async (): Promise<Article[]> => {
  await delay();
  return [...articles];
};

// 获取单个文章
export const getArticleById = async (id: string): Promise<Article | undefined> => {
  await delay();
  return articles.find(article => article.id === id);
};

// 获取预约列表
export const getAppointments = async (): Promise<Appointment[]> => {
  await delay();
  return [...appointments];
};

// 创建预约
export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> => {
  await delay();
  const newAppointment: Appointment = {
    id: `ap${Date.now()}`,
    ...appointment,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  // 在实际应用中，这里应该将新预约保存到数据库
  // 这里使用本地存储模拟
  const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  storedAppointments.push(newAppointment);
  localStorage.setItem('appointments', JSON.stringify(storedAppointments));
  
  return newAppointment;
};

// 更新预约状态
export const updateAppointmentStatus = async (id: string, status: Appointment['status']): Promise<Appointment | null> => {
  await delay();
  
  // 在实际应用中，这里应该更新数据库中的预约状态
  // 这里使用本地存储模拟
  const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  const index = storedAppointments.findIndex((app: Appointment) => app.id === id);
  
  if (index === -1) return null;
  
  storedAppointments[index].status = status;
  localStorage.setItem('appointments', JSON.stringify(storedAppointments));
  
  return storedAppointments[index];
};

// 获取评价列表
export const getReviews = async (): Promise<Review[]> => {
  await delay();
  return [...reviews];
};

// 创建评价
export const createReview = async (review: Omit<Review, 'id' | 'status'>): Promise<Review> => {
  await delay();
  const newReview: Review = {
    id: `r${Date.now()}`,
    ...review,
    status: 'pending'
  };
  
  // 在实际应用中，这里应该将新评价保存到数据库
  // 这里使用本地存储模拟
  const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  storedReviews.push(newReview);
  localStorage.setItem('reviews', JSON.stringify(storedReviews));
  
  return newReview;
};

// 回复评价
export const replyToReview = async (id: string, reply: string): Promise<Review | null> => {
  await delay();
  
  // 在实际应用中，这里应该更新数据库中的评价
  // 这里使用本地存储模拟
  const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const index = storedReviews.findIndex((r: Review) => r.id === id);
  
  if (index === -1) return null;
  
  storedReviews[index].reply = reply;
  storedReviews[index].replyDate = new Date().toISOString();
  localStorage.setItem('reviews', JSON.stringify(storedReviews));
  
  return storedReviews[index];
};

// 更新评价状态
export const updateReviewStatus = async (id: string, status: Review['status']): Promise<Review | null> => {
  await delay();
  
  // 在实际应用中，这里应该更新数据库中的评价状态
  // 这里使用本地存储模拟
  const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const index = storedReviews.findIndex((r: Review) => r.id === id);
  
  if (index === -1) return null;
  
  storedReviews[index].status = status;
  localStorage.setItem('reviews', JSON.stringify(storedReviews));
  
  return storedReviews[index];
};

// 获取诊所信息
export const getClinicInfo = async (): Promise<ClinicInfo> => {
  await delay();
  return { ...clinicInfo };
};

// 获取网站设置
export const getSiteSettings = async (): Promise<SiteSettings> => {
  await delay();
  return { ...siteSettings };
};

// 用户登录
export const login = async (username: string, password: string): Promise<User | null> => {
  await delay();
  
  // 使用本地模拟验证，不进行外部API调用
  if (username === adminUser.username && password === adminUser.password) {
    // 模拟生成token
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', token);
    
    // 更新最后登录时间
    const user = { ...adminUser, lastLogin: new Date().toISOString() };
    return user;
  }
  
  return null;
};

// 用户登出
export const logout = (): void => {
  localStorage.removeItem('token');
};

// 验证用户是否已登录
export const checkAuth = async (): Promise<boolean> => {
  await delay();
  return !!localStorage.getItem('token');
};

// 获取病症自测问题
export const getSelfDiagnosisQuestions = async () => {
  await delay();
  return [...selfDiagnosisQuestions];
};

// 提交病症自测答案并获取初步诊断结果
export const submitSelfDiagnosis = async (answers: Record<string, string[]>) => {
  await delay();
  
  // 这里模拟根据答案生成初步诊断结果
  // 实际应用中，这里应该有更复杂的逻辑
  let possibleCondition = '颈肩腰腿痛';
  let possibleSyndrome = '气滞血瘀型';
  let recommendation = '建议进行针灸和推拿治疗，配合中药内服。';
  
  if (answers.q1?.includes('neck')) {
    possibleCondition = '颈椎病';
  } else if (answers.q1?.includes('waist')) {
    possibleCondition = '腰背痛';
  }
  
  if (answers.q2?.includes('cold')) {
    possibleSyndrome = '风寒湿痹型';
    recommendation = '建议进行艾灸和热敷，配合驱寒除湿中药。';
  } else if (answers.q2?.includes('stabbing') && answers.q3?.includes('sitting')) {
    possibleSyndrome = '气滞血瘀型';
    recommendation = '建议进行针灸和推拿治疗，配合活血化瘀中药。';
  }
  
  return {
    possibleCondition,
    possibleSyndrome,
    recommendation,
    advice: '以上仅为初步自测结果，具体诊断和治疗方案请咨询医生。建议您预约就诊，进行详细检查和专业治疗。'
  };
};

// 获取可预约时间段
export const getAvailableTimeSlots = async () => {
  await delay();
  return [...availableTimeSlots];
};