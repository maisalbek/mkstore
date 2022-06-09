import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import About from "./components/pages/About";
import AllCollection from "./components/pages/AllCollection";
import Cart from "./components/pages/Cart";
import Collection from "./components/pages/Collection";
import Details from "./components/pages/Details";
import Favorite from "./components/pages/Favorite";
import Help from "./components/pages/Help";
import Home from "./components/pages/Home";
import News from "./components/pages/News";
import Public from "./components/pages/Public";

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/allcollection" element={<AllCollection />} />
        <Route path="/news" element={<News />} />
        <Route path="/detail/:prodId" element={<Details />} />
        <Route path="/help" element={<Help />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/public" element={<Public />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
