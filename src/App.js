import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/Store/store";
import "./App.css";
import TaskApp from "./components/Task";

import CheckboxForm from "./components/Checkbox";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TaskApp />
      </Provider>
      
      <CheckboxForm/>
    </div>
  );
}

export default App;
