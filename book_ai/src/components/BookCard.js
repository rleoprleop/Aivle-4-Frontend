import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function BookCard({ id, title, date }) {
  return (
    <Link to={`/books/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ cursor: 'pointer' }}>
        <CardMedia
          sx={{ height: 140, backgroundColor: '#ccc' }}
          title="Book Cover"
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
          <Typography variant="body2">등록날짜: {date}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default BookCard;
