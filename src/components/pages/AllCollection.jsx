import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API } from "../constants/Constants";
import Card1 from "../subcomponents/Card1";
import MySkeleton from "../subcomponents/MySkeleton";
import { makeStyles } from "@mui/styles";
import {
  Pagination,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import "./AllCollection.css";
import CardNovinki from "../subcomponents/CardNovinki";
import TableCardNovinki from "../subcomponents/TableCardNovinki";
import { useProductContext } from "../context/ProductContextProvider";

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

const AllCollection = () => {
  const classes = useStyles();
  const [allCollectionData, setAllCollectionData] = useState([]);
  const [novinkiData, setNovinkiData] = useState([]);
  const [pageTotalCount, setPageTotalCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(+searchParams.get("_page") || 1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { typeCollection } = useProductContext();

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
    axios.get(API).then((res) => {
      let newArr = res.data.filter(
        (elem) => elem.discount !== 0 && elem.oldprice !== 0
      );
      setNovinkiData(newArr.splice(0, 5));
    });
    if (screenWidth <= 724) {
      axios.get(`${API}${window.location.search}`).then((response) => {
        setAllCollectionData(response.data);
        setPageTotalCount(Math.ceil(response.headers["x-total-count"] / 4));
      });
    } else {
      axios.get(`${API}${window.location.search}`).then((response) => {
        setAllCollectionData(response.data);
        setPageTotalCount(Math.ceil(response.headers["x-total-count"] / 12));
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
    <div
      style={{
        width: "100%",
        margin: "0 0 70px 0",
      }}
    >
      <div className="collectionOuter">
        <span style={{ margin: "22px 0" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#393939" }}>
            <span className="breadcrumbs">Главная</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <Link
            to="/collection"
            style={{ textDecoration: "none", color: "#393939" }}
          >
            <span className="breadcrumbs">Колекции</span>
          </Link>
          <span style={{ margin: "0 12px" }}>/</span>
          <span className="breadcrumbs third">{typeCollection}</span>
        </span>
      </div>
      <div className="allcollectionheader">
        <span className="allcollectionheadertext">
          Коллекция {typeCollection}
        </span>
      </div>
      <div className="allcollection-container">
        {allCollectionData && allCollectionData.length > 0 ? (
          allCollectionData.map((item) => <Card1 key={item.id} item={item} />)
        ) : (
          <MySkeleton />
        )}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          id="pag"
          count={pageTotalCount}
          defaultPage={6}
          siblingCount={0}
          classes={{ ul: classes.ul }}
          color="secondary"
          sx={{ display: "inline-block", margin: " 15px 99px 40px 0" }}
          onChange={(event, pageVal) => setPage(pageVal)}
          page={page}
        />
      </div>
      <div className="headerNovinki">
        <span
          style={{
            color: "#393939",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "24px",
            lineHeight: "29px",
          }}
        >
          Новинки
        </span>
      </div>
      <div className="allcollectionnovinki">
        {novinkiData && novinkiData.length > 0 ? (
          novinkiData.map((item) => <CardNovinki key={item.id} item={item} />)
        ) : (
          <MySkeleton />
        )}
      </div>
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
    </div>
  );
};

export default AllCollection;
