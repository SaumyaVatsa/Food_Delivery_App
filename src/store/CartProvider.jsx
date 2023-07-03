import React, { useReducer } from 'react';
import cartContext from './cartContext';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action)=>{
    if(action.type === 'ADD_ITEM'){
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
}

function CartProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemHandler = (item)=>{
        dispatchCartAction({type: 'ADD_ITEM', item: item})
    }

    const removeItemHandler = (id)=>{
        dispatchCartAction({type: 'REMOVE_ITEM', id:id})
    }

    const cartCont = {
        item:cartState.items,
        amount: cartState.totalAmount,
        addItem: addItemHandler,
        hideItem: removeItemHandler
    }
  return (
    <cartContext.Provider value={cartCont}>
        {props.children}
    </cartContext.Provider>
  )
}

export default CartProvider