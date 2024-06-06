import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MenuCard from "../components/MenuCard/MenuCard.jsx"; // Import the MenuCard component
import "../components/MenuCard/MenuCard.css"; // Import the CSS file for styling

const MainMenuPage = () => {
  const [mainMenu, setMainMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedSubstituteItems, setSelectedSubstituteItems] = useState({});
  const [selectedAddOnItems, setSelectedAddOnItems] = useState({});
  const [selectedDaysCount, setSelectedDaysCount] = useState(0);
  const { name, days, startDate } = useParams();
  const [firstName, secondName] = name.split(" ");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMainMenu = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/v1/thali-details/${name}/${days}/${
            startDate || ""
          }`
        );
        const menuData = response.data.menuData || [];
        setMainMenu(menuData);

        // Initialize with no items selected
        const initialSelectedItems = {};
        menuData.forEach((menu) => {
          initialSelectedItems[menu.date] = [];
        });

        setSelectedItems(initialSelectedItems);
        setSelectedDaysCount(0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMainMenu();
    localStorage.setItem("thaliName", name);
  }, [name, days, startDate]);

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    localStorage.setItem(
      "selectedSubstituteItems",
      JSON.stringify(selectedSubstituteItems)
    );
    localStorage.setItem(
      "selectedAddOnItems",
      JSON.stringify(selectedAddOnItems)
    );

    const totalAddOnItemPrices = {};
    mainMenu.forEach((menu) => {
      const date = menu.date;
      const totalAddOnPrice = menu.addOnItems.reduce((total, addOnItem) => {
        if (selectedAddOnItems[date]?.includes(addOnItem.name)) {
          return total + parseFloat(addOnItem.price);
        }
        return total;
      }, 0);
      totalAddOnItemPrices[date] = totalAddOnPrice.toString();
    });
    localStorage.setItem(
      "totalAddOnItemPrices",
      JSON.stringify(totalAddOnItemPrices)
    );
  }, [selectedItems, selectedSubstituteItems, selectedAddOnItems, mainMenu]);

  const handleItemSelection = (date, itemName) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = { ...prevSelectedItems };
      if (updatedSelectedItems[date]?.includes(itemName)) {
        updatedSelectedItems[date] = updatedSelectedItems[date].filter(
          (item) => item !== itemName
        );
      } else {
        updatedSelectedItems[date] = [
          ...(updatedSelectedItems[date] || []),
          itemName,
        ];
      }

      const count = Object.keys(updatedSelectedItems).reduce((acc, date) => {
        if (updatedSelectedItems[date]?.length > 0) {
          return acc + 1;
        }
        return acc;
      }, 0);
      setSelectedDaysCount(count);

      return updatedSelectedItems;
    });
  };

  const handleSubstituteItemSelection = (date, itemName) => {
    setSelectedSubstituteItems((prevSelectedSubstituteItems) => {
      const updatedSelectedSubstituteItems = { ...prevSelectedSubstituteItems };
      if (updatedSelectedSubstituteItems[date]?.includes(itemName)) {
        updatedSelectedSubstituteItems[date] = updatedSelectedSubstituteItems[
          date
        ].filter((item) => item !== itemName);
      } else {
        updatedSelectedSubstituteItems[date] = [
          ...(updatedSelectedSubstituteItems[date] || []),
          itemName,
        ];
      }
      return updatedSelectedSubstituteItems;
    });
  };

  const handleAddOnItemSelection = (date, itemName) => {
    setSelectedAddOnItems((prevSelectedAddOnItems) => {
      const updatedSelectedAddOnItems = { ...prevSelectedAddOnItems };
      if (updatedSelectedAddOnItems[date]?.includes(itemName)) {
        updatedSelectedAddOnItems[date] = updatedSelectedAddOnItems[
          date
        ].filter((item) => item !== itemName);
      } else {
        updatedSelectedAddOnItems[date] = [
          ...(updatedSelectedAddOnItems[date] || []),
          itemName,
        ];
      }
      return updatedSelectedAddOnItems;
    });
  };

  const handleAddButtonClick = (date) => {
    const menuForDate = mainMenu.find((menu) => menu.date === date);
    if (menuForDate) {
      setSelectedItems((prevSelectedItems) => {
        const updatedSelectedItems = { ...prevSelectedItems };

        if (updatedSelectedItems[date].length === menuForDate.items.length) {
          // Deselect all items
          updatedSelectedItems[date] = [];
          setSelectedDaysCount((prevCount) => prevCount - 1);
        } else {
          // Select all items
          updatedSelectedItems[date] = menuForDate.items.map(
            (item) => item.name
          );
          setSelectedDaysCount((prevCount) => prevCount + 1);
        }

        return updatedSelectedItems;
      });
    }
  };

  const filterEmptySelections = (selections) => {
    return Object.fromEntries(
      Object.entries(selections).filter(([date, items]) => items.length > 0)
    );
  };

  const handleProceedToCheckout = () => {
    if (selectedDaysCount === parseInt(days)) {
      const filteredSelectedItems = filterEmptySelections(selectedItems);
      const filteredSelectedSubstituteItems = filterEmptySelections(
        selectedSubstituteItems
      );
      const filteredSelectedAddOnItems =
        filterEmptySelections(selectedAddOnItems);

      console.log("Data being sent to the next page:", {
        selectedItems: filteredSelectedItems,
        selectedSubstituteItems: filteredSelectedSubstituteItems,
        selectedAddOnItems: filteredSelectedAddOnItems,
        selectedDaysCount,
      });

      navigate("/placeOrder", {
        state: {
          selectedItems: filteredSelectedItems,
          selectedSubstituteItems: filteredSelectedSubstituteItems,
          selectedAddOnItems: filteredSelectedAddOnItems,
          selectedDaysCount,
        },
      });
    }
  };

  return (
    <>
      <div className="commonHeading headingLeft main-menuHeading">
        <h4>
          Main <span>Menu</span>
        </h4>
      </div>
      <div className={`operator ${mainMenu.length === 1 ? "single-card" : ""}`}>
        {mainMenu.map((menu, index) => (
          <MenuCard
            key={index}
            date={menu.date}
            items={menu.items}
            substituteItems={menu.substituteItems}
            addOnItems={menu.addOnItems}
            selectedItems={selectedItems[menu.date] || []}
            selectedSubstituteItems={selectedSubstituteItems[menu.date] || []}
            selectedAddOnItems={selectedAddOnItems[menu.date] || []}
            handleItemSelection={handleItemSelection}
            handleSubstituteItemSelection={handleSubstituteItemSelection}
            handleAddOnItemSelection={handleAddOnItemSelection}
            handleAddButtonClick={handleAddButtonClick}
          />
        ))}
      </div>
      <div className="checkout-btn">
        <button
          className={`btn spacious-button ${
            selectedDaysCount !== parseInt(days)
              ? "btnPrimary disabled"
              : "btnPrimary"
          }`}
          onClick={handleProceedToCheckout}
          disabled={selectedDaysCount !== parseInt(days)}
          title={
            selectedDaysCount !== parseInt(days)
              ? `Please select ${days} days`
              : ""
          }
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default MainMenuPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import MenuCard from "../components/MenuCard/MenuCard.jsx";
// import "../components/MenuCard/MenuCard.css";

// const MainMenuPage = () => {
//   const [mainMenu, setMainMenu] = useState([]);
//   const [selectedItems, setSelectedItems] = useState({});
//   const [selectedSubstituteItems, setSelectedSubstituteItems] = useState({});
//   const [selectedAddOnItems, setSelectedAddOnItems] = useState({});
//   const [selectedDaysCount, setSelectedDaysCount] = useState(0);
//   const { name, days, startDate } = useParams();
//   const [firstName, secondName] = name.split(" ");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMainMenu = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:80/api/v1/thali-details/${name}/${days}/${
//             startDate || ""
//           }`
//         );
//         const menuData = response.data.menuData || [];
//         setMainMenu(menuData);

//         const initialSelectedItems = {};
//         let count = 0;
//         menuData.forEach((menu, index) => {
//           if (index < parseInt(days)) {
//             initialSelectedItems[menu.date] = menu.items.map(
//               (item) => item.name
//             );
//             count++;
//           }
//         });

//         setSelectedItems(initialSelectedItems);
//         setSelectedDaysCount(count);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchMainMenu();
//     localStorage.setItem("thaliName", name);
//   }, [name, days, startDate]);

//   useEffect(() => {
//     localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
//     localStorage.setItem(
//       "selectedSubstituteItems",
//       JSON.stringify(selectedSubstituteItems)
//     );
//     localStorage.setItem(
//       "selectedAddOnItems",
//       JSON.stringify(selectedAddOnItems)
//     );

//     const totalAddOnItemPrices = {};
//     mainMenu.forEach((menu) => {
//       const date = menu.date;
//       const totalAddOnPrice = menu.addOnItems.reduce((total, addOnItem) => {
//         if (selectedAddOnItems[date]?.includes(addOnItem.name)) {
//           return total + parseFloat(addOnItem.price);
//         }
//         return total;
//       }, 0);
//       totalAddOnItemPrices[date] = totalAddOnPrice.toString();
//     });
//     localStorage.setItem(
//       "totalAddOnItemPrices",
//       JSON.stringify(totalAddOnItemPrices)
//     );
//   }, [selectedItems, selectedSubstituteItems, selectedAddOnItems, mainMenu]);

//   const handleItemSelection = (date, itemName) => {
//     setSelectedItems((prevSelectedItems) => {
//       const updatedSelectedItems = { ...prevSelectedItems };
//       if (updatedSelectedItems[date]?.includes(itemName)) {
//         updatedSelectedItems[date] = updatedSelectedItems[date].filter(
//           (item) => item !== itemName
//         );
//       } else {
//         updatedSelectedItems[date] = [
//           ...(updatedSelectedItems[date] || []),
//           itemName,
//         ];
//       }

//       const count = Object.keys(updatedSelectedItems).reduce((acc, date) => {
//         if (updatedSelectedItems[date]?.length > 0) {
//           return acc + 1;
//         }
//         return acc;
//       }, 0);
//       setSelectedDaysCount(count);

//       return updatedSelectedItems;
//     });
//   };

//   const handleSubstituteItemSelection = (date, itemName) => {
//     setSelectedSubstituteItems((prevSelectedSubstituteItems) => {
//       const updatedSelectedSubstituteItems = { ...prevSelectedSubstituteItems };
//       if (updatedSelectedSubstituteItems[date]?.includes(itemName)) {
//         updatedSelectedSubstituteItems[date] = updatedSelectedSubstituteItems[
//           date
//         ].filter((item) => item !== itemName);
//       } else {
//         updatedSelectedSubstituteItems[date] = [
//           ...(updatedSelectedSubstituteItems[date] || []),
//           itemName,
//         ];
//       }
//       return updatedSelectedSubstituteItems;
//     });
//   };

//   const handleAddOnItemSelection = (date, itemName) => {
//     setSelectedAddOnItems((prevSelectedAddOnItems) => {
//       const updatedSelectedAddOnItems = { ...prevSelectedAddOnItems };
//       if (updatedSelectedAddOnItems[date]?.includes(itemName)) {
//         updatedSelectedAddOnItems[date] = updatedSelectedAddOnItems[
//           date
//         ].filter((item) => item !== itemName);
//       } else {
//         updatedSelectedAddOnItems[date] = [
//           ...(updatedSelectedAddOnItems[date] || []),
//           itemName,
//         ];
//       }
//       return updatedSelectedAddOnItems;
//     });
//   };

//   const handleProceedToCheckout = () => {
//     if (selectedDaysCount === parseInt(days)) {
//       console.log("Data being sent to the next page:", {
//         selectedItems,
//         selectedSubstituteItems,
//         selectedAddOnItems,
//         selectedDaysCount,
//       });
//       navigate("/placeOrder");
//     }
//   };

//   return (
//     <>
//       <div className="commonHeading headingLeft main-menuHeading">
//         <h4>
//           Main <span>Menu</span>
//         </h4>
//       </div>
//       <div className={`operator ${mainMenu.length === 1 ? "single-card" : ""}`}>
//         {mainMenu.map((menu, index) => (
//           <MenuCard
//             key={index}
//             date={menu.date}
//             items={menu.items}
//             substituteItems={menu.substituteItems}
//             addOnItems={menu.addOnItems}
//             selectedItems={selectedItems[menu.date] || []}
//             selectedSubstituteItems={selectedSubstituteItems[menu.date] || []}
//             selectedAddOnItems={selectedAddOnItems[menu.date] || []}
//             handleItemSelection={handleItemSelection}
//             handleSubstituteItemSelection={handleSubstituteItemSelection}
//             handleAddOnItemSelection={handleAddOnItemSelection}
//           />
//         ))}
//       </div>
//       <div className="checkout-btn">
//         <button
//           className={`btn spacious-button ${
//             selectedDaysCount !== parseInt(days)
//               ? "btnPrimary disabled"
//               : "btnPrimary"
//           }`}
//           onClick={handleProceedToCheckout}
//           disabled={selectedDaysCount !== parseInt(days)}
//           title={
//             selectedDaysCount !== parseInt(days)
//               ? `Please select ${days} days`
//               : ""
//           }
//         >
//           Proceed to Checkout
//         </button>
//       </div>
//     </>
//   );
// };

// export default MainMenuPage;
