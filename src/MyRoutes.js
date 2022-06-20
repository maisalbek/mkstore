import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import About from "./components/pages/About";
import AllCollection from "./components/pages/AllCollection";
import Cart from "./components/pages/Cart";
import Collection from "./components/pages/Collection";
import Details from "./components/pages/Details";
import ErrorPage from "./components/pages/ErrorPage";
import Favorite from "./components/pages/Favorite";
import Help from "./components/pages/Help";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import News from "./components/pages/News";
import OrderHistory from "./components/pages/OrderHistory";
import Public from "./components/pages/Public";
import RegistrationPage from "./components/pages/RegistrationPage";
import SearchPage from "./components/pages/SearchPage";

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
        <Route path="/search" element={<SearchPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/public" element={<Public />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
