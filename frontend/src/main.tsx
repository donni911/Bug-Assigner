import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import './App.css'

import configureStore from "./store/store.js";
import { Provider } from "react-redux";

//router
import router from "./routes.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
