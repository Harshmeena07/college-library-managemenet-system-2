import { motion } from 'motion/react';
import { Book, Search, Library, ShieldCheck, GraduationCap } from 'lucide-react';

interface HomeProps {
  onLoginClick: (role: 'student' | 'admin') => void;
}

export default function Home({ onLoginClick }: HomeProps) {
  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white flex-grow flex items-center justify-center py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-blue-900/20 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-indigo-900/20 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                Next-Generation Education Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                Empowering Minds<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Through Knowledge</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A seamless, intuitive library management system designed to connect students with resources efficiently. Browse, issue, and track your academic journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => onLoginClick('student')}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center transform hover:-translate-y-0.5"
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Student Portal
                </button>
                <button 
                  onClick={() => onLoginClick('admin')}
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-3.5 rounded-xl font-semibold backdrop-blur-sm transition-all flex items-center justify-center"
                >
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Staff Login
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-white/10 p-2 shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                 <img 
                   src="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200" 
                   alt="Modern Library" 
                   className="rounded-xl w-full h-full object-cover opacity-80"
                 />
                 <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent h-1/2 rounded-b-xl" />
                 
                 {/* Floating Card Mockup */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-2xl max-w-sm"
                 >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                         <Book className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">Clean Code</h4>
                        <p className="text-xs text-slate-300">Robert C. Martin</p>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mb-1">
                      <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-[10px] text-right text-slate-300 uppercase tracking-wider font-semibold">14 Days Left</p>
                 </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything You Need</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Our comprehensive tools make discovering, borrowing, and managing library resources an effortless experience.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Smart Discovery', desc: 'Instantly search through thousands of digital and physical resources by category, author, or keyword.' },
              { icon: Book, title: 'Digital Issuing', desc: 'A seamless borrowing process. Reserve books online and track your returning deadlines visually.' },
              { icon: Library, title: 'Asset Management', desc: 'Administrators get a powerful overview of total inventory, outstanding fines, and student activity.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
