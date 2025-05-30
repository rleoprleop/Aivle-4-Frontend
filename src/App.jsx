import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Home001 from "./pages/Home_001";
import Main from "./pages/Main";
import BookDetail from "./pages/BookDetail";
import BookForm from "./pages/BookForm";
import Header from "./components/Header";

function App() {
  // ✅ 전체 책 목록 상태 관리
  const [books, setBooks] = useState([]);

  // 등록
  const handleAddBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setBooks(prev => [...prev, newBook]);
  };

  // 수정
  const handleUpdateBook = (updatedBook) => {
    setBooks(prev => prev.map(book => book.id === updatedBook.id ? updatedBook : book));
  };

  // 삭제
  const handleDeleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home001 />} />
          <Route path="/main" element={<Main books={books} />} />
          <Route path="/book/new" element={
            <BookForm
              books={books}
              onAddBook={handleAddBook}
              onUpdateBook={handleUpdateBook}
              onDeleteBook={handleDeleteBook}
            />
          } />
          <Route path="/book/edit/:id" element={
            <BookForm
              books={books}
              onAddBook={handleAddBook}
              onUpdateBook={handleUpdateBook}
              onDeleteBook={handleDeleteBook}
            />
          } />
          <Route path="/book/:id" element={<BookDetail books={books} />} />
          <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다.</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
