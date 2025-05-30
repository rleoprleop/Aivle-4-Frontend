// src/pages/Home001.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Header from "../conponents/Header"

function Home001() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get("/api/home_001?sort=click_count&limit=3")
    axios.get("http://localhost:3001/books?_sort=-click_count&&_limit=3")
      .then(res => setBooks(res.data))
      .catch(err => console.error("책 데이터 가져오기 실패:", err));
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
          {books.map((book, index) => (
            <Grid item key={index}>
              <Card
                onClick={() => navigate(`/book/${book.id}`)}
                sx={{
                  width: 240,
                  height: 340,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: 6,
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                  '&:hover': {
                    transform: "translateY(-6px)",
                    boxShadow: 12
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={book.coverImageUrl}
                  alt={book.title}
                  sx={{ borderRadius: 2, objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    px: 2
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777", textAlign: "left", mt: 0.5 }}>
                    {book.author}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {book.category}
                  </Typography>
                </CardContent>
              </Card>
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
