import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store";
import { fetchCurrentUser } from "./store/slices/authSlice";

// If a token exists, fetch the user profile
const token = localStorage.getItem("milklogs_token");
if (token) {
  store.dispatch(fetchCurrentUser());
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
