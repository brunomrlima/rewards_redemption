import React from "react";
import { createRoot } from "react-dom/client";

const App = () => <h1>Hello from React + Vite + Rails</h1>;

const rootElement = document.getElementById('root');
if (rootElement) createRoot(rootElement).render(<App />);