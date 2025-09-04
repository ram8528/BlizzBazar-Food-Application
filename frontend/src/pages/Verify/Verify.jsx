import React, { useEffect, useContext, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isVerifying, setIsVerifying] = useState(true);

  const verifyPayment = async () => {
    try {
      toast.info("Verifying your payment...");
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });

      if (response.data.success) {
        toast.success("Payment verified successfully! 🎉");
        navigate("/myorders");
      } else {
        toast.error("Payment verification failed.");
        navigate("/");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Something went wrong while verifying payment.");
      navigate("/");
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    } else {
      toast.error("Invalid verification URL");
      navigate("/");
    }
  }, []);

  return (
    <div className="verify">
      {isVerifying && (
        <div className="verify-spinner">
          <div className="spinner"></div>
          <p>Verifying your payment...</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
