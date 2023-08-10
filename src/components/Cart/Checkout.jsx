import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// Helper functions
const isNotEmpty = value => value.trim() !== '';
const isFiveChars = value => value.trim().length === 6;

function Checkout(props) {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const cityInputRef = useRef();
    const postalInputRef = useRef();

    const confirmHandler = (event)=>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;

        const nameIsValid = isNotEmpty(enteredName);
        const streetIsValid = isNotEmpty(enteredStreet);
        const cityIsValid = isNotEmpty(enteredCity);
        const postalIsValid = isFiveChars(enteredPostal);

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

        setFormValidity({
            name: nameIsValid,
            street: streetIsValid,
            city: cityIsValid,
            postal: postalIsValid
        })
        
        if (formIsValid){
            return;
        }
    }
  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p style={{color: 'red'}}>Please enter a valid name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>
        {!formValidity.street && <p style={{color: 'red'}}>Please enter a valid Street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formValidity.postal && <p style={{color: 'red'}}>Please enter a valid postal</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && <p style={{color: 'red'}}>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
      <button type="button" onClick={props.onCancel}>Cancel</button>
      <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
