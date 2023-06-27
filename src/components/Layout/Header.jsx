import React from 'react'
import mealsImage from '../../assets/meals.jpg';
import classes from "./Header.module.css";
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
  return (
    <>
    <header className={classes.header}>
        <h1>Delivery Baba</h1>
        <HeaderCartButton/>
    </header>
    <div className={classes['main-image']}>
        <img src={mealsImage} alt="Meals Image" />
    </div>
    </>
  )
}

export default Header