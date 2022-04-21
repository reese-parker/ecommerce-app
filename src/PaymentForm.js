import React, { useState, useEffect } from "react";
import {
  Elements,
  ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function PaymentForm({
  checkoutToken,
  shippingData,
  backStep,
  processTransaction,
  nextStep,
}) {
  const [stripe, setStripe] = useState(null);

  // Save stripe information and trigger render for card element
  useEffect(() => {
    setStripe(stripePromise);
  }, []);

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Capture card details and create payment method

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    // Check for error, create order info if successful

    if (error) {
      console.log(error);
      return;
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: shippingData.firstName + shippingData.lastName,
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.postalCode,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      // Process transaction with commerce.js

      processTransaction(checkoutToken.id, orderData);
    }
    nextStep();
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom sx={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      {stripe && (
        <Elements stripe={stripe}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <br />
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="outlined" onClick={backStep}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe}
                    color="primary"
                  >
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  </Button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      )}
    </>
  );
}
