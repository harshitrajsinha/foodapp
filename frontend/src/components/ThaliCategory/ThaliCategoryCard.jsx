import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ThaliCategoryCard.css";
import img18 from "../../images/img18.png";

const ThaliCategoryCard = ({ category, handleClick }) => {
  return (
    <div className="col-md-6 col-xl-3">
      <Link
        to={`/thali-content/${category.name}`}
        className="specialTiffinCard"
        onClick={() => handleClick(category.price)}
      >
        <div className="specialTiffinCardInner">
          <div className="specialTiffinContent">
            <div className="specialTiffinHead">
              <div className="specialTiffinTitle">
                <h2>{category.name}</h2>
              </div>
              <div className="specialTiffinPrice">
                <span>${category.price}</span>
              </div>
            </div>
            <div className="specialTiffinStarGroup">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={`fa-star ${index < 4 ? "active" : "inactive"}`}
                />
              ))}
            </div>
          </div>
          <div className="specialTiffinImg">
            <img
              src={img18}
              // src={category.image}
              alt={category.name}
              className="img-fluid"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ThaliCategoryCard;
