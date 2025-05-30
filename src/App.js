// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import BookList from './components/BookList';
import BookForm from './pages/BookForm';
import BookDetail from './pages/BookDetail';
import BookEdit from './pages/BookEdit';


function Home({ books }) {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
        <Typography variant="h4">Book Management</Typography>
        <TextField placeholder="Search by title" size="small" />
      </Box>
      <BookList books={books} />
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" onClick={() => navigate('/register')}>Register</Button>
      </Box>
    </>
  );
}

function App() {
  const [books, setBooks] = useState([]);

  const handleAddBook = (book) => {
    setBooks(prev => [...prev, {
      ...book,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }]);
  };
  const handleDelete = (id) => {
  setBooks(prev => prev.filter(book => book.id !== parseInt(id)));
  };
  const handleUpdate = (id, updatedBook) => {
  setBooks(prev => prev.map(book => (book.id === parseInt(id) ? { ...book, ...updatedBook } : book)));
  };


  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="/register" element={<BookForm onAddBook={handleAddBook} />} />
          <Route path="/books/:id" element={<BookDetail books={books} />} />
          <Route path="/edit/:id" element={<BookEdit books={books} onUpdateBook={handleUpdate} onDeleteBook={handleDelete} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
