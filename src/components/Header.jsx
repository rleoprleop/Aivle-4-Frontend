import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#007baf",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        width: '100vw',
        left: 0,
      }}
    >
      <Toolbar disableGutters sx={{ width: '100%', px: 2 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/home"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.5rem",
            '&:hover': {
              color: "#50cbff"
            }
          }}
        >
          걷기가 서재
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
