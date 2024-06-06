import React, { useState } from "react";
import axios from "axios";

const AddPincodePage = () => {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/addPincode",
        {
          pincode: pincode,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Add Pincode</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={pincode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Pincode</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPincodePage;
