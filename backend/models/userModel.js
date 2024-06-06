import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Define the address schema
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

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be atleast 8 characters"],
    select: false,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"],
    validate: {
      validator: function (v) {
        return /\+1\d{10}/.test(v); // Validate Canadian phone number
      },
      message: (props) =>
        `${props.value} is not a valid Canadian phone number!`,
    },
  },
  addresses: [addressSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password reset Token
userSchema.methods.getPasswordResetToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("User", userSchema);
