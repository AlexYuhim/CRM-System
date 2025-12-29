import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@app/index.css";

import "antd/dist/reset.css";
import "@shared/styles/antd-custom.css";
import { Provider } from "react-redux";
import { store } from "./ducks/store.ts";
import { App } from "@app/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
