"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const EventDetails = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://founders-clinic-backend.onrender.com/api/events/${eventId}` // Replace with your API endpoint
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>No event details found.</p>;
  }

  return (
    <section className="event-single">
      <div className="auto-container">
        <div className="upper-box">
          <h3>{event.eventTitle}</h3>

          <ul className="post-info">
            <li>
              <span className="thumb">
                <Image
                  width={30}
                  height={30}
                  src="/images/resource/event-organizer.png"
                  alt="event organizer"
                />
              </span>
              {event.organizerName || "Unknown Organizer"}
            </li>
            <li>
              {new Date(event.eventStartDate).toLocaleDateString()} -{" "}
              {new Date(event.eventEndDate).toLocaleDateString()}
            </li>
            <li>{event.eventType.join(", ")}</li>
          </ul>
          {/* End post info */}
        </div>
      </div>
      {/* End auto-container */}

      <figure className="main-image">
        <Image
          width={1903}
          height={595}
          src={event.image || "/images/resource/default-event.jpg"}
          alt={event.eventTitle}
        />
      </figure>

      <div className="details-content">
        <div className="auto-container">
          <h4>Event Details</h4>
          <p>{event.description}</p>

          <ul className="additional-info">
            <li>
              <strong>Location:</strong> {event.city}, {event.country}
            </li>
            <li>
              <strong>Status:</strong>{" "}
              {event.isApproved ? "Approved" : "Pending"}
            </li>
          </ul>
        </div>
      </div>
      {/* End details content */}
    </section>
  );
};

export default EventDetails;
