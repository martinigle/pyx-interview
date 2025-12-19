import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const userInitials = useAuthStore((state) => {
    const name = state.user!.nombre;
    return name.split("")[0];
  });

  const toDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        paddingX: 2,
        paddingY: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            IMA
          </Typography>
          <Button
            variant="text"
            color="inherit"
            size="small"
            onClick={() => {
              toDashboard();
            }}
          >
            dashboard
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
            {userInitials}
          </Avatar>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={() => {
              handleLogout();
            }}
          >
            logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
