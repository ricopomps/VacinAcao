import { createContext } from "react";
const AppContext = createContext();

const initialState = {
  agendamentos: [],
  historico: [],
  week: [],
  formState: {
    name: "",
    age: "",
    schedule: "",
    date: "",
  },
  temp: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AGENDAMENTOS": {
      return {
        ...state,
        agendamentos: action.payload.agendamentos.filter(
          (agendamento) => agendamento.realized === false
        ),
        historico: action.payload.agendamentos.filter(
          (agendamento) => agendamento.realized === true
        ),
        formState: {
          name: "",
          age: "",
          schedule: "",
          date: "",
        },
      };
    }
    case "SET_WEEK": {
      return {
        ...state,
        week: action.payload.week,
      };
    }
    case "SET_FORM": {
      return {
        ...state,
        formState: {
          ...state.formState,
          schedule: action.payload.schedule,
          date: action.payload.date,
        },
      };
    }
    case "CREATE": {
      return {
        ...state,
        temp: action.payload,
      };
    }
    case "DELETE": {
      return {
        ...state,
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
