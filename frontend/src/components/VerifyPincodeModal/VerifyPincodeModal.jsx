import React, { useState } from "react";
import axios from "axios";
import "./VerifyPincodeModal.css"; // Ensure to include this CSS file for custom styles

const VerifyPincodeModal = ({ onVerify }) => {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handlePincodeVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/api/v1/pincodeVerify",
        { pincode: pincode }
      );

      if (response.data.success) {
        setMessage(response.data.message);
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
    onVerify(pincode);
  };

  return (
    <div className="verify-pincode-modal">
      <button
        type="button"
        className="btn btnVerifyPincode"
        data-bs-toggle="modal"
        data-bs-target="#verifyPincodeModal"
      >
        Verify Pincode
      </button>

      <div
        className="modal fade"
        id="verifyPincodeModal"
        tabIndex="-1"
        aria-labelledby="verifyPincodeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="verifyPincodeModalLabel">
                Verify Pincode
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePincodeVerification}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={handlePincodeChange}
                />
                <button type="submit" className="btn btn-primary mt-2">
                  Verify
                </button>
              </form>
              {message && <p className="mt-2">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPincodeModal;
