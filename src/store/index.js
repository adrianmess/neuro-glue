import reducer from "../reducers/";
import { createStore } from "redux";

const initialState = { redux: "this is redux initialState" };
export  const store = createStore(reducer, initialState);
export default store;