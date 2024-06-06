import React, { useState, useEffect } from "react";
import axios from "axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import img42 from "../images/img42.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

const UpdateOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noOrders, setNoOrders] = useState(false);
  const [thaliName, setThaliName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [years, setYears] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateCount, setDateCount] = useState(0); // New state for counting dates
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          toast.error("Please Login");
          throw new Error("User email not found in local storage");
        }

        const response = await axios.get(
          `http://localhost:80/api/v1/modify-order?userEmail=${userEmail}`
        );

        const orderData = response.data.data;
        if (!orderData || orderData.length === 0) {
          setNoOrders(true);
          setLoading(false);
          return;
        }

        const formattedOrderData = orderData.map((order) => ({
          ...order,
          data: order.data.map((entry) => ({
            ...entry,
            formattedDate:
              entry.date !== "N/A"
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                  }).format(new Date(entry.date))
                : "Invalid Date",
          })),
        }));

        setOrders(formattedOrderData);
        setLoading(false);

        const orderYears = Array.from(
          new Set(
            orderData.flatMap((order) =>
              order.data.map((entry) => new Date(entry.date).getFullYear())
            )
          )
        );
        setYears(orderYears);
        setSelectedYear(orderYears.length > 0 ? orderYears[0] : "");
      } catch (error) {
        toast.error("Error fetching orders: " + error.message);
        setLoading(false);
      }
    };

    const thali = localStorage.getItem("thaliName");
    setThaliName(thali || "Special Thali");

    fetchOrders();
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const filteredOrders = orders.filter((order) =>
    order.data.some(
      (entry) => new Date(entry.date).getFullYear() === selectedYear
    )
  );

  const handleOpenModal = (orderId, dates) => {
    const now = new Date();
    const ninePM = new Date();
    ninePM.setHours(21, 0, 0, 0);

    const filteredDates = dates.filter((date) => {
      const dateObj = new Date(date);
      if (now < ninePM) {
        return dateObj > now;
      } else {
        return dateObj > now && dateObj.getDate() !== now.getDate();
      }
    });

    setSelectedOrderId(orderId);
    setAvailableDates(filteredDates);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedOrderId(null);
    setAvailableDates([]);
    setSelectedDate(null);
    setDateCount(0); // Reset date count when closing modal
  };
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date) => {
    const selectedDateObj = new Date(date);
    setSelectedDate(selectedDateObj);

    const remainingDatesCount = availableDates.filter(
      (d) => new Date(d) >= selectedDateObj
    ).length;
    setDateCount(remainingDatesCount); // Update date count
    console.log("Selected Date:", selectedDateObj);
  };

  const handleConfirmModification = () => {
    if (selectedDate) {
      const orderId = selectedOrderId;
      const thaliName = localStorage.getItem("thaliName");
      const thaliDays = dateCount; // Use the date count

      const formattedStartDate = formatDateToYYYYMMDD(selectedDate);

      navigate(
        `/thali-details/${thaliName}/${thaliDays}/${formattedStartDate}?orderId=${orderId}`
      );

      handleCloseModal();
      console.log("selected date:", selectedDate);
      console.log("formattedStartDate", formattedStartDate);
    } else {
      toast.error("Please select a date.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (noOrders) {
    return <p className="no-order-data">No orders placed</p>;
  }

  return (
    <div>
      <ToastContainer />
      <section className="w-100 clearfix myProfile" id="myProfile">
        <div className="container">
          <div className="myProfileInner">
            <div className="tabContent">
              <div className="tab-content">
                <div className="tab-pane active" id="my-order">
                  <div className="myOrderContent">
                    <div className="myOrderHistoryhead">
                      <div className="orderHistoryHeading">
                        <h4>Order History</h4>
                      </div>
                      <div className="orderHistoryYearSelect">
                        <select
                          className="form-select"
                          value={selectedYear}
                          onChange={handleYearChange}
                        >
                          {years.map((year) => (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="orderCardGroup">
                      <div className="row">
                        {filteredOrders.map((order) => (
                          <div className="col-md-6" key={order._id}>
                            <div className="orderCard">
                              <div className="orderCardInner">
                                <div className="orderCardHead">
                                  <div className="orderCardHeadLeftCol">
                                    <a href="" className="shipped">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 512"
                                        width="18"
                                        height="18"
                                      ></svg>
                                      <span className="orderShipped">
                                        Ordered
                                      </span>
                                    </a>
                                  </div>
                                  <div className="orderCardHeadRightCol">
                                    <a href="" className="invoice">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="17"
                                        viewBox="0 0 14 17"
                                        fill="none"
                                      ></svg>
                                    </a>
                                    <a href=";" className="tracking">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="19"
                                        height="16"
                                        viewBox="0 0 384 512"
                                      ></svg>
                                    </a>
                                  </div>
                                </div>
                                <div className="orderCardBody">
                                  <div className="orderCardInnerBody">
                                    <div className="orderCardImgBody">
                                      <img
                                        src={img42}
                                        alt="img"
                                        className="img-fluid"
                                      />
                                    </div>
                                    <div className="orderCardImgContent">
                                      <h4>
                                        <a href="">{order.thaliName}</a>
                                      </h4>
                                      <div className="scrollable-items spacious-items">
                                        {order.data.map((entry) => (
                                          <div key={entry.date}>
                                            {entry.items.length > 0 && (
                                              <p>
                                                <span>
                                                  {entry.formattedDate}
                                                </span>
                                                {" : "}
                                                <span>
                                                  {entry.items
                                                    .map((item) => item.name)
                                                    .join(" / ")}
                                                </span>
                                              </p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                      <div className="star">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon
                                          icon={faStar}
                                          style={{ color: "gray" }}
                                        />
                                      </div>
                                      <div className="orderCardBtn">
                                        <button
                                          className="btn btnSecondary"
                                          onClick={() =>
                                            handleOpenModal(
                                              order._id,
                                              order.data.map(
                                                (entry) => entry.date
                                              )
                                            )
                                          }
                                        >
                                          <span>Modify Order</span>
                                        </button>
                                        <span className="orderPrice">
                                          ${order.totalPrice}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>Select a Date for Modification</h2>
        <ul>
          {availableDates.map((date) => {
            const dateObj = new Date(date);
            const isSelected =
              selectedDate &&
              dateObj.getFullYear() === selectedDate.getFullYear() &&
              dateObj.getMonth() === selectedDate.getMonth() &&
              dateObj.getDate() === selectedDate.getDate();
            return (
              <li key={date}>
                <button
                  className={`date-button ${isSelected ? "selected" : ""}`}
                  onClick={() => handleDateSelect(date)}
                >
                  {new Date(date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="modal-buttons">
          <button
            onClick={handleConfirmModification}
            className="btn btnPrimary"
          >
            Confirm
          </button>
          <button onClick={handleCloseModal} className="btn btnPrimary">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateOrder;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate } from "react-router-dom";
// import img42 from "../images/img42.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Modal from "react-modal";

// const UpdateOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [noOrders, setNoOrders] = useState(false);
//   const [thaliName, setThaliName] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [years, setYears] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [availableDates, setAvailableDates] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [dateCount, setDateCount] = useState(0); // New state for counting dates
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const userEmail = localStorage.getItem("userEmail");
//         if (!userEmail) {
//           toast.error("Please Login");
//           throw new Error("User email not found in local storage");
//         }

//         const response = await axios.get(
//           `http://localhost:80/api/v1/modify-order?userEmail=${userEmail}`
//         );

//         const orderData = response.data.data;
//         if (!orderData || orderData.length === 0) {
//           setNoOrders(true);
//           setLoading(false);
//           return;
//         }

//         const formattedOrderData = orderData.map((order) => ({
//           ...order,
//           data: order.data.map((entry) => ({
//             ...entry,
//             formattedDate:
//               entry.date !== "N/A"
//                 ? new Intl.DateTimeFormat("en-GB", {
//                     day: "numeric",
//                     month: "short",
//                   }).format(new Date(entry.date))
//                 : "Invalid Date",
//           })),
//         }));

//         setOrders(formattedOrderData);
//         setLoading(false);

//         const orderYears = Array.from(
//           new Set(
//             orderData.flatMap((order) =>
//               order.data.map((entry) => new Date(entry.date).getFullYear())
//             )
//           )
//         );
//         setYears(orderYears);
//         setSelectedYear(orderYears.length > 0 ? orderYears[0] : "");
//       } catch (error) {
//         toast.error("Error fetching orders: " + error.message);
//         setLoading(false);
//       }
//     };

//     const thali = localStorage.getItem("thaliName");
//     setThaliName(thali || "Special Thali");

//     fetchOrders();
//   }, []);

//   const handleYearChange = (e) => {
//     setSelectedYear(parseInt(e.target.value, 10));
//   };

//   const filteredOrders = orders.filter((order) =>
//     order.data.some(
//       (entry) => new Date(entry.date).getFullYear() === selectedYear
//     )
//   );

//   const handleOpenModal = (orderId, dates) => {
//     const now = new Date();
//     const ninePM = new Date();
//     ninePM.setHours(21, 0, 0, 0);

//     const filteredDates = dates.filter((date) => {
//       const dateObj = new Date(date);
//       if (now < ninePM) {
//         return dateObj > now;
//       } else {
//         return dateObj > now && dateObj.getDate() !== now.getDate();
//       }
//     });

//     setSelectedOrderId(orderId);
//     setAvailableDates(filteredDates);
//     setModalIsOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalIsOpen(false);
//     setSelectedOrderId(null);
//     setAvailableDates([]);
//     setSelectedDate(null);
//     setDateCount(0); // Reset date count when closing modal
//   };

//   const handleDateSelect = (date) => {
//     const selectedDateObj = new Date(date);
//     const utcDate = new Date(
//       Date.UTC(
//         selectedDateObj.getFullYear(),
//         selectedDateObj.getMonth(),
//         selectedDateObj.getDate()
//       )
//     );
//     const formattedDate = utcDate.toISOString().split("T")[0];
//     setSelectedDate(formattedDate);

//     const remainingDatesCount = availableDates.filter(
//       (d) => new Date(d) >= selectedDateObj
//     ).length;
//     setDateCount(remainingDatesCount); // Update date count
//     console.log("Selected Date:", formattedDate);
//   };

//   const handleConfirmModification = () => {
//     if (selectedDate) {
//       const orderId = selectedOrderId;
//       const thaliName = localStorage.getItem("thaliName");
//       const thaliDays = dateCount; // Use the date count

//       const formattedStartDate = new Date(selectedDate)
//         .toISOString()
//         .split("T")[0];

//       navigate(
//         `/thali-details/${thaliName}/${thaliDays}/${formattedStartDate}?orderId=${orderId}`
//       );

//       handleCloseModal();
//       console.log("selected date:", selectedDate);
//       console.log(formattedStartDate);
//     } else {
//       toast.error("Please select a date.");
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (noOrders) {
//     return <p className="no-order-data">No orders placed</p>;
//   }

//   return (
//     <div>
//       <ToastContainer />
//       <section className="w-100 clearfix myProfile" id="myProfile">
//         <div className="container">
//           <div className="myProfileInner">
//             <div className="tabContent">
//               <div className="tab-content">
//                 <div className="tab-pane active" id="my-order">
//                   <div className="myOrderContent">
//                     <div className="myOrderHistoryhead">
//                       <div className="orderHistoryHeading">
//                         <h4>Order History</h4>
//                       </div>
//                       <div className="orderHistoryYearSelect">
//                         <select
//                           className="form-select"
//                           value={selectedYear}
//                           onChange={handleYearChange}
//                         >
//                           {years.map((year) => (
//                             <option key={year} value={year.toString()}>
//                               {year}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="orderCardGroup">
//                       <div className="row">
//                         {filteredOrders.map((order) => (
//                           <div className="col-md-6" key={order._id}>
//                             <div className="orderCard">
//                               <div className="orderCardInner">
//                                 <div className="orderCardHead">
//                                   <div className="orderCardHeadLeftCol">
//                                     <a href="" className="shipped">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 640 512"
//                                         width="18"
//                                         height="18"
//                                       ></svg>
//                                       <span className="orderShipped">
//                                         Ordered
//                                       </span>
//                                     </a>
//                                   </div>
//                                   <div className="orderCardHeadRightCol">
//                                     <a href="" className="invoice">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="14"
//                                         height="17"
//                                         viewBox="0 0 14 17"
//                                         fill="none"
//                                       ></svg>
//                                     </a>
//                                     <a href=";" className="tracking">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="19"
//                                         height="16"
//                                         viewBox="0 0 384 512"
//                                       ></svg>
//                                     </a>
//                                   </div>
//                                 </div>
//                                 <div className="orderCardBody">
//                                   <div className="orderCardInnerBody">
//                                     <div className="orderCardImgBody">
//                                       <img
//                                         src={img42}
//                                         alt="img"
//                                         className="img-fluid"
//                                       />
//                                     </div>
//                                     <div className="orderCardImgContent">
//                                       <h4>
//                                         <a href="">{order.thaliName}</a>
//                                       </h4>
//                                       <div className="scrollable-items spacious-items">
//                                         {order.data.map((entry) => (
//                                           <div key={entry.date}>
//                                             {entry.items.length > 0 && (
//                                               <p>
//                                                 <span>
//                                                   {entry.formattedDate}
//                                                 </span>
//                                                 {" : "}
//                                                 <span>
//                                                   {entry.items
//                                                     .map((item) => item.name)
//                                                     .join(" / ")}
//                                                 </span>
//                                               </p>
//                                             )}
//                                           </div>
//                                         ))}
//                                       </div>
//                                       <div className="star">
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon
//                                           icon={faStar}
//                                           style={{ color: "gray" }}
//                                         />
//                                       </div>
//                                       <div className="orderCardBtn">
//                                         <button
//                                           className="btn btnSecondary"
//                                           onClick={() =>
//                                             handleOpenModal(
//                                               order._id,
//                                               order.data.map(
//                                                 (entry) => entry.date
//                                               )
//                                             )
//                                           }
//                                         >
//                                           <span>Modify Order</span>
//                                         </button>
//                                         <span className="orderPrice">
//                                           ${order.totalPrice}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={handleCloseModal}
//         className="custom-modal"
//         overlayClassName="custom-overlay"
//       >
//         <h2>Select a Date for Modification</h2>
//         <ul>
//           {availableDates.map((date) => (
//             <li key={date}>
//               <button
//                 className={`date-button ${
//                   selectedDate === date ? "selected" : ""
//                 }`}
//                 onClick={() => handleDateSelect(date)}
//               >
//                 {new Date(date).toLocaleDateString("en-GB", {
//                   day: "numeric",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </button>
//             </li>
//           ))}
//         </ul>
//         <div className="modal-buttons">
//           <button
//             onClick={handleConfirmModification}
//             className=" btn btnPrimary"
//           >
//             Confirm
//           </button>
//           <button onClick={handleCloseModal} className=" btn btnPrimary">
//             Cancel
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default UpdateOrder;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate } from "react-router-dom";
// import img42 from "../images/img42.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Modal from "react-modal";

// const UpdateOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [noOrders, setNoOrders] = useState(false);
//   const [thaliName, setThaliName] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [years, setYears] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [availableDates, setAvailableDates] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const userEmail = localStorage.getItem("userEmail");
//         if (!userEmail) {
//           toast.error("Please Login");
//           throw new Error("User email not found in local storage");
//         }

//         const response = await axios.get(
//           `http://localhost:80/api/v1/modify-order?userEmail=${userEmail}`
//         );

//         const orderData = response.data.data;
//         if (!orderData || orderData.length === 0) {
//           setNoOrders(true);
//           setLoading(false);
//           return;
//         }

//         const formattedOrderData = orderData.map((order) => ({
//           ...order,
//           data: order.data.map((entry) => ({
//             ...entry,
//             formattedDate:
//               entry.date !== "N/A"
//                 ? new Intl.DateTimeFormat("en-GB", {
//                     day: "numeric",
//                     month: "short",
//                   }).format(new Date(entry.date))
//                 : "Invalid Date",
//           })),
//         }));

//         setOrders(formattedOrderData);
//         setLoading(false);

//         const orderYears = Array.from(
//           new Set(
//             orderData.flatMap((order) =>
//               order.data.map((entry) => new Date(entry.date).getFullYear())
//             )
//           )
//         );
//         setYears(orderYears);
//         setSelectedYear(orderYears.length > 0 ? orderYears[0] : "");
//       } catch (error) {
//         toast.error("Error fetching orders: " + error.message);
//         setLoading(false);
//       }
//     };

//     const thali = localStorage.getItem("thaliName");
//     setThaliName(thali || "Special Thali");

//     fetchOrders();
//   }, []);

//   const handleYearChange = (e) => {
//     setSelectedYear(parseInt(e.target.value, 10));
//   };

//   const filteredOrders = orders.filter((order) =>
//     order.data.some(
//       (entry) => new Date(entry.date).getFullYear() === selectedYear
//     )
//   );

//   const handleOpenModal = (orderId, dates) => {
//     const now = new Date();
//     const ninePM = new Date();
//     ninePM.setHours(21, 0, 0, 0);

//     const filteredDates = dates.filter((date) => {
//       const dateObj = new Date(date);
//       if (now < ninePM) {
//         return dateObj > now;
//       } else {
//         return dateObj > now && dateObj.getDate() !== now.getDate();
//       }
//     });

//     setSelectedOrderId(orderId);
//     setAvailableDates(filteredDates);
//     setModalIsOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalIsOpen(false);
//     setSelectedOrderId(null);
//     setAvailableDates([]);
//     setSelectedDate(null);
//   };

//   const handleDateSelect = (date) => {
//     const selectedDateObj = new Date(date);
//     const utcDate = new Date(
//       Date.UTC(
//         selectedDateObj.getFullYear(),
//         selectedDateObj.getMonth(),
//         selectedDateObj.getDate()
//       )
//     );
//     const formattedDate = utcDate.toISOString().split("T")[0];
//     setSelectedDate(formattedDate);
//     console.log("Selected Date:", formattedDate);
//   };

//   const handleConfirmModification = () => {
//     if (selectedDate) {
//       const orderId = selectedOrderId;
//       const thaliName = localStorage.getItem("thaliName");
//       const thaliDays = availableDates.length;

//       const formattedStartDate = new Date(selectedDate)
//         .toISOString()
//         .split("T")[0];

//       navigate(
//         `/thali-details/${thaliName}/${thaliDays}/${formattedStartDate}?orderId=${orderId}`
//       );

//       handleCloseModal();
//       console.log("selected date:", selectedDate);
//       console.log(formattedStartDate);
//     } else {
//       toast.error("Please select a date.");
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (noOrders) {
//     return <p className="no-order-data">No orders placed</p>;
//   }

//   return (
//     <div>
//       <ToastContainer />
//       <section className="w-100 clearfix myProfile" id="myProfile">
//         <div className="container">
//           <div className="myProfileInner">
//             <div className="tabContent">
//               <div className="tab-content">
//                 <div className="tab-pane active" id="my-order">
//                   <div className="myOrderContent">
//                     <div className="myOrderHistoryhead">
//                       <div className="orderHistoryHeading">
//                         <h4>Order History</h4>
//                       </div>
//                       <div className="orderHistoryYearSelect">
//                         <select
//                           className="form-select"
//                           value={selectedYear}
//                           onChange={handleYearChange}
//                         >
//                           {years.map((year) => (
//                             <option key={year} value={year.toString()}>
//                               {year}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="orderCardGroup">
//                       <div className="row">
//                         {filteredOrders.map((order) => (
//                           <div className="col-md-6" key={order._id}>
//                             <div className="orderCard">
//                               <div className="orderCardInner">
//                                 <div className="orderCardHead">
//                                   <div className="orderCardHeadLeftCol">
//                                     <a href="" className="shipped">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 640 512"
//                                         width="18"
//                                         height="18"
//                                       ></svg>
//                                       <span className="orderShipped">
//                                         Ordered
//                                       </span>
//                                     </a>
//                                   </div>
//                                   <div className="orderCardHeadRightCol">
//                                     <a href="" className="invoice">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="14"
//                                         height="17"
//                                         viewBox="0 0 14 17"
//                                         fill="none"
//                                       ></svg>
//                                     </a>
//                                     <a href=";" className="tracking">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="19"
//                                         height="16"
//                                         viewBox="0 0 384 512"
//                                       ></svg>
//                                     </a>
//                                   </div>
//                                 </div>
//                                 <div className="orderCardBody">
//                                   <div className="orderCardInnerBody">
//                                     <div className="orderCardImgBody">
//                                       <img
//                                         src={img42}
//                                         alt="img"
//                                         className="img-fluid"
//                                       />
//                                     </div>
//                                     <div className="orderCardImgContent">
//                                       <h4>
//                                         <a href="">{order.thaliName}</a>
//                                       </h4>
//                                       <div className="scrollable-items">
//                                         {order.data.map((entry) => (
//                                           <div key={entry.date}>
//                                             {entry.items.length > 0 && (
//                                               <p>
//                                                 <span>
//                                                   {entry.formattedDate}
//                                                 </span>
//                                                 {" : "}
//                                                 <span>
//                                                   {entry.items
//                                                     .map((item) => item.name)
//                                                     .join(" / ")}
//                                                 </span>
//                                               </p>
//                                             )}
//                                           </div>
//                                         ))}
//                                       </div>
//                                       <div className="star">
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon
//                                           icon={faStar}
//                                           style={{ color: "gray" }}
//                                         />
//                                       </div>
//                                       <div className="orderCardBtn">
//                                         <button
//                                           className="btn btnSecondary"
//                                           onClick={() =>
//                                             handleOpenModal(
//                                               order._id,
//                                               order.data.map(
//                                                 (entry) => entry.date
//                                               )
//                                             )
//                                           }
//                                         >
//                                           <span>Modify Order</span>
//                                         </button>
//                                         <span className="orderPrice">
//                                           ${order.totalPrice}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={handleCloseModal}
//         className="custom-modal"
//         overlayClassName="custom-overlay"
//       >
//         <h2>Select a Date for Modification</h2>
//         <ul>
//           {availableDates.map((date) => (
//             <li key={date}>
//               <button
//                 className={`date-button ${
//                   selectedDate === date ? "selected" : ""
//                 }`}
//                 onClick={() => handleDateSelect(date)}
//               >
//                 {new Date(date).toLocaleDateString("en-GB", {
//                   day: "numeric",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               </button>
//             </li>
//           ))}
//         </ul>
//         <button onClick={handleConfirmModification}>Confirm</button>
//         <button onClick={handleCloseModal}>Cancel</button>
//       </Modal>
//     </div>
//   );
// };

// export default UpdateOrder;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useNavigate } from "react-router-dom";
// import img42 from "../images/img42.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UpdateOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [noOrders, setNoOrders] = useState(false);
//   const [thaliName, setThaliName] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [years, setYears] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const userEmail = localStorage.getItem("userEmail");
//         if (!userEmail) {
//           toast.error("Please Login");
//           throw new Error("User email not found in local storage");
//         }

//         const response = await axios.get(
//           `http://localhost:80/api/v1/modify-order?userEmail=${userEmail}`
//         );

//         const orderData = response.data.data;
//         if (!orderData || orderData.length === 0) {
//           setNoOrders(true); // Set no orders state
//           setLoading(false);
//           return;
//         }

//         const formattedOrderData = orderData.map((order) => ({
//           ...order,
//           data: order.data.map((entry) => ({
//             ...entry,
//             formattedDate:
//               entry.date !== "N/A"
//                 ? new Intl.DateTimeFormat("en-GB", {
//                     day: "numeric",
//                     month: "short",
//                   }).format(new Date(entry.date))
//                 : "Invalid Date",
//           })),
//         }));

//         setOrders(formattedOrderData);
//         setLoading(false);

//         const orderYears = Array.from(
//           new Set(
//             orderData.flatMap((order) =>
//               order.data.map((entry) => new Date(entry.date).getFullYear())
//             )
//           )
//         );
//         setYears(orderYears);
//         setSelectedYear(orderYears.length > 0 ? orderYears[0] : "");
//       } catch (error) {
//         toast.error("Error fetching orders: " + error.message);
//         setLoading(false);
//       }
//     };

//     const thali = localStorage.getItem("thaliName");
//     setThaliName(thali || "Special Thali");

//     fetchOrders();
//   }, []);

//   const handleYearChange = (e) => {
//     setSelectedYear(parseInt(e.target.value, 10));
//   };

//   const handleBuyAgain = async (orderId) => {
//     try {
//       const userEmail = localStorage.getItem("userEmail");
//       const thaliName = localStorage.getItem("thaliName");
//       const thaliDays = localStorage.getItem("selectedMealPlanDays");

//       const response = await axios.post(
//         `http://localhost:80/api/v1/mark-modification`,
//         {
//           orderId,
//           userEmail,
//         }
//       );

//       const { message, modificationCounter, startDate } = response.data;

//       console.log("StartDate from response:", startDate); // Log the startDate to verify

//       if (modificationCounter <= 0) {
//         toast.warn("You have used all your modification attempts.");
//         localStorage.removeItem("orderId");
//         return;
//       }

//       localStorage.setItem("orderId", orderId);

//       navigate(
//         `/thali-details/${thaliName}/${thaliDays}/${startDate}?orderId=${orderId}`
//       );
//     } catch (error) {
//       if (error.response) {
//         if (error.response.data.modificationCounter === 0) {
//           localStorage.removeItem("orderId");
//         }
//         toast.error(`Error: ${error.response.data.message}`);
//       } else {
//         toast.error("An unknown error occurred.");
//       }
//     }
//   };

//   const filteredOrders = orders.filter((order) =>
//     order.data.some(
//       (entry) => new Date(entry.date).getFullYear() === selectedYear
//     )
//   );

//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   if (noOrders) {
//     return <p className="no-order-data">No orders placed</p>;
//   }

//   return (
//     <div>
//       <ToastContainer />
//       <section className="w-100 clearfix myProfile" id="myProfile">
//         <div className="container">
//           <div className="myProfileInner">
//             <div className="tabContent">
//               <div className="tab-content">
//                 <div className="tab-pane active" id="my-order">
//                   <div className="myOrderContent">
//                     <div className="myOrderHistoryhead">
//                       <div className="orderHistoryHeading">
//                         <h4>Order History</h4>
//                       </div>
//                       <div className="orderHistoryYearSelect">
//                         <select
//                           className="form-select"
//                           value={selectedYear}
//                           onChange={handleYearChange}
//                         >
//                           {years.map((year) => (
//                             <option key={year} value={year.toString()}>
//                               {year}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="orderCardGroup">
//                       <div className="row">
//                         {filteredOrders.map((order) => (
//                           <div className="col-md-6" key={order._id}>
//                             <div className="orderCard">
//                               <div className="orderCardInner">
//                                 <div className="orderCardHead">
//                                   <div className="orderCardHeadLeftCol">
//                                     <a href="" className="shipped">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 640 512"
//                                         width="18"
//                                         height="18"
//                                       ></svg>
//                                       <span className="orderShipped">
//                                         Ordered
//                                       </span>
//                                     </a>
//                                   </div>
//                                   <div className="orderCardHeadRightCol">
//                                     <a href="" className="invoice">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="14"
//                                         height="17"
//                                         viewBox="0 0 14 17"
//                                         fill="none"
//                                       ></svg>
//                                     </a>
//                                     <a href=";" className="tracking">
//                                       <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         width="19"
//                                         height="16"
//                                         viewBox="0 0 384 512"
//                                       ></svg>
//                                     </a>
//                                   </div>
//                                 </div>
//                                 <div className="orderCardBody">
//                                   <div className="orderCardInnerBody">
//                                     <div className="orderCardImgBody">
//                                       <img
//                                         src={img42}
//                                         alt="img"
//                                         className="img-fluid"
//                                       />
//                                     </div>
//                                     <div className="orderCardImgContent">
//                                       <h4>
//                                         <a href="">{order.thaliName}</a>
//                                       </h4>
//                                       <div className="scrollable-items">
//                                         {order.data.map((entry) => (
//                                           <div key={entry.date}>
//                                             {entry.items.length > 0 && (
//                                               <p>
//                                                 <span>
//                                                   {entry.formattedDate}
//                                                 </span>
//                                                 {" : "}
//                                                 <span>
//                                                   {entry.items
//                                                     .map((item) => item.name)
//                                                     .join(" / ")}
//                                                 </span>
//                                               </p>
//                                             )}
//                                           </div>
//                                         ))}
//                                       </div>
//                                       <div className="star">
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon icon={faStar} />
//                                         <FontAwesomeIcon
//                                           icon={faStar}
//                                           style={{ color: "gray" }}
//                                         />
//                                       </div>
//                                       <div className="orderCardBtn">
//                                         <button
//                                           className="btn btnSecondary"
//                                           onClick={() =>
//                                             handleBuyAgain(
//                                               order._id,
//                                               order.startDate
//                                             )
//                                           }
//                                         >
//                                           <span>Modify Order</span>
//                                         </button>
//                                         <span className="orderPrice">
//                                           ${order.totalPrice}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
// export default UpdateOrder;
