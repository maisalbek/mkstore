import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../constants/Constants";
import CardCollection from "../subcomponents/CardCollection";
import { Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MySkeleton from "../subcomponents/MySkeleton";

import "./Collection.css";
import { Link, useSearchParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#979797",
      backgroundColor: "white",
      border: "none",
      borderRadius: "0",
    },
  },
}));

const CollectionPage = () => {
  const classes = useStyles();
  const [collection, setCollection] = useState([]);
  const [pageTotalCount, setPageTotalCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(+searchParams.get("_page") || 1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [screenWidth]);

  useEffect(() => {
    if (screenWidth <= 724) {
      setSearchParams({
        _limit: 4,
        _page: page,
        q: searchParams.get("q") || "",
      });
    } else {
      setSearchParams({
        _limit: 8,
        _page: page,
        q: searchParams.get("q") || "",
      });
    }
  }, []);

  useEffect(() => {
    if (screenWidth <= 724) {
      axios.get(`${API}${window.location.search}`).then((res) => {
        setCollection(res.data);
        setPageTotalCount(Math.ceil(res.headers["x-total-count"] / 4));
      });
    } else {
      axios.get(`${API}${window.location.search}`).then((res) => {
        setCollection(res.data);
        setPageTotalCount(Math.ceil(res.headers["x-total-count"] / 8));
      });
    }
  }, [searchParams, screenWidth]);

  useEffect(() => {
    if (screenWidth <= 724) {
      setSearchParams({
        _limit: 4,
        _page: page,
        q: searchParams.get("q") || "",
      });
    } else {
      setSearchParams({
        _limit: 8,
        _page: page,
        q: searchParams.get("q") || "",
      });
    }
  }, [page]);

  return (
    <div style={{ width: "100%", backgroundColor: "#ffffff" }}>
      <div className="collectionOuterContainer">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span style={{ fontWeight: "500" }}>Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span style={{ fontWeight: "500", color: "#979797" }}>Коллекции</span>
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
          <span className="collectionHeaderText">Коллекции</span>
        </div>
        <div className="inner-collection-container">
          {collection && collection.length > 0 ? (
            collection.map((item) => (
              <CardCollection key={item.id} item={item} />
            ))
          ) : (
            <MySkeleton />
          )}
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Pagination
            id="pag"
            count={pageTotalCount}
            classes={{ ul: classes.ul }}
            color="secondary"
            sx={{ display: "inline-block", margin: " 15px 99px 40px 0" }}
            onChange={(event, pageVal) => setPage(pageVal)}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
