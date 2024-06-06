import React, { useState, useEffect } from "react";

const CloverOAuth = () => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Retrieve Clover access token from server on component mount if needed
    fetch("http://localhost:80/api/v1/clover/token")
      .then((response) => response.json())
      .then((data) =>
        localStorage.setItem("cloverAccessToken", data.accessToken)
      )
      .catch((error) =>
        console.error("Error fetching Clover access token:", error)
      );
  }, []);

  const handleCloverAuth = () => {
    window.location.href = "http://localhost:80/api/v1/clover/auth";
  };

  const createPayment = async () => {
    const accessToken = localStorage.getItem("cloverAccessToken");
    const response = await fetch(
      "http://localhost:80/api/v1/clover/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000, // Example amount
          currency: "USD",
          accessToken,
        }),
      }
    );

    const result = await response.json();
    setPaymentData(result);
  };

  return (
    <div>
      <button id="cloverAuthButton" onClick={handleCloverAuth}>
        Connect with Clover
      </button>
      <button onClick={createPayment}>Create Payment</button>
      {paymentData && (
        <div>
          <h2>Payment Data</h2>
          <pre>{JSON.stringify(paymentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CloverOAuth;
