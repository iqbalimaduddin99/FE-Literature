import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
  updating: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "login_success":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "logout":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    case "update":
      return {
        ...state,
        updating: !state.updating,
      };

    default:
      throw new Error();
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
