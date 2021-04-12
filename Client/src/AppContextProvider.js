import React, { useEffect, useReducer } from "react";

import AppContext, { reducer, initialState } from "./AppContext";
import { fetchAgendamentos, getDay } from "./api";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formState } = state;

  const fetchData = async () => {
    const responseAgendamentos = await fetchAgendamentos();
    const days = await getDay();
    dispatch({
      type: "SET_AGENDAMENTOS",
      payload: { agendamentos: responseAgendamentos.data, dias: days.data },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [formState]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
