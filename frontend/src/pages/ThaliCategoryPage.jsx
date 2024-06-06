// ThaliCategoriesPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ThaliCategoryCard from "../components/ThaliCategory/ThaliCategoryCard.jsx";

const ThaliCategoriesPage = () => {
  const [thaliCategories, setThaliCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showImage, setShowImage] = useState(false); // State to control image display

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

  const handleViewWeeklyMenu = () => {
    // Toggle the image display state
    setShowImage((prevShowImage) => !prevShowImage);
  };

  const handleClick = (price) => {
    // Save the price to localStorage
    localStorage.setItem("selectedCategoryPrice", price);
  };

  return (
    <div>
      <section className="w-100 clearfix specialTiffin" id="specialTiffin">
        <div className="container">
          <div className="specialTiffinInner spacious-div">
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
    </div>
  );
};

export default ThaliCategoriesPage;
