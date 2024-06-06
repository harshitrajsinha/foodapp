import mongoose from "mongoose";

const thaliCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, default: 0 },
    },
  ],
  substituteItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, default: 0 },
    },
  ],
  addOnItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, default: 0 },
      price: { type: String, required: true },
    },
  ],
  mealChoice: {
    type: String,
    enum: ["Jain", "Normal"],
    default: "Normal",
  },
  mealPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MealPlan",
  },
});

const ThaliCategory = mongoose.model("ThaliCategory", thaliCategorySchema);

export default ThaliCategory;
