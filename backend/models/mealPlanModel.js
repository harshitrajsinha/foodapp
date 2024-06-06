import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  days: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

export default MealPlan;
