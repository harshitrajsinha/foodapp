import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pincode = () => {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = async (e) => {
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

        navigate("/thali-categories"); // Navigate to other page
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

  return (
    <div>
      <h2>Enter Pincode</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter pincode"
          value={pincode}
          onChange={handleChange}
        />
        <button type="submit">Verify Pincode</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Pincode;
