export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  available: boolean;
  coverColor: string;
}

export interface User {
  id: string;
  name: string;
  role: 'student' | 'admin';
  course?: string;
  issuedBooks: IssuedBook[];
  fines: number;
}

export interface IssuedBook {
  id: string;
  bookId: string;
  title: string;
  issueDate: string;
  dueDate: string;
}
