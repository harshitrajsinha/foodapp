import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiSignOutThin } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import logo from "../../images/SS.png";
import { FiShoppingCart } from "react-icons/fi";
import "./Header.css";

function Header({ isLoggedIn, setIsLoggedIn, onWeeklyMenuClick }) {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:80/api/v1/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("userEmail");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/api/v1/check-auth",
          { withCredentials: true }
        );
        setIsLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [setIsLoggedIn]);

  return (
    <header className="w-100 clearfix header" id="header">
      <div className="container">
        <div className="headerInner">
          <nav className="navbar navbar-expand-xl">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="logo" className="img-fluid" />
              </Link>
              <div className="navbar-collapse collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about-us">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/thali-categories">
                      Meals
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact-us">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/"
                      className="nav-link"
                      onClick={(event) => {
                        event.preventDefault();
                        onWeeklyMenuClick();
                      }}
                    >
                      WeeklyMenu
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="rightMenu">
            <div className="cart">
              <Link to="/placeOrder">
                <FiShoppingCart size={23} style={{ color: "black" }} />
              </Link>
            </div>
            {isLoggedIn && (
              <div className="user">
                <Link to="/myProfile">
                  <FaRegUser size={20} style={{ color: "black" }} />
                </Link>
              </div>
            )}

            {isLoggedIn ? (
              <div className="loginBtn">
                <button onClick={handleLogout} className="btn btnPrimary">
                  <CiLogout size={24} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="loginBtn">
                <Link to="/login" className="btn btnPrimary">
                  <PiSignOutThin size={24} />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
            <div className="menuToggle">
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavbar"
                aria-expanded="false"
              >
                <span id="nav-icon2">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { PiSignOutThin } from "react-icons/pi";
// import { FaRegUser } from "react-icons/fa";
// import axios from "axios";
// import logo from "../../images/SS.png";
// import "./Header.css";

// function Header({ isLoggedIn, setIsLoggedIn }) {
//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:80/api/v1/logout",
//         {},
//         { withCredentials: true }
//       );
//       localStorage.removeItem("userEmail");
//       setIsLoggedIn(false);
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:80/api/v1/check-auth",
//           { withCredentials: true }
//         );
//         setIsLoggedIn(response.data.isAuthenticated);
//       } catch (error) {
//         setIsLoggedIn(false);
//       }
//     };

//     checkLoginStatus();
//   }, [setIsLoggedIn]);

//   return (
//     <header className="w-100 clearfix header" id="header">
//       <div className="container">
//         <div className="headerInner">
//           <nav className="navbar navbar-expand-xl">
//             <div className="container-fluid">
//               <Link className="navbar-brand" to="/">
//                 <img src={logo} alt="logo" className="img-fluid" />
//               </Link>
//               <div className="navbar-collapse collapse" id="collapsibleNavbar">
//                 <ul className="navbar-nav">
//                   <li className="nav-item">
//                     <Link to="/" className="nav-link">
//                       Home
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/about-us">
//                       About Us
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/thali-categories">
//                       Meals
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/contact-us">
//                       Contact Us
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link">WeeklyMenu</Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </nav>
//           <div className="rightMenu">
//             {isLoggedIn && (
//               <div className="user">
//                 <Link to="/myProfile">
//                   <FaRegUser size={20} style={{ color: "black" }} />
//                 </Link>
//               </div>
//             )}

//             {isLoggedIn ? (
//               <div className="loginBtn">
//                 <button onClick={handleLogout} className="btn btnPrimary">
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="loginBtn">
//                 <Link to="/login" className="btn btnPrimary">
//                   <PiSignOutThin size={24} />
//                   <span>Sign In</span>
//                 </Link>
//               </div>
//             )}
//             <div className="menuToggle">
//               <button
//                 className="navbar-toggler collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#collapsibleNavbar"
//                 aria-expanded="false"
//               >
//                 <span id="nav-icon2">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { PiSignOutThin } from "react-icons/pi";
// import { FaRegUser } from "react-icons/fa";
// import weeklyImg from "../../images/WeeklyMenu.jpeg";
// import logo from "../../images/SS.png";
// import "./Header.css";

// function Header({ isLoggedIn, handleLogout }) {
//   const [isImageOpen, setIsImageOpen] = useState(false);

//   const toggleImagePopup = () => {
//     setIsImageOpen(!isImageOpen);
//   };

//   const handleLogoutClick = async () => {
//     try {
//       const response = await fetch("http://localhost:80/api/v1/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
//       if (response.ok) {
//         localStorage.removeItem("userEmail");
//         handleLogout();
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <header className="w-100 clearfix header" id="header">
//       <div className="container">
//         <div className="headerInner">
//           <nav className="navbar navbar-expand-xl">
//             <div className="container-fluid">
//               <Link className="navbar-brand" to="/">
//                 <img
//                   src={logo}
//                   //src="/images/logo/logo.png"
//                   alt="logo"
//                   className="img-fluid"
//                 />
//               </Link>
//               <div className=" navbar-collapse collapse" id="collapsibleNavbar">
//                 <ul className="navbar-nav">
//                   <li className="nav-item">
//                     <Link to="/" className="nav-link">
//                       Home
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/about-us">
//                       About Us
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/thali-categories">
//                       Meals
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/contact-us">
//                       Contact Us
//                     </Link>
//                   </li>
//                   <li>
//                     <div className="view-image">
//                       <button
//                         onClick={toggleImagePopup}
//                         className={`icon-button ${isImageOpen ? "active" : ""}`}
//                         title="View Weekly Menu"
//                       >
//                         Weekly Menu
//                       </button>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </nav>
//           <div className="rightMenu">
//             <div className="user">
//               <Link to="/myProfile">
//                 <FaRegUser size={20} style={{ color: "black" }} />
//               </Link>
//             </div>

//             {isLoggedIn ? (
//               <div className="loginBtn">
//                 <button onClick={handleLogoutClick} className="btn btnPrimary">
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="loginBtn">
//                 <Link to="/login" className="btn btnPrimary">
//                   <PiSignOutThin size={24} />
//                   <span>Sign In</span>
//                 </Link>
//               </div>
//             )}
//             <div className="menuToggle">
//               <button
//                 className="navbar-toggler collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#collapsibleNavbar"
//                 aria-expanded="false"
//               >
//                 <span id="nav-icon2">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isImageOpen && (
//         <div className="image-popup">
//           <div className="image-popup-content">
//             <button className="close-button" onClick={toggleImagePopup}>
//               ✕
//             </button>
//             <img src={weeklyImg} alt="Popup" className="popup-image" />
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;
