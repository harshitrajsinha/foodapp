import React, { useEffect, useState } from "react";
import axios from "axios";

const MealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get("http://localhost:80/api/v1/mealPlan");
        if (response.data.success && Array.isArray(response.data.mealPlan)) {
          setMealPlans(response.data.mealPlan);
        } else {
          console.error(
            "API response does not contain mealPlan array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    fetchMealPlans();
  }, []);

  return (
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
          <div className=""></div>

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
                                <a href="meal-single.html">{mealPlan.name}</a>
                              </h2>
                            </div>
                            <div className="ourMealPrice">
                              <span>${mealPlan.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="ourMealBtn">
                            <a href="/login" className="btn btnPrimary">
                              Select
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlan;
