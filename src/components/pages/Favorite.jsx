import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../constants/Constants";
import { useFavorite } from "../context/FavoriteContextProvider";
import Card1 from "../subcomponents/Card1";
import CardNovinki from "../subcomponents/CardNovinki";
import MySkeleton from "../subcomponents/MySkeleton";
import TableCardNovinki from "../subcomponents/TableCardNovinki";
import "./Favorite.css";

const Favorite = () => {
  const { fav, getFav } = useFavorite();
  const [novinkiData, setNovinkiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [moblimit, setMobLimit] = useState(4);
  const [currentDataForRender, setCurrentDataForRender] = useState([]);

  useEffect(() => {
    if (fav.products) {
      if (window.innerWidth < 899) {
        const indexOfLast = currentPage * moblimit;
        const currentData = fav.products.slice(0, indexOfLast);
        setCurrentDataForRender(currentData);
      } else {
        const indexOfLast = currentPage * limit;
        const currentData = fav.products.slice(0, indexOfLast);
        setCurrentDataForRender(currentData);
      }
    }
  }, [currentPage, fav.products]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getFav();
    axios.get(API).then((res) => {
      let newArr = res.data.filter(
        (elem) => elem.discount !== 0 && elem.oldprice !== 0
      );
      setNovinkiData(newArr.splice(0, 5));
    });
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function () {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const handleScroll = (e) => {
    if (window.innerWidth < 899) {
      if (
        e.target.documentElement.scrollHeight -
          400 -
          (window.innerHeight + e.target.documentElement.scrollTop) <
        390
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    } else {
      if (
        e.target.documentElement.scrollHeight -
          (window.innerHeight + e.target.documentElement.scrollTop) <
        0.5
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

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
          <span className="breadcrumbs third">Избранное</span>
        </span>
      </div>
      <div className="favoriteheader">
        <span className="favoriteheadertext">Избранное</span>
        <span className="favoriteheadersubtext tog">
          {fav.products && fav.products.length > 0
            ? `Товаров в избранном: ${fav.products.length}`
            : "У Вас пока нет избранных товаров"}
        </span>
      </div>
      <div className="allcollection-container favowncon">
        {currentDataForRender && currentDataForRender.length > 0
          ? currentDataForRender.map((item1) => (
              <Card1 key={item1.item.id} item={item1.item} />
            ))
          : null}
      </div>
      {fav.products && fav.products.length <= 0 ? (
        <div className="headerNovinki favheaderNovinki">
          <span className="favoriteheadertext downtext">
            Возможно Вас заинтересует
          </span>
        </div>
      ) : null}
      {fav.products && fav.products.length <= 0 ? (
        <div className="allcollectionnovinki onwtablecon">
          {novinkiData && novinkiData.length > 0 ? (
            novinkiData.map((item) => <CardNovinki key={item.id} item={item} />)
          ) : (
            <MySkeleton />
          )}
        </div>
      ) : null}

      {fav.products && fav.products.length <= 0 ? (
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

export default Favorite;
