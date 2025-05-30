import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';
import Header from "../components/Header"

// 더미 데이터
const dummyBook = {
  id: 1,
  title: "주린이가 가장 알고 싶은 최다질문 TOP 77",
  author: "홍길동",
  category: "경제",
  coverImageUrl: "https://via.placeholder.com/140x140.png?text=Book+1",
  createdAt: "2024-05-28T02:40:00Z"
};

const categories = [
  "경제",
  "프로그래밍",
  "소설",
  "자기계발",
  "역사",
  "과학"
];

function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id !== 'new';
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    coverImageUrl: '',
    description: ''
  });

  useEffect(() => {
    if (isEdit) {
      // 실제로는 API 호출로 데이터를 가져와야 함
      setFormData(dummyBook);
    }
  }, [isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateImage = () => {
    // 실제로는 이미지 생성 API를 호출해야 함
    setFormData(prev => ({
      ...prev,
      coverImageUrl: `https://via.placeholder.com/140x140.png?text=${encodeURIComponent(prev.title)}`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 API 호출로 데이터를 저장해야 함
    console.log('Form submitted:', formData);
    navigate('/main');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, minHeight: 'calc(100vh - 64px)', py: 4 }}>
      <Header />
      <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {isEdit ? '책 수정' : '책 등록'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={formData.coverImageUrl || 'https://via.placeholder.com/140x140.png?text=No+Image'}
                alt="Book cover"
                sx={{
                  width: '100%',
                  height: 'auto',
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  mb: 2
                }}
              />
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ImageIcon />}
                onClick={handleGenerateImage}
              >
                이미지 생성
              </Button>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="제목"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="저자"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                select
                label="카테고리"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                margin="normal"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="설명"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/main')}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              {isEdit ? '수정' : '등록'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default BookForm; 