import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Pincode from "./pages/Pincode";
import ThaliCategoryPage from "./pages/ThaliCategoryPage";
import ThaliContentPage from "./pages/ThaliContentPage";
import MainMenuPage from "./pages/MainMenuPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "../src/components/AdminPages/OrderPage/OrderPage.jsx";
import UserDetailsPage from "./components/AdminPages/UserDetailsPage/UserDetailsPage.jsx";
import OrderDetailsPage from "./components/AdminPages/OrderDetailsPage/OrderDetailsPage.jsx";
import CreateMealPlanPage from "./pages/AdminPages/CreateMealPlanPage";
import AddPincodePage from "./pages/AdminPages/AddPindodePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UpdateOrder from "./pages/UpdateOrder";
import HomePage from "./pages/HomePage";
import MealPlan from "./components/MealPlan/MealPlan";
import MyProfile from "./pages/MyProfile";
import Address from "./components/Address/Address";
import UserInfo from "./components/userInfo/UserInfo";
import PaymentInfo from "./components/PaymentInfo/PaymentInfo";
import ContactUs from "../src/components/ContactUs/ContactUs.jsx";
import CloverOAuth from "../src/components/CloverOAuth/CloverOAuth.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showImage, setShowImage] = useState(true);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:80/api/v1/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleViewWeeklyMenu = () => {
    setShowImage((prevShowImage) => !prevShowImage); // Toggle image display
  };

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        handleLogout={handleLogout}
        onWeeklyMenuClick={handleViewWeeklyMenu}
      />
      <Routes>
        <Route path="/pincodeVerify" element={<Pincode />} />
        <Route path="/thali-categories" element={<ThaliCategoryPage />} />
        <Route path="/thali-content/:name" element={<ThaliContentPage />} />
        <Route
          path="/thali-details/:name/:days/:startDate?"
          element={<MainMenuPage />}
        />
        <Route path="/placeOrder" element={<PlaceOrderPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/user-details" element={<UserDetailsPage />} />
        <Route path="/user-orders/:email" element={<OrderDetailsPage />} />
        <Route path="/new-mealPlan" element={<CreateMealPlanPage />} />
        <Route path="/addPincode" element={<AddPincodePage />} />
        <Route path="/modify-order" element={<UpdateOrder />} />
        <Route path="/address" element={<Address />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/payment-info" element={<PaymentInfo />} />
        <Route path="/mealPlan" element={<MealPlan />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <HomePage
              showImage={showImage}
              onWeeklyMenuClick={handleViewWeeklyMenu}
            />
          }
        />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/clover-oauth" element={<CloverOAuth />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
