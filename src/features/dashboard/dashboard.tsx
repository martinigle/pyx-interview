import Grid from "@mui/material/Grid";
import IncidentPieChart from "../incidents/charts/incidentPieChart";
import { Box, Container, Paper, Typography } from "@mui/material";
import IncidentBarChart from "../incidents/charts/incidentBarChart";
import IncidentList from "../incidents/incidentList";

export default function Dashboard() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Paper elevation={3} sx={{ p: 2, alignSelf: "start", width: "45%" }}>
          <Typography variant="h4" gutterBottom>
            Incidentes por canal
          </Typography>
          <Box sx={{ height: 300, display: "flex", justifyContent: "center" }}>
            <IncidentPieChart />
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, width: "47%" }}>
          <Typography variant="h6" gutterBottom>
            Incidentes por Estado
          </Typography>
          <Box
            sx={{
              height: 300,
            }}
          >
            <IncidentBarChart />
          </Box>
        </Paper>
      </Grid>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: "auto",
          bgcolor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#666",
        }}
      >
        <IncidentList />
      </Paper>
    </Container>
  );
}
