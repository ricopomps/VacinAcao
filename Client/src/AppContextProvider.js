import React, { useEffect, useReducer } from "react";
import { useDebounce } from "./hooks/useDebounce";
import AppContext, { reducer, initialState } from "./AppContext";
import { fetchAgendamentos, getWeek } from "./api";

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    temp,
    numWeek,
    pagination: { search, currentPage, limit },
  } = state;

  const debouncedValue = useDebounce(search, 200);

  const fetchData = async () => {
    console.log("fetchData", currentPage);
    const { data: responseAgendamentos } = await fetchAgendamentos(
      debouncedValue,
      currentPage,
      limit
    );
    const { data: week } = await getWeek();
    dispatch({
      type: "SET_AGENDAMENTOS",
      payload: { agendamentos: responseAgendamentos, week: week },
    });
  };

  const setWeek = async (numWeek) => {
    const { data: week } = await getWeek(numWeek);
    dispatch({
      type: "SET_WEEK",
      payload: { week: week },
    });
  };

  useEffect(() => {
    fetchData();
    setWeek(numWeek);
  }, []);
  useEffect(() => {
    fetchData();
    setWeek(numWeek);
  }, [temp]);
  useEffect(() => {
    setWeek(numWeek);
  }, [numWeek]);
  useEffect(() => {
    fetchData();
  }, [debouncedValue, currentPage]);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
