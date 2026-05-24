import React, { useState, useEffect } from 'react';
import { User as UserType, Book } from '../types';
import { api } from '../api';
import { LayoutDashboard, Library, BookOpen, AlertCircle, CheckCircle2, TrendingUp, Users, PlusCircle, Trash, Edit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  user: UserType;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'manage' | 'issues'>('overview');
  const [reports, setReports] = useState<any>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', category: '' });

  const loadData = async () => {
    const r = await api.getReports();
    setReports(r);
    const b = await api.getBooks();
    setBooks(b);
    const i = await api.getAllIssued();
    setIssuedBooks(i);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if(newBook.title && newBook.author && newBook.category) {
        await api.addBook(newBook);
        setNewBook({ title: '', author: '', category: '' });
        loadData();
        alert("Book Added!");
    }
  };

  const handleDeleteBook = async (id: string) => {
    if(confirm('Are you sure you want to delete this book?')) {
        await api.deleteBook(id);
        loadData();
    }
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
        <div className="p-4 md:sticky md:top-16">
          <div className="mb-6 px-4">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admin Portal</p>
          </div>
          <nav className="space-y-1 sm:flex sm:space-x-2 sm:space-y-0 md:block md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Analytics & Reports' },
              { id: 'manage', icon: Library, label: 'Manage Inventory' },
              { id: 'issues', icon: Users, label: 'Active Issues' }
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
                <tab.icon className={`mr-3 h-5 w-5 ${activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
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
          {activeTab === 'overview' && reports && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Overview of the library system activity.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Total Books</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{reports.totalBooks}</p>
                    <div className="mt-2 flex items-center text-xs font-medium text-emerald-500"><TrendingUp className="h-3 w-3 mr-1"/> Up 2%</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Available</p>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{reports.availableBooks}</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Issued</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{reports.issuedBooksCount}</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Total Accrued Fines</p>
                    <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">${reports.activeFinesTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Inventory by Category</h2>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reports.categoryStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false}/>
                      <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* Manage Inventory Tab */}
          {activeTab === 'manage' && (
            <motion.div 
              key="manage"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Store Inventory</h1>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                 <h2 className="text-md font-bold mb-4 flex items-center text-slate-900 dark:text-white"><PlusCircle className="mr-2 h-4 w-4"/> Add New Book</h2>
                 <form onSubmit={handleAddBook} className="flex flex-col sm:flex-row gap-4">
                    <input required className="flex-1 px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-white" placeholder="Title" value={newBook.title} onChange={e=>setNewBook({...newBook, title: e.target.value})} />
                    <input required className="flex-1 px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-white" placeholder="Author" value={newBook.author} onChange={e=>setNewBook({...newBook, author: e.target.value})} />
                    <input required className="flex-1 px-3 py-2 border rounded-lg bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-white" placeholder="Category" value={newBook.category} onChange={e=>setNewBook({...newBook, category: e.target.value})} />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">Save Book</button>
                 </form>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                 <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                       <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Author</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 tracking-wider">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                       {books.map((book) => (
                          <tr key={book.id}>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{book.title}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{book.author}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{book.category}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.available ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                                   {book.available ? 'Available' : 'Issued'}
                                </span>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3"><Edit className="h-4 w-4"/></button>
                                <button onClick={() => handleDeleteBook(book.id)} className="text-rose-600 hover:text-rose-900 dark:hover:text-rose-400"><Trash className="h-4 w-4"/></button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            </motion.div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <motion.div 
              key="issues"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Active Student Issues</h1>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                 <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                       <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Issue ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Book Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Due Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 tracking-wider">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                       {issuedBooks.map((issue) => (
                          <tr key={issue.id}>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{issue.id}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{issue.title}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{issue.studentId}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-600 dark:text-amber-400">{issue.dueDate}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${issue.status === 'issued' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'}`}>
                                   {issue.status.toUpperCase()}
                                </span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
