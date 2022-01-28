import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText,Button } from "@material-ui/core";
import useStyles from "../Cart/CartItem /styles";
function Review( {checkoutToken, onUpdateCartQty}) {
    const classes = useStyles();
  return(

  
   <>

  <Typography variant='h6' gutterBottom> Order summary</Typography>  
  <List disablePadding>
      {checkoutToken.live.line_items.map((item)=>(
  
          <ListItem style={{padding:'10 px 0'}} >
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`}/>
              <div className={classes.buttons}>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>
                  -
                </Button>

              
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>
                  +
                </Button>
                
              </div>
                  <Typography variant='body2'>{item.line_total.formatted_with_symbol} </Typography>
            
          </ListItem>
      ))}
      <ListItem style={{padding:'10 px 0'}}>

      </ListItem>
  </List>
 
  </>
  )

      }

  
  


export default Review;
