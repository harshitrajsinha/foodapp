import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SelectAddress.css"; // Ensure to include this CSS file for custom styles

const SelectAddress = ({ onSelect }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:80/api/v1/user-info",
          {
            withCredentials: true,
          }
        );
        setUserInfo(data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    onSelect(address);
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="select-address">
      <button
        type="button"
        className="btn btnSelectAddress"
        data-bs-toggle="modal"
        data-bs-target="#selectAddressModal"
      >
        Select Address
      </button>

      <div
        className="modal fade"
        id="selectAddressModal"
        tabIndex="-1"
        aria-labelledby="selectAddressModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="selectAddressModalLabel">
                Select Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {userInfo.addresses.map((address, index) => (
                <div
                  key={index}
                  className={`address-card ${
                    selectedAddress?._id === address._id ? "selected" : ""
                  }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <h5>{address.addressType} Address</h5>
                  <p>
                    {address.address},{address.unitNo},{address.buzzerCode}
                  </p>
                  <p>{address.deliveryInstructions}</p>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedAddress && (
        <div className="selected-address">
          <h5>Address:</h5>
          <p>
            {[
              selectedAddress.addressType,
              selectedAddress.address,
              selectedAddress.pincode,
              selectedAddress.unitNo,
              selectedAddress.buzzerCode,
            ]
              .filter((field) => field)
              .join(" | ")}
          </p>
          {selectedAddress.deliveryInstructions && (
            <p>
              {"Delivery Instruction"} - {selectedAddress.deliveryInstructions}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectAddress;
