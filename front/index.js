import React , {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DoctorStore from "./store/DoctorStore";


export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value = {{
    doctor: new DoctorStore()
  }}>
  <App />
</Context.Provider>,
  document.getElementById('root')
);

