import React, { useEffect, useState } from "react";
import axios from "axios";
import mapIcon from "../../images/map-icon.png";

const Address = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newAddress, setNewAddress] = useState({
    addressCategory: "",
    address: "",
    addressType: "",
    unitNo: "",
    buzzerCode: "",
    deliveryInstructions: "",
  });
  const [editAddressData, setEditAddressData] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:80/api/v1/user-info",
          {
            withCredentials: true,
          }
        );
        setUserInfo(data.user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:80/api/v1/address",
        newAddress,
        {
          withCredentials: true,
        }
      );
      setUserInfo((prev) => ({ ...prev, addresses: data.addresses }));
      setNewAddress({
        addressCategory: "",
        address: "",
        addressType: "",
        unitNo: "",
        buzzerCode: "",
        deliveryInstructions: "",
      });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const editAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:80/api/v1/address/${editAddressData._id}`,
        editAddressData,
        {
          withCredentials: true,
        }
      );
      setUserInfo((prev) => ({ ...prev, addresses: data.addresses }));
      setEditAddressData(null);
    } catch (error) {
      console.error("Error editing address:", error);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:80/api/v1/address/${addressId}`,
        {
          withCredentials: true,
        }
      );
      setUserInfo((prev) => ({ ...prev, addresses: data.addresses }));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditAddressChange = (e) => {
    const { name, value } = e.target;
    setEditAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditModal = (address) => {
    setEditAddressData(address);
    const editModal = new window.bootstrap.Modal(
      document.getElementById("editAddressModal")
    );
    editModal.show();
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="w-100 clearfix myProfile"
      id="myProfile"
      style={{ paddingBottom: "100px" }}
    >
      <div className="container">
        <div className="myProfileInner">
          <div className="tabContent">
            <div className="tab-content">
              <div className="tab-pane active" id="address">
                <div className="addressContent">
                  <div className="addressHead">
                    <div className="addressHeading">
                      <h4>Manage Delivery Address</h4>
                    </div>
                    <div className="newAddressLink">
                      <a
                        href=""
                        className="newAddress"
                        data-bs-toggle="modal"
                        data-bs-target="#addNewAddressModal"
                      >
                        + Add New Address
                      </a>
                    </div>
                  </div>
                  <div className="addressCardGroup">
                    <div className="row">
                      {userInfo.addresses.map((address, index) => (
                        <div className="col-md-6" key={index}>
                          <div className="addressCard">
                            <div className="addressDetailCard">
                              <div className="addressDetailHeading">
                                <h5>{address.addressType} Address</h5>
                                <h6>{userInfo.name}</h6>
                              </div>
                              <p>
                                {address.address} | {address.pincode}
                              </p>
                              <div className="addressContactList">
                                <ul className="addressContactNav">
                                  <li>
                                    <a href={`mailto:${userInfo.email}`}>
                                      {userInfo.email}
                                    </a>
                                  </li>
                                  <li>
                                    <a href={`tel:${userInfo.phoneNumber}`}>
                                      {userInfo.phoneNumber}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                              <div className="addressLinkBtnList">
                                <ul className="addressLinkBtnNav">
                                  <li>
                                    <a
                                      href=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        openEditModal(address);
                                      }}
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        deleteAddress(address._id);
                                      }}
                                    >
                                      Delete
                                    </a>
                                  </li>
                                  <li>
                                    <a href="">Set As Default</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="addressImgCard">
                              <img
                                src={mapIcon}
                                alt="map-icon"
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add New Address Modal */}
                  <div
                    className="modal fade"
                    id="addNewAddressModal"
                    tabIndex="-1"
                    aria-labelledby="addNewAddressModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="addNewAddressModalLabel"
                          >
                            Add New Address
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={addAddress}>
                            <div className="mb-3">
                              <label
                                htmlFor="addressCategory"
                                className="form-label"
                              >
                                Address Category
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="addressCategory"
                                name="addressCategory"
                                value={newAddress.addressCategory}
                                onChange={handleNewAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="address" className="form-label">
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={newAddress.address}
                                onChange={handleNewAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="addressType"
                                className="form-label"
                              >
                                Address Type
                              </label>
                              <select
                                className="form-select"
                                id="addressType"
                                name="addressType"
                                value={newAddress.addressType}
                                onChange={handleNewAddressChange}
                              >
                                <option value="">Select Type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Unit">Unit</option>
                                <option value="House">House</option>
                                <option value="Basement">Basement</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="unitNo" className="form-label">
                                Unit No
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="unitNo"
                                name="unitNo"
                                value={newAddress.unitNo}
                                onChange={handleNewAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="buzzerCode"
                                className="form-label"
                              >
                                Buzzer Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="buzzerCode"
                                name="buzzerCode"
                                value={newAddress.buzzerCode}
                                onChange={handleNewAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="pincode" className="form-label">
                                Pincode
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="pincode"
                                name="pincode"
                                value={newAddress.pincode || ""}
                                onChange={handleNewAddressChange}
                              />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="deliveryInstructions"
                                className="form-label"
                              >
                                Delivery Instructions
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="deliveryInstructions"
                                name="deliveryInstructions"
                                value={newAddress.deliveryInstructions}
                                onChange={handleNewAddressChange}
                              />
                            </div>
                            <button type="submit" className="btn btnPrimary">
                              Add Address
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Edit Address Modal */}
                  <div
                    className="modal fade"
                    id="editAddressModal"
                    tabIndex="-1"
                    aria-labelledby="editAddressModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="editAddressModalLabel"
                          >
                            Edit Address
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={editAddress}>
                            <div className="mb-3">
                              <label
                                htmlFor="editAddressCategory"
                                className="form-label"
                              >
                                Address Category
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="editAddressCategory"
                                name="addressCategory"
                                value={editAddressData?.addressCategory || ""}
                                onChange={handleEditAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="editAddress"
                                className="form-label"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="editAddress"
                                name="address"
                                value={editAddressData?.address || ""}
                                onChange={handleEditAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="editAddressType"
                                className="form-label"
                              >
                                Address Type
                              </label>
                              <select
                                className="form-select"
                                id="editAddressType"
                                name="addressType"
                                value={editAddressData?.addressType || ""}
                                onChange={handleEditAddressChange}
                              >
                                <option value="">Select Type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Unit">Unit</option>
                                <option value="House">House</option>
                                <option value="Basement">Basement</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="editUnitNo"
                                className="form-label"
                              >
                                Unit No
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="editUnitNo"
                                name="unitNo"
                                value={editAddressData?.unitNo || ""}
                                onChange={handleEditAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="editBuzzerCode"
                                className="form-label"
                              >
                                Buzzer Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="editBuzzerCode"
                                name="buzzerCode"
                                value={editAddressData?.buzzerCode || ""}
                                onChange={handleEditAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="editPincode"
                                className="form-label"
                              >
                                Pincode
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="editPincode"
                                name="pincode"
                                value={editAddressData?.pincode || ""}
                                onChange={handleEditAddressChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="editDeliveryInstructions"
                                className="form-label"
                              >
                                Delivery Instructions
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="editDeliveryInstructions"
                                name="deliveryInstructions"
                                value={
                                  editAddressData?.deliveryInstructions || ""
                                }
                                onChange={handleEditAddressChange}
                              />
                            </div>
                            <button type="submit" className="btn btnPrimary">
                              Save
                            </button>
                          </form>
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

export default Address;
