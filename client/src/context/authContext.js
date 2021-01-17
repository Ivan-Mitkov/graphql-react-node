import React, { useReducer, createContext } from "react";
import {LOGGED_IN_USER} from '../constants'
//reducer
const firebaseReducer = (state, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
//state
const initialState = {
  user: null,
};

//context
export const AuthContext = createContext(initialState);

//context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  const value = { state, dispatch };
  //state and dispatch will be available in any children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
