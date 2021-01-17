import React, { useReducer, createContext } from "react";
//reducer
const firebaseReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
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
const AuthContext = createContext(initialState);

//context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  const value = { state, dispatch };
  //state and dispatch will be available in any children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
