import React, { createContext, useReducer } from "react";

export const DataContext = createContext();

// export const DataProvider = ({ children, reducer, initialState }) => {
//   return (
//     <DataContext.Provider value={useReducer(reducer, initialState)}>
//       {children}
//     </DataContext.Provider>
//   );
// }; //**************************************************THIS CODE WORKS FINE, BUT DOESN'T PREVENT CART FROM LOSING IT'S ITEM/S UPON PAGE REFRESH (code from lesson)*/

import { useEffect } from "react";

export const DataProvider = ({ children, reducer, initialState }) => {
  // Load basket from localStorage
  const localState = {
    ...initialState,
    basket: JSON.parse(localStorage.getItem("basket")) || [],
  }; //This line creates a modified version of initialState: It replaces the empty basket with the one saved in localStorage, if it exists.If there's no saved cart, it falls back to an empty array.

  const [state, dispatch] = useReducer(reducer, localState);

  // Save basket to localStorage on every change
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(state.basket));
  }, [state.basket]); //This effect runs every time basket changes. It updates localStorage with the latest cart state by converting it to a JSON string.

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
