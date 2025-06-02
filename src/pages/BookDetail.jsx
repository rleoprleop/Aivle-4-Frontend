import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import { getBook, deleteBook, getComments, createComment, updateComment, deleteComment } from '../api/bookApi';
import Layout from '../components/Layout';
import NoImageAvailable from '../theme/NoImageAvailable.png';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data);
      } catch (error) {
        console.error('책 정보를 불러오는데 실패했습니다:', error);
        alert('책 정보를 불러오는데 실패했습니다.');
        navigate('/main');
      }
    };
    fetchBook();
  }, [id, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(id);
        setComments(data);
      } catch (error) {
        console.error('댓글을 불러오는데 실패했습니다:', error);
      }
    };
    fetchComments();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 책을 삭제하시겠습니까?')) {
      try {
        await deleteBook(id);
        alert('책이 삭제되었습니다.');
        navigate('/main');
      } catch (error) {
        console.error('책 삭제 실패:', error);
        alert('책 삭제에 실패했습니다.');
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await createComment(id, newComment);
      setComments([...comments, response]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setEditContent(comment.content);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await updateComment(editingComment.id, editContent);
      setComments(comments.map(comment => 
        comment.id === editingComment.id ? response : comment
      ));
      setEditDialogOpen(false);
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('이 댓글을 삭제하시겠습니까?')) {
      try {
        await deleteComment(commentId);
        setComments(comments.filter(comment => comment.id !== commentId));
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
        alert('댓글 삭제에 실패했습니다.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  if (!book) {
    return null;
  }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Box
            component="img"
            src={book.coverImageUrl}
            alt={book.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = NoImageAvailable;
            }}
            sx={{
              width: 300,
              height: 400,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: 'grey.100'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ textAlign: 'left' }}>
            제목: {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textAlign: 'left' }}>
            등록일: {formatDate(book.createdAt)}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: 'left' }}>
        본문 내용
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'left' }}>
        {book.content}
      </Typography>
      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: 'left' }}>
        댓글
      </Typography>
      <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="댓글을 작성해주세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!newComment.trim()}
        >
          댓글 작성
        </Button>
      </Box>
      <List>
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText
              primary={comment.content}
              secondary={formatDate(comment.createdAt)}
            />
            <Box>
              <IconButton onClick={() => handleEditClick(comment)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteComment(comment.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/main')}
          sx={{ minWidth: '100px' }}
        >
          목록
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/book/edit/${id}`)}
          sx={{ minWidth: '100px' }}
        >
          수정
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ minWidth: '100px' }}
        >
          삭제
        </Button>
      </Box>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>댓글 수정</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>취소</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default BookDetail;
