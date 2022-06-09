import Header from "components/header/Header";
import { routes } from "configs/routes";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import NotFound from "./404";

export default function Layout() {
  return (
    <div id="container">
      <Header />
      <div className="main-content">
        <Routes>
          {routes.map((r, index) => (
            <Route key={index} path={r.path} element={r.component} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Outlet />
    </div>
  );
}
