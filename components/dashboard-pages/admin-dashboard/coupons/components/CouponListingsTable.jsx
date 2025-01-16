"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const CouponListing = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/admin/all-coupons",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setCoupons(data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error.response || error);
        toast.error("Failed to fetch coupons.");
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCoupons(user);
      } else {
        setCoupons([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (couponId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      const { data } = await axios.delete(
        `https://founders-clinic-backend.onrender.com/api/admin/coupon/${couponId}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon._id !== couponId)
      );
      toast.success(data.message || "Coupon deleted successfully!");
    } catch (error) {
      console.error("Error deleting coupon:", error.response || error);
      toast.error("Failed to delete coupon.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!coupons.length) {
    return <div>No coupons found.</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>All Coupons</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Type</th>
                <th>Expiration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}</td>
                  <td>{coupon.type}</td>
                  <td>
                    {new Date(coupon.expirationDate).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button
                            onClick={() => handleDelete(coupon._id)}
                            data-text="Delete Subscription"
                          >
                            <span className="la la-trash"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponListing;
