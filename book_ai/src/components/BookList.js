import React from 'react';
import { Grid } from '@mui/material';
import BookCard from './BookCard';

function BookList({ books }) {
  return (
    <Grid container spacing={2}>
      {books.map(book => (
        <Grid item xs={12} sm={4} key={book.id}>
          <BookCard id={book.id} title={book.title} date={book.date} />
        </Grid>
      ))}
    </Grid>
  );
}

export default BookList;
