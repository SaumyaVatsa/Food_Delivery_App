import React, { useReducer } from 'react';
import cartContext from './cartContext';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action)=>{
    if(action.type === 'ADD_ITEM'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        const existingCartIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartIndex];
        let updatedItems;

        if(existingCartItem){
            const updatedItem={
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartIndex] = updatedItem;

        }else{
            updatedItems = state.items.concat(action.item);
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE'){
        const existingCartIndex = state.items.findIndex(item => item.id === action.id);

        const existingCartItem = state.items[existingCartIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;

        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartIndex] = updatedItem;
        }

        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'CLEAR'){
        return defaultCartState;
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

    const clearItemHandler = ()=>{
        dispatchCartAction({type: 'CLEAR'})
    }

    const cartCont = {
        item:cartState.items,
        amount: cartState.totalAmount,
        addItem: addItemHandler,
        hideItem: removeItemHandler,
        clearItem: clearItemHandler
    }
  return (
    <cartContext.Provider value={cartCont}>
        {props.children}
    </cartContext.Provider>
  )
}

export default CartProvider