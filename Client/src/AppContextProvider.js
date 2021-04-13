import React, { useEffect, useReducer } from "react";

import AppContext, { reducer, initialState } from "./AppContext";
import { fetchAgendamentos, getWeek } from "./api";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formState } = state;

  const fetchData = async () => {
    const { data: responseAgendamentos } = await fetchAgendamentos();
    const { data: days } = await getWeek();
    dispatch({
      type: "SET_AGENDAMENTOS",
      payload: { agendamentos: responseAgendamentos, dias: days },
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
