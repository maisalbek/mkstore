import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API8 } from "../constants/Constants";
import MySkeleton from "../subcomponents/MySkeleton";
import ShowHide from "../subcomponents/ShowHide";
import "./Help.css";

const Help = () => {
  const [helpData, setHelpData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get(`${API8}${window.location.search}`).then((res) => {
      setHelpData(res.data);
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        margin: "0 0 70px 0",
      }}
    >
      <div className="HelpOuterContainer">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span style={{ fontWeight: "500" }}>Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span style={{ fontWeight: "500", color: "#979797" }}>Помощь</span>
        </span>
      </div>
      <div className="help-container">
        <img
          className="help-img"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/94023c109854731.60dec6c8d8a02.jpg"
          alt=""
        />
        <div className="help-right-side">
          <span
            style={{
              marginBottom: "15px",
              fontSize: "24px",
              fontWeight: "500",
              color: "#393939",
            }}
          >
            Помощь
          </span>
          {helpData && helpData.length > 0 ? (
            helpData.map((item) => <ShowHide key={item.id} item={item} />)
          ) : (
            <MySkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
