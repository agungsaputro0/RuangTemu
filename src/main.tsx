
  import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";
  import { BrowserRouter } from "react-router-dom";
  import { SearchProvider } from "./hooks/UseSearchContext";

  createRoot(document.getElementById("root")!).render(
    <SearchProvider>
      <App />
    </SearchProvider>
  );
  