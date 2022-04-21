import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function PaymentUnsuccessful(props) {
  const { errorMessage } = props;
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h5">Error: {errorMessage}</Typography>
      <br />
      <Button onClick={() => navigate("/")} variant="outlined">
        Back to home
      </Button>
    </>
  );
}
