import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  TextField,
  Button,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from "../components/Header"
import BookCard from '../components/BookCard';


// const dummyBooks = [
//   {
//     id: 1,
//     title: "주린이가 가장 알고 싶은 최다질문 TOP 77",
//     author: "홍길동",
//     category: "경제",
//     coverImageUrl: "https://via.placeholder.com/300x400.png?text=Book+1",
//     createdAt: "2024-05-28T02:40:00Z"
//   },
//   {
//     id: 2,
//     title: "React 완벽 가이드",
//     author: "김철수",
//     category: "프로그래밍",
//     coverImageUrl: "",
//     createdAt: "2024-05-27T02:40:00Z"
//   },
//   {
//     id: 3,
//     title: "자바스크립트의 정석",
//     author: "이영희",
//     category: "프로그래밍",
//     coverImageUrl: "https://via.placeholder.com/300x400.png?text=Book+3",
//     createdAt: "2024-05-26T02:40:00Z"
//   }
// ];

function Main({ books }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, minHeight: 'calc(100vh - 64px)', py: 4 }}>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <TextField
          label="책 제목 검색"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '400px' }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/book/new')}
          size="large"
        >
          책 등록
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {filteredBooks.map((book) => (
          <Grid item xs={4} key={book.id}>
            <BookCard 
              book={book}
              onClick={() => navigate(`/book/${book.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Main;
