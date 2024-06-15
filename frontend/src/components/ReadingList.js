// ReadingList.js
import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

const ReadingList = ({ readingList, removeBookFromReadingList }) => {
  if (!readingList || readingList.length === 0) {
    return null; // Return null if there are no books in the list
  }

  const [readingBookList,setReadingList] = useState(readingList)

  return (
    <List>
       {readingBookList.map(book => (
        <ListItem key={uuidv4()} secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => {
          setReadingList(readingBookList.filter(rb => rb!=book))
        }}>
            <DeleteIcon />
          </IconButton>
        }>
          <ListItemText primary={book.title} secondary={book.author} /> {/* Display book title and author */}
        </ListItem>
      ))}
    </List>
  );
};

export default ReadingList;
