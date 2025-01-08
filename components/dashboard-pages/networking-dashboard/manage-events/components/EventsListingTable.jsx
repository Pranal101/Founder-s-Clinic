"use client";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const EventListingsTable = () => {
  const [events, setEvents] = useState([]); // Changed to events instead of jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated");
        }

        const userToken = await user.getIdToken();
        const response = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/user/get-events",
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Secure API call
            },
          }
        );

        setEvents(response.data.events); // Fetching events instead of jobs
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserEvents(); // Changed function name to fetch events
      } else {
        console.error("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Clean up the observer on unmount
  }, []);

  const handleDeleteEvent = async (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const userToken = await user.getIdToken();

        await axios.delete(
          `https://founders-clinic-backend.onrender.com/api/user/events/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        // Update event list after deletion
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete the event. Please try again.");
      }
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event); // Open a modal with event details
  };

  const updateEvent = async (updatedData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      const response = await axios.patch(
        `https://founders-clinic-backend.onrender.com/api/events/${editingEvent._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Update the event list with the updated event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === editingEvent._id ? response.data.event : event
        )
      );

      setEditingEvent(null); // Close the modal
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update the event. Please try again.");
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Events</h4>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          {loading ? (
            <p>Loading events...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Event Type</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr key={event._id}>
                      <td>
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <h4>
                                <Link href={`/blog-details/${event._id}`}>
                                  {event.eventTitle}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {event.city},{event.country}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{event.eventType.join(", ")}</td>{" "}
                      {/* Display event types */}
                      <td>
                        {new Date(event.eventStartDate).toLocaleDateString()}{" "}
                        <br />
                        {new Date(event.eventEndDate).toLocaleDateString()}
                      </td>
                      <td className="status">
                        {event.isApproved ? "Approved" : "Pending"}
                      </td>
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button
                                onClick={() => handleDeleteEvent(event._id)}
                                data-text="Delete Event"
                              >
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No events found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {editingEvent && (
        <div className="modal">
          {/* Modal Content for Editing Event */}
          <h4>Edit Event</h4>
          {/* Form with pre-filled event data */}
          <button onClick={() => setEditingEvent(null)}>Close</button>
          <button
            onClick={() => updateEvent({ eventTitle: "Updated Event Title" })}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EventListingsTable;
