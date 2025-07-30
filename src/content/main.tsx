import { createRoot } from "react-dom/client";
import App from "./views/App.tsx";

const container = document.createElement("div");
container.id = "__leetcode_ai_tutor_container";
document.body.appendChild(container);
createRoot(container).render(
  <>
    <App />
  </>
);
