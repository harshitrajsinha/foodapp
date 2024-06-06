import mongoose from "mongoose";
import Food from "../models/foodModel.js";
import ThaliCategory from "../models/thaliCategory.js";
import WeeklyMenu from "../models/weeklyModel.js";
import MealPlan from "../models/mealPlanModel.js";
import moment from "moment";
import Order from "../models/orderModel.js";

//Get all thali categories(regular,family,deluxe)
export const getThaliCategories = async (req, res, next) => {
  try {
    const thaliCategories = await ThaliCategory.find().select(
      "name price items substituteItems addOnItems"
    );

    res.status(200).json({ success: true, data: thaliCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Get weekly menu

export async function getWeeklyMenu(req, res, next) {
  try {
    const weeklyMenu = await WeeklyMenu.find();

    res.status(200).json({
      success: true,
      data: weeklyMenu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch weekly menu",
      error: error.message,
    });
  }
}

//get thali contents
export const getThaliContent = async (req, res) => {
  try {
    const { name } = req.params;

    const thaliContent = await ThaliCategory.find({ name });
    const mealPlan = await MealPlan.find();
    // if (!thaliContent) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Thali content not found" });
    // }

    res.status(200).json({
      success: true,
      data: thaliContent,
      mealPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
//get meal plan
export const getMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.find();

    res.status(200).json({
      success: true,
      mealPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//get main menu
// export async function getMainMenu(req, res, next) {
//   try {
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// }

//Get all categories
export async function getAllFood(req, res, next) {
  try {
    const foodItems = await Food.find();

    res.status(200).json({
      success: true,
      foodItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

//get main menu

export async function getMainMenu(req, res, next) {
  try {
    const { name, days, startDate } = req.params;

    // Log req.params to see what is being received
    console.log("req.params:", req.params);

    console.log(
      `Received name: ${name}, days: ${days}, startDate: ${startDate}`
    );

    const numberOfDays = parseInt(days, 10);
    let startFrom;

    if (startDate) {
      startFrom = moment(startDate, "YYYY-MM-DD");
      console.log(`Parsed startDate: ${startFrom.format("YYYY-MM-DD")}`);
    } else {
      startFrom = moment().add(1, "days");
      console.log(`Default startDate: ${startFrom.format("YYYY-MM-DD")}`);
    }

    const alteredNumberOfDays = Math.ceil(numberOfDays * 1.5);

    const thaliCategory = await ThaliCategory.findOne({ name });

    if (!thaliCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Thali category not found" });
    }

    const menuData = [];
    for (let i = 0; i < alteredNumberOfDays; i++) {
      const date = startFrom.clone().add(i, "days").format("DD MMMM");

      if (moment(date, "DD MMMM").day() !== 0) {
        // Avoid Sundays
        menuData.push({
          date,
          items: thaliCategory.items,
          substituteItems: thaliCategory.substituteItems,
          addOnItems: thaliCategory.addOnItems,
        });
      }
    }

    res.status(200).json({ success: true, menuData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// export async function getMainMenu(req, res, next) {
//   try {
//     const { name, days } = req.params;

//     const numberOfDays = parseInt(days);
//     const today = moment();
//     const startFrom = today.add(1, "days");

//     const alteredNumberOfDays = Math.ceil(numberOfDays * 1.5);

//     const thaliCategory = await ThaliCategory.findOne({ name });

//     if (!thaliCategory) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Thali category not found" });
//     }

//     const menuData = [];
//     for (let i = 0; i < alteredNumberOfDays; i++) {
//       const date = startFrom.clone().add(i, "days").format("DD MMMM");

//       if (moment(date, "DD MMMM").day() !== 0) {
//         menuData.push({
//           date,
//           items: thaliCategory.items,
//           substituteItems: thaliCategory.substituteItems,
//           addOnItems: thaliCategory.addOnItems,
//         });
//       }
//     }

//     res.status(200).json({ success: true, menuData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// }
//place order

// Function to convert date to "dd MMM" format
const formatDateToDDMMMWithCurrentYear = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentYear = new Date().getFullYear();
  const dateObj = new Date(date);
  dateObj.setFullYear(currentYear); // Set the year to the current year
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = months[dateObj.getMonth()];
  return `${day} ${month} ${currentYear}`;
};

const updateDateToCurrentYear = (dateString) => {
  const date = new Date(dateString + " " + new Date().getFullYear()); // Append the current year to the date string
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateString}`);
  }
  return formatDateToDDMMMWithCurrentYear(date);
};

export async function placeOrder(req, res, next) {
  try {
    const {
      orders,
      userEmail,
      pincode,
      thaliName,
      totalPrice,
      startDate,
      address,
    } = req.body;
    const { orderId } = req.params;

    console.log("Received request body:", req.body);
    console.log("Extracted user email:", userEmail);

    if (
      !orders ||
      !Array.isArray(orders) ||
      orders.length === 0 ||
      !userEmail ||
      !thaliName
    ) {
      return res.status(400).json({
        error:
          "Invalid order data provided. 'orders' must be a non-empty array, and 'userEmail' and 'thaliName' must be provided.",
      });
    }

    // Process dates to ensure they are updated to the current year and formatted correctly
    const data = orders.map(({ date, items }) => ({
      date: updateDateToCurrentYear(date),
      items: items,
    }));

    console.log("Processed data:", data);

    let order;
    if (orderId && mongoose.Types.ObjectId.isValid(orderId)) {
      console.log("Checking existing order with ID:", orderId);
      order = await Order.findById(orderId);

      if (order) {
        console.log("Order found, updating...");
        order.userEmail = userEmail;
        order.totalPrice = totalPrice;
        order.pincode = pincode;
        order.thaliName = thaliName;
        order.data = data; // Replace data with new data
        order.startDate = startDate;
        order.address = address; // Update address
        order = await order.save();
      } else {
        console.log("Order ID not found, creating new order...");
        order = new Order({
          userEmail,
          pincode,
          totalPrice,
          thaliName,
          data,
          startDate,
          address, // Add address to new order
        });
        await order.save();
      }
    } else {
      console.log("Creating a new order");
      order = new Order({
        userEmail,
        pincode,
        totalPrice,
        thaliName,
        data,
        startDate,
        address, // Add address to new order
      });
      await order.save();
    }

    console.log("Saved order:", order);

    res.status(200).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: error.message || "Failed to place order" });
  }
}

// export async function placeOrder(req, res, next) {
//   try {
//     const { orders, userEmail, pincode, thaliName, totalPrice, startDate } =
//       req.body;
//     const { orderId } = req.params;

//     console.log("Received request body:", req.body);
//     console.log("Extracted user email:", userEmail);

//     if (
//       !orders ||
//       !Array.isArray(orders) ||
//       orders.length === 0 ||
//       !userEmail ||
//       !thaliName
//     ) {
//       return res.status(400).json({
//         error:
//           "Invalid order data provided. 'orders' must be a non-empty array, and 'userEmail' and 'thaliName' must be provided.",
//       });
//     }

//     // Process dates to ensure they are updated to the current year and formatted correctly
//     const data = orders.map(({ date, items }) => ({
//       date: updateDateToCurrentYear(date),
//       items: items,
//     }));

//     console.log("Processed data:", data);

//     let order;
//     if (orderId && mongoose.Types.ObjectId.isValid(orderId)) {
//       console.log("Checking existing order with ID:", orderId);
//       order = await Order.findById(orderId);

//       if (order) {
//         console.log("Order found, updating...");
//         order.userEmail = userEmail;
//         order.totalPrice = totalPrice;
//         order.pincode = pincode;
//         order.thaliName = thaliName;
//         order.data = data; // Replace data with new data
//         order = await order.save();
//       } else {
//         console.log("Order ID not found, creating new order...");
//         order = new Order({
//           userEmail,
//           pincode,
//           totalPrice,
//           thaliName,
//           data,
//           startDate,
//         });
//         await order.save();
//       }
//     } else {
//       console.log("Creating a new order");
//       order = new Order({
//         userEmail,
//         pincode,
//         totalPrice,
//         thaliName,
//         data,
//         startDate,
//       });
//       await order.save();
//     }

//     console.log("Saved order:", order);

//     res.status(200).json({
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ error: error.message || "Failed to place order" });
//   }
// }

//get order details

export async function orderDetails(req, res, next) {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      console.error("User email is missing from the request.");
      return res.status(400).json({ error: "User email is required" });
    }

    console.log(`Received request for userEmail: ${userEmail}`);

    const orders = await Order.find({ userEmail }).lean();

    if (!orders || orders.length === 0) {
      console.error(`No orders found for userEmail: ${userEmail}`);
      return res.status(200).json({ success: true, data: [] });
    }

    const formattedOrders = orders.map((order) => {
      let orderData = [];

      if (Array.isArray(order.data)) {
        orderData = order.data.map((entry) => ({
          date: new Date(entry.date).toISOString(), // Ensure date is an ISO string
          items: entry.items || [],
        }));
      } else if (typeof order.data === "object") {
        orderData = Object.keys(order.data).map((date) => ({
          date: new Date(date).toISOString(),
          items: order.data[date].items || [],
        }));
      } else {
        console.error(
          `Order data is not in an expected format for order ID: ${order._id}`
        );
      }

      return {
        _id: order._id,
        userEmail: order.userEmail,
        pincode: order.pincode,
        orderDate: order.orderDate
          ? new Date(order.orderDate).toISOString()
          : null,
        data: orderData.length ? orderData : [{ date: "N/A", items: [] }],
        totalPrice: order.totalPrice,
        thaliName: order.thaliName,
      };
    });

    console.log("Formatted orders:", formattedOrders);

    res.status(200).json({ success: true, data: formattedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function markModification(req, res, next) {
  try {
    const { orderId, userEmail, updatedItems, updatedTotalPrice } = req.body;

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the user
    if (order.userEmail !== userEmail) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to modify order" });
    }

    // Update the order details if provided
    if (updatedItems && updatedTotalPrice) {
      order.data = order.data.map((entry) => ({
        ...entry,
        items: updatedItems,
      }));
      order.totalPrice = updatedTotalPrice;
    }

    // Save the updated order
    await order.save();

    // Format the startDate to YYYY-MM-DD
    const formattedStartDate = new Date(order.startDate)
      .toISOString()
      .split("T")[0];
    console.log("StartDateeeeee:", formattedStartDate);

    res.status(200).json({
      message: "Order updated successfully",
      order: order,
      startDate: formattedStartDate, // Include formatted startDate in the response
    });
  } catch (error) {
    console.error("Error marking modification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getModification(req, res, next) {
  try {
    const orderId = req.params.orderId;

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Send back the modification counter
    res.status(200).json({ modificationCounter: order.modificationCounter });
  } catch (error) {
    console.error("Error fetching modification counter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
