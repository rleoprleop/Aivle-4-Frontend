import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#007baf",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
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
      </Container>
    </AppBar>
  );
}

export default Header;
