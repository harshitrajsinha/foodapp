import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

const UserInfo = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    addresses: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:80/api/v1/user-info", {
          method: "GET",
          credentials: "include", // To send cookies with the request
        });
        const data = await response.json();

        if (data.success) {
          const fullName = data.user.name || "";
          const nameParts = fullName.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setUser({
            firstName,
            lastName,
            email: data.user.email,
            phoneNumber: data.user.phoneNumber,
            addresses: data.user.addresses || [],
          });
        } else {
          console.error("Failed to fetch user data");
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullName = `${user.firstName} ${user.lastName}`.trim();

      const response = await fetch("http://localhost:80/api/v1/user-update", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("User info updated successfully!");
      } else {
        toast.error("Failed to update user info.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Error updating user info.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="w-100 clearfix myProfile"
      id="myProfile"
      style={{ paddingBottom: "130px" }}
    >
      <ToastContainer />
      <div className="container">
        <div className="myProfileInner">
          <div className="tabContent">
            <div className="tab-content">
              <div className="tab-pane active" id="my-profile">
                <div className="myProfileContent">
                  <div className="row">
                    <div className="col-md-12 col-lg-8 order-lg-1 order-2">
                      <div className="myProfileBx lbPersonalInformation">
                        <div className="profileHeading">
                          <h4>Personal Information</h4>
                        </div>
                        <div className="personalContent">
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="formGroup">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="First Name"
                                      name="firstName"
                                      value={user.firstName}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="formGroup">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Last Name"
                                      name="lastName"
                                      value={user.lastName}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="formGroup">
                                  <div className="input-group">
                                    <input
                                      type="email"
                                      className="form-control"
                                      placeholder="Email"
                                      name="email"
                                      value={user.email}
                                      onChange={handleChange}
                                    />
                                    <button
                                      type="submit"
                                      className="input-group-text"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="formGroup">
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="number"
                                      placeholder="Phone Number"
                                      name="phoneNumber"
                                      value={user.phoneNumber}
                                      onChange={handleChange}
                                    />
                                    <button
                                      type="submit"
                                      className="input-group-text"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <button
                                  type="submit"
                                  className="btn btnPrimary"
                                >
                                  <span>Save Changes</span>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="myProfileBx lbChangePassword">
                        <div className="profileHeading">
                          <h4>Change Password</h4>
                        </div>
                        <div className="personalContent">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Current  Password"
                                    name="currentPassword"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="newPasswordField"
                                    placeholder="New Password"
                                    name="newPassword"
                                  />
                                  <span className="input-group-text passwordShow">
                                    <i
                                      className="fa-regular fa-eye field-icon togglePassword"
                                      toggle="#newPasswordField"
                                    ></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="formGroup">
                                <div className="input-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPasswordField"
                                    placeholder="Confirm New Password"
                                    name="confirmNewPassword"
                                  />
                                  <span className="input-group-text passwordShow">
                                    <i
                                      className="fa-regular fa-eye field-icon togglePassword"
                                      toggle="#confirmPasswordField"
                                    ></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <a href="" className="btn btnPrimary">
                                <span>Change Password</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-4 order-lg-2 order-1">
                      <div className="personalProfileContent">
                        <div className="myProfileBx personalProfileContentBx">
                          <div className="profileImgOuter">
                            <div className="profileImg">
                              <div className="profileImgInner">
                                <img
                                  src="images/chef3.png"
                                  alt="profile"
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="profileUserDetailBx">
                            <h4>
                              {user.firstName} {user.lastName}
                            </h4>
                            <span className="profTag">Client</span>
                            <a href="" className="btn btnPrimary">
                              <span>Edit Profile</span>
                            </a>
                          </div>
                          <div className="profileDetail">
                            <ul>
                              <li>
                                <a href="">
                                  <MdOutlineEmail />
                                  {user.email}
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <MdOutlinePhone />
                                  {user.phoneNumber}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
