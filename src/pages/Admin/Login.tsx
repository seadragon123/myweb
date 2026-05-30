import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { AuthContext } from '@/contexts/authContext';
import { login, checkAuth } from '@/services/api';

// Validation schema
const loginSchema = z.object({
  username: z.string().min(3, '用户名至少3个字符'),
  password: z.string().min(6, '密码至少6个字符')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authStatus = await checkAuth();
        if (authStatus) {
          setIsAuthenticated(true);
          navigate('/admin');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setCheckingAuth(false);
      }
    };
    
    verifyAuth();
  }, [isAuthenticated, setIsAuthenticated, navigate]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'admin',
      password: 'admin123'
    }
  });
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      
      // 使用本地存储进行模拟登录验证
      if (data.username === 'admin' && data.password === 'admin123') {
        // 模拟生成token
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', token);
        
        setIsAuthenticated(true);
        toast.success('登录成功');
        navigate('/admin');
      } else {
        toast.error('用户名或密码错误');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };
  
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] mb-4"></div>
          <p className="text-[#333333]">验证中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-user-shield text-white text-3xl"></i>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-[#8B4513]">
            管理员登录
          </h2>
          <p className="mt-2 text-sm text-[#333333]">
            请输入您的账号和密码以登录管理系统
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">用户名</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-user text-[#4CAF50]"></i>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-[#333333] rounded-t-md focus:z-10 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                  placeholder="用户名"
                  {...register('username')}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-[#4CAF50]"></i>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-[#333333] rounded-b-md focus:z-10 focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                  placeholder="密码"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#333333]">
                记住我
              </label>
            </div>
            
            <div className="text-sm">
              <button 
                type="button" 
                className="font-medium text-[#4CAF50] hover:text-[#388E3C]"
                onClick={() => toast.info('请联系系统管理员重置密码')}
              >
                忘记密码?
              </button>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4CAF50] hover:bg-[#388E3C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  登录中...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sign-in-alt mr-2"></i>
                  登录
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}