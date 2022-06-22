import React, { useState, useEffect, useRef } from "react";
import {
  NavLink,
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Logo from "../images/Logo.svg";
import SearchIcon from "../images/searchIcon.svg";
import BurgerMenu from "../images/coolicon.svg";
import FavoriteIcon from "../images/FavoriteIcon.svg";
import FavoriteIconbadge from "../images/FavoriteIconDot.svg";
import Close from "../images/closeSearch.svg";
import ShoppingBag from "../images/shopping-bag 1.svg";
import ShoppingBagbad from "../images/shopping-bagDot.svg";
import FloatMenu from "../subcomponents/FloatMenu";
import { API2 } from "../constants/Constants";
import axios from "axios";

import "./Navbar.css";
import MyDrawer from "../subcomponents/MyDrawer";
import { useFavorite } from "../context/FavoriteContextProvider";
import { useCart } from "../context/CartContextProvider";
import { useSearchContext } from "../context/SearchContextProvider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/AuthContextProvider";
import AccountMenu from "../subcomponents/AccountMenu";
import MyDialog from "../subcomponents/MyDialog";

export default function Navbar() {
  const [headerInfo, setHeaderInfo] = useState({});
  const { fav, getFav } = useFavorite();
  const { ForSearch, getData, sendSearchData } = useSearchContext();
  const { cart, getCart } = useCart();
  const [filteredData, setFilteredData] = useState([]);
  const [close, setClose] = useState(false);
  const [inpValue, setInpValue] = useState("");
  const [searchInput, setSearchInput] = useState(false);
  const [showFloat, setShowFloat] = useState(true);
  const { currentUser, logOutUser } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [favData, setFavData] = useState([]);
  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();

  const [state, setState] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (window.location.href.includes("cart")) {
      setShowFloat(false);
    } else {
      setShowFloat(true);
    }
  }, [location.pathname]);

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    setClose(false);
    setInpValue("");
    setSearchInput(false);
  }, [location.pathname]);

  useEffect(() => {
    getFav();
    getData();
    axios.get(API2).then((response) => {
      setHeaderInfo(response.data);
    });
    getCart();
  }, []);

  useEffect(() => {
    if (fav.products) {
      setFavData(fav.products);
    }
  }, []);
  useEffect(() => {
    if (fav.products) {
      setFavData(fav.products);
    }
  }, [fav.products]);
  useEffect(() => {
    if (cart.products) {
      setCartData(cart.products);
    }
  }, []);
  useEffect(() => {
    if (cart.products) {
      setCartData(cart.products);
    }
  }, [cart.products]);

  const handleFilter = (e) => {
    setInpValue(e.target.value);
    const newData = ForSearch.filter((elem) => {
      if (e.target.value.trim().length > 0) {
        if (elem.title.toLowerCase().includes(e.target.value.toLowerCase())) {
          setClose(true);
          return elem.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      } else if (e.target.value.trim().length === 0) {
        setClose(false);
      }
    });

    setFilteredData(newData);
  };

  const handleClick = () => {
    if (inpValue) {
      sendSearchData(filteredData, inpValue);
      setInpValue("");
      setClose(false);
      navigate("/search");
    }
  };

  const toggleSearch = () => {
    searchInput ? setSearchInput(false) : setSearchInput(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickOpenMyDialog = () => {
    setOpen(true);
  };

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
        <Toolbar className="mobilenavbar">
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
            <a
              href={"tel:" + headerInfo.headerTel}
              style={{
                color: "#393939",
                fontSize: "17px",
                fontWeight: "400",
                cursor: "pointer",
              }}
            >
              <span style={{ color: "#979797" }}>Тел: </span>
              {headerInfo.headerTel}
            </a>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {currentUser.isLogged ? (
              <AccountCircleIcon
                sx={{
                  color: "#1d1d1d",
                  fontSize: "xx-large",
                  marginLeft: "20px",
                }}
                onClick={handleMenu}
              />
            ) : (
              <span
                style={{
                  color: "#393939",
                  fontSize: "17px",
                  fontWeight: "400",
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
                onClick={() => {
                  currentUser.isLogged ? handleMenu() : navigate("/login");
                }}
              >
                Войти
              </span>
            )}
            <AccountMenu anchorEl={anchorEl} handleClose={handleClose} />
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
              onClick={() => toggleDrawer("left", true)}
              color="inherit"
              sx={{ borderRadius: "0", border: "1px solid #EDEDED" }}
            >
              <img src={BurgerMenu} alt="" />
            </IconButton>
            <MyDrawer //My Drawer here ......................................................................................
              state={state}
              toggleDrawer={toggleDrawer}
              headerInfo={headerInfo}
              handleClickOpenMyDialog={handleClickOpenMyDialog}
            />
            <MyDialog open={open} setOpen={setOpen} />
            <Link to="/">
              <img
                src={Logo}
                alt=""
                style={{ width: "99px", height: "43px" }}
              />
            </Link>
            {searchInput ? (
              <img
                src={Close}
                alt=""
                style={{ height: "18px" }}
                onClick={() => {
                  toggleSearch();
                }}
              />
            ) : (
              <img
                src={SearchIcon}
                alt=""
                style={{ height: "18px" }}
                onClick={() => {
                  toggleSearch();
                }}
              />
            )}
          </Box>

          {searchInput ? (
            <div className="mobilesearch">
              <input
                type="search"
                placeholder="Поиск"
                onChange={handleFilter}
                className="mobsearchinput"
                value={inpValue}
                onKeyPress={(e) => e.key === "Enter" && handleClick()}
              />
              <img
                className="searchLoop"
                onClick={handleClick}
                src={SearchIcon}
                alt=""
              />
            </div>
          ) : null}

          {searchInput && close ? (
            <div className="mobilesearchhints">
              {filteredData && filteredData.length > 0
                ? filteredData.map((item) => (
                    <span
                      className="hintSpans"
                      key={item.id}
                      onClick={() => {
                        navigate(`/detail/${item.id}`);
                      }}
                    >
                      {item.title}
                    </span>
                  ))
                : null}
            </div>
          ) : null}
        </Toolbar>

        <Toolbar
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            borderTop: "1px solid #e9e9e9",
            position: "relative",
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              position: "relative",
            }}
          >
            <input
              className="navbarinput"
              type="search"
              placeholder="Поиск"
              onChange={handleFilter}
              value={inpValue}
              onKeyPress={(e) => e.key === "Enter" && handleClick()}
            />
            <img
              className="searchloopdes"
              onClick={handleClick}
              src={SearchIcon}
              alt=""
            />
            {close ? (
              <div className="searchHint">
                <div className="sear">
                  {filteredData && filteredData.length > 0
                    ? filteredData.map((item) => (
                        <span
                          className="searchhints"
                          key={item.id}
                          onClick={() => {
                            navigate(`/detail/${item.id}`);
                          }}
                        >
                          {item.title}
                        </span>
                      ))
                    : null}
                </div>
              </div>
            ) : null}
          </div>
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
              {favData && favData.length > 0 ? (
                currentUser.isLogged ? (
                  <img
                    width="23px"
                    src={FavoriteIconbadge}
                    alt=""
                    style={{ marginRight: "10px" }}
                  />
                ) : (
                  <img
                    width="23px"
                    src={FavoriteIcon}
                    alt=""
                    style={{ marginRight: "10px" }}
                  />
                )
              ) : (
                <img
                  width="23px"
                  src={FavoriteIcon}
                  alt=""
                  style={{ marginRight: "10px" }}
                />
              )}
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
              {cartData && cartData.length > 0 ? (
                currentUser.isLogged ? (
                  <img
                    width="23px"
                    src={ShoppingBagbad}
                    alt=""
                    style={{ marginRight: "10px" }}
                  />
                ) : (
                  <img
                    width="23px"
                    src={ShoppingBag}
                    alt=""
                    style={{ marginRight: "10px" }}
                  />
                )
              ) : (
                <img
                  width="23px"
                  src={ShoppingBag}
                  alt=""
                  style={{ marginRight: "10px" }}
                />
              )}
              Корзина
            </span>
          </Link>
        </Toolbar>
        {showFloat ? <FloatMenu /> : null}
      </AppBar>
    </Box>
  );
}
