import React from "react";
import "./App.scss";

import { Route, Routes } from "react-router-dom";
import { NotFound } from "./Components/Views/NotFound";
import { LayAuth } from "./Components/Layout/LayAuth";
import { LayStartup } from "./Components/Layout/LayStartup";
import { Login } from "./Components/Views/Auth/Login";
import { Register } from "./Components/Views/Auth/Register";
import { Settings } from "./Components/Views/Settings";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<LayStartup />}>
          <Route
            index
            element={
              <div>
                <h1>Main</h1>
              </div>
            }
          />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="authorizate" element={<LayAuth />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
