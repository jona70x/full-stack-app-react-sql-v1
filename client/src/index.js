import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./global.css";
import App from "./App";
import AuthProvider from "./storage/AuthProvider";
// Getting history router to access browser history
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </HistoryRouter>
  </AuthProvider>
);
