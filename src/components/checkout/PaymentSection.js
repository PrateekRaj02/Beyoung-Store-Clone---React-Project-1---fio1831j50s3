import { Button, Grid, TextField } from "@mui/material";
import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { setButtonDisable } from "../../utils/redux/checkoutSlice";
import {useMediaQuery} from '@mui/material';

const PaymentSection = () => {
  const dispatch=useDispatch();
    const [disableForm, setDisableForm] = useState(false);
    const [errors, setErrors] = useState({
      ccnum: false,
      name: false,
      month: false,
      year: false,
      cvv: false,
    });
    const smallScreen=useMediaQuery('(max-width:650px)');
  
    const [cardInfo, setCardInfo] = useState({
      ccnum: "",
      mm: "",
      yyyy: "",
      cvv: "",
    });
  
    // function to save user inputs for payments and identify errors in the input
    const handleChanges = (e) => {
      const { name, value } = e.target;
     
      if (name === "month") {
        if (value.length <= 2) {
          setCardInfo((prevInfo) => ({ ...prevInfo, mm: value }));
          if (
            value.length !== 2 ||
            parseInt(value, 10) > 12 ||
            parseInt(value, 10) === 0
          ) {
            
            setErrors({ ...errors, [name]: true });
          } else {
            setErrors({ ...errors, [name]: false });
          }
        }
      } else if (name === "year") {
        if (value.length <= 4) {
          setCardInfo((prevInfo) => ({ ...prevInfo, yyyy: value }));
          if (value.length !== 4 || parseInt(value, 10) === 0) {
            setErrors({ ...errors, [name]: true });
          } else {
            setErrors({ ...errors, [name]: false });
          }
        }
      } else if (name === "name") {
        if (value.length < 1 || !isValidName(value)) {
          setErrors({ ...errors, [name]: true });
        } else {
          setErrors({ ...errors, [name]: false });
        }
      } else if (name === "cvv") {
        if (value.length <= 3) {
          setCardInfo((prevInfo) => ({ ...prevInfo, cvv: value }));
          if (value.length !== 3) {
            setErrors({ ...errors, [name]: true });
          } else {
            setErrors({ ...errors, [name]: false });
          }
        }
      } else if (name === "ccnum") {
        if (value.length <= 16) {
          setCardInfo((prevInfo) => ({ ...prevInfo, ccnum: value }));
          if (value.length !== 16) {
            setErrors({ ...errors, ccnum: true });
          } else {
            setErrors({ ...errors, ccnum: false });
          }
        }
      }
    };
  
    // function to verify if the input is a valid name
    const isValidName = (str) => {
      const regex = /[^a-zA-Z\s]/;
      return !regex.test(str);
    };
    const preventExtraInputs = (e) => {
        if (e.key === "-" || e.key === "+" || e.key === "e") {
          e.preventDefault();
        }
      };

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        setDisableForm(!disableForm);
        disableForm ? dispatch(setButtonDisable(true)):dispatch(setButtonDisable(false));
    }
    
  return (
    <div className={`bg-white ${smallScreen?'mx-2 mb-2':'ml-2'}  p-2 rounded-lg`}>
    <h5 className="font-bold">Enter Your Debit/Credit Card Details</h5>
    <p className="mb-2">We do not store your card details.</p>
    <section className="payments form">
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Card number"
              type="number"
              name="ccnum"
              value={cardInfo.ccnum}
              onChange={handleChanges}
              onKeyDown={preventExtraInputs}
              variant="outlined"
              inputProps={{ maxLength: 16 }}
              required
              fullWidth
              disabled={disableForm}
              error={errors.ccnum}
              helperText={
                errors.ccnum ? "Card Number must be 16 digits only" : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              type="text"
              name="name"
              onChange={handleChanges}
              variant="outlined"
              required
              fullWidth
              disabled={disableForm}
              error={errors.name}
              helperText={errors.name ? "Please enter a valid name" : ""}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="MM"
              type="number"
              name="month"
              value={cardInfo.mm}
              onChange={handleChanges}
              onKeyDown={preventExtraInputs}
              variant="outlined"
              required
              fullWidth
              disabled={disableForm}
              error={errors.month}
              helperText={
                errors.month ? "Please enter a valid month value" : ""
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="YYYY"
              type="number"
              name="year"
              value={cardInfo.yyyy}
              onChange={handleChanges}
              onKeyDown={preventExtraInputs}
              variant="outlined"
              required
              fullWidth
              disabled={disableForm}
              error={errors.year}
              helperText={
                errors.year ? "Please enter a valid year value" : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="CVV"
              type="number"
              name="cvv"
              value={cardInfo.cvv}
              onChange={handleChanges}
              onKeyDown={preventExtraInputs}
              variant="outlined"
              required
              fullWidth
              sx={{ display: "flex", justifyContent: "flex-end" }}
              disabled={disableForm}
              error={errors.cvv}
              helperText={errors.cvv ? "CVV must be 3 digits only" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", marginTop: "1rem" }}
              value={disableForm}
            >
              {disableForm ? "Edit details" : "Confirm"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </section>
  </div>
  )
}

export default PaymentSection