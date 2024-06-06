import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoImg from "../images/login.png";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:80/api/v1/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Save email to local storage upon successful login
      localStorage.setItem("userEmail", email);

      setIsLoggedIn(true); // Set isLoggedIn state to true upon successful login
      navigate("/thali-categories");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="w-100 clearfix loginSec" id="loginSec">
      <div className="loginSecContainer">
        <div className="loginSecInner">
          <div className="loginSecDotsNav"></div>
          <div className="loginForm">
            <div className="loginFormOuter">
              <div className="loginFormInner">
                <div className="signinLogo">
                  <a href="home1.html">
                    <img
                      src="images/footer-logo.png"
                      alt="footer-logo"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="loginSignupHeading">
                  <h2>Sign In</h2>
                </div>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="loginGroup">
                    <label htmlFor="emailAddress" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailAddress"
                      placeholder="Email Address"
                      name="emailAddress"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                      autoComplete="username"
                    />
                  </div>
                  <div className="loginGroup">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        id="passwordField"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <span className="inputGroupText passwordShow">
                        <i
                          className="fa-regular fa-eye field-icon togglePassword"
                          toggle="#passwordField"
                        ></i>
                      </span>
                    </div>
                    <div className="formRememberGroup">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember"
                          />{" "}
                          Remember me
                        </label>
                      </div>
                      <div className="forgotPasswordLink">
                        <a href="/forgotPassword" className="forgotPassword">
                          Forgot Password
                        </a>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn loginSignupBtn">
                    Sign In
                  </button>
                </form>
                <p>
                  Don't have an account? <a href="/register">Sign Up</a>
                </p>
              </div>
              <div className="loginFormImg">
                <img src={logoImg} alt="login" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="loginTab">
            <a href="/register">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
              >
                <path
                  d="M8.28655 50.4999C12.1437 41.7142 20.7151 35.4999 31.0008 35.4999C41.2866 35.4999 50.0723 41.7142 53.7151 50.4999M61 31C61 47.5685 47.5685 61 31 61C14.4315 61 1 47.5685 1 31C1 14.4315 14.4315 1 31 1C47.5685 1 61 14.4315 61 31ZM41.7143 24.5714C41.7143 30.4888 36.9173 35.2857 31 35.2857C25.0827 35.2857 20.2857 30.4888 20.2857 24.5714C20.2857 18.6541 25.0827 13.8571 31 13.8571C36.9173 13.8571 41.7143 18.6541 41.7143 24.5714Z"
                  stroke="#999999"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Sign Up</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import logoImg from "../images/login.png";

// const LoginPage = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios
//         .post(
//           "http://localhost:80/api/v1/login",
//           {
//             email,
//             password,
//           },
//           {
//             withCredentials: true,
//           }
//         )
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error("There was an error!", error);
//         });

//       // Save email to local storage upon successful login
//       localStorage.setItem("userEmail", email);

//       setIsLoggedIn(true); // Set isLoggedIn state to true upon successful login
//       navigate("/thali-categories");
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       // Assuming you have a logout endpoint that clears session on the server
//       const response = await fetch("/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         localStorage.removeItem("userEmail"); // Remove userEmail from localStorage
//         setIsLoggedIn(false);
//         navigate("/login");
//       } else {
//         setError("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//       setError("Logout failed");
//     }
//   };

//   return (
//     <section className="w-100 clearfix loginSec" id="loginSec">
//       <div className="loginSecContainer">
//         <div className="loginSecInner">
//           <div className="loginSecDotsNav"></div>
//           <div className="loginForm">
//             <div className="loginFormOuter">
//               <div className="loginFormInner">
//                 <div className="signinLogo">
//                   <a href="home1.html">
//                     <img
//                       src="images/footer-logo.png"
//                       alt="footer-logo"
//                       className="img-fluid"
//                     />
//                   </a>
//                 </div>
//                 <div className="loginSignupHeading">
//                   <h2>Sign In</h2>
//                 </div>
//                 {error && <p>{error}</p>}
//                 <form onSubmit={handleSubmit}>
//                   <div className="loginGroup">
//                     <label htmlFor="emailAddress" className="form-label">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="emailAddress"
//                       placeholder="Email Address"
//                       name="emailAddress"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                       autoFocus
//                       autoComplete="username"
//                     />
//                   </div>
//                   <div className="loginGroup">
//                     <label htmlFor="password" className="form-label">
//                       Password
//                     </label>
//                     <div className="input-group">
//                       <input
//                         type="password"
//                         className="form-control"
//                         id="passwordField"
//                         placeholder="Password"
//                         name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         autoComplete="current-password"
//                       />
//                       <span className="inputGroupText passwordShow">
//                         <i
//                           className="fa-regular fa-eye field-icon togglePassword"
//                           toggle="#passwordField"
//                         ></i>
//                       </span>
//                     </div>
//                     <div className="formRememberGroup">
//                       <div className="form-check">
//                         <label className="form-check-label">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             name="remember"
//                           />{" "}
//                           Remember me
//                         </label>
//                       </div>
//                       <div className="forgotPasswordLink">
//                         <a href="/forgotPassword" className="forgotPassword">
//                           Forgot Password
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                   <button type="submit" className="btn loginSignupBtn">
//                     Sign In
//                   </button>
//                 </form>
//                 <p>
//                   Don't have an account? <a href="/register">Sign Up</a>
//                 </p>
//               </div>
//               <div className="loginFormImg">
//                 <img
//                   src={logoImg}
//                   //src="images/login.png"
//                   alt="login"
//                   className="img-fluid"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="loginTab">
//             <a href="/register">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="62"
//                 height="62"
//                 viewBox="0 0 62 62"
//                 fill="none"
//               >
//                 <path
//                   d="M8.28655 50.4999C12.1437 41.7142 20.7151 35.4999 31.0008 35.4999C41.2866 35.4999 50.0723 41.7142 53.7151 50.4999M61 31C61 47.5685 47.5685 61 31 61C14.4315 61 1 47.5685 1 31C1 14.4315 14.4315 1 31 1C47.5685 1 61 14.4315 61 31ZM41.7143 24.5714C41.7143 30.4888 36.9173 35.2857 31 35.2857C25.0827 35.2857 20.2857 30.4888 20.2857 24.5714C20.2857 18.6541 25.0827 13.8571 31 13.8571C36.9173 13.8571 41.7143 18.6541 41.7143 24.5714Z"
//                   stroke="#999999"
//                   strokeWidth="2"
//                   strokeMiterlimit="10"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               <span>Sign Up</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LoginPage;
