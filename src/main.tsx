import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import GlobalStyled from "./global.styles.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";


createRoot(document.getElementById("root")!).render(
 <StrictMode>
  
  <Provider store={store}>
  <GlobalStyled />
  <App />
  </Provider>
 </StrictMode>
);
