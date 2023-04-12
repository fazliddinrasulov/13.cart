import React, { createContext, useContext, useEffect, useReducer } from "react";

import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";
import { getTotals } from "./utils";
const AppContext = createContext<any>(null);

export const useAppContext = () => {
  return useContext(AppContext);
};
const url = "https://www.course-api.com/react-useReducer-cart-project";

const initialState = {
  isLoading: false,
  cart: new Map(),
};

const reducer = (state: any, action: any) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const item: any = newCart.get(action.payload.id);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(item.id, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const item: any = newCart.get(action.payload.id);
    if (item.amount === 1) {
      newCart.delete(item.id);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(item.id, newItem);
    return { ...state, cart: newCart };
  }
  if (action.type === LOADING) {
    return { ...state, isLoading: true };
  }
  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.data.map((item: any) => [item.id, item]));
    // console.log(cart);
    return { isLoading: false, cart: newCart };
  }
  throw new Error("no matching action type");
};

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<React.Reducer<any, any>>(reducer, initialState);
  const { totalAmount, totalCost } = getTotals(state.cart);
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const removeItem = (id: any) => {
    dispatch({ type: REMOVE, payload: { id } });
  };
  const increase = (id: any) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decrease = (id: any) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const resp = await fetch(url);
    const data = await resp.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { data } });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
