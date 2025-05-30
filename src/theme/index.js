import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',  // grey.100
      paper: '#ffffff'
    },
    primary: {
      main: '#1976d2',  // Material-UI 기본 파란색
    },
    secondary: {
      main: '#dc004e',  // Material-UI 기본 분홍색
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default theme; 