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
        const [
          userCountsResponse,
          closedJobCountResponse,
          totalJobCountResponse,
        ] = await Promise.all([
          axios.get("http://13.126.254.235:4000/api/admin/user-counts"), // Existing endpoint
          axios.get("http://13.126.254.235:4000/api/admin/closed-jobs"), // Closed jobs endpoint
          axios.get("http://13.126.254.235:4000/api/admin/total-job-count"), // Total jobs endpoint
        ]);

        setUserCounts({
          ...userCountsResponse.data.data,
          ClosedJobs: closedJobCountResponse.data.data,
          TotalJobs: totalJobCountResponse.data.data,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
        toast.error("Failed to fetch counts.");
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
    {
      id: 5,
      icon: "la-times-circle-o",
      metaName: "Projects Alloted",
      countNumber: userCounts.ClosedJobs || "0",
      uiClass: "ui-green",
      route: "/candidates-dashboard/closed-jobs",
    },
    {
      id: 6,
      icon: "la-clipboard-list",
      metaName: "All Inqueries",
      countNumber: userCounts.TotalJobs || "0",
      uiClass: "ui-yellow",
      route: "/candidates-dashboard/total-jobs",
    },
    {
      id: 7,
      icon: "la-clipboard-list",
      metaName: "Total Subscriptions",
      countNumber: "13",
      uiClass: "ui-red",
      route: "/candidates-dashboard/total-jobs",
    },
    {
      id: 8,
      icon: "la-clipboard-list",
      metaName: "Avg Allotment Time",
      countNumber: "2 Hr",
      uiClass: "ui-blue",
      route: "/candidates-dashboard/total-jobs",
    },
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
