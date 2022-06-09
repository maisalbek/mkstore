import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "../images/close.svg";
import { useCart } from "../context/CartContextProvider";

const CartCard = ({ item1 }) => {
  const { changeProductCount, deleteProdInCart } = useCart();
  return (
    <div className="cartitem">
      <img width="120px" height="100%" src={item1.item.image[0]} alt="" />
      <img
        src={CloseIcon}
        alt=""
        className="del"
        onClick={() => {
          deleteProdInCart(item1.item.color, item1.item.id);
        }}
      />
      <div className="texts">
        <span className="ctitle">{item1.item.title}</span>
        <span className="csize">Размер: 42-50</span>
        <span className="csize">
          Цвет:{" "}
          <div
            style={{ backgroundColor: `${item1.item.color}` }}
            className="colordots"
          ></div>{" "}
        </span>
        <span className="cprice">
          {item1.item.price} р{" "}
          <span className="oldprice">
            {item1.item.oldprice ? item1.item.oldprice : null} р
          </span>
        </span>
        <div style={{ display: "flex" }}>
          {item1.count > 1 ? (
            <div
              className="addsub"
              onClick={() =>
                changeProductCount(
                  item1.count - 1,
                  item1.item.id,
                  item1.item.color
                )
              }
            >
              <RemoveIcon />
            </div>
          ) : (
            <div className="addsub">
              <RemoveIcon />
            </div>
          )}
          <div className="count">{item1.count}</div>
          <div
            className="addsub"
            onClick={() =>
              changeProductCount(
                item1.count + 1,
                item1.item.id,
                item1.item.color
              )
            }
          >
            <AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
