import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Home001 from "./pages/Home_001";
import Main from "./pages/Main";
import BookDetail from "./pages/BookDetail";
import BookForm from "./pages/BookForm";


// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/hello')
//       .then(res => setMessage(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h1>백엔드 응답:</h1>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home001 />} />
          <Route path="/main" element={<Main />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/book/new" element={<BookForm />} />
          <Route path="/book/edit/:id" element={<BookForm />} />
          <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다.</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;