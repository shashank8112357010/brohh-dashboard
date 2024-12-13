import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </>
);

