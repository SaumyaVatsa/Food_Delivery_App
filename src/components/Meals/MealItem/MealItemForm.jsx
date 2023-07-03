import React from 'react';
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm() {
    const clickHandler = (e)=>{
        e.preventDefault();
    }
  return (
    <form className={classes.form}>
        <Input label="Amount" input={{
            id:'amount',
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }}/>
        <button onClick={clickHandler}>Add</button>
    </form>
  )
}

export default MealItemForm