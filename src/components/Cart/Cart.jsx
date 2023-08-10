import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import cartContext from "../../store/cartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const cartCtx = useContext(cartContext);

  const totalAmount = `Rs ${cartCtx.amount.toFixed(2)}/-`;
  const hasItems = cartCtx.item.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.hideItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onOrderClickHandler = ()=>{
    setShowOrderForm(true)
  }
  return (
    <Modal onClick={props.onClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      
      {showOrderForm ? <Checkout onCancel={props.onClick}/> : <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClick}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={onOrderClickHandler}>Order</button>}
      </div>}
      
    </Modal>
  );
}

export default Cart;
