import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Logo from "../images/Logo.svg";
import SearchIcon from "../images/searchIcon.svg";
import BurgerMenu from "../images/coolicon.svg";
import FavoriteIcon from "../images/FavoriteIcon.svg";
import ShoppingBag from "../images/shopping-bag 1.svg";
import FloatMenu from "../subcomponents/FloatMenu";
import { API2 } from "../constants/Constants";
import axios from "axios";

import "./Navbar.css";
import MyDrawer from "../subcomponents/MyDrawer";

export default function Navbar() {
  const [headerInfo, setHeaderInfo] = React.useState({});
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  React.useEffect(() => {
    axios.get(API2).then((response) => {
      setHeaderInfo(response.data);
    });
  }, []);

  return (
    <Box
      sx={{
        // position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar position="static" className="navbar-container">
        <Toolbar>
          <Box sx={{ width: { xs: "0", md: "75px" } }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLink to="/about" style={{ textDecoration: "none" }}>
              <span
                style={{
                  color: "black",
                  marginRight: "24px",
                  fontSize: "17px",
                  fontWeight: "400",
                }}
              >
                О нас
              </span>
            </NavLink>
            <NavLink to="/collection" style={{ textDecoration: "none" }}>
              <span
                style={{
                  color: "black",
                  marginRight: "24px",
                  fontSize: "17px",
                  fontWeight: "400",
                }}
              >
                Коллекции
              </span>
            </NavLink>
            <NavLink to="/news" style={{ textDecoration: "none" }}>
              <span
                style={{
                  color: "black",
                  marginRight: "24px",
                  fontSize: "17px",
                  fontWeight: "400",
                }}
              >
                Новости
              </span>
            </NavLink>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <span
              style={{ color: "#393939", fontSize: "17px", fontWeight: "400" }}
            >
              <span style={{ color: "#979797" }}>Тел: </span>
              {headerInfo.headerTel}
            </span>
          </Box>
          <Box sx={{ width: { xs: "0", md: "75px" } }} />
          <Box
            sx={{
              width: "100%",
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 0",
            }}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={toggleDrawer("left", true)}
              color="inherit"
              sx={{ borderRadius: "0", border: "1px solid #EDEDED" }}
            >
              <img src={BurgerMenu} alt="" />
            </IconButton>
            <MyDrawer //My Drawer here ......................................................................................
              state={state}
              toggleDrawer={toggleDrawer}
              headerInfo={headerInfo}
            />
            <Link to="/">
              <img
                src={Logo}
                alt=""
                style={{ width: "99px", height: "43px" }}
              />
            </Link>
            <img src={SearchIcon} alt="" style={{ height: "18px" }} />
          </Box>
        </Toolbar>

        <Toolbar
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            borderTop: "1px solid #e0e0e0",
          }}
          style={{ height: "88px" }}
        >
          <Link to="/" style={{ marginLeft: "75px" }}>
            <img
              src={Logo}
              alt=""
              style={{ height: "70px", padding: "9px 0" }}
            />
          </Link>
          <form>
            <input type="search" placeholder="Поиск" />
            <button type="submit">Search</button>
          </form>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Link to="/favorite" style={{ textDecoration: "none" }}>
            <span
              style={{
                color: "#393939",
                fontSize: "17px",
                fontWeight: "400",
                display: "flex",
                marginLeft: "35px",
              }}
            >
              <img
                width="23px"
                src={FavoriteIcon}
                alt=""
                style={{ marginRight: "10px" }}
              />
              Избранное
            </span>
          </Link>
          <Link
            to="/cart"
            style={{ textDecoration: "none", marginRight: "75px" }}
          >
            <span
              style={{
                color: "#393939",
                fontSize: "17px",
                fontWeight: "400",
                paddingLeft: "23px",
                marginLeft: "23px",
                display: "flex",
                borderLeft: "1px solid #e0e0e0",
              }}
            >
              <img
                width="23px"
                src={ShoppingBag}
                alt=""
                style={{ marginRight: "10px" }}
              />
              Корзина
            </span>
          </Link>
        </Toolbar>
        <FloatMenu />
      </AppBar>
    </Box>
  );
}
