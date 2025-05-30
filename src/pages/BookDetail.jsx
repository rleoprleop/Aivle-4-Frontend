import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

// 더미 데이터
const dummyBook = {
  id: 1,
  title: "주린이가 가장 알고 싶은 최다질문 TOP 77",
  author: "홍길동",
  category: "경제",
  coverImageUrl: "https://via.placeholder.com/140x140.png?text=Book+1",
  createdAt: "2024-05-28T02:40:00Z"
};

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = dummyBook; // 실제로는 id로 책을 찾아야 함

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, minHeight: 'calc(100vh - 64px)', py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={book.coverImageUrl || 'https://via.placeholder.com/140x140.png?text=No+Image'}
              alt={book.title}
              sx={{
                width: '100%',
                height: 'auto',
                bgcolor: 'grey.200',
                borderRadius: 1
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              저자: {book.author}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              카테고리: {book.category}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              등록일: {formatDate(book.createdAt)}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/main')}
          >
            목록
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/book/edit/${id}`)}
          >
            수정
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default BookDetail; 