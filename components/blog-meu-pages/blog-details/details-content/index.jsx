import Image from "next/image";
import CommentBox from "./CommentBox";
import Form from "./Form";
import Pagination from "./Pagination";
import SocialShare from "./SocialShare";
import Tag from "./Tag";

const index = ({ event }) => {
  if (!event) {
    return <p>No event details available.</p>;
  }
  return (
    <div className="auto-container">
      <h4>Event Description</h4>

      <p>{event.description || "No description available."}</p>
      {/* <p>
        Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin
        sagittis dolor sed mi elementum pretium. Donec et justo ante. Vivamus
        egestas sodales est, eu rhoncus urna semper eu. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Integer tristique elit lobortis purus bibendum, quis dictum metus
        mattis. Phasellus posuere felis sed eros porttitor mattis. Curabitur
        massa magna, tempor in blandit id, porta in ligula. Aliquam laoreet nisl
        massa, at interdum mauris sollicitudin et.
      </p> */}

      <blockquote className="blockquote-style-one mb-5 mt-5">
        <p>
          Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec.
          Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.{" "}
        </p>
        <cite>{event.hostName || "Unknown Host"}</cite>
      </blockquote>
      {/* End BlogQuote */}

      <h4>Event Details</h4>
      <ul className="list-style-four">
        <li>
          <strong>Event Type:</strong> {event.eventType?.join(", ") || "N/A"}
        </li>
        <li>
          <strong>Start Date:</strong>{" "}
          {event.eventStartDate
            ? new Date(event.eventStartDate).toLocaleDateString()
            : "N/A"}
        </li>
        <li>
          <strong>End Date:</strong>{" "}
          {event.eventEndDate
            ? new Date(event.eventEndDate).toLocaleDateString()
            : "N/A"}
        </li>
        <li>
          <strong>Location:</strong>{" "}
          {event.eventLocation || "No location provided"}
        </li>
        <li>
          <strong>Target Audience:</strong>{" "}
          {event.targetAudience?.join(", ") || "N/A"}
        </li>
        {event.registrationLink && (
          <li>
            <strong>Registration Link:</strong>{" "}
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Here
            </a>
          </li>
        )}
      </ul>
      {/* List */}

      <figure className="image">
        <Image
          width={770}
          height={450}
          src="/images/resource/post-img.jpg"
          alt="resource"
        />
      </figure>

      <h4>Sponsors & Promotions</h4>
      <ul className="list-style-three">
        {event.sponsorsList?.length > 0 && (
          <li>
            <strong>Sponsors:</strong> {event.sponsorsList.join(", ")}
          </li>
        )}
        {event.promotionalVideo && (
          <li>
            <strong>Promotional Video:</strong>{" "}
            <a
              href={event.promotionalVideo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Video
            </a>
          </li>
        )}
      </ul>
      {/* <!-- list --> */}

      <div className="other-options">
        <div className="social-share">
          <h5>Share this post</h5>
          <SocialShare />
        </div>
        {/* End social-share */}

        {/* <Tag /> */}
      </div>
      {/* End other share */}

      {/* <div className="post-control">
        <Pagination />
      </div> */}
      {/* <!-- Post Control --> */}

      {/* <div className="comments-area">
        <CommentBox />
      </div> */}

      {/* <!-- Comments area --> */}

      {/* <!-- Comment Form --> */}
      <div className="comment-form default-form">
        <h4>Leave your thought here</h4>
        <Form />
      </div>
      {/* <!--End Comment Form --> */}
    </div>
  );
};

export default index;
