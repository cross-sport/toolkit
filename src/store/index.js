import { configureStore } from "@reduxjs/toolkit";
import uiReduce from "./ui-slice";
import cartReduce from "./cart-slice";

const store = configureStore({
  reducer: { ui: uiReduce, cart: cartReduce },
});

export default store;
