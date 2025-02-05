"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EnterpriseListingsTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "http://13.126.254.235:4000/api/admin/enterprise",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setUsers(data);
      } catch (error) {
        console.error(
          "Error fetching enterprise users:",
          error.response || error
        );
        toast.error("Failed to fetch enterprise users.");
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
    return <div>No enterprise users found.</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Enterprise Users</h4>
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

export default EnterpriseListingsTable;
