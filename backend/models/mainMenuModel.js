import mongoose from "mongoose";

const mainMenuSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  alternateItems: [
    {
      type: String,
    },
  ],
});

const MainMenu = mongoose.model("MainMenu", mainMenuSchema);

export default MainMenu;
