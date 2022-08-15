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

// Contains browser history data
const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Making Auth Context available app-wide
  <AuthProvider>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </HistoryRouter>
  </AuthProvider>
);
