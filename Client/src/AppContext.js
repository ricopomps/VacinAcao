import { createContext } from "react";

const AppContext = createContext();

const initialState = {
  agendamentos: [],
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
    default: {
      return state;
    }
  }
};

export { initialState, reducer };

export default AppContext;
