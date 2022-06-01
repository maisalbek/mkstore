import React from "react";

const Slider = ({ item }) => {
  return (
    <div className="sliderimg">
      <div className="slide-side">
        <span className="span-text-left">
          {item.text1} <br /> {item.text2}
        </span>
        <span className="span-subtext-left">
          {item.text3} <br /> {item.text4}
        </span>
      </div>
      <img className="img" src={item.img} alt="" />
      <div className="slide-side-right">
        <div className="span-text-right">
          <span className="sale one">Sale</span>
          <span className="salenumber">{`${item.discount}%`}</span>
          <span className="sale two">for all</span>
        </div>
      </div>
    </div>
  );
};

export default Slider;
