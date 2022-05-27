import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

export default function Router() {
  return (
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Signin />} path="/sign-in" exact />
      </Routes>
  );
}
