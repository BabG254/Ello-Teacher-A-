// BookList.js
import React from 'react';
import { Grid } from '@mui/material';
import BookCard from './BookCard'; 
import { v4 as uuidv4 } from 'uuid';

const BookList = ({ books, addBookToReadingList }) => {
  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuidv4()}>
          <BookCard book={book} addBookToReadingList={addBookToReadingList} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
