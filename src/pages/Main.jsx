import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Typography, TextField, Button, Box, Pagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from "../components/Header";
import { getBooks } from '../api/bookApi';
import BookCard from '../components/BookCard';

const BOOKS_PER_PAGE = 6;

function Main({ books }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getBooks()
      .then((data) => setBooks(data))
      .catch((error) => {
        console.error('책 목록 불러오기 실패:', error);
        setBooks([]);
      });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Header />

      <Container sx={{ mt: 2, width: '1100px', mx: 'auto', }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#2e3c50", textAlign: "center", mb: 6 }}>
          전체 도서 목록
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, ml: 5 }}>
          <TextField
            label="책 제목 검색"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            sx={{ flexGrow: 1, maxWidth: '600px' }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/book/new')}
            size="medium"
            sx={{
              ml: 2,
              mr: 7,
              whiteSpace: 'nowrap',
              backgroundColor: "#007baf",
              '&:hover': { backgroundColor: "#005f87" }
            }}
          >
            책 등록
          </Button>
        </Box>

        {/* 카드 영역 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '500px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            px: 1
          }}
        >
          <Box sx={{ width: '960px', mx: 'auto' }}>
            {paginatedBooks.length > 0 ? (
              <Grid container spacing={3} justifyContent="flex-start">
                {paginatedBooks.map((book) => (
                  <Grid item xs={4} key={book.id}>
                    <BookCard
                      book={book}
                      onClick={() => navigate(`/book/${book.id}`)}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography variant="body1" color="textSecondary">
                  검색 결과가 없습니다.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {totalPages > 0 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Main;

export default Main;
