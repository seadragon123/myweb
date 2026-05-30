// 医生信息类型
export interface DoctorInfo {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  introduction: string;
  certificates: Certificate[];
  experience: Experience[];
  academicAchievements: AcademicAchievement[];
  philosophy: string;
}

// 证书类型
export interface Certificate {
  id: string;
  name: string;
  issuingAuthority: string;
  issueDate: string;
  imageUrl: string;
}

// 执业经历类型
export interface Experience {
  id: string;
  hospital: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

// 学术成果类型
export interface AcademicAchievement {
  id: string;
  title: string;
  type: 'paper' | 'book' | 'award';
  publication: string;
  date: string;
  description: string;
}

// 病症类型
export interface Disease {
  id: string;
  name: string;
  description: string;
  causes: string;
  辨证分型: SyndromeType[];
  treatments: Treatment[];
  prevention: string;
  faq: FAQ[];
}

// 辨证分型类型
export interface SyndromeType {
  id: string;
  name: string;
  symptoms: string[];
  pathogenesis: string;
}

// 治疗方法类型
export interface Treatment {
  id: string;
  name: string;
  description: string;
  steps: string[];
  imageUrl?: string;
  videoUrl?: string;
}

// FAQ类型
export interface FAQ {
  question: string;
  answer: string;
}

// 康复案例类型
export interface Case {
  id: string;
  patientName: string;
  patientAge: number;
  gender: 'male' | 'female';
  disease: string;
  symptoms: string;
  treatmentPlan: string;
  treatmentPeriod: string;
  effect: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  testimonial?: string;
  testimonialVideoUrl?: string;
  date: string;
}

// 健康科普文章类型
export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  publishDate: string;
  readCount: number;
  imageUrl: string;
  tags: string[];
}

// 预约类型
export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  diseaseDescription: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

// 评价类型
export interface Review {
  id: string;
  patientName: string;
  disease: string;
  treatmentPeriod: string;
  rating: {
    effectiveness: number;
    serviceAttitude: number;
    environment: number;
  };
  content: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reply?: string;
  replyDate?: string;
}

// 诊所信息类型
export interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  wechatQrCode: string;
  mapLocation: {
    latitude: number;
    longitude: number;
  };
}

// 用户类型(后台管理)
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin';
  lastLogin: string;
}

// 网站设置类型
export interface SiteSettings {
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  contactEmail: string;
  copyright: string;
}

// 病症自测问题类型
export interface SelfDiagnosisQuestion {
  id: string;
  question: string;
  options: SelfDiagnosisOption[];
}

// 病症自测选项类型
export interface SelfDiagnosisOption {
  id: string;
  label: string;
  value: string;
}