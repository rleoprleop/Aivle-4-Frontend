import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 책 목록 조회
export const getBooks = async () => {
  try {
    const response = await api.get('/books');
    return response.data;
  } catch (error) {
    console.error('책 목록 조회 실패:', error);
    throw error;
  }
};

// 책 상세 조회
export const getBook = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('책 상세 조회 실패:', error);
    throw error;
  }
};

// 책 등록
export const createBook = async (bookData) => {
  try {
    const response = await api.post('/books', {
      title: bookData.title,
      content: bookData.content
    });
    return response.data;
  } catch (error) {
    console.error('책 등록 실패:', error);
    throw error;
  }
};

// 책 수정
export const updateBook = async (id, bookData) => {
  try {
    const response = await api.patch(`/books/${id}`, {
      title: bookData.title,
      content: bookData.content,
      coverImageUrl: bookData.coverImageUrl
    });
    return response.data;
  } catch (error) {
    console.error('책 수정 실패:', error);
    throw error;
  }
};

// 책 삭제
export const deleteBook = async (id) => {
  try {
    await api.delete(`/books/${id}`);
  } catch (error) {
    console.error('책 삭제 실패:', error);
    throw error;
  }
};

// 책 검색
export const searchBooks = async (searchTerm) => {
  try {
    const response = await api.get(`/books/search?title=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    console.error('책 검색 실패:', error);
    throw error;
  }
}; 