/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    terms: false,
    role: ''
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let isValid = true;
    const fieldsToValidate = ['email', 'password'];

    if (activeTab === 'register') {
      fieldsToValidate.push('name', 'confirmPassword');
    }

    fieldsToValidate.forEach(field => {
      if (!validateField(field as keyof typeof formData, formData[field as keyof typeof formData])) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    console.log('Form submitted:', formData);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    validateField(name, value);
  };

  const validateField = (name: any, value: any) => {
    let error = '';

    switch (name) {
      case 'name':
        if (value.length < 2) {
          error = 'Name must be at least 2 characters long';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])/.test(value)) {
          error = 'Password must contain at least one lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(value)) {
          error = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*\d)/.test(value)) {
          error = 'Password must contain at least one number';
        }

        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: 'Passwords do not match'
          }));
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error === '';
  };

  return (
    <div className="min-h-screen flex bg-background-light dark:bg-background-dark font-body">
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-primary/10 dark:bg-primary/20 p-12 text-center">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdC3Gh3zYAenegmyJGc9e2Gqugl6vOs-tdFoLoka5l7xhEO8S-VHEWWCMiBd6jAB4LTgFZyEOJLJoe8RpuRA0_JSgaxBJUoWanwgCV7DauQDVGYgtoYtApFKigVkZ_LUiIXhcSCEiKzRij73In_H0xCXM8sG7ekztKEqBcrBAACfNTHBy7zfM5-1-1fb4At7AgfbTCtL1HpMnc7tM2V6XU5EYtj7eE9XxnJ-uP4iyJOp_7FBxuecdRCPcSI24T5J0-YsSwZb6Nij11")',
            backgroundSize: 'cover',
            borderRadius: '0.75rem'
          }}
        />
        <div className="mt-8 text-center">
          <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-medium leading-tight font-title">
            Remote Classroom
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg font-normal leading-normal pt-2">
            Connecting Classrooms, Empowering Minds.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`px-8 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-background-light dark:bg-background-dark text-primary shadow-md'
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`px-8 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'register'
                    ? 'bg-background-light dark:bg-background-dark text-primary shadow-md'
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {activeTab === 'login' && (
            <div>
              <h2 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark text-center mb-2 font-title">
                Welcome Back!
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-center mb-8">
                Please enter your details to sign in.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? 'border-error' : 'border-gray-300 dark:border-gray-600'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background-light dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.password ? 'border-error' : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background-light dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                    >
                      {showPassword ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-error">{errors.password}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
                    Forgot your password?
                  </a>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md"
                >
                  Log In
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background-light dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-secondary-light dark:text-text-secondary-dark"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-text-primary-light dark:text-text-primary-dark font-medium">Continue with Google</span>
              </button>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <h2 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark text-center mb-2 font-title">
                Create Your Account
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-center mb-8">
                Join our community of learners.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.name ? 'border-error' : 'border-gray-300 dark:border-gray-600'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background-light dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    I am a
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={formData.role === 'student'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 focus:ring-primary"
                      />
                      <span className="ml-2 text-text-primary-light dark:text-text-primary-dark">Student</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="lecturer"
                        checked={formData.role === 'lecturer'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary border-gray-300 dark:border-gray-600 focus:ring-primary"
                      />
                      <span className="ml-2 text-text-primary-light dark:text-text-primary-dark">Lecturer</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    College Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? 'border-error' : 'border-gray-300 dark:border-gray-600'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background-light dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.password ? 'border-error' : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background-light dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                    >
                      {showPassword ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-error">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${
                        errors.confirmPassword ? 'border-error' : 'border-gray-300 dark:border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-background-light dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
                    >
                      {showConfirmPassword ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex items-start pt-2">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                  />
                  <label className="ml-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-primary hover:text-primary/80">
                      Terms of Service
                    </a>
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md mt-6"
                >
                  Create Account
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-background-light dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-text-secondary-light dark:text-text-secondary-dark"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                  Continue with Google
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}