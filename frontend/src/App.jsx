import { Box } from "@mui/material";
import "./App.css";
import Sidebar from "./components/Sidebar";
import AllRoutes from "./pages/AllRoutes";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "1rem",
      }}
    >
      <Sidebar />
      <AllRoutes />
    </Box>
  );
}

export default App;
