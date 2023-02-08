import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./style.css"
import {BrowserRouter} from 'react-router-dom';
import AuthProvider from "./utils/auth/AuthContext";
import PetProvider from "./context/PetContext";
import { NavigationProvider } from "./context/NavigationContext";
import { PaginationProvider } from "./context/PaginationContext";

ReactDOM.render(
    <AuthProvider>
      <BrowserRouter>
          <PetProvider>
              <NavigationProvider>
                <PaginationProvider>
                  <App />
                </PaginationProvider>
              </NavigationProvider>
            </PetProvider>
      </BrowserRouter>
    </AuthProvider>
  ,document.getElementById("root")
)
