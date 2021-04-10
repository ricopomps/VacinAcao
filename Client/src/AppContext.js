import { createContext } from "react";

const AppContext = createContext();

const initialState = {
  agendamentos: [],
  historico: [],
  formState: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AGENDAMENTOS": {
      return {
        ...state,
        agendamentos: action.payload,
      };
    }
    case "FINALIZAR":
      return {
        ...state,
        agendamentos: state.agendamentos.filter(
          (post) => post._id !== action.payload
        ),
        historico: [...state.historico, action.payload],
      };
    default: {
      return state;
    }
  }
};

export { initialState, reducer };

export default AppContext;
