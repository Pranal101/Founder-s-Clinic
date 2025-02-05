"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const EventListingsTable = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async (user) => {
      try {
        const userToken = await user.getIdToken();

        const { data } = await axios.get(
          "http://13.126.254.235:4000/api/admin/events",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchEvents(user);
      } else {
        setEvents([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      const { data } = await axios.patch(
        `http://13.126.254.235:4000/api/admin/events/${eventId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Update event status locally
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, isApproved: true } : event
        )
      );

      toast.success(data.message || "Event approved successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error approving event.";
      console.error(errorMessage, error.response || error);
      toast.error(errorMessage);
    }
  };

  const handleReject = async (eventId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userToken = await user.getIdToken();

      const { data } = await axios.patch(
        `http://13.126.254.235:4000/api/admin/events/${eventId}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      // Update event status locally
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, isApproved: false } : event
        )
      );

      toast.success(data.message || "Event rejected successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error rejecting event.";
      console.error(errorMessage, error.response || error);
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!events.length) {
    return <div>No events found.</div>;
  }

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>All Events</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Organizer</th>
                <th>Mode</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            {event.logoUrl && (
                              <Image
                                width={50}
                                height={50}
                                src={event.logoUrl}
                                alt={`${event.organizerName} logo`}
                              />
                            )}
                          </span>
                          <h4>
                            <Link href={`/blog-details/${event._id}`}>
                              {event.eventTitle}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{event.hostName}</td>
                  <td>{event.eventLocation || "Not specified"}</td>
                  <td>
                    {event.eventStartDate
                      ? new Date(event.eventStartDate).toLocaleDateString()
                      : "Not specified"}
                  </td>
                  <td className="status">
                    {event.isApproved ? "Approved" : "Pending"}
                  </td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        {!event.isApproved && (
                          <li>
                            <button
                              onClick={() => handleApprove(event._id)}
                              data-text="Approve"
                            >
                              <span className="la la-check"></span>
                            </button>
                          </li>
                        )}
                        {event.isApproved && (
                          <li>
                            <button
                              onClick={() => handleReject(event._id)}
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

export default EventListingsTable;
