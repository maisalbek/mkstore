import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/Constants";
import { useCart } from "../context/CartContextProvider";
import CardNovinki from "../subcomponents/CardNovinki";
import CartCard from "../subcomponents/CartCard";
import MySkeleton from "../subcomponents/MySkeleton";
import OrderDialog from "../subcomponents/OrderDialog";
import OrderDialogMob from "../subcomponents/OrderDialogMob";
import TableCardNovinki from "../subcomponents/TableCardNovinki";
import "./Cart.css";

const Cart = () => {
  const { cart, getCart } = useCart();
  const [hide, setHide] = useState(false);
  const [novinkiData, setNovinkiData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const toggleHide = () => {
    hide ? setHide(false) : setHide(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCart();
    axios.get(API).then((res) => {
      let newArr = res.data.filter(
        (elem) => elem.discount !== 0 && elem.oldprice !== 0
      );
      setNovinkiData(newArr.splice(0, 5));
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="collectionOuter">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span className="breadcrumbs">Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span className="breadcrumbs third">Корзина</span>
        </span>
      </div>
      {cart.products && cart.products.length <= 0 ? (
        <div className="favoriteheader">
          <span className="favoriteheadertext">Корзина</span>
          <span className="favoriteheadersubtext tog">
            У Вас пока нет товаров в корзине
          </span>
        </div>
      ) : null}

      {cart.products && cart.products.length <= 0 ? (
        <div className="headerNovinki favheaderNovinki">
          <span className="favoriteheadertext downtext">
            Возможно Вас заинтересует
          </span>
        </div>
      ) : null}

      {cart.products && cart.products.length <= 0 ? (
        <div className="allcollectionnovinki onwtablecon">
          {novinkiData && novinkiData.length > 0 ? (
            novinkiData.map((item) => <CardNovinki key={item.id} item={item} />)
          ) : (
            <MySkeleton />
          )}
        </div>
      ) : null}
      {cart.products && cart.products.length <= 0 ? (
        <div className="table-allcolcontainer">
          <TableContainer
            component={Paper}
            style={{ paddingTop: "0", border: "none" }}
          >
            <Table sx={{ minWidth: 262 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {novinkiData && novinkiData.length > 0
                    ? novinkiData.map((item) => (
                        <TableCell
                          style={{ padding: "0 5px" }}
                          key={item.id / 1.5}
                        >
                          <TableCardNovinki item={item} />
                        </TableCell>
                      ))
                    : null}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      ) : null}

      <div className="cart-container">
        <div className="elems">
          {cart.products && cart.products.length > 0
            ? cart.products.map((item1) => (
                <CartCard key={item1.item.id} item1={item1} />
              ))
            : null}
        </div>
        {cart.products && cart.products.length <= 0 ? null : (
          // ---------------------------------------------------------------------------------desktop---------------------------------------
          <div className="panel panelone">
            <span className="sum">Сумма заказа</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingBottom: "24px",
                borderBottom: "2px dashed #BFBFBF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <span className="countin">Количество линеек:</span>
                <span className="countin">Количество товаров:</span>
                <span className="countin">Стоимость:</span>
                <span className="countin">Скидка:</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span className="countin">
                  {cart.products && cart.totalCount} шт
                </span>
                <span className="countin">
                  {cart.products &&
                    (cart.totalCount * 5)
                      .toLocaleString()
                      .replace(",", " ")}{" "}
                  шт
                </span>
                <span className="countin">
                  {cart.totalOldPrice.toLocaleString().replace(",", " ")} рублей
                </span>
                <span className="countin">
                  {cart.totalOldPrice
                    ? (cart.totalOldPrice - cart.totalCurrentPrice)
                        .toLocaleString()
                        .replace(",", " ")
                    : "0"}{" "}
                  рублей
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <span className="countin">Итого к оплате:</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span className="countin">
                  {cart.totalOldPrice > 0
                    ? (
                        cart.totalOldPrice -
                        (cart.totalOldPrice - cart.totalCurrentPrice)
                      )
                        .toLocaleString()
                        .replace(",", " ")
                    : cart.totalOldPrice
                        .toLocaleString()
                        .replace(",", " ")}{" "}
                  рублей
                </span>
              </div>
            </div>
            <div
              style={{
                height: "44px",
                width: "100%",
                backgroundColor: "#E5271B",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff",
                lineHeight: "17px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleClickOpen();
              }}
            >
              Оформить заказ
            </div>
          </div>
        )}
      </div>

      <div className="paneltwocon">
        {/* ---------------------------------------------------------------------------------mobile--------------------------------------- */}
        {cart.products && cart.products.length <= 0 ? null : (
          <div className="paneltwo">
            {hide ? <span className="sum">Сумма заказа</span> : null}
            {hide ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingBottom: "24px",
                  borderBottom: "2px dashed #BFBFBF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <span className="countin">Количество линеек:</span>
                  <span className="countin">Количество товаров:</span>
                  <span className="countin">Стоимость:</span>
                  <span className="countin">Скидка:</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <span className="countin">
                    {cart.products && cart.totalCount} шт
                  </span>
                  <span className="countin">
                    {cart.products &&
                      (cart.totalCount * 5)
                        .toLocaleString()
                        .replace(",", " ")}{" "}
                    шт
                  </span>
                  <span className="countin">
                    {cart.totalOldPrice.toLocaleString().replace(",", " ")}{" "}
                    рублей
                  </span>
                  <span className="countin">
                    {cart.totalOldPrice
                      ? (cart.totalOldPrice - cart.totalCurrentPrice)
                          .toLocaleString()
                          .replace(",", " ")
                      : "0"}{" "}
                    рублей
                  </span>
                </div>
              </div>
            ) : null}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <span className="countin">Итого к оплате:</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span className="countin">
                  {" "}
                  {cart.totalOldPrice > 0
                    ? (
                        cart.totalOldPrice -
                        (cart.totalOldPrice - cart.totalCurrentPrice)
                      )
                        .toLocaleString()
                        .replace(",", " ")
                    : cart.totalOldPrice
                        .toLocaleString()
                        .replace(",", " ")}{" "}
                  рублей
                </span>
              </div>
            </div>
            <div
              style={{
                height: "40px",
                width: "100%",
                backgroundColor: "#ffffff",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#1D1D1B",
                border: "1px solid #EEEEEE",
                fontSize: "13px",
                lineHeight: "17px",
                cursor: "pointer",
              }}
              onClick={() => {
                toggleHide();
              }}
            >
              {hide ? "Скрыть" : "Информация о заказе"}
            </div>
            <div
              style={{
                height: "44px",
                width: "100%",
                backgroundColor: "#E5271B",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffffff",
                lineHeight: "17px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleClickOpen2();
              }}
            >
              Оформить заказ
            </div>
          </div>
        )}
      </div>
      <div className="desktopver">
        <OrderDialog handleClose={handleClose} open={open} />
      </div>
      <div className="mobilever">
        <OrderDialogMob handleClose={handleClose2} open={open2} />
      </div>
    </div>
  );
};

export default Cart;
