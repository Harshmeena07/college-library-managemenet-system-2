import { useState, useEffect } from 'react';
import Home from './views/Home';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AdminDashboard from './views/AdminDashboard';
import { About, Contact, FAQ, Team } from './views/StaticPages';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { User } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [loginRole, setLoginRole] = useState<'student' | 'admin'>('student');
  const [user, setUser] = useState<User | null>(null);
  
  // Initialize dark mode from system preference or local storage later if needed.
  // Using explicit state for Dark Mode toggle.
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLoginClick = (role: 'student' | 'admin') => {
    setLoginRole(role);
    setCurrentView('login');
  };

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-50' : 'bg-white text-slate-900'}`}>
      <Navbar 
        currentView={currentView} 
        user={user} 
        onNavigate={setCurrentView} 
        onLoginClick={handleLoginClick} 
        onLogout={handleLogout}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      {currentView === 'home' && <Home onLoginClick={handleLoginClick} />}
      {currentView === 'login' && <Login role={loginRole} onLogin={handleLogin} onBack={() => setCurrentView('home')} />}
      {currentView === 'dashboard' && user && user.role === 'admin' && <AdminDashboard user={user} />}
      {currentView === 'dashboard' && user && user.role === 'student' && <Dashboard user={user} />}
      {currentView === 'about' && <About />}
      {currentView === 'contact' && <Contact />}
      {currentView === 'faq' && <FAQ />}
      {currentView === 'team' && <Team />}

      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
