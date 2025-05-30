import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, 
  Typography, 
  TextField,
  Button,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BookCard from '../components/BookCard';
import Layout from '../components/Layout';

function Main({ books }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <TextField
          label="책 제목 검색"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '400px' }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/book/new')}
          size="large"
        >
          책 등록
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard 
              book={book}
              onClick={() => navigate(`/book/${book.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default Main;
