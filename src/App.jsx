import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home001 from "./pages/Home_001";


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
    <Router>
      <Routes>
        <Route path="/home" element={<Home001 />} />
        {/* 예: <Route path="/main" element={<Main001 />} /> */}
        <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </Router>
  );
}

export default App;