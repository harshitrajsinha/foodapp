import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import bcrypt from "bcryptjs";

//Register User
export async function registerUser(req, res, next) {
  try {
    const user = await User.create(req.body);

    sendToken(user, 201, res);
  } catch (error) {
    console.error(error); // Log the complete error object
    res.status(200).json({
      success: false,
      error: error,
      message: "Failed to register user",
    });
  }
}

//Login User

export async function loginUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Email and Password",
    });
  }
  try {
    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
}

//Logout

export async function logout(req, res, next) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const getUserInfo = async (req, res, next) => {
  try {
    // The user is already fetched in the isAuthenticatedUser middleware
    const user = req.user;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return the required user information
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        addresses: user.addresses,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    // Find the user by their ID from the token
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the user's email and phone number
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    // Save the updated user info
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// export async function addAddress(req, res, next) {
//   try {
//     const user = req.user;
//     const newAddress = req.body;

//     user.addresses.push(newAddress);
//     await user.save();

//     res.status(200).json({
//       success: true,
//       addresses: user.addresses,
//     });
//   } catch (error) {
//     next(error);
//   }
// }
export async function addAddress(req, res, next) {
  try {
    const user = req.user;
    const newAddress = req.body;

    // Validate pincode
    const { pincode } = newAddress;

    // Pincode validation logic
    const pincodePattern = /^[A-Za-z0-9]{3,}$/;
    if (!pincode || !pincodePattern.test(pincode)) {
      return res.status(400).json({
        success: false,
        message:
          "A valid pincode of at least 3 alphanumeric characters is required.",
      });
    }

    user.addresses.push(newAddress);
    await user.save();

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    next(error);
  }
}

// export async function editAddress(req, res, next) {
//   try {
//     const user = req.user;
//     const { addressId } = req.params;
//     const updatedAddress = req.body;

//     const addressIndex = user.addresses.findIndex(
//       (address) => address._id.toString() === addressId
//     );
//     if (addressIndex === -1) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Address not found" });
//     }

//     user.addresses[addressIndex] = {
//       ...user.addresses[addressIndex],
//       ...updatedAddress,
//     };
//     await user.save();

//     res.status(200).json({
//       success: true,
//       addresses: user.addresses,
//     });
//   } catch (error) {
//     next(error);
//   }
// }
export async function editAddress(req, res, next) {
  try {
    const user = req.user;
    const { addressId } = req.params;
    const updatedAddress = req.body;

    // Validate pincode
    const { pincode } = updatedAddress;

    // Pincode validation logic
    const pincodePattern = /^[A-Za-z0-9]{3,}$/;
    if (pincode && !pincodePattern.test(pincode)) {
      return res.status(400).json({
        success: false,
        message:
          "A valid pincode of at least 3 alphanumeric characters is required.",
      });
    }

    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex],
      ...updatedAddress,
    };
    await user.save();

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAddress(req, res, next) {
  try {
    const user = req.user;
    const { addressId } = req.params;

    user.addresses = user.addresses.filter(
      (address) => address._id.toString() !== addressId
    );
    await user.save();

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    next(error);
  }
}
