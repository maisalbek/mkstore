import "./Home.css";
import "react-alice-carousel/lib/alice-carousel.css";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import Paper from "@mui/material/Paper";
import Card1 from "../subcomponents/Card1";
import CardTable from "../subcomponents/CardTable";
import CardCollection from "../subcomponents/CardCollection";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import money from "../images/money 1.svg";
import truck from "../images/truck 1.svg";
import support from "../images/support 1.svg";
import shop from "../images/shop-2 1.svg";
import { API, API3, API5 } from "../constants/Constants";
import { API4 } from "../constants/Constants";
import axios from "axios";
import Slider from "../subcomponents/Slider";
import MySkeleton from "../subcomponents/MySkeleton";
import HomeBlocks from "../subcomponents/HomeBlocks";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const Home = () => {
  const [sliderData, setSliderData] = useState({});
  const [products, setProducts] = useState([]);
  const [novinki, setNovinki] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [advantagesData, setAdvantagesData] = useState([]);
  const [hitLimit, setHitLimit] = useState(8);
  const [novinkiLimit, setNovinkiLimit] = useState(4);
  const [collectionLimit, setCollectionLimit] = useState(4);
  const [hitprodajbtn, setHitprodajbtn] = useState(true);
  const [novinkibtn, setNovinkibtn] = useState(true);
  const [collectionbtn, setCollectionbtn] = useState(true);
  const advantageImages = [money, truck, support, shop];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { currentUser } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    setScreenWidth(window.innerWidth);
    setHitprodajbtn(true);
    setNovinkibtn(true);
    setCollectionbtn(true);
    setHitLimit(8);
    setNovinkiLimit(4);
    getCollection();
    getAdvatagesData();
    getSliderData();
  }, []);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [screenWidth]);

  useEffect(() => {
    getProducts();
  }, [hitLimit]);
  useEffect(() => {
    getNovinki();
  }, [novinkiLimit]);
  useEffect(() => {
    getCollection();
  }, [collectionLimit]);

  const getProducts = () => {
    if (screenWidth < 899) {
      axios.get(`${API}?_limit=&_page=&q=`).then((response) => {
        setProducts(response.data);
        if (Number.isInteger(response.data.length / 8)) {
          setHitprodajbtn(true);
        } else {
          setHitprodajbtn(false);
        }
      });
    } else {
      axios.get(`${API}?_limit=${hitLimit}&_page=&q=`).then((response) => {
        setProducts(response.data);
        if (Number.isInteger(response.data.length / 8)) {
          setHitprodajbtn(true);
        } else {
          setHitprodajbtn(false);
        }
      });
    }
  };
  const getNovinki = () => {
    if (screenWidth < 899) {
      axios.get(`${API}${`?_limit=`}`).then((response) => {
        setNovinki(response.data);
        if (Number.isInteger(response.data.length / 4)) {
          setNovinkibtn(true);
        } else {
          setNovinkibtn(false);
        }
      });
    } else {
      axios.get(`${API}${`?_limit=${novinkiLimit}`}`).then((response) => {
        setNovinki(response.data);
        if (Number.isInteger(response.data.length / 4)) {
          setNovinkibtn(true);
        } else {
          setNovinkibtn(false);
        }
      });
    }
  };
  const getCollection = () => {
    if (screenWidth < 899) {
      axios.get(`${API5}${`?_limit=`}`).then((response) => {
        setCollectionData(response.data);
        if (Number.isInteger(response.data.length / 4)) {
          setCollectionbtn(true);
        } else {
          setCollectionbtn(false);
        }
      });
    } else {
      axios.get(`${API5}${`?_limit=${collectionLimit}`}`).then((response) => {
        setCollectionData(response.data);
        if (Number.isInteger(response.data.length / 4)) {
          setCollectionbtn(true);
        } else {
          setCollectionbtn(false);
        }
      });
    }
  };
  const getSliderData = () => {
    axios.get(API3).then((response) => {
      setSliderData(response.data);
    });
  };
  const getAdvatagesData = () => {
    axios.get(API4).then((response) => {
      setAdvantagesData(response.data);
    });
  };

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
          sliderData.products.map((item, index) => (
            <Slider key={index} item={item} />
          ))
        ) : (
          <MySkeleton />
        )}
      </AliceCarousel>
      <div className="hitprodaj">
        <span className="novinki-text">Хит продаж</span>
        <div className="product-container">
          {products && products.length > 0 ? (
            products.map((item, index) => <Card1 key={index} item={item} />)
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
                    ? products.map((item, index) => (
                        <TableCell style={{ padding: "0 5px" }} key={index}>
                          <CardTable item={item} />
                        </TableCell>
                      ))
                    : null}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
        {hitprodajbtn ? (
          <button
            className="btn-more"
            onClick={() => {
              setHitLimit((prev) => prev * 2);
            }}
          >
            Ещё
          </button>
        ) : null}
      </div>
      <div className="novinki">
        <span className="novinki-text">Новинки</span>
        <div className="novinki-container">
          {novinki && novinki.length > 0 ? (
            novinki.map((item, index) => <Card1 key={index} item={item} />)
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
                    ? novinki.map((item, index) => (
                        <TableCell style={{ padding: "0 5px" }} key={index}>
                          <CardTable item={item} />
                        </TableCell>
                      ))
                    : null}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
        {novinkibtn ? (
          <button
            className="btn-more"
            onClick={() => {
              setNovinkiLimit((prev) => prev * 2);
            }}
          >
            Ещё
          </button>
        ) : null}
      </div>
      <div className="collection">
        <span className="novinki-text">Коллекция</span>
        <div className="collection-container">
          {collectionData && collectionData.length > 0 ? (
            collectionData.map((item, index) => (
              <CardCollection key={index} item={item} />
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
                  {collectionData && collectionData.length > 0
                    ? collectionData.map((item, index) => (
                        <TableCell style={{ padding: "0 5px" }} key={index}>
                          <CardCollection item={item} />
                        </TableCell>
                      ))
                    : null}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
        {collectionbtn ? (
          <button
            className="btn-more"
            onClick={() => {
              setCollectionLimit((prev) => prev * 2);
            }}
          >
            Ещё
          </button>
        ) : null}
      </div>
      <div className="adventages">
        <span className="novinki-text">Наши преимущества</span>
        <div className="adventages-container">
          {advantagesData && advantagesData.length > 0 ? (
            advantagesData.map((item, index) => (
              <HomeBlocks
                item={item}
                key={index}
                image={advantageImages[item.id - 1]}
              />
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
