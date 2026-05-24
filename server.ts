import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Mock MongoDB Collections using in-memory arrays for demo persistence
let books = [
  { id: '1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', available: true, coverColor: 'bg-blue-600' },
  { id: '2', title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', available: false, coverColor: 'bg-slate-800' },
  { id: '3', title: 'University Physics', author: 'Young and Freedman', category: 'Physics', available: true, coverColor: 'bg-indigo-600' },
  { id: '4', title: 'Organic Chemistry', author: 'Paula Yurkanis Bruice', category: 'Chemistry', available: true, coverColor: 'bg-sky-600' },
  { id: '5', title: 'Discrete Mathematics', author: 'Kenneth H. Rosen', category: 'Mathematics', available: false, coverColor: 'bg-cyan-700' },
];

let users = [
  { id: 'student', name: 'John Doe', role: 'student', course: 'B.Sc CS', fines: 15.50 },
  { id: 'admin', name: 'Jane Smith', role: 'admin', course: '', fines: 0 }
];

let issuedBooks = [
  { id: 'iss-1', bookId: '2', studentId: 'student', title: 'Clean Code', issueDate: '2026-05-10', dueDate: '2026-05-24', status: 'issued' },
  { id: 'iss-2', bookId: '5', studentId: 'student', title: 'Discrete Mathematics', issueDate: '2026-05-15', dueDate: '2026-05-29', status: 'issued' }
];

let notifications = [
  { id: 'n1', studentId: 'student', message: 'Your book "Clean Code" is due soon.', date: '2026-05-22' },
  { id: 'n2', studentId: 'student', message: 'Library will remain closed on Sunday.', date: '2026-05-20' }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === API ROUTES ===

  // 1. Auth
  app.post("/api/login", (req, res) => {
    const { id, password, role } = req.body;
    // Demo logic: accept anything but return matching mock user if ID matches roles format
    const userRole = role === 'admin' ? 'admin' : 'student';
    const user = users.find(u => u.id === id) || { 
      id: id || `usr-${Date.now()}`, 
      name: id === 'admin' ? 'Demo Admin' : 'Demo Student', 
      role: userRole,
      course: userRole === 'student' ? 'B.Sc CS' : '',
      fines: 0
    };
    
    // Attach issued books
    const userIssuedBooks = issuedBooks.filter(ib => ib.studentId === user.id && ib.status === 'issued');
    
    res.json({ success: true, user: { ...user, issuedBooks: userIssuedBooks } });
  });

  // 2. Books CRUD
  app.get("/api/books", (req, res) => {
    res.json(books);
  });

  app.post("/api/books", (req, res) => {
    const newBook = { ...req.body, id: Date.now().toString(), available: true };
    if (!newBook.coverColor) newBook.coverColor = 'bg-slate-700';
    books.push(newBook);
    res.json({ success: true, book: newBook });
  });

  app.put("/api/books/:id", (req, res) => {
    const idx = books.findIndex(b => b.id === req.params.id);
    if (idx !== -1) {
      books[idx] = { ...books[idx], ...req.body };
      res.json({ success: true, book: books[idx] });
    } else {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
  });

  app.delete("/api/books/:id", (req, res) => {
    books = books.filter(b => b.id !== req.params.id);
    res.json({ success: true });
  });

  // 3. Issue / Return
  app.post("/api/issue", (req, res) => {
    const { bookId, studentId } = req.body;
    const bookIdx = books.findIndex(b => b.id === bookId);
    if (bookIdx !== -1 && books[bookIdx].available) {
      books[bookIdx].available = false;
      const newIssue = {
        id: `iss-${Date.now()}`,
        bookId,
        studentId,
        title: books[bookIdx].title,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'issued'
      };
      issuedBooks.push(newIssue);
      res.json({ success: true, issue: newIssue, book: books[bookIdx] });
    } else {
      res.status(400).json({ success: false, message: 'Book not available' });
    }
  });

  app.post("/api/return", (req, res) => {
    const { issueId } = req.body;
    const issueIdx = issuedBooks.findIndex(ib => ib.id === issueId && ib.status === 'issued');
    if (issueIdx !== -1) {
      issuedBooks[issueIdx].status = 'returned';
      const bookIdx = books.findIndex(b => b.id === issuedBooks[issueIdx].bookId);
      if (bookIdx !== -1) {
        books[bookIdx].available = true;
      }
      res.json({ success: true, message: 'Book returned successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid issue record' });
    }
  });

  // 4. Reports & Analytics
  app.get("/api/reports", (req, res) => {
    const totalBooks = books.length;
    const availableBooks = books.filter(b => b.available).length;
    const issuedBooksCount = totalBooks - availableBooks;
    
    // Build dummy charts data based on category
    const categoryStats = books.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      totalBooks,
      availableBooks,
      issuedBooksCount,
      activeFinesTotal: users.reduce((sum, u) => sum + u.fines, 0),
      categoryStats: Object.entries(categoryStats).map(([name, value]) => ({ name, value }))
    });
  });

  // 5. Notifications
  app.get("/api/notifications/:studentId", (req, res) => {
    const studentNotifs = notifications.filter(n => n.studentId === req.params.studentId || n.studentId === 'all');
    res.json(studentNotifs);
  });
  
  // All issues
  app.get("/api/issued", (req, res) => {
      res.json(issuedBooks);
  });

  // === VITE MIDDLEWARE ===
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
