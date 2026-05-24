import { Book, User } from './types';

export const dummyBooks: Book[] = [
  { id: '1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', available: true, coverColor: 'bg-blue-600 text-white' },
  { id: '2', title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', available: false, coverColor: 'bg-slate-800 text-white' },
  { id: '3', title: 'University Physics', author: 'Young and Freedman', category: 'Physics', available: true, coverColor: 'bg-indigo-600 text-white' },
  { id: '4', title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', category: 'Chemistry', available: true, coverColor: 'bg-sky-600 text-white' },
  { id: '5', title: 'Data Communications and Networking', author: 'Behrouz A. Forouzan', category: 'Computer Science', available: true, coverColor: 'bg-blue-800 text-white' },
  { id: '6', title: 'Discrete Mathematics', author: 'Kenneth H. Rosen', category: 'Mathematics', available: false, coverColor: 'bg-cyan-700 text-white' },
  { id: '7', title: 'The C++ Programming Language', author: 'Bjarne Stroustrup', category: 'Computer Science', available: true, coverColor: 'bg-teal-700 text-white' },
  { id: '8', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', category: 'Computer Science', available: true, coverColor: 'bg-violet-700 text-white' },
];

export const dummyUser: User = {
  id: 'STU-2026-001',
  name: 'John Doe',
  role: 'student',
  course: 'B.Sc CS',
  issuedBooks: [
    { id: 'iss-1', bookId: '2', title: 'Clean Code', issueDate: '2026-05-10', dueDate: '2026-05-24' },
    { id: 'iss-2', bookId: '6', title: 'Discrete Mathematics', issueDate: '2026-05-15', dueDate: '2026-05-29' }
  ],
  fines: 15.50
};

export const dummyAdmin: User = {
  id: 'ADM-001',
  name: 'Jane Smith',
  role: 'admin',
  issuedBooks: [],
  fines: 0
};
