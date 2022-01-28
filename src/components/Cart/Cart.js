import React, { useState, useEffect } from "react";
import { Grid, Container, Button } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ClassNames } from "@emotion/react";
import useStyles from "./styles";
import CartItem from "./CartItem /CartItem";
import { Link } from "react-router-dom";
function Cart({
  cart,
  handleAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart,
}) {
  const classes = useStyles();

  const isEmpty = !cart.total_items;

  const EmptyCart = () => (
    <div>
      <Typography variant="h5">
        Your SPP cart is empty,
        <Link to="/" className={classes.link}>
          {" "}
          add some items
        </Link>
        .
      </Typography>
      <Typography variant="body2">
        Subtotal ({cart.total_items} items):
      </Typography>
    </div>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((cartItem) => (
          <Grid item xs={12} sm={4} key={cartItem.id}>
            <CartItem cartItem={cartItem} 
                  onUpdateCartQty={onUpdateCartQty}
                  onRemoveFromCart={onRemoveFromCart}
                  />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={onEmptyCart}
          >
            Empty Cart
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to='/checkout'
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
