"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Image from "next/image";

const EventDetailsDynamic = ({ params }) => {
  const id = params?.id;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://13.126.254.235:4000/api/user/events/${id}`
        );
        setEvent(response.data.event); // Assuming API returns event in `event` field
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* Header Span */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* End Main Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* Event Details */}
      <section className="blog-single">
        <div className="auto-container">
          <div className="upper-box">
            <h3>{event?.eventTitle}</h3>

            <ul className="post-info">
              <li>
                <span className="thumb">
                  <Image
                    width={30}
                    height={30}
                    src={
                      event?.hostImage || "/images/resource/default-thumb.png"
                    }
                    alt="Host"
                  />
                </span>
                {event?.hostName || "Unknown Host"}
              </li>
              <li>
                {new Date(event?.eventStartDate).toLocaleDateString()} -{" "}
                {new Date(event?.eventEndDate).toLocaleDateString()}
              </li>
              <li>
                {event?.city && event?.country
                  ? `${event.city}, ${event.country}`
                  : "Location not available"}
              </li>
            </ul>
          </div>
        </div>

        {/* Event Image */}
        <figure className="main-image">
          <Image
            width={1903}
            height={595}
            src={event?.image || "/images/resource/default-event.png"}
            alt={event?.eventTitle || "Event Image"}
          />
        </figure>

        {/* Event Description */}
        <div className="auto-container">
          <div className="event-description">
            <h4>Description</h4>
            <p>
              {event?.description || "No description provided for this event."}
            </p>
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(EventDetailsDynamic), {
  ssr: false,
});
