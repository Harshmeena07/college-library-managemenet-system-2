import { Book } from '../types';
import { Book as BookIcon } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`h-40 w-full ${book.coverColor} flex items-center justify-center p-6 relative`}>
        {/* Decorative inner pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
        <BookIcon className="h-16 w-16 text-white opacity-80" />
      </div>
      
      <div className="p-5 flex flex-col h-[calc(100%-10rem)]">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-slate-900 dark:text-white leading-tight line-clamp-2" title={book.title}>
            {book.title}
          </h3>
          <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            book.available 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
          }`}>
            {book.available ? 'Available' : 'Issued'}
          </span>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{book.author}</p>
        
        <div className="mt-auto px-3 py-1.5 bg-slate-50 dark:bg-slate-900/50 rounded-lg inline-flex w-max">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{book.category}</span>
        </div>
      </div>
    </div>
  );
}
