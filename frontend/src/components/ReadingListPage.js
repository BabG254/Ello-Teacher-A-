// ReadingListPage.js
import React from 'react';
import { Container, Box, Grid, Paper, Button } from '@mui/material';
import ReadingList from './ReadingList';
import { useLocation, useNavigate } from 'react-router-dom';

const ReadingListPage = ({addBookToReadingList }) => {
  const navigate = useNavigate(); // Use navigate hook

  const location = useLocation();
  const readingList = location.state?.readingList || [];

  console.log(readingList)

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={2}>
              <ReadingList readingList={readingList} addBookToReadingList={addBookToReadingList} />
            </Paper>
          </Grid>
        </Grid>
        <Button   variant="contained" 
  sx={{
    backgroundColor: '#20B2AA', // Turquoise Light
    '&:hover': {
      backgroundColor: '#18A58F', // Slightly darker shade for hover effect
    },
  }}
  onClick={() => navigate('/')}
>
  Go Back</Button>
      </Box>
    </Container>
  );
};

export default ReadingListPage;
