import React, { useState, useEffect } from "react";
import axios from "axios";
import ThaliCategoryCard from "../components/ThaliCategory/ThaliCategoryCard";
import MealPricing from "../components/MealPricing/MealPricing";
import SpecialDish from "../components/SpecialDishHomepage/SpecialDish.jsx";
import weeklyImg from "../images/WeeklyMenu.jpeg";
import "../components/Header/Header.css";
import HowItWorks from "../components/HowItWorks/HowItWorks.jsx";

const HomePage = ({ showImage, onWeeklyMenuClick }) => {
  const [thaliCategories, setThaliCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThaliCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/api/v1/thali-categories"
        );
        setThaliCategories(response.data.data);
      } catch (error) {
        setError("Error fetching thali categories");
      }
    };

    fetchThaliCategories();
  }, []);

  useEffect(() => {
    const updateScrollVariable = () => {
      const scrollValue = window.scrollY / 3000;
      document.documentElement.style.setProperty("--scroll", scrollValue);
    };

    window.addEventListener("scroll", updateScrollVariable);
    updateScrollVariable();

    return () => {
      window.removeEventListener("scroll", updateScrollVariable);
    };
  }, []);
  const handleClick = (price) => {
    // Save the price to localStorage
    localStorage.setItem("selectedCategoryPrice", price);
  };

  return (
    <div>
      <SpecialDish />
      <section className="w-100 clearfix specialTiffin" id="specialTiffin">
        <div className="container">
          <div className="specialTiffinInner">
            <div className="commonHeading commHeadingWhite headingCenter">
              <h4>
                Special <span>Tiffin</span>
              </h4>
              <p className="mb-0">
                The state-of-the art facility has automated machinery, is
                installed with rust-free pipelines and faucets and uses only RO
                treated water.
              </p>
            </div>
            <div className="row">
              {thaliCategories.map((category) => (
                <ThaliCategoryCard
                  key={category.name}
                  category={category}
                  handleClick={handleClick}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <MealPricing />
      <section className="w-100 clearfix deliveryFood" id="deliveryFood">
        <div className="container">
          <div className="deliveryFoodOuter">
            <div className="deliveryFoodInner">
              <h4>The Fastest</h4>
              <h2>
                Delivery <span>Food</span>
              </h2>
              <a href="/login" className="deliveryFoodBtn">
                Order Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <HowItWorks />
      {showImage && (
        <div className="image-popup">
          <div className="image-popup-content">
            <button className="close-button" onClick={onWeeklyMenuClick}>
              ✕
            </button>
            <img src={weeklyImg} alt="Popup" className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ThaliCategoryCard from "../components/ThaliCategory/ThaliCategoryCard";
// import MealPricing from "../components/MealPricing/MealPricing";
// import SpecialDish from "../components/SpecialDishHomepage/SpecialDish.jsx";
// import weeklyImg from "../images/WeeklyMenu.jpeg";
// import "../components/Header/Header.css";
// import HowItWorks from "../components/HowItWorks/HowItWorks.jsx";

// const HomePage = () => {
//   const [thaliCategories, setThaliCategories] = useState([]);
//   const [error, setError] = useState(null);
//   const [showImage, setShowImage] = useState(true); // Set initial state to true

//   useEffect(() => {
//     const fetchThaliCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:80/api/v1/thali-categories"
//         );
//         setThaliCategories(response.data.data);
//       } catch (error) {
//         setError("Error fetching thali categories");
//       }
//     };

//     fetchThaliCategories();
//   }, []);

//   useEffect(() => {
//     // Function to update the --scroll variable
//     const updateScrollVariable = () => {
//       const scrollValue = window.scrollY / 3000; // Adjust divisor for desired effect
//       document.documentElement.style.setProperty("--scroll", scrollValue);
//     };

//     // Attach the function to the scroll event
//     window.addEventListener("scroll", updateScrollVariable);

//     // Initial call to set the variable based on the initial scroll position
//     updateScrollVariable();

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", updateScrollVariable);
//     };
//   }, []);

//   const handleViewWeeklyMenu = () => {
//     // Toggle the image display state
//     setShowImage((prevShowImage) => !prevShowImage);
//   };

//   return (
//     <div>
//       <SpecialDish />
//       <section className="w-100 clearfix specialTiffin" id="specialTiffin">
//         <div className="container">
//           <div className="specialTiffinInner">
//             <div className="commonHeading commHeadingWhite headingCenter">
//               <h4>
//                 Special <span>Tiffin</span>
//               </h4>
//               <p className="mb-0">
//                 The state-of-the art facility has automated machinery, is
//                 installed with rust-free pipelines and faucets and uses only RO
//                 treated water.
//               </p>
//             </div>
//             <div className="row">
//               {thaliCategories.map((category) => (
//                 <ThaliCategoryCard key={category.name} category={category} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//       <MealPricing />
//       {/* New Delivery Food Section */}
//       <section className="w-100 clearfix deliveryFood" id="deliveryFood">
//         <div className="container">
//           <div className="deliveryFoodOuter">
//             <div className="deliveryFoodInner">
//               <h4>The Fastest</h4>
//               <h2>
//                 Delivery <span>Food</span>
//               </h2>
//               <a href="/login" className="deliveryFoodBtn">
//                 Order Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//       <HowItWorks />
//       {showImage && (
//         <div className="image-popup">
//           <div className="image-popup-content">
//             <button className="close-button" onClick={handleViewWeeklyMenu}>
//               ✕
//             </button>
//             <img src={weeklyImg} alt="Popup" className="popup-image" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ThaliCategoryCard from "../components/ThaliCategory/ThaliCategoryCard";
// import MealPricing from "../components/MealPricing/MealPricing";
// import SpecialDish from "../components/SpecialDishHomepage/SpecialDish.jsx";

// const HomePage = () => {
//   const [thaliCategories, setThaliCategories] = useState([]);
//   const [error, setError] = useState(null);
//   const [showImage, setShowImage] = useState(false); // State to control image display

//   useEffect(() => {
//     const fetchThaliCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:80/api/v1/thali-categories"
//         );
//         setThaliCategories(response.data.data);
//       } catch (error) {
//         setError("Error fetching thali categories");
//       }
//     };

//     fetchThaliCategories();
//   }, []);

//   useEffect(() => {
//     // Function to update the --scroll variable
//     const updateScrollVariable = () => {
//       const scrollValue = window.scrollY / 3000; // Adjust divisor for desired effect
//       document.documentElement.style.setProperty("--scroll", scrollValue);
//     };

//     // Attach the function to the scroll event
//     window.addEventListener("scroll", updateScrollVariable);

//     // Initial call to set the variable based on the initial scroll position
//     updateScrollVariable();

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", updateScrollVariable);
//     };
//   }, []);

//   const handleViewWeeklyMenu = () => {
//     // Toggle the image display state
//     setShowImage((prevShowImage) => !prevShowImage);
//   };

//   return (
//     <div>
//       <SpecialDish />
//       <section className="w-100 clearfix specialTiffin" id="specialTiffin">
//         <div className="container">
//           <div className="specialTiffinInner">
//             <div className="commonHeading commHeadingWhite headingCenter">
//               <h4>
//                 Special <span>Tiffin</span>
//               </h4>
//               <p className="mb-0">
//                 The state-of-the art facility has automated machinery, is
//                 installed with rust-free pipelines and faucets and uses only RO
//                 treated water.
//               </p>
//             </div>
//             <div className="row">
//               {thaliCategories.map((category) => (
//                 <ThaliCategoryCard key={category.name} category={category} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//       <MealPricing />
//       {/* New Delivery Food Section */}
//       <section className="w-100 clearfix deliveryFood" id="deliveryFood">
//         <div className="container">
//           <div className="deliveryFoodOuter">
//             <div className="deliveryFoodInner">
//               <h4>The Fastest</h4>
//               <h2>
//                 Delivery <span>Food</span>
//               </h2>
//               <a href="/login" className="deliveryFoodBtn">
//                 Order Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePage;
