
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./component/AppRouter";
import React from "react";
import './App.css'
import './index.css'
import './doctor.css'





function App() {
  return (
    <BrowserRouter >
            <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
