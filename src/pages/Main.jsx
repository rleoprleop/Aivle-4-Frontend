import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  TextField,
  Button,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// 더미 데이터
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

function Main() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [books] = useState(dummyBooks);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, minHeight: 'calc(100vh - 64px)', py: 4 }}>
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
            <Card 
              sx={{ 
                width: '100%',
                height: '100%',
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <Box sx={{ position: 'relative', paddingTop: '133.33%' }}>
                <CardMedia
                  component="img"
                  image={book.coverImageUrl || 'https://via.placeholder.com/300x400.png?text=No+Image'}
                  alt={book.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    bgcolor: 'grey.200'
                  }}
                />
              </Box>
              <CardContent sx={{ 
                flexGrow: 0,
                display: 'flex', 
                flexDirection: 'column', 
                p: 2,
                height: '120px',
                minHeight: '120px',
                maxHeight: '120px'
              }}>
                <Box sx={{ 
                  height: '48px',
                  minHeight: '48px',
                  maxHeight: '48px',
                  overflow: 'hidden'
                }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div" 
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.2,
                      height: '100%'
                    }}
                  >
                    {book.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mt: 'auto' }}
                >
                  등록일: {formatDate(book.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Main; 