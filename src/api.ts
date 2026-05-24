import { Book, User } from './types';

const API_BASE = '/api';

export const api = {
  // Auth
  login: async (id: string, password: string, role: string) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password, role })
    });
    return res.json();
  },

  // Books
  getBooks: async () => {
    const res = await fetch(`${API_BASE}/books`);
    return res.json();
  },
  addBook: async (book: Partial<Book>) => {
    const res = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
    return res.json();
  },
  updateBook: async (id: string, book: Partial<Book>) => {
    const res = await fetch(`${API_BASE}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
    return res.json();
  },
  deleteBook: async (id: string) => {
    const res = await fetch(`${API_BASE}/books/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Issues
  getAllIssued: async () => {
    const res = await fetch(`${API_BASE}/issued`);
    return res.json();
  },
  issueBook: async (bookId: string, studentId: string) => {
    const res = await fetch(`${API_BASE}/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId, studentId })
    });
    return res.json();
  },
  returnBook: async (issueId: string) => {
    const res = await fetch(`${API_BASE}/return`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueId })
    });
    return res.json();
  },

  // Metadata
  getReports: async () => {
    const res = await fetch(`${API_BASE}/reports`);
    return res.json();
  },
  getNotifications: async (studentId: string) => {
    const res = await fetch(`${API_BASE}/notifications/${studentId}`);
    return res.json();
  }
};
