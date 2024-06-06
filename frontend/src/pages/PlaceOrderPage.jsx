import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../images/cart-img1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectAddress from "../components/Header/SelectAddress/SelectAddress";

const PlaceOrderPage = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedSubstituteItems, setSelectedSubstituteItems] = useState({});
  const [selectedAddOnItems, setSelectedAddOnItems] = useState({});
  const [thaliName, setThaliName] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null); //address
  const DISPLAY_LIMIT = 10;

  useEffect(() => {
    const savedSelectedItems =
      JSON.parse(localStorage.getItem("selectedItems")) || {};
    const savedSelectedSubstituteItems =
      JSON.parse(localStorage.getItem("selectedSubstituteItems")) || {};
    const savedSelectedAddOnItems =
      JSON.parse(localStorage.getItem("selectedAddOnItems")) || {};
    const savedThaliName = localStorage.getItem("thaliName") || "";

    setSelectedItems(savedSelectedItems);
    setSelectedSubstituteItems(savedSelectedSubstituteItems);
    setSelectedAddOnItems(savedSelectedAddOnItems);
    setThaliName(savedThaliName);
  }, []);

  const calculateTotalPrice = () => {
    const totalAddOnItemPrices =
      JSON.parse(localStorage.getItem("totalAddOnItemPrices")) || {};
    const selectedMealPlanPrice = parseFloat(
      localStorage.getItem("selectedMealPlanPrice") || "0"
    );
    const selectedCategoryPrice = parseFloat(
      localStorage.getItem("selectedCategoryPrice") || "0"
    );

    const grandTotal = Object.values(totalAddOnItemPrices).reduce(
      (total, price) => total + parseFloat(price),
      0
    );
    return (grandTotal + selectedMealPlanPrice + selectedCategoryPrice).toFixed(
      2
    );
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");
    const pincode = localStorage.getItem("pincode");
    const orderId = localStorage.getItem("orderId");
    const startDate = localStorage.getItem("startDate");

    if (!userEmail) {
      toast.error("Please Login to Continue");
      return;
    }
    if (!thaliName) {
      toast.error("Thali name is missing.");
      return;
    }
    if (!pincode) {
      toast.error("Pincode is missing.");
      return;
    }
    if (!startDate) {
      toast.error("Please select a Start Date");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select an address.");
      return;
    }

    const mergedData = Object.entries(selectedItems)
      .filter(([date, items]) => items.length > 0)
      .map(([date, items]) => ({
        date,
        items: [
          ...items.map((itemName) => ({ name: itemName, quantity: 1 })),
          ...(selectedSubstituteItems[date] || []).map((itemName) => ({
            name: itemName,
            quantity: 1,
          })),
          ...(selectedAddOnItems[date] || []).map((itemName) => ({
            name: itemName,
            quantity: 1,
          })),
        ],
      }));

    if (mergedData.length === 0) {
      toast.error("Order data is empty.");
      return;
    }

    const totalPrice = calculateTotalPrice();

    const completeOrderData = {
      orders: mergedData,
      totalPrice,
      userEmail,
      pincode,
      thaliName,
      startDate,
      address: selectedAddress,
    };
    console.log("Data being sent to the backend:", completeOrderData);

    try {
      const response = await axios.post(
        `http://localhost:80/api/v1/placeOrder${orderId ? `/${orderId}` : ""}`,
        completeOrderData
      );
      if (response.status === 200 || response.status === 201) {
        localStorage.removeItem("selectedItems");
        localStorage.removeItem("selectedSubstituteItems");
        localStorage.removeItem("selectedCategoryPrice");
        localStorage.removeItem("selectedMealPlanPrice");
        localStorage.removeItem("totalAddOItemPrices");
        localStorage.removeItem("selectedAddOnItems");
        localStorage.removeItem("selectedMealPlanName");
        localStorage.removeItem("selectedMealPlanDays");
        if (orderId) {
          toast.success("Order updated successfully!");
        } else {
          localStorage.setItem("orderId", response.data.order._id);
          toast.success("Order placed successfully!");
        }
        localStorage.removeItem("orderId");
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      toast.error(
        "Error placing order: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const sortedDates = Object.keys(selectedItems)
    .filter((date) => selectedItems[date].length > 0)
    .sort();

  return (
    <div>
      <ToastContainer />
      <section className="w-100 clearfix lbCheckOut" id="lbCheckOut">
        <div className="container">
          <div className="lbCheckOutInner">
            <form onSubmit={placeOrder}>
              <div className="lbCheckOutHeading selectAddressSection">
                <div>
                  <h5>Your Order</h5>
                </div>
                <div>
                  <SelectAddress onSelect={setSelectedAddress} />
                </div>
              </div>
              <div className="lbCheckOutBox">
                <div className="row">
                  <div className="col-md-12 col-xl-6">
                    <div className="lbCheckOutTbl">
                      <div className="lbCheckOutTblInner">
                        <div className="lbCheckOutDetail">
                          <div className="lbCheckOutImg">
                            <img
                              src={img1}
                              alt="card-img"
                              className="img-fluid"
                            />
                          </div>
                          <div className="lbCheckOutTxt">
                            <h5>{thaliName}</h5>
                            <div className="mb-0 scrollable">
                              {sortedDates
                                .slice(0, DISPLAY_LIMIT)
                                .map((date, index) => (
                                  <span key={index}>
                                    <strong>{date}:</strong>{" "}
                                    {selectedItems[date].join(" / ")}
                                    {selectedSubstituteItems[date]?.length >
                                      0 &&
                                      " / " +
                                        selectedSubstituteItems[date].join(
                                          " / "
                                        )}
                                    {selectedAddOnItems[date]?.length > 0 &&
                                      " / " +
                                        selectedAddOnItems[date].join(" / ")}
                                    {index < sortedDates.length - 1 && <br />}
                                  </span>
                                ))}
                              {sortedDates.length > DISPLAY_LIMIT && (
                                <div className="more-items">
                                  {sortedDates
                                    .slice(DISPLAY_LIMIT)
                                    .map((date, index) => (
                                      <span key={index}>
                                        <strong>{date}:</strong>{" "}
                                        {selectedItems[date].join(" / ")}
                                        {selectedSubstituteItems[date]?.length >
                                          0 &&
                                          " / " +
                                            selectedSubstituteItems[date].join(
                                              " / "
                                            )}
                                        {selectedAddOnItems[date]?.length > 0 &&
                                          " / " +
                                            selectedAddOnItems[date].join(
                                              " / "
                                            )}
                                        {index <
                                          sortedDates.length -
                                            DISPLAY_LIMIT -
                                            1 && <br />}
                                      </span>
                                    ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-xl-6">
                    <div className="lbCheckOutDetail">
                      <div className="lbProductsPriceTbl">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Cart Total</td>
                              <td>
                                <strong>${calculateTotalPrice()}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>Delivery</td>
                              <td>
                                <strong>Free</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>Total</td>
                              <td>
                                <strong>
                                  $
                                  {parseFloat(calculateTotalPrice()).toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="lbCheckOutBtn">
                        <button type="submit" className="btn btnPrimary">
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceOrderPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import img1 from "../images/cart-img1.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SelectAddress from "../components/Header/SelectAddress/SelectAddress";

// const PlaceOrderPage = () => {
//   const [selectedItems, setSelectedItems] = useState({});
//   const [selectedSubstituteItems, setSelectedSubstituteItems] = useState({});
//   const [selectedAddOnItems, setSelectedAddOnItems] = useState({});
//   const [thaliName, setThaliName] = useState("");

//   useEffect(() => {
//     const savedSelectedItems =
//       JSON.parse(localStorage.getItem("selectedItems")) || {};
//     const savedSelectedSubstituteItems =
//       JSON.parse(localStorage.getItem("selectedSubstituteItems")) || {};
//     const savedSelectedAddOnItems =
//       JSON.parse(localStorage.getItem("selectedAddOnItems")) || {};
//     const savedThaliName = localStorage.getItem("thaliName") || "";

//     setSelectedItems(savedSelectedItems);
//     setSelectedSubstituteItems(savedSelectedSubstituteItems);
//     setSelectedAddOnItems(savedSelectedAddOnItems);
//     setThaliName(savedThaliName);
//   }, []);

//   const calculateTotalPrice = () => {
//     const totalAddOnItemPrices =
//       JSON.parse(localStorage.getItem("totalAddOnItemPrices")) || {};
//     const selectedMealPlanPrice = parseFloat(
//       localStorage.getItem("selectedMealPlanPrice") || "0"
//     );
//     const selectedCategoryPrice = parseFloat(
//       localStorage.getItem("selectedCategoryPrice") || "0"
//     );

//     const grandTotal = Object.values(totalAddOnItemPrices).reduce(
//       (total, price) => total + parseFloat(price),
//       0
//     );
//     return (grandTotal + selectedMealPlanPrice + selectedCategoryPrice).toFixed(
//       2
//     );
//   };

//   const placeOrder = async (e) => {
//     e.preventDefault();

//     const userEmail = localStorage.getItem("userEmail");
//     const pincode = localStorage.getItem("pincode");
//     const orderId = localStorage.getItem("orderId");
//     const startDate = localStorage.getItem("startDate");

//     if (!userEmail) {
//       toast.error("Please Login to Continue");
//       return;
//     }
//     if (!thaliName) {
//       toast.error("Thali name is missing.");
//       return;
//     }
//     if (!pincode) {
//       toast.error("Pincode is missing.");
//       return;
//     }
//     if (!startDate) {
//       toast.error("Please select a Start Date");
//       return;
//     }

//     const mergedData = Object.entries(selectedItems).map(([date, items]) => ({
//       date,
//       items: [
//         ...items.map((itemName) => ({ name: itemName, quantity: 1 })),
//         ...(selectedSubstituteItems[date] || []).map((itemName) => ({
//           name: itemName,
//           quantity: 1,
//         })),
//         ...(selectedAddOnItems[date] || []).map((itemName) => ({
//           name: itemName,
//           quantity: 1,
//         })),
//       ],
//     }));

//     if (mergedData.length === 0) {
//       toast.error("Order data is empty.");
//       return;
//     }

//     const totalPrice = calculateTotalPrice();

//     const completeOrderData = {
//       orders: mergedData,
//       totalPrice,
//       userEmail,
//       pincode,
//       thaliName,
//       startDate,
//     };
//     console.log("Data being sent to the backend:", completeOrderData);

//     try {
//       const response = await axios.post(
//         `http://localhost:80/api/v1/placeOrder${orderId ? `/${orderId}` : ""}`,
//         completeOrderData
//       );
//       if (response.status === 200 || response.status === 201) {
//         localStorage.removeItem("selectedItems");
//         localStorage.removeItem("totalAddOItemPrices");
//         if (orderId) {
//           toast.success("Order updated successfully!");
//         } else {
//           localStorage.setItem("orderId", response.data.order._id);
//           toast.success("Order placed successfully!");
//         }
//         localStorage.removeItem("orderId");
//       } else {
//         toast.error("Failed to place order");
//       }
//     } catch (error) {
//       toast.error(
//         "Error placing order: " +
//           (error.response ? error.response.data : error.message)
//       );
//     }
//   };

//   const sortedDates = Object.keys(selectedItems)
//     .filter((date) => selectedItems[date].length > 0)
//     .sort();

//   return (
//     <div>
//       <ToastContainer />
//       <section className="w-100 clearfix lbCheckOut" id="lbCheckOut">
//         <div className="container">
//           <div className="lbCheckOutInner">
//             <form onSubmit={placeOrder}>
//               <div className="lbCheckOutHeading selectAddressSection">
//                 <div>
//                   <h5>Your Order</h5>
//                 </div>
//                 <div>
//                   <SelectAddress />
//                 </div>
//               </div>
//               <div className="lbCheckOutBox">
//                 <div className="row">
//                   <div className="col-md-12 col-xl-6">
//                     <div className="lbCheckOutTbl">
//                       <div className="lbCheckOutTblInner">
//                         <div className="lbCheckOutDetail">
//                           <div className="lbCheckOutImg">
//                             <img
//                               src={img1}
//                               alt="card-img"
//                               className="img-fluid"
//                             />
//                           </div>
//                           <div className="lbCheckOutTxt">
//                             <h5>{thaliName}</h5>
//                             <p className="mb-0">
//                               {sortedDates.map((date, index) => (
//                                 <span key={index}>
//                                   <strong>{date}:</strong>{" "}
//                                   {selectedItems[date].join(" / ")}
//                                   {selectedSubstituteItems[date]?.length > 0 &&
//                                     " / " +
//                                       selectedSubstituteItems[date].join(" / ")}
//                                   {selectedAddOnItems[date]?.length > 0 &&
//                                     " / " +
//                                       selectedAddOnItems[date].join(" / ")}
//                                   {index < sortedDates.length - 1 && <br />}
//                                 </span>
//                               ))}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-12 col-xl-6">
//                     <div className="lbCheckOutDetail">
//                       <div className="lbProductsPriceTbl">
//                         <table className="table">
//                           <tbody>
//                             <tr>
//                               <td>Cart Total</td>
//                               <td>
//                                 <strong>${calculateTotalPrice()}</strong>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td>Delivery</td>
//                               <td>
//                                 <strong>Free</strong>
//                               </td>
//                             </tr>
//                             <tr>
//                               <td>Total</td>
//                               <td>
//                                 <strong>
//                                   $
//                                   {parseFloat(calculateTotalPrice()).toFixed(2)}
//                                 </strong>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>
//                       <div className="lbCheckOutBtn">
//                         <button type="submit" className="btn btnPrimary">
//                           Place Order
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PlaceOrderPage;
