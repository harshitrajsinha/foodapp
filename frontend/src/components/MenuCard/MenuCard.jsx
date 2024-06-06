import React from "react";
import "./MenuCard.css";

const MenuCard = ({
  date,
  items,
  substituteItems,
  addOnItems,
  selectedItems,
  selectedSubstituteItems,
  selectedAddOnItems,
  handleItemSelection,
  handleSubstituteItemSelection,
  handleAddOnItemSelection,
  handleAddButtonClick,
}) => {
  return (
    <div className="menu-card">
      <div className="menu-card-header">
        <h3>{date}</h3>
        <button
          className="btn btnPrimary"
          onClick={() => handleAddButtonClick(date)}
        >
          {selectedItems.length === items.length ? "Remove" : "Add"}
        </button>
      </div>
      <div className="items-section">
        <ul className="list-group list-group-horizontal flex-wrap">
          {items.map((item, i) => (
            <li
              key={i}
              className={`list-group-item ${
                selectedItems.includes(item.name) ? "selected" : ""
              }`}
              onClick={() => handleItemSelection(date, item.name)}
            >
              {item.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      {substituteItems.length > 0 && (
        <div className="items-section">
          <h4>Substitute Items</h4>
          <ul className="list-group list-group-horizontal flex-wrap">
            {substituteItems.map((subItem, i) => (
              <li
                key={i}
                className={`list-group-item ${
                  selectedSubstituteItems.includes(subItem.name)
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleSubstituteItemSelection(date, subItem.name)
                }
              >
                {subItem.name} - Quantity: {subItem.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
      {addOnItems.length > 0 && (
        <div className="items-section">
          <h4>Add-On Items</h4>
          <ul className="list-group list-group-horizontal flex-wrap">
            {addOnItems.map((addOnItem, i) => (
              <li
                key={i}
                className={`list-group-item ${
                  selectedAddOnItems.includes(addOnItem.name) ? "selected" : ""
                }`}
                onClick={() => handleAddOnItemSelection(date, addOnItem.name)}
              >
                {addOnItem.name} - Quantity: {addOnItem.quantity} - Price:{" "}
                {addOnItem.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuCard;

// import React from "react";
// import "./MenuCard.css";

// const MenuCard = ({
//   date,
//   items,
//   substituteItems,
//   addOnItems,
//   selectedItems,
//   selectedSubstituteItems,
//   selectedAddOnItems,
//   handleItemSelection,
//   handleSubstituteItemSelection,
//   handleAddOnItemSelection,
// }) => {
//   return (
//     <div className="menu-card">
//       <h3>{date}</h3>
//       <div className="items-section">
//         <ul className="list-group list-group-horizontal flex-wrap">
//           {items.map((item, i) => (
//             <li
//               key={i}
//               className={`list-group-item ${
//                 selectedItems.includes(item.name) ? "selected" : ""
//               }`}
//               onClick={() => handleItemSelection(date, item.name)}
//             >
//               {item.name} - Quantity: {item.quantity}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {substituteItems.length > 0 && (
//         <div className="items-section">
//           <h4>Substitute Items</h4>
//           <ul className="list-group list-group-horizontal flex-wrap">
//             {substituteItems.map((subItem, i) => (
//               <li
//                 key={i}
//                 className={`list-group-item ${
//                   selectedSubstituteItems.includes(subItem.name)
//                     ? "selected"
//                     : ""
//                 }`}
//                 onClick={() =>
//                   handleSubstituteItemSelection(date, subItem.name)
//                 }
//               >
//                 {subItem.name} - Quantity: {subItem.quantity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {addOnItems.length > 0 && (
//         <div className="items-section">
//           <h4>Add-On Items</h4>
//           <ul className="list-group list-group-horizontal flex-wrap">
//             {addOnItems.map((addOnItem, i) => (
//               <li
//                 key={i}
//                 className={`list-group-item ${
//                   selectedAddOnItems.includes(addOnItem.name) ? "selected" : ""
//                 }`}
//                 onClick={() => handleAddOnItemSelection(date, addOnItem.name)}
//               >
//                 {addOnItem.name} - Quantity: {addOnItem.quantity} - Price:{" "}
//                 {addOnItem.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuCard;
