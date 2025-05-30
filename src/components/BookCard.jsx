import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR');
};

function BookCard({ book, onClick }) {
  return (
    <Card 
      sx={{ 
        width: '300px',
        height: '500px',
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
      onClick={onClick}
    >
      <Box sx={{ 
        position: 'relative', 
        paddingTop: '133.33%',
        height: '0',
        overflow: 'hidden'
      }}>
        <CardMedia
          component="img"
          image={book.coverImageUrl || 'https://via.placeholder.com/300x400.png?text=No+Image'}
          alt={book.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            bgcolor: 'grey.200'
          }}
        />
      </Box>
      <CardContent sx={{ 
        flexGrow: 0,
        display: 'flex', 
        flexDirection: 'column', 
        p: 2,
        height: '100px',
        minHeight: '100px',
        maxHeight: '100px'
      }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.2,
            height: '48px',
            fontSize: '1rem',
            fontWeight: 500
          }}
        >
          {book.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mt: 'auto' }}
        >
          등록일: {formatDate(book.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BookCard; 