import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API6 } from "../constants/Constants";
import "./About.css";
import MySkeleton from "../subcomponents/MySkeleton";

const About = () => {
  const [aboutData, setAboutData] = useState({});

  React.useEffect(() => {
    axios.get(API6).then((response) => {
      setAboutData(response.data);
    });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <div className="collectionOuterContainer aboutOuterContainer">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span style={{ fontWeight: "500" }}>Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span style={{ fontWeight: "500", color: "#979797" }}>О нас</span>
        </span>
      </div>
      <div style={{ backgroundColor: "#ECECEC", paddingTop: "12px" }}>
        <div className="aboutMobileVersion">
          <div className="abouttLeftSide">
            <div className="aboutInnerLeftSide">
              <img
                className="about-img about-one"
                style={{ marginBottom: "24px" }}
                src={aboutData.img1 ? aboutData.img1 : <MySkeleton />}
                alt=""
              />
              <img
                className="about-img"
                src={aboutData.img2 ? aboutData.img2 : <MySkeleton />}
                alt=""
              />
            </div>
            <div className="about3imgdiv">
              <img
                className="about-img"
                src={aboutData.img3 ? aboutData.img3 : <MySkeleton />}
                alt=""
              />
            </div>
          </div>
          <div className="about-right">
            <span
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "8px",
                fontWeight: "500",
                fontSize: "24px",
                lineHeight: "30px",
              }}
            >
              О нас
            </span>
            <span className="aboutText">
              {aboutData.text ? aboutData.text : <MySkeleton />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
