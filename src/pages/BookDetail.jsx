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

// 더미 데이터
const dummyBooks = {
  1: {
    id: 1,
    title: "주린이가 가장 알고 싶은 최다질문 TOP 77",
    content: "주식 투자를 시작하는 초보자들을 위한 필수 가이드. 주식 시장의 기본 개념부터 실전 투자 전략까지 상세히 다룹니다. 초보자도 쉽게 이해할 수 있도록 실제 사례와 함께 설명합니다.",
    coverImageUrl: "https://via.placeholder.com/400x600.png?text=Book+1",
    createdAt: "2024-05-28T02:40:00Z",
    updatedAt: "2024-05-28T02:40:00Z"
  },
  2: {
    id: 2,
    title: "React 완벽 가이드",
    content: "React의 모든 것을 배울 수 있는 완벽한 가이드. 컴포넌트 기반 개발부터 상태 관리, 성능 최적화까지 React 개발에 필요한 모든 내용을 담았습니다. 실전 프로젝트 예제와 함께 학습할 수 있습니다.",
    coverImageUrl: "https://via.placeholder.com/400x600.png?text=Book+2",
    createdAt: "2024-05-27T02:40:00Z",
    updatedAt: "2024-05-27T02:40:00Z"
  },
  3: {
    id: 3,
    title: "자바스크립트 코딩의 기술",
    content: "자바스크립트의 핵심 개념과 모던 자바스크립트의 새로운 기능들을 다루는 책입니다. ES6+ 문법부터 비동기 프로그래밍, 함수형 프로그래밍까지 자바스크립트 개발자가 알아야 할 모든 내용을 포함합니다.",
    coverImageUrl: "https://via.placeholder.com/400x600.png?text=Book+3",
    createdAt: "2024-05-26T02:40:00Z",
    updatedAt: "2024-05-26T02:40:00Z"
  }
};

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
        setBook(dummyBooks[id] || dummyBooks[1]);
      }
    };
    fetchBook();
  }, [id]);

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