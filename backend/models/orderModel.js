import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  addressCategory: {
    type: String,
  },
  address: {
    type: String,
  },
  addressType: {
    type: String,
    enum: ["Apartment", "Unit", "House", "Basement"],
  },
  unitNo: {
    type: String,
  },
  buzzerCode: {
    type: String,
  },
  deliveryInstructions: {
    type: String,
  },
  pincode: {
    type: String,
    minlength: 3,
  },
});

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderDataSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  items: {
    type: [orderItemSchema],
    default: [],
  },
});

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: Object,
    default: {},
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  thaliName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

// import mongoose from "mongoose";

// // Define schema for the order item
// const orderItemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
// });

// // Define schema for the order
// const orderSchema = new mongoose.Schema({
//   userEmail: {
//     type: String,
//   },
//   pincode: {
//     type: String,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now(),
//   },
//   items: {
//     type: [orderItemSchema],
//     default: [],
//   },
//   substituteItems: {
//     type: [orderItemSchema],
//     default: [],
//   },
//   addOnItems: {
//     type: [orderItemSchema],
//     default: [],
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//   },
// });

// // Define the model for the order
// const Order = mongoose.model("Order", orderSchema);

// export default Order;
