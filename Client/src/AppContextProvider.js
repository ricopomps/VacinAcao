import React, { useEffect, useReducer } from "react";

import AppContext, { reducer, initialState } from "./AppContext";
import axios from "./api";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formState, historico: historicoState } = state;

  const fetchAgendamentos = async () => {
    const responseAgendamentos = await axios.get("/agendamento");
    dispatch({ type: "SET_AGENDAMENTOS", payload: responseAgendamentos.data });
  };

  useEffect(() => {
    fetchAgendamentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState, historicoState]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
