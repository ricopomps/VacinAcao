import { createContext } from "react";
const AppContext = createContext();

const initialState = {
  agendamentos: [],
  historico: [],
  week: [],
  numWeek: 0,
  pagination: {
    search: "",
    currentPage: 1,
    limit: 15,
  },
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
        agendamentos: action.payload.agendamentos,
        historico: action.payload.historico,
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
    case "CHANGE_WEEK": {
      return {
        ...state,
        numWeek: action.payload.numWeek,
      };
    }
    case "SET_SEARCH": {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          search: action.payload.search,
          currentPage: 1,
        },
      };
    }
    case "SET_PAGINATION": {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload.currentPage,
        },
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
        temp: action.payload,
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
        temp: action.payload,
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
