import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import { commerce } from "./lib/commerce";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import PaymentSuccessful from "./PaymentSuccessful";
import PaymentUnsuccessful from "./PaymentUnsuccessful";
import styles from "./styles/CheckoutStyles.module.css";

const steps = ["Shipping address", "Payment details"];

const demoMode = true;

export default function Checkout({ cart, refreshCart }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async () => {
      try {
        setLoading(true);
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    generateToken();
  }, [cart]);

  // Functions for navigating checkout

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const saveShippingData = (data) => {
    setShippingData(data);
    nextStep();
  };

  // Take newOrder from Stripe and process transaction

  const processTransaction = async (checkoutTokenId, newOrder) => {
    if (demoMode) {
      alert("Payments currenlty disabled in demo mode");
      navigate("/cart");
      return
    }
    setLoading(true);
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      console.log(" successful transaction");
      refreshCart();
    } catch (error) {
      console.log("transaction failed");
      setErrorMessage(error.data.error.message);
    }
    setLoading(false);
  };

  const LoadingSpinner = () => (
    <div className={styles.Spinner}>
      <CircularProgress />
    </div>
  );

  // Set checkoutStage component to stepper for conditional rendering

  let checkoutStage;

  if (activeStep === 0)
    checkoutStage = (
      <AddressForm
        saveShippingData={saveShippingData}
        checkoutToken={checkoutToken}
      />
    );

  if (activeStep === 1)
    checkoutStage = (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        processTransaction={processTransaction}
        setLoading={setLoading}
      />
    );

  if (activeStep === 2) {
    if (loading) return <LoadingSpinner />;
    else
      checkoutStage = order.customer ? (
        <PaymentSuccessful order={order} />
      ) : (
        errorMessage && <PaymentUnsuccessful errorMessage={errorMessage} />
      );
  }

  return (
    <Paper className={styles.Paper}>
      <Typography variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} className={styles.Stepper}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {loading ? <LoadingSpinner /> : checkoutToken && checkoutStage}
    </Paper>
  );
}
