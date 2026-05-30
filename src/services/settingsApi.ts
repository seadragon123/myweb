import { delay } from './api';
import { SiteSettings, ClinicInfo } from '@/types';

// 从localStorage读取设置数据
const getStoredSettings = (key: string) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

// 保存设置数据到localStorage
const saveStoredSettings = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

// 默认网站设置
const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: '彭医师中医诊所',
  logoUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80logo%2C%E7%BB%BF%E8%89%B2%E5%92%8C%E6%A3%95%E8%89%B2%E4%B8%BA%E4%B8%BB%E8%89%B2%E8%B0%83%2C%E5%8C%85%E5%90%AB%E4%B8%AD%E5%8C%BB%E5%85%83%E7%B4%A0&sign=1ddca83a5ad285e2aa3f6cf4953e089b',
  faviconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80favicon%2C%E7%AE%80%E7%BA%A6%E8%AE%BE%E8%AE%A1%2C%E7%BB%BF%E8%89%B2&sign=48a8755a2f286e16a76ad6f5e496a815',
  seo: {
    title: '彭医师中医诊所 - 专业治疗颈椎病、腰背痛、椎间盘突出',
    description: '彭医师中医诊所专注于颈椎病、腰背痛、椎间盘突出等颈肩腰腿痛的中医治疗，采用针灸、推拿、中药等传统中医疗法，疗效显著。',
    keywords: ['中医', '针灸', '推拿', '颈椎病', '腰背痛', '椎间盘突出', '中医治疗']
  },
  contactEmail: 'phl0@163.com',
  copyright: '© 2025 彭医师中医诊所 版权所有'
};

// 默认诊所信息
const DEFAULT_CLINIC_INFO: ClinicInfo = {
  name: '彭医师中医诊所',
  description: '彭医师中医诊所是一家专业的中医诊疗机构，专注于颈椎病、腰背痛、椎间盘突出等颈肩腰腿痛的中医治疗。我们采用传统中医疗法，结合现代医学理念，为患者提供个性化的治疗方案。',
  phone: '16670957610',
  email: 'phl0@163.com',
  address: '湖南省衡阳市白云路中心医院傍',
  businessHours: {
    monday: '09:00-17:30',
    tuesday: '09:00-17:30',
    wednesday: '09:00-17:30',
    thursday: '09:00-17:30',
    friday: '09:00-17:30',
    saturday: '休息',
    sunday: '休息'
  },
  specialties: ['颈椎病', '腰背痛', '椎间盘突出', '肩周炎', '关节炎', '坐骨神经痛'],
  wechatQrCode: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81%2C%E4%B8%AD%E5%8C%BB%E8%AF%8A%E6%89%80%2C%E7%AE%80%E7%BA%A6%E8%AE%BE%E8%AE%A1&sign=153e1296bfd46c1b5e7702617d3173e5',
  mapLocation: {
    latitude: 39.908823,
    longitude: 116.397470
  }
};

// 获取网站设置
export const getSiteSettings = async (): Promise<SiteSettings> => {
  await delay();
  
  // 优先从localStorage读取，如果没有则使用默认值
  const stored = getStoredSettings('siteSettings');
  if (stored) {
    return { ...DEFAULT_SITE_SETTINGS, ...stored };
  }
  
  // 首次访问时保存默认设置
  saveStoredSettings('siteSettings', DEFAULT_SITE_SETTINGS);
  return { ...DEFAULT_SITE_SETTINGS };
};

// 更新网站设置
export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
  await delay();
  
  const current = await getSiteSettings();
  const updated = { ...current, ...settings };
  
  if (saveStoredSettings('siteSettings', updated)) {
    return updated;
  } else {
    throw new Error('保存网站设置失败');
  }
};

// 获取诊所信息
export const getClinicInfo = async (): Promise<ClinicInfo> => {
  await delay();
  
  // 优先从localStorage读取，如果没有则使用默认值
  const stored = getStoredSettings('clinicInfo');
  if (stored) {
    return { ...DEFAULT_CLINIC_INFO, ...stored };
  }
  
  // 首次访问时保存默认设置
  saveStoredSettings('clinicInfo', DEFAULT_CLINIC_INFO);
  return { ...DEFAULT_CLINIC_INFO };
};

// 更新诊所信息
export const updateClinicInfo = async (info: Partial<ClinicInfo>): Promise<ClinicInfo> => {
  await delay();
  
  const current = await getClinicInfo();
  const updated = { ...current, ...info };
  
  if (saveStoredSettings('clinicInfo', updated)) {
    return updated;
  } else {
    throw new Error('保存诊所信息失败');
  }
};

// 重置为默认设置
export const resetToDefaults = async (): Promise<void> => {
  await delay();
  
  saveStoredSettings('siteSettings', DEFAULT_SITE_SETTINGS);
  saveStoredSettings('clinicInfo', DEFAULT_CLINIC_INFO);
};

// 导出设置数据
export const exportSettings = async (): Promise<{ siteSettings: SiteSettings; clinicInfo: ClinicInfo }> => {
  await delay();
  
  const [siteSettings, clinicInfo] = await Promise.all([
    getSiteSettings(),
    getClinicInfo()
  ]);
  
  return { siteSettings, clinicInfo };
};

// 导入设置数据
export const importSettings = async (data: { siteSettings: SiteSettings; clinicInfo: ClinicInfo }): Promise<void> => {
  await delay();
  
  saveStoredSettings('siteSettings', data.siteSettings);
  saveStoredSettings('clinicInfo', data.clinicInfo);
}; 