import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API7 } from "../constants/Constants";
import MySkeleton from "../subcomponents/MySkeleton";
import NewsCard from "../subcomponents/NewsCard";
import "./News.css";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [screenWidth]);

  useEffect(() => {
    if (fetching) {
      if (screenWidth < 899) {
        axios
          .get(`${API7}?_limit=4&_page=${page}&q=`)
          .then((res) => {
            setNewsData([...newsData, ...res.data]);
            setPage((prev) => prev + 1);
          })
          .finally(() => setFetching(false));
      } else {
        axios
          .get(`${API7}?_limit=8&_page=${page}&q=`)
          .then((res) => {
            setNewsData([...newsData, ...res.data]);
            setPage((prev) => prev + 1);
          })
          .finally(() => setFetching(false));
      }
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function () {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleScroll = (e) => {
    if (screenWidth < 899) {
      if (
        e.target.documentElement.scrollHeight -
          400 -
          (window.innerHeight + e.target.documentElement.scrollTop) <
        0
      ) {
        setFetching(true);
      }
    } else {
      if (
        e.target.documentElement.scrollHeight -
          (window.innerHeight + e.target.documentElement.scrollTop) <
        100
      ) {
        setFetching(true);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#ECECEC" }}>
      <div className="aboutHeaderContainer">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span style={{ fontWeight: "500" }}>Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span style={{ fontWeight: "500", color: "#979797" }}>Новости</span>
        </span>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ECECEC",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <span className="collectionHeaderText">Новости</span>
        </div>
      </div>
      <div className="news-container">
        {newsData && newsData.length > 0 ? (
          newsData.map((item) => <NewsCard item={item} key={item.id} />)
        ) : (
          <MySkeleton />
        )}
      </div>
    </div>
  );
};

export default News;
