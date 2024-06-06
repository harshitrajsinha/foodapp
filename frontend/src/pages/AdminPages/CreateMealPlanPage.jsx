import React, { useState } from "react";
import axios from "axios";

const CreateMealPlan = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    days: 0,
    price: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/new-mealPlan",
        formData
      );
      console.log(response.data);
      // Handle success response, maybe redirect to another page
    } catch (error) {
      console.error("Error:", error.response.data.message);
      // Handle error response, display error message to user
    }
  };

  return (
    <div>
      <h1>Create Meal Plan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="days">Days:</label>
          <input
            type="number"
            id="days"
            name="days"
            value={formData.days}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Meal Plan</button>
      </form>
    </div>
  );
};

export default CreateMealPlan;
