"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const UserListingsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/admin/users",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error.response || error);
        toast.error("Failed to fetch users.");
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

  const handleApproval = async (userId, isApproved) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      const { data } = await axios.patch(
        `https://founders-clinic-backend.onrender.com/api/admin/users/approve`,
        { userId, isApproved },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Update user approval status locally
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? { ...u, isApproved } : u))
      );

      toast.success(
        data.message || `User has been ${isApproved ? "approved" : "rejected"}`
      );
    } catch (error) {
      console.error("Error updating user approval:", error.response || error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update user approval status."
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users.length) {
    return <div>No users found.</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>All Users</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="status">
                    {user.isApproved ? "Approved" : "Pending"}
                  </td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        {!user.isApproved && (
                          <li>
                            <button
                              onClick={() => handleApproval(user._id, true)}
                              data-text="Approve"
                            >
                              <span className="la la-check"></span>
                            </button>
                          </li>
                        )}
                        {user.isApproved && (
                          <li>
                            <button
                              onClick={() => handleApproval(user._id, false)}
                              data-text="Reject"
                            >
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                        )}
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

export default UserListingsPage;
