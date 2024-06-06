import React from "react";
import "./Footer.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/fonts.css";
import "../../assets/css/font-awesome-6.css";
import "../../assets/css/grt-youtube-popup.css";
import "../../assets/css/owl.carousel.min.css";
import "../../assets/css/owl.theme.default.min.css";
import "../../assets/css/animate.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faFacebookF,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../images/SS.png";

function Footer() {
  const handleSubscribeClick = (e) => {
    e.preventDefault();
    toast.success("Email Sent");
  };
  return (
    <footer className="footer">
      <ToastContainer />
      <div className="container">
        <div className="footerInner">
          <div className="subscribeOuter">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="logisticSubscribeTxt">
                  <h4>
                    Subscribe For <span>Latest News</span>
                  </h4>
                  <p>
                    If you are going to use a passage of Lorem Ipsum, you need
                    to be sure there isn't anything embarrassing hidden in the
                    middle of text.
                  </p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="subscribeInpt">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email Address"
                      />
                      <button
                        type="submit"
                        className="btn btnPrimary"
                        onClick={handleSubscribeClick}
                      >
                        Subscribe Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="middleContent">
            <div className="footerLogo">
              <a href="/">
                <img src={logo} alt="footer-logo" className="img-fluid" />
              </a>
            </div>
            <div className="footerMenu">
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link" href="about-us.html">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact-us.html">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footContent">
            <div className="copyRight">
              <p className="mb-0">
                Copyright © 2024-2025 <a href="/">Sisters Spice</a>. All Rights
                Reserved.
              </p>
            </div>
            <div className="socialMedia">
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link" href="https://www.whatsapp.com/">
                    <FontAwesomeIcon icon={faWhatsapp} className="fa-brands" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.instagram.com/">
                    <FontAwesomeIcon icon={faInstagram} className="fa-brands" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.facebook.com/">
                    <FontAwesomeIcon icon={faFacebookF} className="fa-brands" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://twitter.com">
                    <FontAwesomeIcon icon={faXTwitter} className="fa-brands" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
