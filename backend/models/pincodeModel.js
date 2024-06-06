import mongoose from "mongoose";

const pincodeSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
});

const Pincode = mongoose.model("Pincode", pincodeSchema);

export default Pincode;
