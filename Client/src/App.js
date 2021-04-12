import React from "react";
import Routes from "./routes";
import AppContextProvider from "./AppContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AppContextProvider>
      <ToastContainer position="top-center" hideProgressBar />
      <Routes />
    </AppContextProvider>
  );
};

export default App;
