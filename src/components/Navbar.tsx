import { Book, User, Library, Search, Moon, Sun, Menu, X, LogOut } from 'lucide-react';
import { User as UserType } from '../types';
import { useState } from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  currentView: 'home' | 'login' | 'dashboard';
  user: UserType | null;
  onNavigate: (view: 'home' | 'login' | 'dashboard') => void;
  onLoginClick: (role: 'student' | 'admin') => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ currentView, user, onNavigate, onLoginClick, onLogout, darkMode, toggleDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Library className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <span className="ml-2 text-xl font-bold text-slate-900 dark:text-white tracking-tight">Athena LMS</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {!user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onLoginClick('student')}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  Student Login
                </button>
                <button 
                  onClick={() => onLoginClick('admin')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Admin Login
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                  <User className="h-4 w-4 mr-2" />
                  <span className="font-medium">{user.name}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 uppercase tracking-wide">
                    {user.role}
                  </span>
                </div>
                <button 
                  onClick={onLogout}
                  className="flex items-center text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleDarkMode} className="p-2 mr-2 text-slate-500 dark:text-slate-400">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-2">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-3"
        >
          {!user ? (
            <div className="flex flex-col space-y-2 pt-2">
              <button 
                onClick={() => { onLoginClick('student'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Student Login
              </button>
              <button 
                onClick={() => { onLoginClick('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Admin Login
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="px-3 py-2 text-slate-800 dark:text-slate-200 font-medium flex items-center">
                <User className="h-4 w-4 mr-2 text-slate-500" />
                {user.name} ({user.role})
              </div>
              <button 
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Sign out
              </button>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
}
