import React, { useEffect } from "react";

const HistoryCard = ({ item }) => {
  return (
    <div className="wave">
      <div className="item-row">
        <span>Пользователь: </span>
        <span>{item.user}</span>
      </div>
      <div className="item-row">
        <span>Дата: </span>
        <span>{item.date}</span>
      </div>
      <div className="item-row">
        <span>Время: </span>
        <span>{item.time}</span>
      </div>
      <div className="item-row">
        <span>Количество линеек: </span>
        <span>{item.lineCount} шт</span>
      </div>
      <div className="item-row">
        <span>Количество товаров: </span>
        <span>{item.productCount} шт</span>
      </div>
      <div className="item-row">
        <span>Общая сумма: </span>
        <span>{item.totalPrice.toLocaleString().replace(",", " ")} рублей</span>
      </div>
      <div className="item-row">
        <span>Скидка: </span>
        <span>{item.discount.toLocaleString().replace(",", " ")} рублей</span>
      </div>
      <div className="item-row">
        <span>Оплачено: </span>
        <span>{item.toPay.toLocaleString().replace(",", " ")} рублей</span>
      </div>
      <div className="item-row" style={{ marginBottom: "0" }}>
        <span>Цвет(-a): </span>
        <div className="special">
          {item.colors &&
            item.colors.map((elem, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: `${elem}`,
                  }}
                  className="orderDots"
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
