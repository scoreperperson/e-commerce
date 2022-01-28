import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import { Button } from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStrip} from '@stripe/stripe-js'
import Review from './Review'

function PaymentForm({checkoutToken, onUpdateCartQty}) {
    return ( 
        <div> 
           <Review checkoutToken={checkoutToken} onUpdateCartQty={onUpdateCartQty}/>
        </div>
     );
}

export default PaymentForm;