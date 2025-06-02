import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Grid,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import { getBook } from '../api/bookApi';
import Layout from '../components/Layout';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (error) {
        console.error('책 정보를 불러오는데 실패했습니다:', error);
        alert('책 정보를 불러오는데 실패했습니다.');
        navigate('/main');
      }
    };
    fetchBook();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  if (!book) {
    return null;
  }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Box
            component="img"
            src={book.coverImageUrl}
            alt={book.title}
            sx={{
              width: 300,
              height: 400,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: 'grey.100'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ textAlign: 'left' }}>
            제목: {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textAlign: 'left' }}>
            등록일: {formatDate(book.createdAt)}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: 'left' }}>
        본문 내용
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'left' }}>
        {book.content}
      </Typography>
      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: 'left' }}>
        댓글
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.disabled', mb: 2 }}>
        <Typography variant="body2">
          ※ 댓글 기능은 추후 구현 예정
        </Typography>
      </Box>
      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/main')}
          sx={{ minWidth: '100px' }}
        >
          목록
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/book/edit/${id}`)}
          sx={{ minWidth: '100px' }}
        >
          수정
        </Button>
      </Box>
    </Layout>
  );
}

export default BookDetail;
