import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Modal from "react-modal";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
