import React, { useState, useEffect } from "react";
import { Grid, Container, Button } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { ClassNames } from "@emotion/react";
import useStyles from "./styles";
function CartItem({ cartItem, onUpdateCartQty,
    onRemoveFromCart}) {
  const classes = useStyles();
  console.log(cartItem);

  return (
    <Card className={classes.root} key={cartItem.id}>
      <CardMedia
        title={cartItem.name}
        image={cartItem.image.url}
        className={classes.media}
      />
      <CardActionArea>
        <CardContent className={classes.cardContent}>
         
            <Typography gutterBottom variant="h5" >
              {cartItem.name}
            </Typography>
            <Typography variant="h6">
              {cartItem.price.formatted_with_symbol} 
            </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <div className={classes.buttons}>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(cartItem.id, cartItem.quantity - 1)}>
                  -
                </Button>

                <Typography >{cartItem.quantity}</Typography>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(cartItem.id, cartItem.quantity + 1)}>
                  +
                </Button>
                <Button type="button" size="small" variant="contained" color="secondary" onClick={() => onRemoveFromCart(cartItem.id)}>
                  Remove
                </Button>
              </div>
            </CardActions>
        
        
      </CardActionArea>
    </Card>
  );
}

export default CartItem;
