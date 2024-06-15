// BookCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const BookCard = ({ book, addBookToReadingList }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={`${book.coverPhotoURL}`} 
        type="image/webp"
        alt={`Cover of ${book.title}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reading Level: {book.readingLevel}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => addBookToReadingList(book)}>
          Add to Reading List
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
