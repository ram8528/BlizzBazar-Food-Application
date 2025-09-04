import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { toast } from "react-toastify"; // ✅ Toast for errors or empty

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success && response.data.data.length > 0) {
        setData(response.data.data);
      } else {
        setData([]);
        toast.info("You have no orders yet.");
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {loading ? (
          <p className="loading-message">Loading your orders...</p>
        ) : data.length === 0 ? (
          <p className="no-orders-message">No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel" />
              <p>
                {order.items
                  .map((item) => `${item.name} x ${item.quantity}`)
                  .join(", ")}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p className={`status ${order.status.toLowerCase()}`}>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              {/* You can later turn this into a modal for tracking */}
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
