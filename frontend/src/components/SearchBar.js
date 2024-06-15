import React, { useState } from 'react';
import { TextField, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const SearchBar = ({ setSearchTerm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async event => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.length > 2) { // Only fetch results after typing at least 3 characters
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:4000/search?query=${encodeURIComponent(searchTerm)}`);
        setSearchResults(result.data.books); // Assuming your API returns an array of books
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]); // Clear results if less than 3 characters are typed
    }
  };

  return (
    <Box sx={{ textAlign: 'center', margin: '20px 0' }}>
      <TextField
        label="Search books"
        variant="outlined"
        onChange={handleSearch}
        fullWidth
        InputProps={{
         ...(!loading && {
            endAdornment: (
              <Box sx={{ pl: 2 }}>
                {loading? <CircularProgress color="inherit" size={24} /> : null}
              </Box>
            ),
          }),
        }}
        sx={{
          maxWidth: { xs: '90%', sm: '80%', md: '70%' }, // Responsive max-width
          mx: 'auto',
          borderWidth: 2, // Thicker border
          borderColor: 'divider', // Ensure the divider is visible
          '&.MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'grey.500', // Border color
            },
            '&:hover fieldset': {
              borderColor: 'grey.700', // Hover border color
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main', // Focused border color
            },
          },
        }}
      />
      {searchResults.length > 0 && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'background.paper' }}>
          {searchResults.map((result, index) => (
            <div key={index}>{result.title}</div> // Simplified for example; customize as needed
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
