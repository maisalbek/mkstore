import React, { useEffect, useState } from "react";
import AccountIcon from "../images/AccountIcon.svg";
import TelephoneIcon from "../images/telephoneIcon.svg";
import send from "../images/sendImage.svg";
import CloseIcon from "../images/CloseIcon.svg";

const MyDialog = ({ open, setOpen }) => {
  const [inpValues, setInpValues] = useState({ title: "", phone: "" });
  const [secondPart, setSecondPart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    window.innerWidth > 700 ? setIsMobile(false) : setIsMobile(true);
  }, []);

  useEffect(() => {
    let regex = /^[0]\d{9}$/;
    if (
      inpValues.title === "" ||
      inpValues.phone === "" ||
      !regex.test(inpValues.phone)
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }, [inpValues]);

  const handleChange = (e) => {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };
    setInpValues(obj);
  };

  const handleSubmit = () => {
    setSecondPart(true);
    setInpValues({ title: "", phone: "" });
  };

  const handleCloseMyDialog = () => {
    setOpen(false);
    setInpValues({ title: "", phone: "" });
    setError(false);
  };
  return (
    <div
      className="modal"
      style={{
        display: open ? "block" : "none",
      }}
    >
      {open && (
        <div
          className="modal-content"
          style={
            isMobile
              ? {
                  width: "256px",
                  height: "236px",
                  padding: "24px 16px",
                  margin: "50% auto",
                }
              : secondPart
              ? { width: "252px", height: "200px", padding: "24px 28px" }
              : { width: "360px", height: "252px", padding: "32px 38px" }
          }
        >
          {secondPart ? (
            <div className="float-menu-container float-menu-container2">
              <img
                id="sendImage"
                width="60px"
                src={send}
                alt=""
                style={isMobile ? { marginTop: "28px" } : null}
              />
              <span className="float-send-headerText">??????????????!</span>
              <span className="float-send-text">
                ???????? ???????????? ???????? ?????????????? ????????????????, ?????????? ?????? ????????????????????
              </span>
              <button
                className="zakazat-btn"
                style={{
                  backgroundColor: "#1D1D1B",
                  marginTop: "16px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleCloseMyDialog();
                  setSecondPart(false);
                }}
              >
                ???????????????????? ??????????????
              </button>
            </div>
          ) : (
            <div className="float-menu-container">
              <img
                style={{
                  width: "14px",
                  height: "14px",
                  left: isMobile ? "98%" : "102%",
                }}
                className="closeMyDialog"
                src={CloseIcon}
                onClick={handleCloseMyDialog}
                alt=""
              />
              <span
                className="float-menu-headerText"
                style={isMobile ? { marginTop: "5px" } : null}
              >
                ???????? ?? ?????? ???????????????? ??????????????
              </span>
              <span className="float-menu-text">
                ???????????????? ???????????? ?? ???? ?????????????????????? ?????? ????????????????????
              </span>
              <form className="formdialog">
                <img
                  style={{ margin: "0 12px", width: "20px" }}
                  src={AccountIcon}
                  alt=""
                />
                <input
                  className="float-input1"
                  type="search"
                  name="title"
                  placeholder="?????? ?????? ?????????????????????"
                  value={inpValues.title}
                  onChange={(e) => handleChange(e)}
                />
              </form>
              <form className="formdialog">
                <img
                  style={{ margin: "0 12px", width: "20px" }}
                  src={TelephoneIcon}
                  alt=""
                />
                <input
                  className="float-input1"
                  type="number"
                  name="phone"
                  placeholder="?????????? ????????????????"
                  value={inpValues.phone}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                  onChange={(e) => handleChange(e)}
                />
              </form>
              {error ? (
                <button
                  className="zakazat-btn"
                  style={{ backgroundColor: "#1D1D1B", cursor: "pointer" }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  ???????????????? ????????????
                </button>
              ) : (
                <button
                  className="zakazat-btn"
                  style={{ backgroundColor: "rgb(121, 118, 118)" }}
                >
                  ???????????????? ????????????
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyDialog;
