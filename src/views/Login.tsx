import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, ArrowLeft } from 'lucide-react';
import { User as UserType } from '../types';
import { api } from '../api';

interface LoginProps {
  role: 'student' | 'admin';
  onLogin: (user: UserType) => void;
  onBack: () => void;
}

export default function Login({ role, onLogin, onBack }: LoginProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id && password) {
      try {
        const res = await api.login(id, password, role);
        if (res.success) {
           onLogin(res.user);
        } else {
           setError(true);
        }
      } catch (err) {
         setError(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 relative">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="bg-blue-600 px-6 py-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">
              {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
            </h2>
            <p className="text-blue-100 text-sm">
              Enter your credentials to access your account
            </p>
          </div>
          
          <div className="px-6 py-8 sm:p-10">
            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800/50">
                Invalid credentials. Setup info: use <strong>{role}/{role}</strong>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {role === 'admin' ? 'Admin ID' : 'Student ID'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => { setId(e.target.value); setError(false); }}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter ID"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div className="flex items-center justify-end mt-2">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in
              </button>
            </form>
            
            <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
              <p>Demo Credentials:</p>
              <p>ID: {role} | Pass: {role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
