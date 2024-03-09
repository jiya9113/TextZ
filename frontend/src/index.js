import * as React         from "react";
import ReactDOM           from "react-dom/client";
import "./index.css";
import  App from "./App";
import { ChakraProvider } from "@chakra-ui/react"; /*for ui libraray */
import {BrowserRouter}    from 'react-router-dom'; /*for navigation */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
