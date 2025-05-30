// src/pages/BookEdit.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, TextField, Typography, Button, Paper } from '@mui/material';

function BookEdit({ books, onUpdateBook, onDeleteBook }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedBook = books.find(b => b.id.toString() === id);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedBook) {
      setTitle(selectedBook.title);
      setDesc(selectedBook.desc);
      setContent(selectedBook.content);
    }
  }, [selectedBook]);

  const handleUpdate = () => {
    if (title.trim() === '') return;
    onUpdateBook(id, { title, desc, content });
    navigate('/');
  };

  const handleDelete = () => {
    onDeleteBook(id);
    navigate('/');
  };

  if (!selectedBook) return <Typography>책을 찾을 수 없습니다.</Typography>;

  return (
    <Box sx={{ mt: 4, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h5" mb={3}>책 수정하기</Typography>

      <Grid container spacing={3}>
        {/* 상단: 이미지 + 메타정보 */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ height: 180, backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>생성된 이미지</Typography>
              </Paper>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" fullWidth>AI로 커버 이미지 재생성</Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                label="제목"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: 20 }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="작가 (미구현)"
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="요약"
                multiline
                rows={3}
                fullWidth
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                inputProps={{ maxLength: 500 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <br />
      {/* 본문 */}
      <Grid item xs={12}>
        <TextField
          label="본문 내용"
          multiline
          rows={8}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Grid>

      <br />
      {/* 버튼 영역 */}
      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleUpdate}>수정</Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>삭제</Button>
      </Grid>
    </Box>
  );
}

export default BookEdit;
