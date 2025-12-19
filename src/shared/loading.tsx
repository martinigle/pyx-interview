import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  message?: string;
  size?: number;
  minHeight?: number | string;
}

export default function Loading({
  message = "Loading...",
  size = 40,
  minHeight = 200,
}: LoadingProps) {
  return (
    <Box
      sx={{
        minHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress size={size} />
      {message && <Typography color="text.secondary">{message}</Typography>}
    </Box>
  );
}
