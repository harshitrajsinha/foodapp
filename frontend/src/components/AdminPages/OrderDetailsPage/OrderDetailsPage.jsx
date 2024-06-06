import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./OrderDetailsPage.css";

const OrderDetailsPage = () => {
  const { email } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/v1/user-orders/${email}`
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [email]);

  return (
    <div className="order-wrapper">
      <h1>Orders for {email}</h1>
      <div className="order-container">
        {orders.map((order, index) => (
          <div key={index} className="order-tile">
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Thali Name:</strong> {order.thaliName}
            </p>
            {order.address && (
              <p>
                <strong>Address:</strong>{" "}
                {`${order.address.addressCategory} | ${order.address.address} | ${order.address.addressType} | ${order.address.unitNo} | ${order.address.buzzerCode} | ${order.address.deliveryInstructions} | ${order.address.pincode}`}
              </p>
            )}
            {order.data.map((dataEntry, dataIndex) => (
              <div key={dataIndex}>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(dataEntry.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Items:</strong>{" "}
                  {dataEntry.items
                    .map((item) => `${item.name} (${item.quantity})`)
                    .join(" / ")}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./OrderDetailsPage.css";

// const OrderDetailsPage = () => {
//   const { email } = useParams();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:80/api/v1/user-orders/${email}`
//         );
//         setOrders(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchOrders();
//   }, [email]);

//   return (
//     <div className="order-wrapper">
//       <h1>Orders for {email}</h1>
//       <div className="order-container">
//         {orders.map((order, index) => (
//           <div key={index} className="order-tile">
//             <p>
//               <strong>Order Date:</strong>{" "}
//               {new Date(order.orderDate).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
//             </p>
//             <p>
//               <strong>Thali Name:</strong> {order.thaliName}
//             </p>
//             {order.data.map((dataEntry, dataIndex) => (
//               <div key={dataIndex}>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(dataEntry.date).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Items:</strong>{" "}
//                   {dataEntry.items
//                     .map((item) => `${item.name} (${item.quantity})`)
//                     .join(" / ")}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsPage;
