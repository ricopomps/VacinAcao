import React, { useEffect, useReducer } from "react";

import AppContext, { reducer, initialState } from "./AppContext";
import axios from "./api";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAgendamentos = async () => {
    const responseAgendamentos = await axios.get("/agendamento");
    console.log(responseAgendamentos);
    dispatch({ type: "SET_AGENDAMENTOS", payload: responseAgendamentos.data });
  };

  useEffect(() => {
    fetchAgendamentos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
