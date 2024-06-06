import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDetailsPage.css";

const UserDetailsPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/api/v1/user-details"
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleTileClick = (email) => {
    navigate(`/user-orders/${email}`);
  };

  return (
    <div className="user-wrapper">
      <div className="commonHeading headingLeft">
        <h4>
          User <span>Details</span>
        </h4>
      </div>
      <div className="user-container">
        {users.map((user, index) => (
          <div
            key={index}
            className="user-tile"
            onClick={() => handleTileClick(user.email)}
          >
            <h2>{user.name}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
            {user.addresses && user.addresses.length > 0 && (
              <div>
                <h3>Addresses:</h3>
                <ul>
                  {user.addresses.map((address, idx) => (
                    <li key={idx}>
                      {address.addressCategory} - {address.addressType} -{" "}
                      {address.address} - Unit No: {address.unitNo} - Buzzer
                      Code: {address.buzzerCode} - Instructions:{" "}
                      {address.deliveryInstructions}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailsPage;
