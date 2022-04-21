import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { commerce } from "./lib/commerce";
import FormInput from "./FormInput";
import ShippingOptionsSelects from "./ShippingOptionsSelects";
import styles from "./styles/AddressFormStyles.module.css"

export default function AddressForm({ checkoutToken, saveShippingData }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  // Fetch shipping optons from commerce.js and update state

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country: country, region: region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  // Set shipping options on load

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [checkoutToken.id, shippingCountry, shippingSubdivision]);

  // Create arrays from shipping options for render

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((shippingOption) => ({
    id: shippingOption.id,
    description: shippingOption.description,
    label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`,
  }));

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            saveShippingData({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="postalCode" label="Postal / ZIP code" />
            <ShippingOptionsSelects
              shippingCountry={shippingCountry}
              setShippingCountry={setShippingCountry}
              countries={countries}
              shippingSubdivision={shippingSubdivision}
              setShippingSubdivision={setShippingSubdivision}
              subdivisions={subdivisions}
              shippingOption={shippingOption}
              setShippingOption={setShippingOption}
              options={options}
            />
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button className={styles.checkoutActionButton} component={Link} to="/cart" variant="contained">
              Back to Cart
            </Button>
            <Button className={styles.checkoutActionButton} type="submit " variant="contained">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
