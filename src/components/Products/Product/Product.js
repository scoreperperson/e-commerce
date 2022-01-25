import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";
function Product({ product, handleAddToCart, cart }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} key={product.id}>
      <CardMedia title={product.name} image={product.image.url} className={classes.media} />
      <CardActionArea>
        <CardContent>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="h5">
              {product.price.formatted_with_symbol}
            </Typography>
          </div>
          <Typography dangerouslySetInnerHTML={{ __html: product.description }}  variant="body2" color="text.secondary" component='p'/>
         
        
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
     
          <IconButton onClick={()=> handleAddToCart(product.id, 1)}>
            <AddShoppingCart />
          </IconButton>
          
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default Product;
