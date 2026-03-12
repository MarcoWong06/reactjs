import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./test-index.css";
import MyExample from "./MyExample.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MyExample />
  </StrictMode>
);
