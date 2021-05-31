import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Global from './Global'
import { ChakraProvider, theme } from '@chakra-ui/react'

ReactDOM.render(
  <React.StrictMode>
<Global/>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);