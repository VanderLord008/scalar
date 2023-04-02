import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Details from "./pages/Details";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/details" exact element={<Details />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
