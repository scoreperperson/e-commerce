import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
function CustomTextField({ name, label, required, value }) {
  const { control } = useFormContext();
  return (
    <Grid item sx={12} sm={6}>
      {/* A component with a render prop takes a function that returns a React
      element and calls it instead of implementing its own render logic. 	
This is a render prop. A function that returns a React element and provides 
the ability to attach events and value into the component. This simplifies integrating with external 
controlled components with non-standard prop names. Provides onChange, onBlur, name, ref and 
value to the child component, and also a fieldState object which contains specific input state.  */}
      <Controller
        control={control}
        defaultValue=''
        name={name}
        render={({ field }) => <TextField fullWidth label={label} {...field} required />}
      />
    </Grid>
  );
}

export default CustomTextField;
