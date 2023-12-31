import { createContext } from "react";

const cartContext = createContext({
    item:[],
    amount: 0,
    addItem: (item)=> {},
    hideItem: (item)=> {},
    clearItem: ()=>{}
})

export default cartContext;