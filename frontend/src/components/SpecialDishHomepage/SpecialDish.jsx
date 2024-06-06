import React from "react";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import img3 from "../../images/img3.png";
import img5 from "../../images/img5.png";
import img22 from "../../images/img22.png";
import mask1 from "../../images/mask1.png";
import timeIcon from "../../images/icon/time-icon.png";
const SpecialDish = () => {
  return (
    <section
      className="w-100 clearfix specialDishTiffin"
      id="specialDishTiffin"
    >
      <div className="container">
        <div className="specialDishTiffinInner">
          <div className="specialDishTiffinRow">
            <div className="specialDishTiffinCol">
              <span className="moreFaster">More Than Faster</span>
              <h1>
                Special Dish of <span>Lunch</span> with{" "}
                <span>Heathy Ingredient's</span>
              </h1>
              <p>
                Serving North-Indian, South-Indian and desi-Chinese cuisines,
                choose from Vegetarian and Non-Vegetarian meal options.
              </p>
              <div className="specialDishBtnGroup">
                <div className="specialDishGetStartedBtn">
                  <a href="" className="btn btnPrimary">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className="specialDishTiffinCol">
              <div className="specialTiffinBannerImg">
                <div className="specialDishTiffinImg">
                  <img src={img1} alt="img" className="img-fluid bgBannerImg" />
                  <img
                    src={img22}
                    alt="img"
                    className="img-fluid bgBannerInnerImg"
                  />
                  <img
                    src={img3}
                    alt="img"
                    className="img-fluid maskImg maskImg1 movingjs"
                    data-value="-2"
                  />
                  <img
                    src={img2}
                    alt="img"
                    className="img-fluid maskImg maskImg2 movingjs"
                    data-value="2"
                  />
                  <img
                    src={img5}
                    alt="img"
                    className="img-fluid maskImg maskImg3 movingjs"
                    data-value="-2"
                  ></img>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrowLine"
                  width="131"
                  height="134"
                  viewBox="0 0 131 134"
                  fill="none"
                >
                  <path
                    d="M18.8846 110.781C18.8846 110.781 32.4002 108.751 40.8169 106.425C50.7934 103.667 57.4586 103.488 65.65 97.1608C71.5968 92.5671 74.879 89.238 77.9924 82.3989C82.86 71.7064 83.1293 62.8581 77.9449 52.3157C72.8873 42.0313 66.1838 36.3376 54.9464 34.086C45.2707 32.1474 38.7666 34.3183 30.2065 39.2276C21.3434 44.3107 14.8302 48.8169 12.9022 58.8507C10.6802 70.4149 15.9606 79.4627 25.6269 86.188C32.0383 90.6487 58.2169 101.581 58.2169 101.581C58.2169 101.581 66.8022 103.056 81.5628 101.524C92.7889 100.358 100.193 98.5061 108.371 90.7276C119.832 79.8273 118.726 67.4812 119.08 51.6689C119.328 40.5692 118.357 34.0922 114.864 23.5536"
                    stroke="#5E0821"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                  />
                  <path
                    d="M107.683 21.3457L111.105 13.5811L118.87 17.0033"
                    stroke="#FFA31E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <img
                  src={mask1}
                  alt="mask"
                  className="img-fluid makTiff movingjs"
                  data-value="-4"
                />
                <img
                  src={timeIcon}
                  alt="time-icon"
                  className="img-fluid timeIcon movingjs"
                  data-value="4"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialDish;

// import React, { useState } from "react";
// import img1 from "../../images/img1.png";
// import img2 from "../../images/img2.png";
// import img3 from "../../images/img3.png";
// import img5 from "../../images/img5.png";
// import img22 from "../../images/img22.png";
// import mask1 from "../../images/mask1.png";
// import timeIcon from "../../images/icon/time-icon.png";

// const SpecialDish = () => {
//   const [defaultStyle, setTimeIconStyle] = useState({
//     transform: "translateX(0px) translateY(0px)",
//   });

//   const [invertedStyle, setMask1Style] = useState({
//     transform: "translateX(0px) translateY(0px)",
//   });

//   const handleMouseMove = (event) => {
//     const { clientX, clientY } = event;
//     const movementFactor = 0.5; // Adjust this factor to control the amount of movement
//     const normalTranslateX =
//       ((clientX / window.innerWidth) * 30 - 15) * movementFactor;
//     const normalTranslateY =
//       ((clientY / window.innerHeight) * 30 - 15) * movementFactor;
//     const invertedTranslateX = -normalTranslateX;
//     const invertedTranslateY = -normalTranslateY;

//     setTimeIconStyle({
//       transform: `translateX(${normalTranslateX}px) translateY(${normalTranslateY}px)`,
//     });

//     setMask1Style({
//       transform: `translateX(${invertedTranslateX}px) translateY(${invertedTranslateY}px)`,
//     });
//   };

//   return (
//     <section
//       className="w-100 clearfix specialDishTiffin"
//       id="specialDishTiffin"
//       onMouseMove={handleMouseMove}
//       style={{ paddingBottom: "120px" }}
//     >
//       <div className="container">
//         <div className="specialDishTiffinInner">
//           <div className="specialDishTiffinRow">
//             <div className="specialDishTiffinCol">
//               <span className="moreFaster">More Than Faster</span>
//               <h1>
//                 Special Dish of <span>Lunch</span> with{" "}
//                 <span>Healthy Ingredient's</span>
//               </h1>
//               <p>
//                 Serving North-Indian, South-Indian and desi-Chinese cuisines,
//                 choose from Vegetarian and Non-Vegetarian meal options.
//               </p>
//               <div className="specialDishBtnGroup">
//                 <div className="specialDishGetStartedBtn">
//                   <a href="" className="btn btnPrimary">
//                     Get Started
//                   </a>
//                 </div>
//                 <div className="specialDishWatchVideoBtn">
//                   <a
//                     href=""
//                     className="flVideo watchNow youtube-link"
//                     data-youtube-id="aZJUXa2zgcc"
//                   >
//                     <span className="playIcon">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="15"
//                         height="18"
//                         viewBox="0 0 15 18"
//                         fill="none"
//                       >
//                         <path
//                           d="M1 1V17L14 9L1 1Z"
//                           stroke="#FFA31E"
//                           strokeWidth="1.5"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </span>
//                     <span>Watch video</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="specialDishTiffinCol">
//               <div className="specialTiffinBannerImg">
//                 <div className="specialDishTiffinImg">
//                   <img src={img1} alt="img" className="img-fluid bgBannerImg" />
//                   <img
//                     src={img22}
//                     alt="img"
//                     className="img-fluid bgBannerInnerImg"
//                   />
//                   <img
//                     src={img3}
//                     alt="img"
//                     className="img-fluid maskImg maskImg1 movingjs"
//                     data-value="-2"
//                     style={invertedStyle}
//                   />
//                   <img
//                     src={img2}
//                     alt="img"
//                     className="img-fluid maskImg maskImg2 movingjs"
//                     data-value="2"
//                     style={defaultStyle}
//                   />
//                   <img
//                     src={img5}
//                     alt="img"
//                     className="img-fluid maskImg maskImg3 movingjs"
//                     data-value="-2"
//                     style={invertedStyle}
//                   />
//                 </div>

//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="arrowLine"
//                   width="131"
//                   height="134"
//                   viewBox="0 0 131 134"
//                   fill="none"
//                 >
//                   <path
//                     d="M18.8846 110.781C18.8846 110.781 32.4002 108.751 40.8169 106.425C50.7934 103.667 57.4586 103.488 65.65 97.1608C71.5968 92.5671 74.879 89.238 77.9924 82.3989C82.86 71.7064 83.1293 62.8581 77.9449 52.3157C72.8873 42.0313 66.1838 36.3376 54.9464 34.086C45.2707 32.1474 38.7666 34.3183 30.2065 39.2276C21.3434 44.3107 14.8302 48.8169 12.9022 58.8507C10.6802 70.4149 15.9606 79.4627 25.6269 86.188C32.0383 90.6487 58.2169 101.581 58.2169 101.581C58.2169 101.581 66.8022 103.056 81.5628 101.524C92.7889 100.358 100.193 98.5061 108.371 90.7276C119.832 79.8273 118.726 67.4812 119.08 51.6689C119.328 40.5692 118.357 34.0922 114.864 23.5536"
//                     stroke="#5E0821"
//                     strokeWidth="2"
//                     strokeDasharray="8 8"
//                   />
//                   <path
//                     d="M107.683 21.3457L111.105 13.5811L118.87 17.0033"
//                     stroke="#FFA31E"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>

//                 <img
//                   src={mask1}
//                   alt="mask"
//                   className="img-fluid makTiff movingjs"
//                   data-value="-4"
//                   style={invertedStyle}
//                 />
//                 <img
//                   src={timeIcon}
//                   alt="time-icon"
//                   className="img-fluid timeIcon movingjs"
//                   data-value="4"
//                   style={defaultStyle}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SpecialDish;
