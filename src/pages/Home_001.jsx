// src/pages/Home001.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Header from "../components/Header"
import BookCard from '../components/BookCard';
import { getBooks } from '../api/bookApi';
/*
const dummyBooks = [
  {
    id: 1,
    title: "주린이가 가장 알고 싶은 최다질문 TOP 77",
    author: "홍길동",
    category: "경제",
    coverImageUrl: "https://via.placeholder.com/300x400.png?text=Book+1",
    createdAt: "2024-05-28T02:40:00Z"
  },
  {
    id: 2,
    title: "React 완벽 가이드",
    author: "김철수",
    category: "프로그래밍",
    coverImageUrl: "",
    createdAt: "2024-05-27T02:40:00Z"
  },
  {
    id: 3,
    title: "자바스크립트의 정석",
    author: "이영희",
    category: "프로그래밍",
    coverImageUrl: "https://via.placeholder.com/300x400.png?text=Book+3",
    createdAt: "2024-05-26T02:40:00Z"
  }
];
*/

function Home001() {
  //const [books] = useState(dummyBooks);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getBooks()
      .then((data) => {
        const topBooks = data
          .sort((a, b) => b.click_count - a.click_count)  // 내림차순 정렬
          .slice(0, 2);                                    // 상위 3개만 추출
        setBooks(topBooks);
      })
      .catch((err) => console.error("책 데이터 가져오기 실패:", err));
  }, []);

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="lg" sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#2e3c50" }}>
          작가의 산책
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: "#5c6f7b" }}>
          책을 읽어봅시다
        </Typography>

        <Grid container spacing={6} justifyContent="center" sx={{ mt: 4 }}>
          {books.map((book) => (
            <Grid item xs={4} key={book.id}>
              <BookCard 
                book={book}
                onClick={() => navigate(`/book/${book.id}`)}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#007baf", '&:hover': { backgroundColor: "#005f87" } }}
            onClick={() => navigate("/main")}
          >
            더 많은 책 보러 가기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home001;
