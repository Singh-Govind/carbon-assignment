import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import BarChart from "../components/BarChart";

function Home() {
  const [popData, setPopData] = useState([]);

  const fetchPopulation = async () => {
    try {
      let res = await fetch(
        `https://datausa.io/api/data?drilldowns=Nation&measures=Population`
      );
      res = await res.json();
      setPopData(res.data);
    } catch (e) {
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    fetchPopulation();
  }, []);

  return (
    <Box
      sx={{
        padding: { xs: "1rem", sm: "2rem 0.5rem" },
        width: { xs: "100%", sm: "70%" },
      }}
    >
      {popData.length > 0 && <BarChart data={popData} />}
    </Box>
  );
}

export default Home;
