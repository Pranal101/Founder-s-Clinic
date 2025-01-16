"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const TopCardBlock = () => {
  const [userCounts, setUserCounts] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch user counts from the API
  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const { data } = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/admin/user-counts" // Adjust the API endpoint if needed
        );
        setUserCounts(data.data);
      } catch (error) {
        console.error("Error fetching user counts:", error);
        toast.error("Failed to fetch user counts.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCounts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      metaName: "Enterprises",
      countNumber: userCounts.Enterprise || "0",
      uiClass: "ui-blue",
      route: "/candidates-dashboard/enterprise",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      metaName: "Interns",
      countNumber: userCounts.Intern || "0",
      uiClass: "ui-red",
      route: "/candidates-dashboard/intern",
    },
    {
      id: 3,
      icon: "la-comment-o",
      metaName: "Professionals",
      countNumber: userCounts.Professional || "0",
      uiClass: "ui-yellow",
      route: "/candidates-dashboard/professional",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      metaName: "Investors",
      countNumber: userCounts.Investor || "0",
      uiClass: "ui-green",
      route: "/candidates-dashboard/investor",
    },
    // {
    //   id: 5,
    //   icon: "la-bookmark-o",
    //   metaName: "Networking Community",
    //   countNumber: userCounts.NetworkingCommunity || "0",
    //   uiClass: "ui-green",
    //   route: "/candidates-dashboard/investor",
    // },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
          style={{ cursor: "pointer" }}
        >
          <Link href={item.route}>
            <div className={`ui-item ${item.uiClass}`}>
              <div className="left">
                <i className={`icon la ${item.icon}`}></i>
              </div>
              <div className="right">
                <h4>{item.countNumber}</h4>
                <p>{item.metaName}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
