import axios from "axios";
import dotenv from "dotenv";
import MealPlan from "../models/mealPlanModel.js";
import Order from "../models/orderModel.js";
import Pincode from "../models/pincodeModel.js";
import ThaliCategory from "../models/thaliCategory.js";
import WeeklyMenu from "../models/weeklyModel.js";
import User from "../models/userModel.js";

//config
dotenv.config({ path: "../config/config.env" });

//Add Pincode
export async function addPincode(req, res, next) {
  try {
    const { pincode } = req.body;

    // Validate pincode
    if (!pincode || pincode.length < 3) {
      return res.status(400).json({
        success: false,
        message: "A valid pincode of at least 3 characters is required.",
      });
    }

    const existingPincode = await Pincode.findOne({ pincode });
    if (existingPincode) {
      return res.status(400).json({
        success: false,
        message: `Pincode ${pincode} already exists`,
      });
    }

    const newPincode = await Pincode.create({ pincode });

    res.status(200).json({
      success: true,
      message: `Pincode ${newPincode.pincode} added successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

//create a thali
export async function createMeal(req, res, next) {
  try {
    const meal = await ThaliCategory.create(req.body);

    res.status(200).json({
      success: true,
      meal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

//Create Meal Plan
export async function createMealPlan(req, res, next) {
  try {
    const mealPlan = await MealPlan.create(req.body);

    res.status(200).json({
      success: true,
      mealPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function createWeaklyMenu(req, res, next) {
  try {
    const weeklyMenu = await WeeklyMenu.create(req.body);

    res.status(200).json({
      success: true,
      weeklyMenu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// export async function getOverallItemsAndQuantities(req, res, next) {
//   try {
//     const orders = await Order.find()
//       .select("date items substituteItems addOnItems")
//       .lean();

//     // Group orders by date
//     const ordersByDate = {};
//     orders.forEach((order) => {
//       const date = order.date.toISOString().split("T")[0];
//       if (!ordersByDate[date]) {
//         ordersByDate[date] = {
//           date: date,
//           items: [],
//           substituteItems: [],
//           addOnItems: [],
//         };
//       }
//       // Merge items, substituteItems, and addOnItems
//       ordersByDate[date].items.push(...order.items);
//       ordersByDate[date].substituteItems.push(...order.substituteItems);
//       ordersByDate[date].addOnItems.push(...order.addOnItems);
//     });

//     // Aggregate quantities for each item, substitute item, and add on item
//     const overallItemsAndQuantities = Object.values(ordersByDate).map(
//       (order) => ({
//         date: order.date,
//         items: aggregateQuantities(order.items),
//         substituteItems: aggregateQuantities(order.substituteItems),
//         addOnItems: aggregateQuantities(order.addOnItems),
//       })
//     );

//     res.status(200).json({ success: true, data: overallItemsAndQuantities });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// }

// // Helper function to aggregate quantities for an array of items
// function aggregateQuantities(items) {
//   const aggregatedItems = {};
//   items.forEach((item) => {
//     if (!aggregatedItems[item.name]) {
//       aggregatedItems[item.name] = 0;
//     }
//     aggregatedItems[item.name] += item.quantity;
//   });
//   return Object.keys(aggregatedItems).map((name) => ({
//     name,
//     quantity: aggregatedItems[name],
//   }));
// }
export async function getOverallItemsAndQuantities(req, res, next) {
  try {
    const orders = await Order.find().lean();

    const ordersByDate = {};

    orders.forEach((order) => {
      order.data.forEach((orderDate) => {
        const date = new Date(orderDate.date).toISOString().split("T")[0];

        if (!ordersByDate[date]) {
          ordersByDate[date] = {
            date: new Date(date),
            items: [],
            userEmails: new Set(),
            pincodes: new Set(),
          };
        }

        orderDate.items.forEach((item) => {
          ordersByDate[date].items.push(item);
        });

        ordersByDate[date].userEmails.add(order.userEmail);
        ordersByDate[date].pincodes.add(order.pincode);
      });
    });

    const overallItemsAndQuantities = Object.values(ordersByDate).map(
      (order) => ({
        date: order.date,
        items: aggregateQuantities(order.items),
        userEmails: Array.from(order.userEmails),
        pincodes: Array.from(order.pincodes),
      })
    );

    res.status(200).json({ success: true, data: overallItemsAndQuantities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

function aggregateQuantities(items) {
  const aggregatedItems = {};
  items.forEach((item) => {
    if (!aggregatedItems[item.name]) {
      aggregatedItems[item.name] = item.quantity;
    } else {
      aggregatedItems[item.name] += item.quantity;
    }
  });
  return Object.keys(aggregatedItems).map((name) => ({
    name,
    quantity: aggregatedItems[name],
  }));
}

//function to fetch all orders

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const orders = await Order.find({ userEmail: email });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const googleAuth = (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`;
  res.redirect(googleAuthUrl);
};

export const googleCallback = async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    const accessToken = response.data.access_token;
    const idToken = response.data.id_token;

    // Store access token securely
    res.json({ accessToken, idToken });
  } catch (error) {
    console.error("Error fetching Google access token:", error.response.data);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
};

export const googleProfile = async (req, res) => {
  const accessToken = req.query.accessToken;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user profile:", error.response.data);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// Clover OAuth Controllers
export const cloverAuth = (req, res) => {
  const cloverAuthUrl = `https://www.clover.com/oauth/authorize?client_id=${process.env.CLOVER_CLIENT_ID}&response_type=code`;
  res.redirect(cloverAuthUrl);
};

export const cloverCallback = async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post("https://www.clover.com/oauth/token", {
      client_id: process.env.CLOVER_CLIENT_ID,
      client_secret: process.env.CLOVER_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    });

    const accessToken = response.data.access_token;
    const merchantId = response.data.merchant_id;

    // Store access token securely
    res.json({ accessToken, merchantId });
  } catch (error) {
    console.error("Error fetching Clover access token:", error.response.data);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
};

export const cloverProfile = async (req, res) => {
  const accessToken = req.query.accessToken;

  try {
    const response = await axios.get("https://api.clover.com/v3/merchants/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching merchant profile:", error.response.data);
    res.status(500).json({ error: "Failed to fetch merchant profile" });
  }
};
