import Pincode from "../models/pincodeModel.js";

export async function pincodeVerification(req, res, next) {
  try {
    const { pincode } = req.body;

    // Validate pincode length and character type
    const pincodePattern = /^[A-Za-z0-9]{3,}$/;
    if (!pincode || !pincodePattern.test(pincode)) {
      return res.status(400).json({
        success: false,
        message: "A valid pincode of at least 3 characters is required.",
      });
    }

    const prefix = pincode.slice(0, 3).toUpperCase(); // Ensure prefix is case-insensitive
    const existingPincode = await Pincode.findOne({
      pincode: { $regex: `^${prefix}`, $options: "i" }, // Case-insensitive regex
    });

    if (!existingPincode) {
      return res.status(404).json({
        success: false,
        message: "Sorry, we don't deliver to this pincode",
      });
    }

    res.status(200).json({
      success: true,
      message: "Welcome",
      pincode: pincode,
    });
  } catch (error) {
    next(error);
  }
}
