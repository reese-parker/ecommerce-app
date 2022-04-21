import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

export default function ShippingOptionsSelects({
  shippingCountry,
  setShippingCountry,
  countries,
  shippingSubdivision,
  setShippingSubdivision,
  subdivisions,
  shippingOption,
  setShippingOption,
  options,
}) {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <InputLabel>Shipping Country</InputLabel>
        <Select
          value={shippingCountry}
          onChange={(e) => setShippingCountry(e.target.value)}
          fullWidth
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Province / State</InputLabel>
        <Select
          value={shippingSubdivision}
          onChange={(e) => setShippingSubdivision(e.target.value)}
          fullWidth
        >
          {subdivisions.map((subdivision) => (
            <MenuItem key={subdivision.id} value={subdivision.id}>
              {subdivision.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Shipping Options</InputLabel>
        <Select
          value={shippingOption}
          onChange={(e) => setShippingOption(e.target.value)}
          fullWidth
          required
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
}
