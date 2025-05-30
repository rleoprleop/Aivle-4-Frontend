// src/pages/BookDetail.js
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';

function BookDetail({ books }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find(b => b.id.toString() === id);

  if (!book) {
    return <Typography>Book not found.</Typography>;
  }

  const handleDelete = () => {
    alert('Delete functionality to be implemented');
  };

  return (
    <Box sx={{ mt: 4, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <Grid container spacing={4}>
        {/* 책 이미지 및 정보 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: 200, backgroundColor: '#ddd', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Book Cover</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>제목: {book.title}</Typography>
          <Typography variant="subtitle1">지은이: 유저</Typography>
          <Typography variant="subtitle2">등록일: {book.date}</Typography>
        </Grid>
      </Grid>

      {/* 본문 */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>본문 내용</Typography>
        <Typography variant="body1">{book.content}</Typography>
      </Box>

      {/* 댓글 영역 (미구현 영역 표시) */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">댓글</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>※ 댓글 기능은 추후 구현 예정</Typography>
      </Box>

      {/* 버튼 영역 */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>목록</Button>
        <Button variant="outlined" onClick={() => navigate(`/edit/${book.id}`)}>수정</Button>
        {/* <Button variant="contained" color="error" onClick={handleDelete}>삭제</Button> */}
      </Box>
    </Box>
  );
}

export default BookDetail;