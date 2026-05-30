import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import AboutDoctor from "@/pages/AboutDoctor";
import DiseaseDetail from "@/pages/DiseaseDetail";
import Treatments from "@/pages/Treatments";
import CasesPage from "@/pages/CasesPage";
import CaseDetail from "@/pages/CaseDetail";
import AppointmentPage from "@/pages/AppointmentPage";
import ContactPage from "@/pages/ContactPage";
import SelfDiagnosisPage from "@/pages/SelfDiagnosisPage";
import DiagnosisResult from "@/pages/DiagnosisResult";
import ArticlesPage from "@/pages/ArticlesPage";
 
// Admin pages
import AdminLogin from "@/pages/Admin/Login";
import AdminLayout from "@/components/layout/AdminLayout";
import PrivateRoute from "@/components/PrivateRoute";
import AppointmentManagement from "@/pages/Admin/AppointmentManagement";
import Dashboard from "@/pages/Admin/Dashboard";
import ContentManagement from "@/pages/Admin/ContentManagement";
import ReviewManagement from "@/pages/Admin/ReviewManagement";
import SiteSettings from "@/pages/Admin/SiteSettings";
import DiagnosisManagement from "@/pages/Admin/DiagnosisManagement";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
         {/* Frontend routes */}
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<AboutDoctor />} />
         <Route path="/diseases/:diseaseName" element={<DiseaseDetail />} />
         <Route path="/treatments" element={<Treatments />} />
         <Route path="/cases" element={<CasesPage />} />
         <Route path="/cases/:caseId" element={<CaseDetail />} />
         <Route path="/appointment" element={<AppointmentPage />} />
         <Route path="/contact" element={<ContactPage />} />
          <Route path="/self-diagnosis" element={<SelfDiagnosisPage />} />
           <Route path="/self-diagnosis/result" element={<DiagnosisResult />} />
         <Route path="/articles" element={<ArticlesPage />} />
          
  {/* Admin routes - 添加重定向 */}
  <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
  <Route path="/admin/login" element={<AdminLogin />} />
  {/* 添加对错误路径的兼容处理 */}
  <Route path="/admin-login" element={<Navigate to="/admin/login" replace />} />
  <Route 
    path="/admin/*" 
    element={
      <PrivateRoute isAuthenticated={isAuthenticated}>
        <AdminLayout />
      </PrivateRoute>
    } 
  >
    <Route index element={<Dashboard />} />
    <Route path="appointments" element={<AppointmentManagement />} />
    <Route path="content" element={<ContentManagement />} />
    <Route path="diagnosis" element={<DiagnosisManagement />} />
    <Route path="reviews" element={<ReviewManagement />} />
    <Route path="settings" element={<SiteSettings />} />
  </Route>
         
         {/* 404 page */}
         <Route path="*" element={<NotFound />} />
       </Routes>
    </AuthContext.Provider>
  );
}
