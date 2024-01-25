import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import "leaflet/dist/leaflet.css";

// arabic and english word usage example
// add arabic words in ./redux/slice/langugae
// const {words, lang} = useSelector((state) => state.language);
// console.log(words['camera'][lang])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
