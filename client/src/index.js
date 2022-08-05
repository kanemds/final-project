import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./components/page/students/context/GlobalState";
import { LoginProvider } from "Contexts/LoginContext";

const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 30);
sessionStorage.setItem('countDownDate', expiryDate.toISOString())

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <LoginProvider>
        <App />{" "}
      </LoginProvider>
    </GlobalProvider>
  </React.StrictMode>
);
