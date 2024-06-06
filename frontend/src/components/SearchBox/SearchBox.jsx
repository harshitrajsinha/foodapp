import React from "react";
import { IoIosSearch } from "react-icons/io";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/fonts.css";
import "../../assets/css/font-awesome-6.css";
import "../../assets/css/grt-youtube-popup.css";
import "../../assets/css/owl.carousel.min.css";
import "../../assets/css/owl.theme.default.min.css";
import "../../assets/css/animate.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";

function SearchBox({ handleClose }) {
  return (
    <div className="searchBox">
      <div className="searchBoxCard">
        <a href="#" onClick={handleClose} className="searchBoxClose">
          <i className="fa-solid fa-xmark"></i>
        </a>
        <div className="searchBoxInner">
          <div className="searchBoxLogo">
            <img
              src="/images/logo/logo-white.png"
              alt="search"
              className="img-fluid"
            />
          </div>
          <div className="searchBoxForm">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <button type="button" className="btn btnSecondary">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
