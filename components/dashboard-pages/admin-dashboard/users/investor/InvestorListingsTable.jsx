"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvestorListingsTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/admin/investor",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setUsers(data);
      } catch (error) {
        console.error(
          "Error fetching investor users:",
          error.response || error
        );
        toast.error("Failed to fetch investor users.");
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUsers(user);
      } else {
        setUsers([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users.length) {
    return <div>No investor users found.</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Investor Users</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="status">
                    {user.isApproved ? "Approved" : "Pending"}
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

export default InvestorListingsTable;
