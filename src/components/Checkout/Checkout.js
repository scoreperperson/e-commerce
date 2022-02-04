import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Divider,
  Paper,
  CssBaseline,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ClassNames } from "@emotion/react";
import useStyles from "./styles";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import createSpacing from "@material-ui/core/styles/createSpacing";
import { typography } from "@mui/system";
function Checkout({ cart, onUpdateCartQty, onCaptureCheckout, order, error }) {
  const steps = ["Shipping Address", "Payment details"];
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const nextActiveStep = () =>
    setActiveStep((previousStep) => previousStep + 1);
  const backStep = () => setActiveStep((previousStep) => previousStep - 1);
  const next = (data) => {
    console.log(data);
    setShippingData(data);
    nextActiveStep();
  };
  const Confirmation = () => order.customer ? 
  <div>
  <Typography variant='h5'>
    Thank you for purchasing, {order.customer.firstname} {order.customer.lastname}. 
  </Typography>
  <Divider className={classes.divider}/>
 
  <Typography variant='subtitle2'>
    
Order ref: {order.customer_reference}

  </Typography>
  <br/>
  <Button variant="outlined" component={Link} to='/'>
                  Back To Home
                </Button>
  </div> : <div className={classes.spinner}> <CircularProgress/> </div>
  console.log(cart);
 

  if(error){
    <>
    <Typography>Error:{error}</Typography>
    <br/>
    <Button variant="outlined" onClick={backStep}>
                  Back to Home
                </Button>
    </>
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        cart={cart}
        onUpdateCartQty={onUpdateCartQty}
        backStep={backStep}
        next={next}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    );
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
            {/* The Stepper can be controlled by passing the current step index
            (zero-based) as the activeStep prop. Stepper orientation is set
            using the orientation prop. */}
            <Stepper activeStep={activeStep}>
              {steps.map((item, index) => (
                <Step key={index}>
                  <StepLabel>{item}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </main>
      </div>
    </>
  );
}

export default Checkout;
