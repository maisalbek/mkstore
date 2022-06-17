import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import FooterLogo from "../images/FooterLogo.svg";
import telephone from "../images/footertel.svg";
import footermail from "../images/footer-mail.svg";
import footerinstagram from "../images/footerInsta.svg";
import telegram from "../images/footertelegram.svg";
import whatsapp from "../images/footerinstagram.svg";
import { API1 } from "../constants/Constants";
import axios from "axios";

const Footer = () => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    axios.get(API1).then((response) => {
      setContact(response.data);
    });
  }, []);

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-image-container">
          <Link to="/">
            <img className="footer-logo" src={FooterLogo} alt="" />
          </Link>
          <span
            className="developed"
            style={{ marginTop: "30px", color: "#B9B9B9" }}
          >
            {contact.footerText}
          </span>
        </div>
        <div className="footer-subcontainer">
          <div className="footer-block footer-one">
            <span className="footer-header-text">Компания</span>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <span className="footer-text-items">О нас</span>
            </Link>
            <Link to="/news" style={{ textDecoration: "none" }}>
              <span className="footer-text-items">Новости</span>
            </Link>
            <Link to="/help" style={{ textDecoration: "none" }}>
              <span className="footer-text-items">Помощь</span>
            </Link>
          </div>
          <div className="footer-block">
            <span className="footer-header-text">Контакты</span>
            <a href={"tel:" + contact.footerTel1} className="footer-text-items">
              <img className="footerIcons" src={telephone} alt="" />
              {contact.footerTel1}
            </a>
            <a href={"tel:" + contact.footerTel2} className="footer-text-items">
              <img className="footerIcons" src={telephone} alt="" />
              {contact.footerTel2}
            </a>
            <a
              href="mailto:maysalbek1972@gmail.com"
              className="footer-text-items"
            >
              <img className="footerIcons" src={footermail} alt="" />
              {contact.mail}
            </a>
          </div>
          <div className="footer-block">
            <span className="footer-header-text">Мы в социальных сетях:</span>
            <a
              href={`${contact.instagram}`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <span className="footer-text-items">
                <img className="footerIcons" src={footerinstagram} alt="" />
                Instagram
              </span>
            </a>
            <a
              href={`${contact.telegram}`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <span className="footer-text-items">
                <img className="footerIcons" src={telegram} alt="" />
                Telegram
              </span>
            </a>
            <a
              href={`${contact.whatsApp}`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <span className="footer-text-items">
                <img className="footerIcons" src={whatsapp} alt="" />
                WhatsApp
              </span>
            </a>
          </div>
        </div>
        <span
          className="developed2"
          style={{ paddingTop: "16px", color: "#B9B9B9" }}
        >
          {contact.footerText}
        </span>
      </div>
    </div>
  );
};

export default Footer;
