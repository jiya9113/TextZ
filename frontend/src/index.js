import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; /*for index css         */
import App from "./App"; /*for for importing app */
import { ChakraProvider } from "@chakra-ui/react"; /*for ui libraray       */
import { BrowserRouter } from "react-router-dom"; /*for navigation        */
import ChatProvider from "./context/chatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);
