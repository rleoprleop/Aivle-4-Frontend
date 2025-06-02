import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  Box,
  Pagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookCard from '../components/BookCard';
import Layout from '../components/Layout';
import { getBooks } from '../api/bookApi';

const BOOKS_PER_PAGE = 8;

function Main() {
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
    <Layout>
      <Box
        sx={{
          width: '1200px',
          margin: '0 auto',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        {/* 검색창과 버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <TextField
            label="책 제목 검색"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            sx={{ width: '500px' }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/book/new')}
            size="medium"
            sx={{ width: '120px', height: '40px' }}
          >
            책 등록
          </Button>
        </Box>

        {/* 책 목록 */}
        <Grid container spacing={3} justifyContent="flex-start">
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map((book) => (
              <Grid item key={book.id} sx={{ width: '280px' }}>
                <BookCard
                  book={book}
                  onClick={() => navigate(`/book/${book.id}`)}
                />
              </Grid>
            ))
          ) : (
            <Grid item sx={{ width: '100%' }}>
              <Box
                sx={{
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <p>{books.length === 0
                    ? '책을 등록해 주세요!'
                    : '검색 결과가 없습니다.'}</p>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default Main;
