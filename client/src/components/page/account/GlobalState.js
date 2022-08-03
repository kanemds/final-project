import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
// Initial State
const initialState = {
  users: [],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const removeUser = (id) => {
    axios.delete(`teacher/account/${id}`).then(() => window.location.reload());

    dispatch({
      type: "REMOVE_ACCOUNT",
      payload: id,
    });
  };

  const addUser = (user) => {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  };

  const editUser = (id) => {
    axios.put(`teacher/account/${id}`).then(() => window.location.reload());

    dispatch({
      type: "EDIT_USER",
      payload: id,
    });
  };

  const getUser = (user) => {
    dispatch({
      type: "GET_USER",
      payload: user,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        removeUser,
        addUser,
        getUser,
        editUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
