import React, { useState, useEffect } from "react";
import axios from "axios";
import img41 from "../../images/img41.png";

const RelatedMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/api/v1/thali-categories"
        );
        setMeals(response.data.data);
      } catch (error) {
        setError("Error fetching related meals");
      }
    };

    fetchMeals();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="w-100 clearfix ourMealList" id="ourMealList">
      <div className="container">
        <div className="commonHeading headingCenter">
          <h4>
            Related <span>Meals</span>
          </h4>
          <p className="mb-0">
            The state-of-the art facility has automated machinery, is installed
            with rust-free pipelines and faucets and uses only RO treated water.
          </p>
        </div>
        <div className="ourMealListInner">
          <div className="row">
            {meals.map((meal) => (
              <div className="col-md-6" key={meal._id}>
                <div className="ourMealListItem">
                  <div className="ourMealListImg">
                    <a href={`meal-single.html?mealId=${meal.id}`}>
                      <img
                        src={img41}
                        // src={meal.imageUrl}
                        alt="our-meal-list"
                        className="img-fluid w-100"
                      />
                    </a>
                  </div>
                  <div className="ourMealListContent">
                    <div className="ourMealListHeading">
                      <h4>
                        <a href={`meal-single.html?mealId=${meal.id}`}>
                          {meal.name}
                        </a>
                      </h4>
                      <span>${meal.price}</span>
                    </div>
                    <div className="ourMealListPara">
                      <p>
                        {meal.items && meal.items.length > 0
                          ? meal.items.map((item) => item.name).join(" / ")
                          : "No items available"}
                      </p>
                    </div>
                    <div className="ourMealListButton">
                      <a
                        href="check-out.html"
                        className="btn btnPrimary addToCard"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedMeals;
