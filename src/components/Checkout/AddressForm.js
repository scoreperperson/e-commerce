import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { InputLabel, Select, MenuItem, Button, Grid } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";
import { NextWeek } from "@material-ui/icons";

function AddressForm({ checkoutToken, next }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisons, setShippingSubdivisons] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[1]);
    console.log(countries);
  };
  const fetchSubDivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    console.log(subdivisions);
    setShippingSubdivisons(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    // the reason why this one doesnt have braces around the variable is because there is no object to destructure. https://medium.com/@lcriswell/destructuring-props-in-react-b1c295005ce0
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    console.log(options);
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
    console.log(shippingSubdivision)
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubDivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {" "}
        Shipping Address{" "}
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=> next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={4}>
            <CustomTextField required name="firstName" label="First name" />
            <CustomTextField required name="lastName" label="Last name" />
            <CustomTextField required name="address1" label="Address" />
            <CustomTextField required name="email" label="Email" />
            <CustomTextField required name="city" label="City" />
            <CustomTextField
              required
              name="postCode"
              label="Zip / Postal code"
            />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Sub-Divison</InputLabel>

              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {
                Object.entries(shippingSubdivisons)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.description} - {item.price.formatted_with_symbol}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm;
