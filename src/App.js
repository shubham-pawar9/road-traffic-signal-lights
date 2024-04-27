import logo from "./logo.svg";
import "./App.css";
import Home from "./component/Slice/Home/Home";
import { Provider } from "react-redux";
import Store from "./Store";
function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
