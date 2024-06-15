// App.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Grid, Paper, IconButton, Menu, MenuItem, Button, Snackbar, createTheme, ThemeProvider, List, ListItem, ListItemText } from '@mui/material';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import ReadingListPage from './components/ReadingListPage';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  palette: {
    primary: {
      main: '#20B2AA', // Turquoise Light
    },
    secondary: {
      main: '#40E0D0', // Turquoise
    },
    info: {
      main: '#20B2AA', // Turquoise Light
    },
    warning: {
      main: '#32CD32', // Turquoise Dark
    },
    error: {
      main: '#4682B4', // Steel Blue
    },
  },
});

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [readingList, setGlobalReadingList] = useState([]);
  const [studentList, setStudentList] = useState([]); // State for student list
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
          query: `
            query Books {
              books {
                author
                coverPhotoURL
                readingLevel
                title
              }
            }
          `
        }
      });
      setBooks(result.data.data.books);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
  }, [searchTerm, books]);

  const addBookToReadingList = book => {
    const existingBookIndex = readingList.findIndex(existingBook => existingBook.title === book.title);

    if (existingBookIndex >= 0) {
      setSnackbar({ open: true, message: 'This book is already in your Reading List.', severity: 'error' });
    } else {
      setGlobalReadingList(prevState => [...prevState, book]); // Use the global state setter
      setSnackbar({ open: true, message: 'Added to Reading List Successfully', severity:'success' });
    }
  };

  const addBookToStudentList = book => {
    setStudentList(prevState => [...prevState, book]);
    console.log(studentList)
    setSnackbar({ open: true, message: 'Added to Reading List Successfully', severity:'success' });
  };

  const removeBookFromReadingList = bookToRemove => {
    setReadingList(prevState => prevState.filter(book => book!== bookToRemove));
    setSnackbar({ open: true, message: 'Removed from Reading List Successfully', severity: 'warning' });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToReadingList = () => {
    navigate('/reading-list', { state: { readingList } });
    handleMenuClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={goToReadingList}>Reading List</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Book Library
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 2 }}>
          <SearchBar setSearchTerm={setSearchTerm} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper elevation={2}>
                <BookList books={books.filter(book => book.title.includes(searchTerm))} addBookToReadingList={addBookToReadingList} />
                <List>
                  {searchResults.map(book => (
                    <ListItem key={uuidv4()}>
                      <ListItemText primary={book.title} secondary={book.author} />
                      <Button variant="outlined" color="primary" onClick={() => { addBookToReadingList(book); setSearchResults([]); }}>Add to Reading List</Button>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Container maxWidth="lg">
          <Box sx={{ my: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={2}>
                  <BookList books={studentList} addBookToReadingList={addBookToReadingList} />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({...snackbar, open: false })}
        sx={{ backgroundColor: snackbar.severity === 'success'? '#40C4FF' : '#FFD700' }}  // Customize Snackbar color based on severity
      />
    </ThemeProvider>
  );
};

export default App;
