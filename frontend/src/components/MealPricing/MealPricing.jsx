import React, { useEffect, useState } from "react";
import axios from "axios";

const MealPricing = () => {
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
    <section
      className="w-100 clearfix servicePrice OurServicePackages"
      id="OurServicePackages"
    >
      <div className="container">
        <div className="servicePriceInner">
          <div className="commonHeading commonSecondaryHeading headingCenter">
            <h4>Our Services Packages</h4>
            <p>
              The state-of-the art facility has automated machinery, is
              installed with rust-free pipelines and faucets and uses only RO
              treated water.
            </p>
          </div>
          <div className="servicePriceGroup">
            <div className="servicePriceGroupInner">
              {mealPlans.map((mealPlan) => (
                <div className="servicePriceCard" key={mealPlan.name}>
                  <div className="servicePriceCardInner">
                    <div className="servicePriceCardHeading">
                      <h4>${mealPlan.price}</h4>
                      <span>{mealPlan.name}</span>
                    </div>
                    <div className="servicePriceCardBtn">
                      <a href="/login" className="getStarted">
                        Get Started
                      </a>
                    </div>
                    <div className="servicePriceCardPlanList">
                      <ul>
                        <li>
                          <div className="planLabel">
                            <h5>Day Plan</h5>
                          </div>
                          <span className="priceTbl">
                            $ {mealPlan.dayPrice}
                          </span>
                        </li>
                        <li>
                          <div className="planLabel">
                            <h5>Monthly Plan</h5>
                          </div>
                          <span className="priceTbl">
                            $ {mealPlan.monthPrice}
                          </span>
                        </li>
                        <li>
                          <div className="planLabel">
                            <h5>Yearly Plan</h5>
                            <p className="mb-0">
                              ({mealPlan.freeMeals} Day Free Meal)
                            </p>
                          </div>
                          <span className="priceTbl">
                            $ {mealPlan.yearPrice}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="servicePriceCardLabel">
                      <span>{mealPlan.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPricing;
