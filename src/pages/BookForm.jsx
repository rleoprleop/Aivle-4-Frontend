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
import Header from "../components/Header";

const categories = [
  "경제", "프로그래밍", "소설", "자기계발", "역사", "과학"
];

function BookForm({ books, onAddBook, onUpdateBook }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id !== undefined;
  const [apiKey, setApiKey] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    coverImageUrl: '',
    description: ''
  });

  // 수정 모드일 경우 기존 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      const bookToEdit = books.find(b => b.id === Number(id));
      if (bookToEdit) {
        setFormData(bookToEdit);
      } else {
        alert("해당 도서를 찾을 수 없습니다.");
        navigate('/main');
      }
    }
  }, [isEdit, id, books, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ OpenAI 이미지 생성 함수
  const generateImageFromTitle = async (title) => {
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: `An illustrated book cover for the topic "${title}"`,
          n: 1,
          size: "256x256"
        })
      });

      const data = await response.json();
      return data.data[0]?.url || '';
    } catch (error) {
      console.error("이미지 생성 실패:", error);
      return '';
    }
  };

  const handleGenerateImage = async () => {
    if (!formData.title) {
      alert("제목을 먼저 입력해주세요.");
      return;
    }

    const imageUrl = await generateImageFromTitle(formData.title);
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        coverImageUrl: imageUrl
      }));
    } else {
      alert("이미지 생성에 실패했습니다.");
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onUpdateBook({ ...formData, id: Number(id) });
    } else {
      onAddBook(formData); // App.jsx에서 id/createdAt 추가해줌
    }
    navigate('/main');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, minHeight: 'calc(100vh - 64px)', py: 4 }}>

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
              <TextField
                fullWidth
                label="OpenAI API Key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
                margin="normal"
              />

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
