import React, { useState, useEffect } from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import { ClassNames } from '@emotion/react';
import useStyles from "./styles";
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/spp.jpg'
import { Link, useLocation } from 'react-router-dom';
function Navbar({cart}) {
    const location = useLocation()
    const classes = useStyles();
    return ( 
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar>
                <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                    <img  src={logo} height='25px' className={classes.image}/>
                    SPP Shopping Bonanza
                </Typography>
                <div className={classes.grow}/>
                <div className={classes.button}/>
                <IconButton>
                  
                    { location.pathname === '/' &&
                    <Badge badgeContent={cart.total_items} color='secondary' component={Link} to='/cart' >
                        <ShoppingCart />
                    </Badge>}
                 
                </IconButton>
            </Toolbar>
        </AppBar> 
     );
}

export default Navbar;