import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/SearchContextProvider";
import Card1 from "../subcomponents/Card1";
import { makeStyles } from "@mui/styles";

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
  const [limit, setLimit] = useState(12);
  const [currentDataForRender, setCurrentDataForRender] = useState([]);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  if (!requestword) {
    navigate("/");
  }

  useEffect(() => {
    if (filteredData) {
      const indexOfLast = currentPage * limit;
      const indexOfFirst = indexOfLast - limit;
      const currentData = filteredData.slice(indexOfFirst, indexOfLast);
      setCurrentDataForRender(currentData);
    }
  }, [filteredData]);

  useEffect(() => {
    if (filteredData) {
      const indexOfLast = currentPage * limit;
      const indexOfFirst = indexOfLast - limit;
      const currentData = filteredData.slice(indexOfFirst, indexOfLast);
      setCurrentDataForRender(currentData);
    }
  }, [currentPage]);

  useEffect(() => {
    if (filteredData) {
      setCount(Math.ceil(filteredData.length / limit));
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
          <span
            style={{ fontSize: "16px", color: "#393939", marginTop: "16px" }}
          >
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
    </div>
  );
};

export default SearchPage;
