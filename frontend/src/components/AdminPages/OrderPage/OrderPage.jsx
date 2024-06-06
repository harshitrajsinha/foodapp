import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./OrderPage.css";

const OrderPage = () => {
  const [overallItemsAndQuantities, setOverallItemsAndQuantities] = useState(
    []
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOverallItemsAndQuantities = async () => {
      try {
        const response = await axios.get("http://localhost:80/api/v1/orders");
        setOverallItemsAndQuantities(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOverallItemsAndQuantities();
  }, []);

  const aggregateQuantities = (data) => {
    const aggregatedData = {};

    data.forEach((order) => {
      const date = new Date(order.date).toISOString().split("T")[0];
      if (!aggregatedData[date]) {
        aggregatedData[date] = {
          items: new Map(),
          userEmails: order.userEmails,
          pincodes: order.pincodes,
        };
      }

      order.items.forEach((item) => {
        if (aggregatedData[date].items.has(item.name)) {
          const existingItem = aggregatedData[date].items.get(item.name);
          existingItem.quantity += item.quantity;
          aggregatedData[date].items.set(item.name, existingItem);
        } else {
          aggregatedData[date].items.set(item.name, {
            name: item.name,
            quantity: item.quantity,
          });
        }
      });
    });

    Object.keys(aggregatedData).forEach((date) => {
      aggregatedData[date].items = Array.from(
        aggregatedData[date].items.values()
      );
    });

    return aggregatedData;
  };

  const isNextDay = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    return date.toDateString() === nextDay.toDateString();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleViewAllUsers = () => {
    navigate("/user-details"); // Use navigate
  };

  const aggregatedData = aggregateQuantities(overallItemsAndQuantities);
  const filteredData = Object.keys(aggregatedData)
    .filter(
      (date) => new Date(date).toDateString() === selectedDate.toDateString()
    )
    .reduce((obj, key) => {
      obj[key] = aggregatedData[key];
      return obj;
    }, {});

  return (
    <div className="wrapper">
      <div className="commonHeading headingLeft">
        <h4 className="mid-heading">
          Orders <span>Placed</span>
        </h4>
      </div>
      <div className="calendar-container">
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
      </div>
      <div className="order-container">
        {Object.keys(filteredData)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((date, index) => (
            <div
              key={index}
              className={`order-tile ${
                isNextDay(date) ? "highlight-next-day" : ""
              }`}
            >
              <div className="order-date">
                Date: {new Date(date).toLocaleDateString()}
              </div>
              <div className="order-details">
                <h3>Emails:</h3>
                <ul>
                  {filteredData[date].userEmails.map((email, i) => (
                    <li key={i}>{email}</li>
                  ))}
                </ul>
                <h3>Pincodes:</h3>
                <ul>
                  {filteredData[date].pincodes.map((pincode, i) => (
                    <li key={i}>{pincode}</li>
                  ))}
                </ul>
                <h3>Items:</h3>
                <ul>
                  {filteredData[date].items.map((item, i) => (
                    <li key={i}>
                      {item.name}: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
      <div className="view-users-container">
        <button onClick={handleViewAllUsers} className="view-users-button">
          View all users
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
