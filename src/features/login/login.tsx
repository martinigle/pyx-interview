import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          setPassword("");
          navigate("/dashboard");
        },
      },
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
    >
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {loginMutation.isError && (
            <Typography color="error" variant="body2" mt={1}>
              Invalid credentials
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
