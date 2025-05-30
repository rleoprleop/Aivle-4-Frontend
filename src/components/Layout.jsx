import { Box } from '@mui/material';

function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: 2,
          py: 4,
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 