import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function CryptoPrices() {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      let res = await fetch(
        `https://api.coindesk.com/v1/bpi/currentprice.json`
      );
      res = await res.json();
      setData(res.bpi);
    } catch (e) {
      console.log("error", e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currencies = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  return (
    <Box
      sx={{
        padding: { xs: "1rem", sm: "2rem 0.5rem" },
        width: { xs: "100%", sm: "70%" },
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginBottom: "3rem",
          color: "#2AB52A",
        }}
      >
        Bitcoin Prices
      </Typography>
      <Grid container spacing={3}>
        {Object.keys(data).map((currency, index) => (
          <Grid item xs={12} sm={6} md={4} key={currency}>
            <Card>
              <CardContent>
                <Typography variant="body1" component="p" gutterBottom>
                  Bitcoin Price ({currencies[currency]})
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  gutterBottom
                  fontWeight="bold"
                >
                  {data[currency].rate}
                </Typography>
                <Typography variant="h4" component="p" color="#2AB52A">
                  {currency ? currency : "Loading..."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CryptoPrices;
