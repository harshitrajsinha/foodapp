import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import img42 from "../images/img42.png";
import img24 from "../images/img24.png";
import img23 from "../images/img23.png";
import RelatedMeals from "../components/RelatedMeals/RelatedMeals";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const ThaliContentPage = () => {
  const [thaliCategory, setThaliCategory] = useState();
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThaliCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/v1/thali-content/${name}`
        );
        setThaliCategory(response.data.data || null);
        setMealPlans(response.data.mealPlan || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchThaliCategory();

    // Display the pincode verification modal automatically after 3 seconds
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [name]);

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);

    // If no date is selected, set the start date to the next day's date
    const startDate = selectedDate || getNextDayDate();

    // Save the selected meal plan details to localStorage
    localStorage.setItem("selectedMealPlanPrice", meal.price);
    localStorage.setItem("selectedMealPlanName", meal.name);
    localStorage.setItem("selectedMealPlanDays", meal.days);
    localStorage.setItem("startDate", format(startDate, "yyyy-MM-dd"));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getMinDate = () => {
    const today = new Date();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    if (currentHour > 20 || (currentHour === 20 && currentMinute > 59)) {
      // If the time is after 8:59 PM, the minimum date is tomorrow
      today.setDate(today.getDate() + 1);
    }

    return today;
  };

  const getNextDayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today;
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handlePincodeVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/pincodeVerify",
        { pincode: pincode }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        // Store pincode in localStorage if verification is successful
        localStorage.setItem("pincode", response.data.pincode);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error verifying pincode");
      }
    }
  };

  const constructURL = () => {
    const base = `/thali-details/${encodeURIComponent(thaliCategory[0].name)}/${
      selectedMeal.days
    }`;
    const param = selectedDate
      ? `/${encodeURIComponent(format(selectedDate, "yyyy-MM-dd"))}`
      : "";
    return base + param;
  };

  return (
    <div className="thali-content-page">
      <section className="w-100 clearfix innerPageBanner" id="innerPageBanner">
        <div className="container">
          <div className="innerPageBannerInner">
            <div className="innerPageBannerImgLeft">
              <img src={img24} alt="banner-img" className="img-fluid" />
            </div>
            <div className="innerPageBannerContent">
              <h1>
                Meal <span>Single</span>
              </h1>
            </div>
            <div className="innerPageBannerImgRight">
              <img src={img23} alt="banner-img" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      {thaliCategory && (
        <section className="w-100 clearfix thaliDetail" id="thaliDetail">
          <div className="container">
            <div className="thaliDetailInner">
              <div className="thaliDetailRow">
                <div className="thaliDetailCol">
                  <div className="thaliDetailImg">
                    <div className="thaliDetailImgInner">
                      <img
                        src={img42}
                        alt={thaliCategory[0].name}
                        className="img-fluid thaliImg"
                      />
                    </div>
                  </div>
                </div>
                <div className="howItWorkCol">
                  <div className="howItWorkContent">
                    <div className="commonHeading headingLeft">
                      {(() => {
                        const [firstName, ...lastName] =
                          thaliCategory[0].name.split(" ");
                        return (
                          <h4>
                            {firstName} <span>{lastName.join(" ")}</span>
                          </h4>
                        );
                      })()}
                      <p>{thaliCategory[0].description}</p>
                    </div>
                    <div className="thaliList">
                      <ul className="list-group list-group-horizontal">
                        {thaliCategory[0].items.map((item, index) => (
                          <li key={index} className="list-group-item">
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {thaliCategory[0].substituteItems.length > 0 && (
                      <div>
                        <div className="commonHeading spacious-heading">
                          <h5 className="sub-heading">Substitute Items</h5>
                        </div>
                        <div className="thaliList">
                          <ul className="list-group list-group-horizontal">
                            {thaliCategory[0].substituteItems.map(
                              (item, index) => (
                                <li key={index} className="list-group-item">
                                  {item.name}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                    {thaliCategory[0].addOnItems.length > 0 && (
                      <div>
                        <div className="commonHeading spacious-heading">
                          <h5 className="sub-heading">Add On Items</h5>
                        </div>
                        <div className="thaliList">
                          <ul className="list-group list-group-horizontal">
                            {thaliCategory[0].addOnItems.map((item, index) => (
                              <li key={index} className="list-group-item">
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    <div className="thaliDetailGroup">
                      <div className="custom-date-container">
                        <div className="commonHeading">
                          <h5 className="sub-heading">Select a Start Date:</h5>
                        </div>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          className={`custom-calendar ${
                            !selectedDate ? "placeholder-visible" : ""
                          }`}
                          minDate={getMinDate()}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select a date to order"
                        />
                      </div>
                      <div className="pincode-verification-container">
                        {/* Remove the button as the modal will display automatically */}
                      </div>
                      <div className="specialDishBtnGroup">
                        <div className="specialDishGetStartedBtn"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {mealPlans.length > 0 && (
        <section className="w-100 clearfix ourMealPlan" id="ourMealPlan">
          <div className="container">
            <div className="ourMealPlanInner">
              <div className="ourMealPlanRow">
                <div className="ourMealPlanCol">
                  <div className="commonHeading headingLeft">
                    <h4>
                      Our <span>Meal</span> Plans
                    </h4>
                    <p className="mb-0">
                      Preparations to temperature controlled packaging and
                      transportation of food.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-pane container active" id="veg">
                  <div className="ourMealContent">
                    <div className="row">
                      {mealPlans.map((mealPlan) => (
                        <div className="col-md-6 col-xl-3" key={mealPlan.name}>
                          <div className="ourMealCard fadedBackground">
                            <div className="ourMealContent">
                              <div className="ourMealHead">
                                <div className="ourMealTitle">
                                  <h2>
                                    <a href="meal-single.html">
                                      {mealPlan.name}
                                    </a>
                                  </h2>
                                </div>
                                <div className="ourMealPrice">
                                  <span>${mealPlan.price}</span>
                                </div>
                              </div>
                              <div className="ourMealBtn">
                                <button
                                  onClick={() => handleMealSelect(mealPlan)}
                                  className="btn btnPrimary"
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {selectedMeal && (
                <div className="nextPageBtn">
                  <Link
                    to={constructURL()}
                    className="btn btnPrimary spacious-heading"
                    onClick={() => console.log(constructURL())}
                  >
                    Next Page
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <RelatedMeals />

      {/* Pincode Verification Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Verify Pincode</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePincodeVerification}>
                <div className="mb-3">
                  <label htmlFor="pincode" className="form-label">
                    Enter Pincode:
                  </label>
                  <input
                    type="text"
                    className="form-control small-input"
                    id="pincode"
                    autoFocus
                    value={pincode}
                    onChange={handlePincodeChange}
                  />
                </div>
                <button type="submit" className="btn btnPrimary">
                  Verify
                </button>
              </form>
              {message && <p>{message}</p>}
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThaliContentPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import img42 from "../images/img42.png";
// import img24 from "../images/img24.png";
// import img23 from "../images/img23.png";
// import RelatedMeals from "../components/RelatedMeals/RelatedMeals";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";

// const ThaliContentPage = () => {
//   const [thaliCategory, setThaliCategory] = useState();
//   const [mealPlans, setMealPlans] = useState([]);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");
//   const { name } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchThaliCategory = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:80/api/v1/thali-content/${name}`
//         );
//         setThaliCategory(response.data.data || null);
//         setMealPlans(response.data.mealPlan || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchThaliCategory();
//   }, [name]);

//   const handleMealSelect = (meal) => {
//     setSelectedMeal(meal);

//     // If no date is selected, set the start date to the next day's date
//     const startDate = selectedDate || getNextDayDate();

//     // Save the selected meal plan details to localStorage
//     localStorage.setItem("selectedMealPlanPrice", meal.price);
//     localStorage.setItem("selectedMealPlanName", meal.name);
//     localStorage.setItem("selectedMealPlanDays", meal.days);
//     localStorage.setItem("startDate", format(startDate, "yyyy-MM-dd"));
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const getMinDate = () => {
//     const today = new Date();
//     const currentHour = today.getHours();
//     const currentMinute = today.getMinutes();

//     if (currentHour > 20 || (currentHour === 20 && currentMinute > 59)) {
//       // If the time is after 8:59 PM, the minimum date is tomorrow
//       today.setDate(today.getDate() + 1);
//     }

//     return today;
//   };

//   const getNextDayDate = () => {
//     const today = new Date();
//     today.setDate(today.getDate() + 1);
//     return today;
//   };

//   const handlePincodeChange = (e) => {
//     setPincode(e.target.value);
//   };

//   const handlePincodeVerification = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:80/api/v1/pincodeVerify",
//         { pincode: pincode }
//       );

//       if (response.data.success) {
//         setMessage(response.data.message);
//         // Store pincode in localStorage if verification is successful
//         localStorage.setItem("pincode", response.data.pincode);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage("Error verifying pincode");
//       }
//     }
//   };

//   const constructURL = () => {
//     const base = `/thali-details/${encodeURIComponent(thaliCategory[0].name)}/${
//       selectedMeal.days
//     }`;
//     const param = selectedDate
//       ? `/${encodeURIComponent(format(selectedDate, "yyyy-MM-dd"))}`
//       : "";
//     return base + param;
//   };

//   return (
//     <div className="thali-content-page">
//       <section className="w-100 clearfix innerPageBanner" id="innerPageBanner">
//         <div className="container">
//           <div className="innerPageBannerInner">
//             <div className="innerPageBannerImgLeft">
//               <img src={img24} alt="banner-img" className="img-fluid" />
//             </div>
//             <div className="innerPageBannerContent">
//               <h1>
//                 Meal <span>Single</span>
//               </h1>
//             </div>
//             <div className="innerPageBannerImgRight">
//               <img src={img23} alt="banner-img" className="img-fluid" />
//             </div>
//           </div>
//         </div>
//       </section>
//       {thaliCategory && (
//         <section className="w-100 clearfix thaliDetail" id="thaliDetail">
//           <div className="container">
//             <div className="thaliDetailInner">
//               <div className="thaliDetailRow">
//                 <div className="thaliDetailCol">
//                   <div className="thaliDetailImg">
//                     <div className="thaliDetailImgInner">
//                       <img
//                         src={img42}
//                         alt={thaliCategory[0].name}
//                         className="img-fluid thaliImg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="howItWorkCol">
//                   <div className="howItWorkContent">
//                     <div className="commonHeading headingLeft">
//                       {(() => {
//                         const [firstName, ...lastName] =
//                           thaliCategory[0].name.split(" ");
//                         return (
//                           <h4>
//                             {firstName} <span>{lastName.join(" ")}</span>
//                           </h4>
//                         );
//                       })()}
//                       <p>{thaliCategory[0].description}</p>
//                     </div>
//                     <div className="thaliList">
//                       <ul className="list-group list-group-horizontal">
//                         {thaliCategory[0].items.map((item, index) => (
//                           <li key={index} className="list-group-item">
//                             {item.name}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     {thaliCategory[0].substituteItems.length > 0 && (
//                       <div>
//                         <div className="commonHeading spacious-heading">
//                           <h5 className="sub-heading">Substitute Items</h5>
//                         </div>
//                         <div className="thaliList">
//                           <ul className="list-group list-group-horizontal">
//                             {thaliCategory[0].substituteItems.map(
//                               (item, index) => (
//                                 <li key={index} className="list-group-item">
//                                   {item.name}
//                                 </li>
//                               )
//                             )}
//                           </ul>
//                         </div>
//                       </div>
//                     )}
//                     {thaliCategory[0].addOnItems.length > 0 && (
//                       <div>
//                         <div className="commonHeading spacious-heading">
//                           <h5 className="sub-heading">Add On Items</h5>
//                         </div>
//                         <div className="thaliList">
//                           <ul className="list-group list-group-horizontal">
//                             {thaliCategory[0].addOnItems.map((item, index) => (
//                               <li key={index} className="list-group-item">
//                                 {item.name}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     )}
//                     <div className="thaliDetailGroup">
//                       <div className="custom-date-container">
//                         <div className="commonHeading">
//                           <h5 className="sub-heading">Select a Start Date:</h5>
//                         </div>
//                         <DatePicker
//                           selected={selectedDate}
//                           onChange={handleDateChange}
//                           className={`custom-calendar ${
//                             !selectedDate ? "placeholder-visible" : ""
//                           }`}
//                           minDate={getMinDate()}
//                           dateFormat="yyyy-MM-dd"
//                           placeholderText="Select a date to order"
//                         />
//                       </div>
//                       <div className="pincode-verification-container">
//                         <div className="commonHeading">
//                           <h5 className="sub-heading">Check Delivery:</h5>
//                         </div>
//                         <form onSubmit={handlePincodeVerification}>
//                           <input
//                             type="text"
//                             placeholder="Enter pincode"
//                             value={pincode}
//                             onChange={handlePincodeChange}
//                           />
//                           <button type="submit" className="btn btnPrimary">
//                             Verify Pincode
//                           </button>
//                         </form>
//                         {message && <p>{message}</p>}
//                       </div>
//                       <div className="specialDishBtnGroup">
//                         <div className="specialDishGetStartedBtn"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
// {mealPlans.length > 0 && (
//   <section className="w-100 clearfix ourMealPlan" id="ourMealPlan">
//     <div className="container">
//       <div className="ourMealPlanInner">
//         <div className="ourMealPlanRow">
//           <div className="ourMealPlanCol">
//             <div className="commonHeading headingLeft">
//               <h4>
//                 Our <span>Meal</span> Plans
//               </h4>
//               <p className="mb-0">
//                 Preparations to temperature controlled packaging and
//                 transportation of food.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="tab-content">
//           <div className="tab-pane container active" id="veg">
//             <div className="ourMealContent">
//               <div className="row">
//                 {mealPlans.map((mealPlan) => (
//                   <div className="col-md-6 col-xl-3" key={mealPlan.name}>
//                     <div className="ourMealCard fadedBackground">
//                       <div className="ourMealContent">
//                         <div className="ourMealHead">
//                           <div className="ourMealTitle">
//                             <h2>
//                               <a href="meal-single.html">
//                                 {mealPlan.name}
//                               </a>
//                             </h2>
//                           </div>
//                           <div className="ourMealPrice">
//                             <span>${mealPlan.price}</span>
//                           </div>
//                         </div>
//                         <div className="ourMealBtn">
//                           <button
//                             onClick={() => handleMealSelect(mealPlan)}
//                             className="btn btnPrimary"
//                           >
//                             Select
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         {selectedMeal && (
//           <div className="nextPageBtn">
//             <Link
//               to={constructURL()}
//               className="btn btnPrimary spacious-heading"
//               onClick={() => console.log(constructURL())}
//             >
//               Next Page
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   </section>
// )}

//       <RelatedMeals />
//     </div>
//   );
// };

// export default ThaliContentPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import img42 from "../images/img42.png";
// import img24 from "../images/img24.png";
// import img23 from "../images/img23.png";
// import RelatedMeals from "../components/RelatedMeals/RelatedMeals";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";

// const ThaliContentPage = () => {
//   const [thaliCategory, setThaliCategory] = useState();
//   const [mealPlans, setMealPlans] = useState([]);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");
//   const { name } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchThaliCategory = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:80/api/v1/thali-content/${name}`
//         );
//         setThaliCategory(response.data.data || null);
//         setMealPlans(response.data.mealPlan || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchThaliCategory();
//   }, [name]);

//   const handleMealSelect = (meal) => {
//     setSelectedMeal(meal);

//     // If no date is selected, set the start date to the next day's date
//     const startDate = selectedDate || getNextDayDate();

//     // Save the selected meal plan details to localStorage
//     localStorage.setItem("selectedMealPlanPrice", meal.price);
//     localStorage.setItem("selectedMealPlanName", meal.name);
//     localStorage.setItem("selectedMealPlanDays", meal.days);
//     localStorage.setItem("startDate", format(startDate, "yyyy-MM-dd"));
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const getMinDate = () => {
//     const today = new Date();
//     const currentHour = today.getHours();
//     const currentMinute = today.getMinutes();

//     if (currentHour > 20 || (currentHour === 20 && currentMinute > 59)) {
//       // If the time is after 8:59 PM, the minimum date is tomorrow
//       today.setDate(today.getDate() + 1);
//     }

//     return today;
//   };

//   const getNextDayDate = () => {
//     const today = new Date();
//     today.setDate(today.getDate() + 1);
//     return today;
//   };

//   const handlePincodeChange = (e) => {
//     setPincode(e.target.value);
//   };

//   const handlePincodeVerification = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:80/api/v1/pincodeVerify",
//         { pincode: pincode }
//       );

//       if (response.data.success) {
//         setMessage(response.data.message);
//         // Store pincode in localStorage if verification is successful
//         localStorage.setItem("pincode", response.data.pincode);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage("Error verifying pincode");
//       }
//     }
//   };

//   const constructURL = () => {
//     const base = `/thali-details/${encodeURIComponent(thaliCategory[0].name)}/${
//       selectedMeal.days
//     }`;
//     const param = selectedDate
//       ? `/${encodeURIComponent(format(selectedDate, "yyyy-MM-dd"))}`
//       : "";
//     return base + param;
//   };

//   return (
//     <div className="thali-content-page">
//       <section className="w-100 clearfix innerPageBanner" id="innerPageBanner">
//         <div className="container">
//           <div className="innerPageBannerInner">
//             <div className="innerPageBannerImgLeft">
//               <img src={img24} alt="banner-img" className="img-fluid" />
//             </div>
//             <div className="innerPageBannerContent">
//               <h1>
//                 Meal <span>Single</span>
//               </h1>
//             </div>
//             <div className="innerPageBannerImgRight">
//               <img src={img23} alt="banner-img" className="img-fluid" />
//             </div>
//           </div>
//         </div>
//       </section>
//       {thaliCategory && (
//         <section className="w-100 clearfix thaliDetail" id="thaliDetail">
//           <div className="container">
//             <div className="thaliDetailInner">
//               <div className="thaliDetailRow">
//                 <div className="thaliDetailCol">
//                   <div className="thaliDetailImg">
//                     <div className="thaliDetailImgInner">
//                       <img
//                         src={img42}
//                         alt={thaliCategory[0].name}
//                         className="img-fluid thaliImg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="howItWorkCol">
//                   <div className="howItWorkContent">
//                     <div className="commonHeading headingLeft">
//                       {(() => {
//                         const [firstName, ...lastName] =
//                           thaliCategory[0].name.split(" ");
//                         return (
//                           <h4>
//                             {firstName} <span>{lastName.join(" ")}</span>
//                           </h4>
//                         );
//                       })()}
//                       <p>{thaliCategory[0].description}</p>
//                     </div>
//                     <div className="thaliList">
//                       <ul className="list-group list-group-horizontal">
//                         {thaliCategory[0].items.map((item, index) => (
//                           <li key={index} className="list-group-item">
//                             {item.name}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     {thaliCategory[0].substituteItems.length > 0 && (
//                       <div>
//                         <div className="commonHeading spacious-heading">
//                           <h5 className="sub-heading">Substitute Items</h5>
//                         </div>
//                         <div className="thaliList">
//                           <ul className="list-group list-group-horizontal">
//                             {thaliCategory[0].substituteItems.map(
//                               (item, index) => (
//                                 <li key={index} className="list-group-item">
//                                   {item.name}
//                                 </li>
//                               )
//                             )}
//                           </ul>
//                         </div>
//                       </div>
//                     )}
//                     {thaliCategory[0].addOnItems.length > 0 && (
//                       <div>
//                         <div className="commonHeading spacious-heading">
//                           <h5 className="sub-heading">Add On Items</h5>
//                         </div>
//                         <div className="thaliList">
//                           <ul className="list-group list-group-horizontal">
//                             {thaliCategory[0].addOnItems.map((item, index) => (
//                               <li key={index} className="list-group-item">
//                                 {item.name}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     )}
//                     <div className="thaliDetailGroup">
//                       <div className="custom-date-container">
//                         <div className="commonHeading">
//                           <h5 className="sub-heading">Select a Start Date:</h5>
//                         </div>
//                         <DatePicker
//                           selected={selectedDate}
//                           onChange={handleDateChange}
//                           className={`custom-calendar ${
//                             !selectedDate ? "placeholder-visible" : ""
//                           }`}
//                           minDate={getMinDate()}
//                           dateFormat="yyyy-MM-dd"
//                           placeholderText="Select a date to order"
//                         />
//                       </div>
//                       <div className="pincode-verification-container">
//                         <div className="commonHeading">
//                           <h5 className="sub-heading ">Check Delivery:</h5>
//                         </div>
//                         <form onSubmit={handlePincodeVerification}>
//                           <input
//                             type="text"
//                             placeholder="Enter pincode"
//                             value={pincode}
//                             onChange={handlePincodeChange}
//                           />
//                           <button type="submit">Verify Pincode</button>
//                         </form>
//                         {message && <p>{message}</p>}
//                       </div>
//                       <div className="specialDishBtnGroup">
//                         <div className="specialDishGetStartedBtn"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//       {mealPlans.length > 0 && (
//         <section className="w-100 clearfix ourMealPlan" id="ourMealPlan">
//           <div className="container">
//             <div className="ourMealPlanInner">
//               <div className="ourMealPlanRow">
//                 <div className="ourMealPlanCol">
//                   <div className="commonHeading headingLeft">
//                     <h4>
//                       Our <span>Meal</span> Plans
//                     </h4>
//                     <p className="mb-0">
//                       Preparations to temperature controlled packaging and
//                       transportation of food.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="tab-content">
//                 <div className="tab-pane container active" id="veg">
//                   <div className="ourMealContent">
//                     <div className="row">
//                       {mealPlans.map((mealPlan) => (
//                         <div className="col-md-6 col-xl-3" key={mealPlan.name}>
//                           <div className="ourMealCard fadedBackground">
//                             <div className="ourMealContent">
//                               <div className="ourMealHead">
//                                 <div className="ourMealTitle">
//                                   <h2>
//                                     <a href="meal-single.html">
//                                       {mealPlan.name}
//                                     </a>
//                                   </h2>
//                                 </div>
//                                 <div className="ourMealPrice">
//                                   <span>${mealPlan.price}</span>
//                                 </div>
//                               </div>
//                               <div className="ourMealBtn">
//                                 <button
//                                   onClick={() => handleMealSelect(mealPlan)}
//                                   className="btn btnPrimary"
//                                 >
//                                   Select
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {selectedMeal && (
//                 <div className="nextPageBtn">
//                   <Link
//                     to={constructURL()}
//                     className="btn btnPrimary spacious-heading"
//                     onClick={() => console.log(constructURL())}
//                   >
//                     Next Page
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       <RelatedMeals />
//     </div>
//   );
// };

// export default ThaliContentPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import img42 from "../images/img42.png";
// import img24 from "../images/img24.png";
// import img23 from "../images/img23.png";
// import RelatedMeals from "../components/RelatedMeals/RelatedMeals";

// const ThaliContentPage = () => {
//   const [thaliCategory, setThaliCategory] = useState();
//   const [mealPlans, setMealPlans] = useState([]);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");
//   const { name } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchThaliCategory = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:80/api/v1/thali-content/${name}`
//         );
//         setThaliCategory(response.data.data || null);
//         setMealPlans(response.data.mealPlan || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchThaliCategory();
//   }, [name]);

//   const handleMealSelect = (meal) => {
//     setSelectedMeal(meal);

//     // If no date is selected, set the start date to the next day's date
//     const startDate = selectedDate || getNextDayDate();

//     // Save the selected meal plan details to localStorage
//     localStorage.setItem("selectedMealPlanPrice", meal.price);
//     localStorage.setItem("selectedMealPlanName", meal.name);
//     localStorage.setItem("selectedMealPlanDays", meal.days);
//     localStorage.setItem("startDate", startDate);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const getMinDate = () => {
//     const today = new Date();
//     const currentHour = today.getHours();
//     const currentMinute = today.getMinutes();

//     if (currentHour > 20 || (currentHour === 20 && currentMinute > 59)) {
//       // If the time is after 8:59 PM, the minimum date is tomorrow
//       today.setDate(today.getDate() + 1);
//     }

//     return today.toISOString().split("T")[0];
//   };

//   const getNextDayDate = () => {
//     const today = new Date();
//     today.setDate(today.getDate() + 1);
//     return today.toISOString().split("T")[0];
//   };

//   const handlePincodeChange = (e) => {
//     setPincode(e.target.value);
//   };

//   const handlePincodeVerification = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:80/api/v1/pincodeVerify",
//         { pincode: pincode }
//       );

//       if (response.data.success) {
//         setMessage(response.data.message);
//         // Store pincode in localStorage if verification is successful
//         localStorage.setItem("pincode", response.data.pincode);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage("Error verifying pincode");
//       }
//     }
//   };

//   const constructURL = () => {
//     const base = `/thali-details/${encodeURIComponent(thaliCategory[0].name)}/${
//       selectedMeal.days
//     }`;
//     const param = selectedDate ? `/${encodeURIComponent(selectedDate)}` : "";
//     return base + param;
//   };

//   return (
//     <div className="thali-content-page">
//       <section className="w-100 clearfix innerPageBanner" id="innerPageBanner">
//         <div className="container">
//           <div className="innerPageBannerInner">
//             <div className="innerPageBannerImgLeft">
//               <img src={img24} alt="banner-img" className="img-fluid" />
//             </div>
//             <div className="innerPageBannerContent">
//               <h1>
//                 Meal <span>Single</span>
//               </h1>
//             </div>
//             <div className="innerPageBannerImgRight">
//               <img src={img23} alt="banner-img" className="img-fluid" />
//             </div>
//           </div>
//         </div>
//       </section>
//       {thaliCategory && (
//         <section className="w-100 clearfix thaliDetail" id="thaliDetail">
//           <div className="container">
//             <div className="thaliDetailInner">
//               <div className="thaliDetailRow">
//                 <div className="thaliDetailCol">
//                   <div className="thaliDetailImg">
//                     <div className="thaliDetailImgInner">
//                       <img
//                         src={img42}
//                         alt={thaliCategory[0].name}
//                         className="img-fluid thaliImg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="howItWorkCol">
//                   <div className="howItWorkContent">
//                     <div className="commonHeading headingLeft">
//                       {(() => {
//                         const [firstName, ...lastName] =
//                           thaliCategory[0].name.split(" ");
//                         return (
//                           <h4>
//                             {firstName} <span>{lastName.join(" ")}</span>
//                           </h4>
//                         );
//                       })()}
//                       <p>{thaliCategory[0].description}</p>
//                     </div>
//                     <div className="thaliList">
//                       <ul className="list-group list-group-horizontal">
//                         {thaliCategory[0].items.map((item, index) => (
//                           <li key={index} className="list-group-item">
//                             {item.name}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     {thaliCategory[0].substituteItems.length > 0 && (
//                       <div>
//                         <div className="commonHeading spacious-heading">
//                           <h5 className="sub-heading">Substitute Items</h5>
//                         </div>
//                         <div className="thaliList">
//                           <ul className="list-group list-group-horizontal">
//                             {thaliCategory[0].substituteItems.map(
//                               (item, index) => (
//                                 <li key={index} className="list-group-item">
//                                   {item.name}
//                                 </li>
//                               )
//                             )}
//                           </ul>
//                         </div>
//                       </div>
//                     )}
//                     {thaliCategory[0].addOnItems.length > 0 && (
//                       <div>
//                         <div className="commonHeading spacious-heading">
//                           <h5 className="sub-heading">Add On Items</h5>
//                         </div>
//                         <div className="thaliList">
//                           <ul className="list-group list-group-horizontal">
//                             {thaliCategory[0].addOnItems.map((item, index) => (
//                               <li key={index} className="list-group-item">
//                                 {item.name}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     )}
//                     <div className="thaliDetailGroup">
//                       <div className="custom-date-container">
//                         <div className="commonHeading">
//                           <h5 className="sub-heading">Select a Start Date:</h5>
//                         </div>
//                         <input
//                           type="date"
//                           value={selectedDate}
//                           onChange={handleDateChange}
//                           className={`custom-calendar ${
//                             !selectedDate ? "placeholder-visible" : ""
//                           }`}
//                           min={getMinDate()}
//                         />
//                         {!selectedDate && (
//                           <div className="custom-placeholder">
//                             Select a date to order
//                           </div>
//                         )}
//                       </div>
//                       <div className="pincode-verification-container">
//                         <div className="commonHeading">
//                           <h5 className="sub-heading ">Check Delivery:</h5>
//                         </div>
//                         <form onSubmit={handlePincodeVerification}>
//                           <input
//                             type="text"
//                             placeholder="Enter pincode"
//                             value={pincode}
//                             onChange={handlePincodeChange}
//                           />
//                           <button type="submit">Verify Pincode</button>
//                         </form>
//                         {message && <p>{message}</p>}
//                       </div>
//                       <div className="specialDishBtnGroup">
//                         <div className="specialDishGetStartedBtn"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
// {mealPlans.length > 0 && (
//   <section className="w-100 clearfix ourMealPlan" id="ourMealPlan">
//     <div className="container">
//       <div className="ourMealPlanInner">
//         <div className="ourMealPlanRow">
//           <div className="ourMealPlanCol">
//             <div className="commonHeading headingLeft">
//               <h4>
//                 Our <span>Meal</span> Plans
//               </h4>
//               <p className="mb-0">
//                 Preparations to temperature controlled packaging and
//                 transportation of food.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="tab-content">
//           <div className="tab-pane container active" id="veg">
//             <div className="ourMealContent">
//               <div className="row">
//                 {mealPlans.map((mealPlan) => (
//                   <div className="col-md-6 col-xl-3" key={mealPlan.name}>
//                     <div className="ourMealCard fadedBackground">
//                       <div className="ourMealContent">
//                         <div className="ourMealHead">
//                           <div className="ourMealTitle">
//                             <h2>
//                               <a href="meal-single.html">
//                                 {mealPlan.name}
//                               </a>
//                             </h2>
//                           </div>
//                           <div className="ourMealPrice">
//                             <span>${mealPlan.price}</span>
//                           </div>
//                         </div>
//                         <div className="ourMealBtn">
//                           <button
//                             onClick={() => handleMealSelect(mealPlan)}
//                             className="btn btnPrimary"
//                           >
//                             Select
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         {selectedMeal && (
//           <div className="nextPageBtn">
//             <Link
//               to={constructURL()}
//               className="btn btnPrimary spacious-heading"
//               onClick={() => console.log(constructURL())}
//             >
//               Next Page
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   </section>
// )}
//       <RelatedMeals />
//     </div>
//   );
// };

// export default ThaliContentPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import img42 from "../images/img42.png";
// import img24 from "../images/img24.png";
// import img23 from "../images/img23.png";
// import RelatedMeals from "../components/RelatedMeals/RelatedMeals";

// const ThaliContentPage = () => {
//   const [thaliCategory, setThaliCategory] = useState();
//   const [mealPlans, setMealPlans] = useState([]);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");
//   const { name } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchThaliCategory = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:80/api/v1/thali-content/${name}`
//         );
//         setThaliCategory(response.data.data || null);
//         setMealPlans(response.data.mealPlan || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchThaliCategory();
//   }, [name]);

//   const handleMealSelect = (meal) => {
//     setSelectedMeal(meal);

//     // Save the selected meal plan details to localStorage
//     localStorage.setItem("selectedMealPlanPrice", meal.price);
//     localStorage.setItem("selectedMealPlanName", meal.name);
//     localStorage.setItem("selectedMealPlanDays", meal.days);
//     localStorage.setItem("startDate", selectedDate);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const getMinDate = () => {
//     const today = new Date();
//     const currentHour = today.getHours();
//     const currentMinute = today.getMinutes();

//     if (currentHour > 20 || (currentHour === 20 && currentMinute > 59)) {
//       // If the time is after 8:59 PM, the minimum date is tomorrow
//       today.setDate(today.getDate() + 1);
//     }

//     return today.toISOString().split("T")[0];
//   };

//   const handlePincodeChange = (e) => {
//     setPincode(e.target.value);
//   };

//   const handlePincodeVerification = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:80/api/v1/pincodeVerify",
//         { pincode: pincode }
//       );

//       if (response.data.success) {
//         setMessage(response.data.message);
//         // Store pincode in localStorage if verification is successful
//         localStorage.setItem("pincode", response.data.pincode);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage("Error verifying pincode");
//       }
//     }
//   };

//   const constructURL = () => {
//     const base = `/thali-details/${encodeURIComponent(thaliCategory[0].name)}/${
//       selectedMeal.days
//     }`;
//     const param = selectedDate ? `/${encodeURIComponent(selectedDate)}` : "";
//     return base + param;
//   };

//   return (
//     <div className="thali-content-page">
//       <section className="w-100 clearfix innerPageBanner" id="innerPageBanner">
//         <div className="container">
//           <div className="innerPageBannerInner">
//             <div className="innerPageBannerImgLeft">
//               <img src={img24} alt="banner-img" className="img-fluid" />
//             </div>
//             <div className="innerPageBannerContent">
//               <h1>
//                 Meal <span>Single</span>
//               </h1>
//             </div>
//             <div className="innerPageBannerImgRight">
//               <img src={img23} alt="banner-img" className="img-fluid" />
//             </div>
//           </div>
//         </div>
//       </section>
//       {thaliCategory && (
//         <section className="w-100 clearfix thaliDetail" id="thaliDetail">
//           <div className="container">
//             <div className="thaliDetailInner">
//               <div className="thaliDetailRow">
//                 <div className="thaliDetailCol">
//                   <div className="thaliDetailImg">
//                     <div className="thaliDetailImgInner">
//                       <img
//                         src={img42}
//                         alt={thaliCategory[0].name}
//                         className="img-fluid thaliImg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="howItWorkCol">
//                   <div className="howItWorkContent">
//                     <div className="commonHeading headingLeft">
//                       {(() => {
//                         const [firstName, ...lastName] =
//                           thaliCategory[0].name.split(" ");
//                         return (
//                           <h4>
//                             {firstName} <span>{lastName.join(" ")}</span>
//                           </h4>
//                         );
//                       })()}
//                       <p>{thaliCategory[0].description}</p>
//                     </div>
//                     <div className="thaliList">
//                       <ul className="list-group list-group-horizontal">
//                         {thaliCategory[0].items.map((item, index) => (
//                           <li key={index} className="list-group-item">
//                             {item.name}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     {thaliCategory[0].substituteItems.length > 0 && (
//                       <div>
//                         <div className="commonHeading spacious-heading">
//                           <h5 className="sub-heading">Substitute Items</h5>
//                         </div>
//                         <div className="thaliList">
//                           <ul className="list-group list-group-horizontal">
//                             {thaliCategory[0].substituteItems.map(
//                               (item, index) => (
//                                 <li key={index} className="list-group-item">
//                                   {item.name}
//                                 </li>
//                               )
//                             )}
//                           </ul>
//                         </div>
//                       </div>
//                     )}
//                     {thaliCategory[0].addOnItems.length > 0 && (
//                       <div>
//                         <div className="commonHeading spacious-heading">
//                           <h5 className="sub-heading">Add On Items</h5>
//                         </div>
//                         <div className="thaliList">
//                           <ul className="list-group list-group-horizontal">
//                             {thaliCategory[0].addOnItems.map((item, index) => (
//                               <li key={index} className="list-group-item">
//                                 {item.name}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     )}
//                     <div className="thaliDetailGroup">
//                       <div className="custom-date-container">
//                         <div className="commonHeading">
//                           <h5 className="sub-heading">Select a Start Date:</h5>
//                         </div>
//                         <input
//                           type="date"
//                           value={selectedDate}
//                           onChange={handleDateChange}
//                           className={`custom-calendar ${
//                             !selectedDate ? "placeholder-visible" : ""
//                           }`}
//                           min={getMinDate()}
//                         />
//                         {!selectedDate && (
//                           <div className="custom-placeholder">
//                             Select a date to order
//                           </div>
//                         )}
//                       </div>
//                       <div className="pincode-verification-container">
//                         <div className="commonHeading">
//                           <h5 className="sub-heading ">Check Delivery:</h5>
//                         </div>
//                         <form onSubmit={handlePincodeVerification}>
//                           <input
//                             type="text"
//                             placeholder="Enter pincode"
//                             value={pincode}
//                             onChange={handlePincodeChange}
//                           />
//                           <button type="submit">Verify Pincode</button>
//                         </form>
//                         {message && <p>{message}</p>}
//                       </div>
//                       <div className="specialDishBtnGroup">
//                         <div className="specialDishGetStartedBtn"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//       {mealPlans.length > 0 && (
//         <section className="w-100 clearfix ourMealPlan" id="ourMealPlan">
//           <div className="container">
//             <div className="ourMealPlanInner">
//               <div className="ourMealPlanRow">
//                 <div className="ourMealPlanCol">
//                   <div className="commonHeading headingLeft">
//                     <h4>
//                       Our <span>Meal</span> Plans
//                     </h4>
//                     <p className="mb-0">
//                       Preparations to temperature controlled packaging and
//                       transportation of food.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="tab-content">
//                 <div className="tab-pane container active" id="veg">
//                   <div className="ourMealContent">
//                     <div className="row">
//                       {mealPlans.map((mealPlan) => (
//                         <div className="col-md-6 col-xl-3" key={mealPlan.name}>
//                           <div className="ourMealCard fadedBackground">
//                             <div className="ourMealContent">
//                               <div className="ourMealHead">
//                                 <div className="ourMealTitle">
//                                   <h2>
//                                     <a href="meal-single.html">
//                                       {mealPlan.name}
//                                     </a>
//                                   </h2>
//                                 </div>
//                                 <div className="ourMealPrice">
//                                   <span>${mealPlan.price}</span>
//                                 </div>
//                               </div>
//                               <div className="ourMealBtn">
//                                 <button
//                                   onClick={() => handleMealSelect(mealPlan)}
//                                   className="btn btnPrimary"
//                                 >
//                                   Select
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {selectedMeal && (
//                 <div className="nextPageBtn">
//                   <Link
//                     to={constructURL()}
//                     className="btn btnPrimary spacious-heading"
//                     onClick={() => console.log(constructURL())}
//                   >
//                     Next Page
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}
//       <RelatedMeals />
//     </div>
//   );
// };

// export default ThaliContentPage;
