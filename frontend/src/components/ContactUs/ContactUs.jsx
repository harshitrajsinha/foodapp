import React from "react";
import img23 from "../../images/img23.png";
import img24 from "../../images/img24.png";
import img26 from "../../images/img26.png";
import img27 from "../../images/img27.png";
import icon1 from "../../images/icon/icon1.png";
import icon2 from "../../images/icon/icon2.png";
import icon3 from "../../images/icon/icon3.png";

const ContactUs = () => {
  return (
    <div>
      <section className="w-100 clearfix innerPageBanner" id="innerPageBanner">
        <div className="container">
          <div className="innerPageBannerInner">
            <div className="innerPageBannerImgLeft">
              s
              <img src={img24} alt="banner-img" className="img-fluid" />
            </div>
            <div className="innerPageBannerContent">
              <h1>
                Contact <span>Us</span>
              </h1>
            </div>
            <div className="innerPageBannerImgRight">
              <img src={img23} alt="banner-img" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <section className="w-100 clearfix getInTouch" id="getInTouch">
        <div className="container">
          <div className="getInTouchInner">
            <div className="getInTouchRow">
              <div className="getInTouchCol">
                <div className="getInTouchContent">
                  <div className="commonHeading headingLeft">
                    <h4>
                      Get In <span>Touch</span>
                    </h4>

                    <p>
                      Serving North-Indian, South-Indian and desi-Chinese
                      cuisines, choose from Vegetarian and Non-Vegetarian meal
                      options. dolor sit amet, consectetur Nulla fringilla purus
                      at leo dignissim congue. Mauris elementum accumsan leo vel
                      tempor. Sit amet cursus nisl aliquam. Aliquam et elit eu
                      nunc rhoncus viverra quis at felis.
                    </p>
                  </div>
                  <div className="getInTouchMap">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.5344610227803!2d-79.04627892381198!3d43.86547697109273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4df8c5c76f0f3%3A0x6ae90a7eaf988c1e!2sRadford%20Dr%2C%20Ajax%2C%20ON%20L1T%202G5%2C%20Canada!5e0!3m2!1sen!2sin!4v1716990053679!5m2!1sen!2sin"
                      style={{ border: "0" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="getInTouchCol">
                <div className="getInTouchImg">
                  <div className="getInTouchImgInner">
                    <div className="getInTouchImg1">
                      <img src={img26} alt="img" className="img-fluid" />
                    </div>
                    <div className="getInTouchImg2">
                      <img src={img27} alt="img" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-100 clearfix getInTouchInfo" id="getInTouchInfo">
        <div className="container">
          <div className="getInTouchInfoInner">
            <div className="getInTouchInfoRow">
              <div className="getInTouchInfoCol">
                <a href="">
                  <div className="getInTouchInfoItem">
                    <div className="getInTouchInfoOuter">
                      <div className="getInTouchInfoItemInner">
                        <div className="getInTouchInfoIcon">
                          <span>
                            <img src={icon1} alt="icon" className="img-fluid" />
                          </span>
                        </div>
                        <div className="getInTouchInfoContent">
                          <h6>Phone Number</h6>
                          <p className="mb-0">+1 (437) 974-9596</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="getInTouchInfoCol">
                <a href="">
                  <div className="getInTouchInfoItem">
                    <div className="getInTouchInfoOuter">
                      <div className="getInTouchInfoItemInner">
                        <div className="getInTouchInfoIcon">
                          <span>
                            <img src={icon2} alt="icon" className="img-fluid" />
                          </span>
                        </div>
                        <div className="getInTouchInfoContent">
                          <h6>Email Address</h6>
                          <p className="mb-0">SISTERSSPICES2020@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="getInTouchInfoCol">
                <a href="">
                  <div className="getInTouchInfoItem">
                    <div className="getInTouchInfoOuter">
                      <div className="getInTouchInfoItemInner">
                        <div className="getInTouchInfoIcon">
                          <span>
                            <img src={icon3} alt="icon" className="img-fluid" />
                          </span>
                        </div>
                        <div className="getInTouchInfoContent">
                          <h6>Location</h6>
                          <p className="mb-0">
                            Radford Drive, Ajax, Ontario, Canada L1T 2G5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="w-100 clearfix sendMessage spacious-section"
        id="sendMessage"
      >
        <div className="container">
          <div className="sendMessageInner">
            <div className="row">
              <div className="col-md-6">
                <div className="sendMessageContentBox">
                  <div className="commonHeading">
                    <h4>
                      Send Me a Message <br /> <span>Anytime!</span>
                    </h4>
                    <p>
                      Serving North-Indian, South-Indian and desi-Chinese
                      cuisines, choose from Vegetarian and Non-Vegetarian meal
                      options. dolor sit amet, consectetur Nulla fringilla purus
                      at leo dignissim congue. Mauris elementum accumsan leo vel
                      tempor.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="sendMessageFrom">
                  <form className="sendMessageFromBox">
                    <div className="formGroup">
                      <input
                        type="text"
                        className="form-control require"
                        id="name"
                        placeholder="Enter Name"
                        name="full_name"
                      />
                    </div>
                    <div className="formGroup">
                      <input
                        type="email"
                        className="form-control require"
                        id="email"
                        placeholder="Enter Email"
                        name="email"
                      />
                    </div>
                    <div className="formGroup">
                      <input
                        type="number"
                        className="form-control require"
                        id="number"
                        placeholder="Enter Phone Number"
                        name="contact_no"
                      />
                    </div>
                    <div className="formGroup">
                      <textarea
                        className="form-control require"
                        rows="6"
                        id="message"
                        placeholder="Message"
                        name="message"
                      ></textarea>
                    </div>
                    <div className="response"></div>
                    <div className="formGroup">
                      <button
                        type="button"
                        className="btn btnPrimary submitForm"
                      >
                        {" "}
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
