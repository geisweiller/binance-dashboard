import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import "./index.css";
import store from "./store/store.ts";
import Dashboard from "./pages/dashboard.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </React.StrictMode>
);
