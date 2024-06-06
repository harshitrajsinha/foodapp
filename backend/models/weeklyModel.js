import mongoose from "mongoose";

const weeklyMenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  day: [
    {
      name: {
        type: String,
        required: true,
      },
      items: {
        type: [String],
        required: true,
      },
      substituteItems: {
        type: [String],
        default: [],
      },
    },
  ],
});

const WeeklyMenu = mongoose.model("WeeklyMenu", weeklyMenuSchema);

export default WeeklyMenu;
