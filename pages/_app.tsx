import "./_app.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { AnimationPage, HomePage, NormalMapPage } from "#src/pages";
import { StoreProvider } from "#src/store";

const root = ReactDOM.createRoot(document.getElementsByTagName("body")[0]);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} index={true} />
          <Route element={<NormalMapPage />} path="/normal-map" />
          <Route element={<AnimationPage />} path="/animations/:id" />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
);
