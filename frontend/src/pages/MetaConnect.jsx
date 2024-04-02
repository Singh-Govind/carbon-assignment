import { Box, Button, Typography } from "@mui/material";
import Web3 from "web3";
import React, { useState } from "react";

function MetaConnect() {
  const [accountConnected, setAccountConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasMetaMask = typeof window.ethereum !== "undefined";

  const connectToMetaMask = async () => {
    if (hasMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(window.ethereum);
        setAccountConnected(true);
        setConnectedAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        setIsError(true);
        setErrorMessage(error);
      }
    } else {
      console.error("Please install MetaMask to connect.");
      setIsError(true);
      setErrorMessage("Please install MetaMask to connect.");
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: "1rem", sm: "2rem 0.5rem" },
        width: { xs: "100%", sm: "80%" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      {isError && <Typography variant="body1">{errorMessage}</Typography>}
      {accountConnected ? (
        <Typography variant="body1">
          Your account is connected {connectedAccount}
        </Typography>
      ) : (
        !isError && (
          <Button onClick={connectToMetaMask}>Connect with Meta Mask</Button>
        )
      )}
    </Box>
  );
}

export default MetaConnect;
