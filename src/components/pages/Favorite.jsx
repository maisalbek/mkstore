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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getFav();
    axios.get(API).then((res) => {
      let newArr = res.data.filter(
        (elem) => elem.discount !== 0 && elem.oldprice !== 0
      );
      setNovinkiData(newArr.splice(0, 5));
    });
  }, []);
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
        {fav.products && fav.products.length > 0
          ? fav.products.map((item1) => (
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
