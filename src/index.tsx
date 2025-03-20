import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import enableMock from "./mock";
import { store } from "./store/store";

import "./index.css";

enableMock();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
