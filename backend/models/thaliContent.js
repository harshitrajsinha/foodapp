import mongoose from "mongoose";

const thaliContentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      type: String,
      required: true,
    },
  ],
  description: String,
  image: String,
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  mealChoice: {
    type: String,
    enum: ["Jain", "Normal"],
    default: "Normal",
  },
  mealPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MealPlan",
    required: true,
  },
});

const ThaliContent = mongoose.model("ThaliContent", thaliContentSchema);

export default ThaliContent;
