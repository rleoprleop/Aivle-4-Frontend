// src/pages/Home001.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import BookCard from '../components/BookCard';
import Layout from '../components/Layout';
import { getBooks } from '../api/bookApi';

function Home001() {
  //const [books] = useState(dummyBooks);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getBooks()
      .then((data) => {
        const shuffled = [...data].sort(() => Math.random() - 0.5); // 배열 섞기
        const randomBooks = shuffled.slice(0, 2); // 랜덤 2권 추출
        setBooks(randomBooks);
      })
      .catch((err) => console.error("책 데이터 가져오기 실패:", err));
  }, []);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#2e3c50" }}>
        작가의 산책
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ color: "#5c6f7b" }}>
        책을 읽어봅시다
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard 
              book={book}
              onClick={() => navigate(`/book/${book.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#007baf", '&:hover': { backgroundColor: "#005f87" } }}
          onClick={() => navigate("/main")}
        >
          더 많은 책 보러 가기
        </Button>
      </Box>
    </Layout>
  );
}

export default Home001;
