import { createContext } from "react";
const AppContext = createContext();

const initialState = {
  agendamentos: [],
  historico: [],
  week: [],
  formState: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AGENDAMENTOS": {
      return {
        ...state,
        formState: "",
        agendamentos: action.payload.agendamentos.filter(
          (agendamento) => agendamento.realized === false
        ),
        historico: action.payload.agendamentos.filter(
          (agendamento) => agendamento.realized === true
        ),
      };
    }
    case "SET_WEEK": {
      return {
        ...state,
        week: action.payload.week,
      };
    }
    case "CREATE": {
      return {
        ...state,
        formState: action.payload,
      };
    }
    case "DELETE": {
      return {
        ...state,
        formState: "",
        agendamentos: state.agendamentos.filter(
          (agendamento) => agendamento._id !== action.payload
        ),
        historico: state.historico.filter(
          (agendamento) => agendamento._id !== action.payload
        ),
      };
    }
    case "FINALIZAR":
      return {
        ...state,
        formState: "",
        agendamentos: state.agendamentos.filter(
          (agendamento) => agendamento._id !== action.payload._id
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
