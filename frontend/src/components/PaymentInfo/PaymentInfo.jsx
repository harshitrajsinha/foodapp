import React from "react";

const PaymentInfo = () => {
  return (
    <section className="w-100 clearfix myProfile" id="myProfile">
      <div className="container">
        <div className="myProfileInner">
          <div className="tabContent">
            <div className="tab-content">
              <div className="tab-pane active" id="payment-methods">
                <div className="paymentMethodsContent">
                  <div className="paymentMethodsHead">
                    <div className="paymentMethodsHeading">
                      <h4>Your Payment Information</h4>
                    </div>
                  </div>
                  <div className="paymentInfoCardOuter">
                    <div className="paymentInfoCard">
                      <div className="paymentInfoCardInner">
                        <div className="paymentVisaCardRow">
                          <div className="paymentVisaCardInfoOuter">
                            <div className="paymentVisaCardInfo">
                              <img
                                src="images/visa-card-bg.png"
                                alt="visa-card"
                                className="img-fluid visaCardImg"
                              />
                              <div className="paymentVisaCardInfoInner">
                                <div className="paymentVisaCardNumber">
                                  <h5>45xx xxxx xxxx 0920</h5>
                                  <img
                                    src="images/visa-and-mastercard-logo.png"
                                    alt="logo"
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="paymentCardMiddleInfo">
                                  <h4>Serina Smith</h4>
                                  <div className="paymentCardEndDetail">
                                    <span className="exp">Exp. - 10/2027</span>
                                    <span className="cvv">CVV: 027</span>
                                  </div>
                                </div>
                                <div className="paymentCardInfo">
                                  <ul>
                                    <li>
                                      <a href="javascript:void(0);">Edit</a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0);">Delete</a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0);">
                                        Set As Default
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="paymentInfoCardEdit">
                              <a
                                href="javascript:void(0);"
                                data-bs-toggle="modal"
                                data-bs-target="#editCard1"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                >
                                  <path
                                    d="M3.64706 4.52954H2.76471C2.29668 4.52954 1.84782 4.71546 1.51687 5.04641C1.18592 5.37736 1 5.82622 1 6.29425V14.2354C1 14.7035 1.18592 15.1523 1.51687 15.4833C1.84782 15.8142 2.29668 16.0001 2.76471 16.0001H10.7059C11.1739 16.0001 11.6228 15.8142 11.9537 15.4833C12.2847 15.1523 12.4706 14.7035 12.4706 14.2354V13.3531"
                                    stroke="#999999"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M11.5886 2.7648L14.2356 5.41186M15.4577 4.16333C15.8052 3.81582 16.0004 3.34449 16.0004 2.85304C16.0004 2.36158 15.8052 1.89025 15.4577 1.54274C15.1102 1.19523 14.6389 1 14.1474 1C13.656 1 13.1846 1.19523 12.8371 1.54274L5.41211 8.94128V11.5883H8.05917L15.4577 4.16333Z"
                                    stroke="#999999"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div className="paymentVisaCardInfoOuter">
                            <div className="paymentVisaCardInfo">
                              <img
                                src="images/visa-card-bg.png"
                                alt="visa-card"
                                className="img-fluid visaCardImg"
                              />
                              <div className="paymentVisaCardInfoInner">
                                <div className="paymentVisaCardNumber">
                                  <h5>53xx xxxx xxxx 0202</h5>
                                  <img
                                    src="images/visa-and-mastercard-logo.png"
                                    alt="logo"
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="paymentCardMiddleInfo">
                                  <h4>Coleen Hansen</h4>
                                  <div className="paymentCardEndDetail">
                                    <span className="exp">Exp. - 08/2025</span>
                                    <span className="cvv">CVV: 022</span>
                                  </div>
                                </div>
                                <div className="paymentCardInfo">
                                  <ul>
                                    <li>
                                      <a href="javascript:void(0);">Edit</a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0);">Delete</a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0);">
                                        Set As Default
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="paymentInfoCardEdit">
                              <a
                                href="javascript:void(0);"
                                data-bs-toggle="modal"
                                data-bs-target="#editCard2"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                >
                                  <path
                                    d="M3.64706 4.52954H2.76471C2.29668 4.52954 1.84782 4.71546 1.51687 5.04641C1.18592 5.37736 1 5.82622 1 6.29425V14.2354C1 14.7035 1.18592 15.1523 1.51687 15.4833C1.84782 15.8142 2.29668 16.0001 2.76471 16.0001H10.7059C11.1739 16.0001 11.6228 15.8142 11.9537 15.4833C12.2847 15.1523 12.4706 14.7035 12.4706 14.2354V13.3531"
                                    stroke="#999999"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M11.5886 2.7648L14.2356 5.41186M15.4577 4.16333C15.8052 3.81582 16.0004 3.34449 16.0004 2.85304C16.0004 2.36158 15.8052 1.89025 15.4577 1.54274C15.1102 1.19523 14.6389 1 14.1474 1C13.656 1 13.1846 1.19523 12.8371 1.54274L5.41211 8.94128V11.5883H8.05917L15.4577 4.16333Z"
                                    stroke="#999999"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div className="paymentVisaCardInfoOuter">
                            <div className="paymentVisaCardInfo">
                              <img
                                src="images/visa-card-bg.png"
                                alt="visa-card"
                                className="img-fluid visaCardImg"
                              />
                              <div className="paymentVisaCardInfoInner">
                                <div className="paymentVisaCardNumber">
                                  <h5>48xx xxxx xxxx 2925</h5>
                                  <img
                                    src="images/visa-and-mastercard-logo.png"
                                    alt="logo"
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="paymentCardMiddleInfo">
                                  <h4></h4>
                                  <div className="paymentCardEndDetail">
                                    <span className="exp">Exp. - 02/2029</span>
                                    <span className="cvv">CVV: 358</span>
                                  </div>
                                </div>
                                <div className="paymentCardInfo">
                                  <ul>
                                    <li>
                                      <a href="javascript:void(0);">Edit</a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0);">Delete</a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0);">
                                        Set As Default
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="paymentInfoCardEdit">
                              <a
                                href="javascript:void(0);"
                                data-bs-toggle="modal"
                                data-bs-target="#editCard3"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                >
                                  <path
                                    d="M3.64706 4.52954H2.76471C2.29668 4.52954 1.84782 4.71546 1.51687 5.04641C1.18592 5.37736 1 5.82622 1 6.29425V14.2354C1 14.7035 1.18592 15.1523 1.51687 15.4833C1.84782 15.8142 2.29668 16.0001 2.76471 16.0001H10.7059C11.1739 16.0001 11.6228 15.8142 11.9537 15.4833C12.2847 15.1523 12.4706 14.7035 12.4706 14.2354V13.3531"
                                    stroke="#999999"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M11.5886 2.7648L14.2356 5.41186M15.4577 4.16333C15.8052 3.81582 16.0004 3.34449 16.0004 2.85304C16.0004 2.36158 15.8052 1.89025 15.4577 1.54274C15.1102 1.19523 14.6389 1 14.1474 1C13.656 1 13.1846 1.19523 12.8371 1.54274L5.41211 8.94128V11.5883H8.05917L15.4577 4.16333Z"
                                    stroke="#999999"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="paymentMethodsHead">
                    <div className="paymentMethodsHeading">
                      <h4>Add Payment Details</h4>
                    </div>
                  </div>
                  <div className="paymentInfoCardForm">
                    <div className="personalContent">
                      <div className="form">
                        <div className="formRight">
                          <div className="formRightCheck">
                            <input
                              type="radio"
                              name="paymentMethod"
                              id="option1"
                            />
                            <label
                              for="option1"
                              className="formRightCheckCreditCard"
                            >
                              <span className="formRightCheckCreditCardText">
                                Credit Card
                              </span>
                            </label>

                            <input
                              type="radio"
                              name="paymentMethod"
                              id="option2"
                            />
                            <label
                              for="option2"
                              className="formRightCheckPayPal"
                            >
                              {" "}
                              <span className="formRightCheckPaypalText">
                                Paypal
                              </span>
                            </label>

                            <input
                              type="radio"
                              name="paymentMethod"
                              id="option3"
                            />
                            <label for="option3" className="formRightCheckUPI">
                              {" "}
                              <span className="formRightUpiText">UPI</span>
                            </label>
                          </div>
                          <div className="formRightFormControlName">
                            <label
                              for="cardHolderName"
                              className="formRightFormControlName"
                            >
                              Card Holder Name
                            </label>
                            <input
                              type="text"
                              className="formRightFormControlCardNumber"
                              id="cardHolderName"
                              placeholder="Serina Smith"
                            />
                          </div>
                          <div className="formRightFormControl">
                            <label
                              for="cardCode"
                              className="formRightFormControlName"
                            >
                              Card Number
                            </label>
                            <input
                              type="text"
                              className="formRightFormControlCardNumber"
                              id="cardCode"
                              placeholder="123 4567 8912 3456"
                            />
                          </div>
                          <div className="formRightExpireDate">
                            <div className="formRightExpireDateRight expireDateForm">
                              <label
                                style="margin-top: 5px;"
                                className="formRightFormControlName"
                              >
                                Expire Date
                              </label>
                              <select
                                className="formRightExpireDateMonth"
                                id="month"
                              >
                                <option value="0">Month</option>
                              </select>
                              <select
                                className="formRightExpireDateYear"
                                id="year"
                              >
                                <option value="0">Year</option>
                              </select>
                            </div>
                            <div className="formRightExpireDateLeft">
                              <label
                                for="cvc"
                                style="margin-top: 5px;"
                                className="formRightFormControlName"
                              >
                                CVC
                              </label>
                              <input
                                type="text"
                                className="formRightExpireDateLeftCvc"
                                id="cvc"
                                placeholder="111"
                                maxlength="3"
                              />
                            </div>
                          </div>
                          <div className="formRightFormControl">
                            <label className="formRightFormControlName">
                              By creating an account, you agree to Webstrot.com
                              Terms of Use and Privacy Policy.
                            </label>
                            <button
                              type="button"
                              className="btn btnPrimary formRightFormControlButton"
                            >
                              <span>Save Card</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
