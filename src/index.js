// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

const container = document.getElementById("root");
const root = createRoot(container); // React 18에서는 createRoot 사용
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
