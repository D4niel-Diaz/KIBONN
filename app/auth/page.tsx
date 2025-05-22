'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { BookOpenIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import Loader from '@/components/loader';

interface FormData {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
  role: string;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();
  const { login, register, authToken, isLoading, user } = useAppContext();

  useEffect(() => {
    if (!hasRedirected && authToken && !isLoading && user?.role) {
      if (user.role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/user');
      }
      setHasRedirected(true);
    }
  }, [authToken, isLoading, user?.role, hasRedirected, router]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("Logged in successfully!");
      } else {
        if (formData.password !== formData.password_confirmation) {
          toast.error("Passwords don't match!");
          setIsSubmitting(false);
          return;
        }
        await register(
          formData.name!,
          formData.email,
          formData.password,
          formData.password_confirmation!
        );
        toast.success("Registered successfully! Please login.");
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error?.response?.data?.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || authToken) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/50">
        <div>
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-blue-500/10 border border-blue-500/20">
              <BookOpenIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white tracking-tight">
            {isLogin ? "Login to Your Account" : "Create an Account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {isLogin ? "Welcome back! Please enter your details" : "Join us and start your journey"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    minLength={8}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="••••••••"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                isLogin ? "Sign in" : "Create Account"
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={isSubmitting}
              className="ml-1 font-medium text-blue-400 hover:text-blue-300 focus:outline-none focus:underline transition-colors duration-200"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;