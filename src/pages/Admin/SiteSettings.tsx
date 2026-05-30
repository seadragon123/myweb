import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getSiteSettings, getClinicInfo, updateSiteSettings, updateClinicInfo, resetToDefaults, exportSettings, importSettings } from '@/services/settingsApi';
import { SiteSettings as SiteSettingsType, ClinicInfo } from '@/types';

export default function SiteSettings() {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsType | null>(null);
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'basic' | 'seo' | 'contact' | 'clinic'>('basic');
  
  // 表单状态
  const [formData, setFormData] = useState({
    siteName: '',
    contactEmail: '',
    logoUrl: '',
    faviconUrl: '',
    copyright: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    clinicName: '',
    clinicDescription: '',
    phone: '',
    email: '',
    address: '',
    wechatQrCode: '',
    mapLatitude: '',
    mapLongitude: '',
    businessHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    specialties: ''
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const [settingsData, clinicData] = await Promise.all([
          getSiteSettings(),
          getClinicInfo()
        ]);
        
        setSiteSettings(settingsData);
        setClinicInfo(clinicData);
        
        // 初始化表单数据
        setFormData({
          siteName: settingsData.siteName,
          contactEmail: settingsData.contactEmail,
          logoUrl: settingsData.logoUrl,
          faviconUrl: settingsData.faviconUrl,
          copyright: settingsData.copyright,
          seoTitle: settingsData.seo.title,
          seoDescription: settingsData.seo.description,
          seoKeywords: settingsData.seo.keywords.join(', '),
          clinicName: clinicData.name,
          clinicDescription: clinicData.description,
          phone: clinicData.phone,
          email: clinicData.email,
          address: clinicData.address,
          wechatQrCode: clinicData.wechatQrCode,
          mapLatitude: clinicData.mapLocation.latitude.toString(),
          mapLongitude: clinicData.mapLocation.longitude.toString(),
          businessHours: clinicData.businessHours,
          specialties: clinicData.specialties.join(', ')
        });
      } catch (error) {
        console.error('加载设置数据失败:', error);
        toast.error('加载设置数据失败');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBusinessHoursChange = (day: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: value
      }
    }));
  };

  const handleSave = async (section: string) => {
    try {
      if (section === '基本信息') {
        const siteData = {
          siteName: formData.siteName,
          contactEmail: formData.contactEmail,
          logoUrl: formData.logoUrl,
          faviconUrl: formData.faviconUrl,
          copyright: formData.copyright
        };
        await updateSiteSettings(siteData);
      } else if (section === 'SEO') {
        const seoData = {
          seo: {
            title: formData.seoTitle,
            description: formData.seoDescription,
            keywords: formData.seoKeywords.split(',').map(k => k.trim()).filter(k => k)
          }
        };
        await updateSiteSettings(seoData);
      } else if (section === '联系信息') {
        const contactData = {
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          wechatQrCode: formData.wechatQrCode,
          mapLocation: {
            latitude: parseFloat(formData.mapLatitude),
            longitude: parseFloat(formData.mapLongitude)
          }
        };
        await updateClinicInfo(contactData);
      } else if (section === '诊所信息') {
        const clinicData = {
          name: formData.clinicName,
          description: formData.clinicDescription,
          businessHours: formData.businessHours,
          specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s)
        };
        await updateClinicInfo(clinicData);
      }
      
      toast.success(`${section}设置保存成功`);
      
      // 重新加载数据以更新显示
      const [settingsData, clinicData] = await Promise.all([
        getSiteSettings(),
        getClinicInfo()
      ]);
      setSiteSettings(settingsData);
      setClinicInfo(clinicData);
    } catch (error) {
      console.error('保存设置失败:', error);
      toast.error('保存设置失败');
    }
  };

  const handleReset = async () => {
    try {
      await resetToDefaults();
      toast.success('已重置为默认设置');
      // 重新加载数据
      const [settingsData, clinicData] = await Promise.all([
        getSiteSettings(),
        getClinicInfo()
      ]);
      setSiteSettings(settingsData);
      setClinicInfo(clinicData);
      
      // 重新初始化表单数据
      setFormData({
        siteName: settingsData.siteName,
        contactEmail: settingsData.contactEmail,
        logoUrl: settingsData.logoUrl,
        faviconUrl: settingsData.faviconUrl,
        copyright: settingsData.copyright,
        seoTitle: settingsData.seo.title,
        seoDescription: settingsData.seo.description,
        seoKeywords: settingsData.seo.keywords.join(', '),
        clinicName: clinicData.name,
        clinicDescription: clinicData.description,
        phone: clinicData.phone,
        email: clinicData.email,
        address: clinicData.address,
        wechatQrCode: clinicData.wechatQrCode,
        mapLatitude: clinicData.mapLocation.latitude.toString(),
        mapLongitude: clinicData.mapLocation.longitude.toString(),
        businessHours: clinicData.businessHours,
        specialties: clinicData.specialties.join(', ')
      });
    } catch (error) {
      console.error('重置设置失败:', error);
      toast.error('重置设置失败');
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportSettings();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website-settings.json';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('设置已导出');
    } catch (error) {
      console.error('导出设置失败:', error);
      toast.error('导出设置失败');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  if (!siteSettings || !clinicInfo) {
    return (
      <div className="text-center py-12">
        <i className="fa-solid fa-exclamation-triangle text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-500">设置数据加载失败</p>
      </div>
    );
  }

  const tabs = [
    { id: 'basic', name: '基本信息', icon: 'fa-solid fa-info-circle' },
    { id: 'seo', name: 'SEO设置', icon: 'fa-solid fa-search' },
    { id: 'contact', name: '联系信息', icon: 'fa-solid fa-address-book' },
    { id: 'clinic', name: '诊所信息', icon: 'fa-solid fa-hospital' }
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[#333333]">网站设置</h1>
          <p className="text-gray-600 mt-1 text-sm">管理网站的基本信息、SEO设置和诊所信息</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            重置默认
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-1.5 text-sm text-[#4CAF50] border border-[#4CAF50] rounded-lg hover:bg-[#4CAF50] hover:text-white transition-colors"
          >
            导出设置
          </button>
        </div>
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
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* 基本信息设置 */}
          {activeTab === 'basic' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-base font-medium text-gray-900">基本信息</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    网站名称
                  </label>
                  <input
                    type="text"
                    value={formData.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系邮箱
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="url"
                    value={formData.faviconUrl}
                    onChange={(e) => handleInputChange('faviconUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    版权信息
                  </label>
                  <input
                    type="text"
                    value={formData.copyright}
                    onChange={(e) => handleInputChange('copyright', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('基本信息')}
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg hover:bg-[#388E3C] transition-colors"
                >
                  保存设置
                </button>
              </div>
            </motion.div>
          )}

          {/* SEO设置 */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-base font-medium text-gray-900">SEO设置</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    页面标题
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    页面描述
                  </label>
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    关键词 (用逗号分隔)
                  </label>
                  <input
                    type="text"
                    value={formData.seoKeywords}
                    onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('SEO')}
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg hover:bg-[#388E3C] transition-colors"
                >
                  保存设置
                </button>
              </div>
            </motion.div>
          )}

          {/* 联系信息设置 */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-base font-medium text-gray-900">联系信息</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系电话
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系邮箱
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    地址
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    微信二维码URL
                  </label>
                  <input
                    type="url"
                    value={formData.wechatQrCode}
                    onChange={(e) => handleInputChange('wechatQrCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    地图位置 (纬度,经度)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      step="any"
                      value={formData.mapLatitude}
                      onChange={(e) => handleInputChange('mapLatitude', e.target.value)}
                      placeholder="纬度"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                    />
                    <input
                      type="number"
                      step="any"
                      value={formData.mapLongitude}
                      onChange={(e) => handleInputChange('mapLongitude', e.target.value)}
                      placeholder="经度"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('联系信息')}
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg hover:bg-[#388E3C] transition-colors"
                >
                  保存设置
                </button>
              </div>
            </motion.div>
          )}

          {/* 诊所信息设置 */}
          {activeTab === 'clinic' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-base font-medium text-gray-900">诊所信息</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    诊所名称
                  </label>
                  <input
                    type="text"
                    value={formData.clinicName}
                    onChange={(e) => handleInputChange('clinicName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    诊所简介
                  </label>
                  <textarea
                    value={formData.clinicDescription}
                    onChange={(e) => handleInputChange('clinicDescription', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    营业时间
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(formData.businessHours).map(([day, hours]) => (
                      <div key={day}>
                        <label className="block text-xs text-gray-600 mb-1 capitalize">
                          {day}
                        </label>
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) => handleBusinessHoursChange(day, e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    专长领域
                  </label>
                  <textarea
                    value={formData.specialties}
                    onChange={(e) => handleInputChange('specialties', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                    placeholder="用逗号分隔多个专长领域"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('诊所信息')}
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg hover:bg-[#388E3C] transition-colors"
                >
                  保存设置
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 