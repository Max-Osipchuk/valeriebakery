import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Remove the pre-JS splash once React has mounted its own loading screen.
const splash = document.getElementById("app-splash");
if (splash) {
  requestAnimationFrame(() => {
    splash.classList.add("is-hidden");
    window.setTimeout(() => splash.remove(), 500);
  });
}
