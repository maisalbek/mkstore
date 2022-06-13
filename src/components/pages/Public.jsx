import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API10 } from "../constants/Constants";
import "./Public.css";

const Public = () => {
  const [publicData, setPublicData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get(`${API10}${window.location.search}`).then((res) => {
      setPublicData(res.data);
    });
  }, []);
  return (
    <div className="publicback">
      <div className="collectionOuter publicOuter">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span className="breadcrumbs">Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span className="breadcrumbs third">Публичная оферта</span>
        </span>
      </div>
      <div className="public1">
        <span className="public2">Публичная оферта</span>
      </div>
      <div className="public-container">
        <div className="overflow"></div>
        <p className="ptexts">{publicData.paragraph1}</p>
        <p className="ptexts">{publicData.paragraph2}</p>
        <p className="ptexts">{publicData.paragraph3}</p>
        <p className="ptexts">{publicData.paragraph4}</p>
        <p className="ptexts">{publicData.paragraph5}</p>
        <p className="ptexts">{publicData.paragraph6}</p>
      </div>
    </div>
  );
};

export default Public;
