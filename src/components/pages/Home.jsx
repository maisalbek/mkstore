import "./Home.css";
import "react-alice-carousel/lib/alice-carousel.css";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import Paper from "@mui/material/Paper";
import Card1 from "../subcomponents/Card1";
import CardTable from "../subcomponents/CardTable";
import CardCollection from "../subcomponents/CardCollection";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import money from "../images/money 1.svg";
import truck from "../images/truck 1.svg";
import support from "../images/support 1.svg";
import shop from "../images/shop-2 1.svg";
import { useProductContext } from "../context/ProductContextProvider";
import { API3 } from "../constants/Constants";
import { API4 } from "../constants/Constants";
import axios from "axios";
import Slider from "../subcomponents/Slider";
import MySkeleton from "../subcomponents/MySkeleton";
import HomeBlocks from "../subcomponents/HomeBlocks";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [sliderData, setSliderData] = useState({});
  const navigate = useNavigate();
  const [advantagesData, setAdvantagesData] = useState([]);
  const advantageImages = [money, truck, support, shop];
  const {
    getHitProdaj,
    getNovinki,
    novinki,
    products,
    idForEdit,
    saveProduct,
    productForEdit,
  } = useProductContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getHitProdaj();
    getNovinki();
    axios.get(API3).then((response) => {
      setSliderData(response.data);
    });
    axios.get(API4).then((response) => {
      setAdvantagesData(response.data);
    });
  }, []);

  useEffect(() => {
    if (productForEdit) {
      let newEl = productForEdit.image.shift();
      productForEdit.image.push(newEl);
      saveProduct(productForEdit);
    }
  }, [productForEdit]);

  return (
    <div className="home-container">
      <AliceCarousel
        autoPlay={true}
        autoPlayInterval="3000"
        autoPlayStrategy="none"
        infinite={true}
        disableButtonsControls={true}
      >
        {sliderData.products && sliderData.products.length > 0 ? (
          sliderData.products.map((item) => <Slider item={item} />)
        ) : (
          <MySkeleton />
        )}
      </AliceCarousel>
      <div className="hitprodaj">
        <span className="hitprodaj-text">Хит продаж</span>
        <div className="product-container">
          {products && products.length > 0 ? (
            products.map((item) => (
              <Card1 key={item.id} item={item} idForEdit={idForEdit} />
            ))
          ) : (
            <MySkeleton />
          )}
        </div>
        <div className="table-container">
          <TableContainer
            component={Paper}
            style={{ paddingTop: "0", border: "none" }}
          >
            <Table sx={{ minWidth: 262 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {products && products.length > 0
                    ? products.map((item) => (
                        <TableCell style={{ padding: "0 5px" }}>
                          <CardTable
                            key={item.id}
                            item={item}
                            idForEdit={idForEdit}
                          />
                        </TableCell>
                      ))
                    : null}
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </div>
        <button className="btn-more">Ещё</button>
      </div>
      <div className="novinki">
        <span className="novinki-text">Новинки</span>
        <div className="novinki-container">
          {novinki && novinki.length > 0 ? (
            novinki.map((item) => (
              <Card1 key={item.id} item={item} idForEdit={idForEdit} />
            ))
          ) : (
            <MySkeleton />
          )}
        </div>
        <div className="table-container">
          <TableContainer
            component={Paper}
            style={{ paddingTop: "0", border: "none" }}
          >
            <Table sx={{ minWidth: 262 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {novinki && novinki.length > 0
                    ? novinki.map((item) => (
                        <TableCell style={{ padding: "0 5px" }}>
                          <CardTable
                            key={item.id}
                            item={item}
                            idForEdit={idForEdit}
                          />
                        </TableCell>
                      ))
                    : null}
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </div>
        <button className="btn-more">Ещё</button>
      </div>
      <div className="collection">
        <span className="novinki-text">Коллекция</span>
        <div className="collection-container">
          {novinki && novinki.length > 0 ? (
            novinki.map((item) => <CardCollection key={item.id} item={item} />)
          ) : (
            <MySkeleton />
          )}
        </div>
        <div className="table-container">
          <TableContainer
            component={Paper}
            style={{ paddingTop: "0", border: "none" }}
          >
            <Table sx={{ minWidth: 262 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {novinki && novinki.length > 0
                    ? novinki.map((item) => (
                        <TableCell style={{ padding: "0 5px" }}>
                          <CardCollection key={item.id} item={item} />
                        </TableCell>
                      ))
                    : null}
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </div>
        <button
          className="btn-more"
          onClick={() => {
            navigate("/collection");
          }}
        >
          Ещё
        </button>
      </div>
      <div className="adventages">
        <span className="novinki-text">Наши преимущества</span>
        <div className="adventages-container">
          {advantagesData && advantagesData.length > 0 ? (
            advantagesData.map((item) => (
              <HomeBlocks item={item} image={advantageImages[item.id - 1]} />
            ))
          ) : (
            <MySkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
