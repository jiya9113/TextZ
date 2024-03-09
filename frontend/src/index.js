import * as React         from "react";
import ReactDOM           from "react-dom/client";
import "./index.css";
import  App from "./App";
import { ChakraProvider } from "@chakra-ui/react"; /*for ui libraray */
import {BrowserRouter}    from 'react-router-dom'; /*for navigation */
import ChatProvider from "./Context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ChakraProvider>
  </BrowserRouter>
);
