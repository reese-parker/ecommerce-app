import React from "react";

import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function PaymentSuccessful(props) {
  const { order } = props;
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h5">
        Thank you for your purchase, {order.customer.firstname}.
      </Typography>
      <Typography variant="subtitle2">
        Order reference: {order.customer_reference}
      </Typography>
      <br />
      <Button to="/" variant="outlined" onClick={() => navigate("/")}>
        Back to home
      </Button>
    </div>
  );
}
