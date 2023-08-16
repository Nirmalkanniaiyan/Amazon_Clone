import React, { createContext, useContext, useReducer } from "react";

//  context provides a way to pass data through different component without needing to pass them in every sub level

//Prepare the Data layer
export const StateContext = createContext();

//Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//Pull information from the Data layer
export const useStateValue = () => useContext(StateContext);
