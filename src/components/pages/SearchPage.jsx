import {
  Pagination,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/SearchContextProvider";
import Card1 from "../subcomponents/Card1";
import { makeStyles } from "@mui/styles";
import { API } from "../constants/Constants";
import CardNovinki from "../subcomponents/CardNovinki";
import MySkeleton from "../subcomponents/MySkeleton";
import axios from "axios";
import TableCardNovinki from "../subcomponents/TableCardNovinki";

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

const SearchPage = () => {
  const classes = useStyles();
  const { filteredData, requestword } = useSearchContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [novinkiData, setNovinkiData] = useState([]);
  const [limit, setLimit] = useState(12);
  const [moblimit, setMobLimit] = useState(4);
  const [currentDataForRender, setCurrentDataForRender] = useState([]);
  const [count, setCount] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  if (!requestword) {
    navigate("/");
  }

  useEffect(() => {
    axios.get(API).then((res) => {
      let newArr = res.data.filter(
        (elem) => elem.discount !== 0 && elem.oldprice !== 0
      );
      setNovinkiData(newArr.splice(0, 5));
    });
  }, []);

  useEffect(() => {
    if (screenWidth <= 724) {
      if (filteredData) {
        const indexOfLast = currentPage * moblimit;
        const indexOfFirst = indexOfLast - moblimit;
        const currentData = filteredData.slice(indexOfFirst, indexOfLast);
        setCurrentDataForRender(currentData);
      }
    } else {
      if (filteredData) {
        const indexOfLast = currentPage * limit;
        const indexOfFirst = indexOfLast - limit;
        const currentData = filteredData.slice(indexOfFirst, indexOfLast);
        setCurrentDataForRender(currentData);
      }
    }
  }, [filteredData]);

  useEffect(() => {
    if (screenWidth <= 724) {
      if (filteredData) {
        const indexOfLast = currentPage * moblimit;
        const indexOfFirst = indexOfLast - moblimit;
        const currentData = filteredData.slice(indexOfFirst, indexOfLast);
        setCurrentDataForRender(currentData);
      }
    } else {
      if (filteredData) {
        const indexOfLast = currentPage * limit;
        const indexOfFirst = indexOfLast - limit;
        const currentData = filteredData.slice(indexOfFirst, indexOfLast);
        setCurrentDataForRender(currentData);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    if (filteredData) {
      if (screenWidth <= 724) {
        setCount(Math.ceil(filteredData.length / moblimit));
      } else {
        setCount(Math.ceil(filteredData.length / limit));
      }
    }
  }, [filteredData]);

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
          <span className="breadcrumbs third">Результаты поиска</span>
        </span>
      </div>
      <div
        className="allcollectionheader"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <span className="allcollectionheadertext">
          Результаты поиска по запросу: {requestword}
        </span>
        {currentDataForRender && currentDataForRender.length > 0 ? null : (
          <span className="povashemu">
            По Вашему запросу ничего не найдено.
          </span>
        )}
      </div>
      {currentDataForRender && currentDataForRender.length > 0 ? (
        <div className="allcollection-container">
          {currentDataForRender && currentDataForRender.length > 0
            ? currentDataForRender.map((item) => (
                <Card1 key={item.id} item={item} />
              ))
            : null}
        </div>
      ) : null}
      {currentDataForRender && currentDataForRender.length > 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Pagination
            id="pag"
            count={count}
            classes={{ ul: classes.ul }}
            color="secondary"
            sx={{ display: "inline-block", margin: " 15px 99px 40px 0" }}
            onChange={(event, pageVal) => setCurrentPage(pageVal)}
            page={currentPage}
          />
        </div>
      ) : null}
      {currentDataForRender && currentDataForRender.length <= 0 ? (
        <div className="headerNovinki favheaderNovinki">
          <span className="favoriteheadertext downtext">
            Возможно Вас заинтересует
          </span>
        </div>
      ) : null}
      {currentDataForRender && currentDataForRender.length <= 0 ? (
        <div className="allcollectionnovinki onwtablecon">
          {novinkiData && novinkiData.length > 0 ? (
            novinkiData.map((item) => <CardNovinki key={item.id} item={item} />)
          ) : (
            <MySkeleton />
          )}
        </div>
      ) : null}
      {currentDataForRender && currentDataForRender.length <= 0 ? (
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
    </div>
  );
};

export default SearchPage;
