import { useState, useEffect } from 'react';
import { User as UserType, Book } from '../types';
import { api } from '../api';
import BookCard from '../components/BookCard';
import { Search, LayoutDashboard, Library, Clock, User as UserIcon, BookOpen, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  user: UserType;
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'profile'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  const [books, setBooks] = useState<Book[]>([]);
  const [issuedUserBooks, setIssuedUserBooks] = useState<any[]>(user.issuedBooks || []);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Load initial data
    api.getBooks().then(setBooks);
    api.getNotifications(user.id).then(setNotifications);
  }, []);

  const categories = ['All', ...Array.from(new Set(books.map(b => b.category)))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleIssueReq = async (bookId: string) => {
    const res = await api.issueBook(bookId, user.id);
    if(res.success) {
      setBooks(books.map(b => b.id === bookId ? { ...b, available: false } : b));
      setIssuedUserBooks([...issuedUserBooks, res.issue]);
      alert("Book Issued Successfully!");
    } else {
      alert("Failed: " + res.message);
    }
  };

  const handleReturnReq = async (issueId: string) => {
    const res = await api.returnBook(issueId);
    if(res.success) {
      const issue = issuedUserBooks.find(ib => ib.id === issueId);
      setIssuedUserBooks(issuedUserBooks.filter(ib => ib.id !== issueId));
      if (issue) {
         setBooks(books.map(b => b.id === issue.bookId ? { ...b, available: true } : b));
      }
      alert("Book Returned Successfully!");
    }
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
        <div className="p-4 md:sticky md:top-16">
          <nav className="space-y-1 sm:flex sm:space-x-2 sm:space-y-0 md:block md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
              { id: 'catalog', icon: Library, label: 'Library Catalog' },
              { id: 'profile', icon: UserIcon, label: 'My Profile' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all w-full md:w-auto flex-shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <tab.icon className={`mr-3 h-5 w-5 ${activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-500'}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome, {user.name}</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your library activities here.</p>
              </div>

              {/* Notifications Alert */}
              {notifications.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-100 dark:bg-slate-800 dark:border-slate-700 shadow-sm flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center">
                     <AlertCircle className="h-4 w-4 mr-2" /> Recent Notifications 
                  </h3>
                  {notifications.map(n => (
                    <p key={n.id} className="text-sm text-slate-600 dark:text-slate-400">• {n.message} <span className="text-xs text-slate-400 ml-2">({n.date})</span></p>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mr-4">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Issued Books</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{issuedUserBooks.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 mr-4">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Outstanding Fines</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">${user.fines?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 mr-4">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Status</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">Active</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Issues UI */}
              <div className="mt-8">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Currently Issued Books</h2>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                  {issuedUserBooks.length > 0 ? (
                    <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                      {issuedUserBooks.map((item) => (
                        <li key={item.id} className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <BookOpen className="h-5 w-5 text-slate-400 mb-2 sm:mb-0 sm:mr-3 hidden sm:block" />
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Issued: {item.issueDate}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 mb-2">
                                <Clock className="h-3 w-3 mr-1" />
                                Due: {item.dueDate}
                              </span>
                              <button onClick={() => handleReturnReq(item.id)} className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Return Now</button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                      <Library className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                      <p>You have no books currently issued.</p>
                      <button onClick={() => setActiveTab('catalog')} className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline">Browse Catalog</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Catalog Tab (Search & Cards) */}
          {activeTab === 'catalog' && (
            <motion.div 
              key="catalog"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Library Catalog</h1>
                
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search title, author..."
                      className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="block w-full sm:w-auto py-2 pl-3 pr-8 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <div key={book.id} className="relative group">
                     <BookCard book={book} />
                     <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                        <button 
                           onClick={() => handleIssueReq(book.id)}
                           disabled={!book.available}
                           className={`font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-lg ${book.available ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-600 cursor-not-allowed text-slate-300'}`}
                        >
                           {book.available ? 'Request Issue' : 'Currently Issued'}
                        </button>
                     </div>
                  </div>
                ))}
                {filteredBooks.length === 0 && (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 py-12 text-center text-slate-500 dark:text-slate-400">
                    <Search className="h-10 w-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                    <p>No books found matching your criteria.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Profile & Fine Details */}
          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl space-y-6"
            >
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Student Profile</h1>
              
              {/* Virtual Library Card */}
              <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-2xl shadow-xl overflow-hidden mb-6 text-white p-8 relative">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Library className="h-32 w-32" />
                 </div>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10">
                    <div>
                       <h2 className="text-sm font-semibold tracking-widest uppercase text-blue-200 mb-6">Athena Library Card</h2>
                       <p className="text-3xl font-bold mb-1">{user.name}</p>
                       <p className="text-blue-200">{user.course || 'Student'}</p>
                    </div>
                    <div className="mt-6 sm:mt-0 bg-white p-3 rounded-lg">
                       {/* Mock QR Code squares pattern */}
                       <div className="w-20 h-20 bg-white grid grid-cols-4 grid-rows-4 gap-1">
                          {[...Array(16)].map((_, i) => <div key={i} className={Math.random() > 0.4 ? 'bg-slate-900' : 'bg-transparent'}></div>)}
                       </div>
                    </div>
                 </div>
                 <div className="mt-8 flex justify-between items-end relative z-10">
                    <div>
                       <p className="text-xs text-blue-300 uppercase tracking-wider mb-1">ID Number</p>
                       <p className="font-mono tracking-widest">{user.id}</p>
                    </div>
                    <button className="flex items-center text-sm font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors backdrop-blur-sm">
                       <Download className="h-4 w-4 mr-2" /> Download Card
                    </button>
                 </div>
              </div>

              {/* Fine Details UI */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                   <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                     <AlertCircle className="h-5 w-5 mr-2 text-rose-500" /> Fine Details
                   </h3>
                </div>
                <div className="p-6">
                   <div className="flex justify-between flex-wrap gap-4 items-center p-4 rounded-xl border border-rose-100 bg-rose-50 dark:bg-rose-900/10 dark:border-rose-900/30">
                     <div>
                       <p className="text-sm text-slate-600 dark:text-slate-400">Total Outstanding Penalty</p>
                       <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 mt-1">${user.fines?.toFixed(2) || '0.00'}</p>
                     </div>
                     <button className="bg-rose-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-rose-700 transition-colors shadow-sm">
                       Pay Fines Online
                     </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
