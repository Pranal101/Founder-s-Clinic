// import dynamic from "next/dynamic";
// import LoginPopup from "@/components/common/form/login/LoginPopup";
// import FooterDefault from "@/components/footer/common-footer";
// import DefaulHeader from "@/components/header/DefaulHeader";
// import MobileMenu from "@/components/header/MobileMenu";
// import DetailsContent from "@/components/blog-meu-pages/blog-details/details-content";
// import blogs from "@/data/blogs";
// import Image from "next/image";

// export const metadata = {
//   title: "Event Details",
// };

// const BlogDetailsDynamic = ({ params }) => {
//   const id = params?.id;

//   const blog = blogs.find((item) => item.id === parseInt(id, 10)) || blogs[0];

//   return (
//     <>
//       {/* <!-- Header Span --> */}
//       <span className="header-span"></span>

//       <LoginPopup />
//       {/* End Login Popup Modal */}

//       <DefaulHeader />
//       {/* <!--End Main Header --> */}

//       <MobileMenu />
//       {/* End MobileMenu */}

//       {/* <!-- Blog Single --> */}
//       <section className="blog-single">
//         <div className="auto-container">
//           <div className="upper-box">
//             <h3>{blog?.blogSingleTitle}</h3>

//             <ul className="post-info">
//               <li>
//                 <span className="thumb">
//                   <Image
//                     width={30}
//                     height={30}
//                     src={"/images/resource/thumb-1.png"}
//                     alt="resource"
//                   />
//                 </span>
//                 Alison Dawn
//               </li>
//               <li>August 31, 2021</li>
//               <li>12 Comment</li>
//             </ul>
//             {/* End post info */}
//           </div>
//         </div>
//         {/* End auto-container */}

//         <figure className="main-image">
//           <Image width={1903} height={595} src={blog?.img} alt="resource" />
//         </figure>

//         <DetailsContent />
//       </section>
//       {/* <!-- End Blog Single --> */}

//       <FooterDefault footerStyle="alternate5" />
//       {/* <!-- End Main Footer --> */}
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(BlogDetailsDynamic), {
//   ssr: false,
// });
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Link from "next/link";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import DetailsContent from "@/components/blog-meu-pages/blog-details/details-content";
import Image from "next/image";
import { useParams } from "next/navigation";

// export const metadata = {
//   title: "Event Details",
// };

const BlogDetailsDynamic = () => {
  const { id } = useParams(); // Get event ID from URL params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/user/events/${id}`)
        .then((response) => {
          if (response.data.event) {
            setEvent(response.data.event);
          } else {
            setError("Event not found");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching event:", err);
          setError("Failed to load event");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <span className="header-span"></span>

      <LoginPopup />
      <DefaulHeader />
      <MobileMenu />

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
                    src="/images/resource/thumb-1.png"
                    alt="resource"
                  />
                </span>
                {event?.hostName || "Unknown Host"}
              </li>
              <li>
                {event?.eventStartDate
                  ? new Date(event.eventStartDate).toLocaleDateString()
                  : "Date not available"}
              </li>
              <li>{event?.expectedNumberOfAttendees || "N/A"} Attendees</li>
            </ul>
          </div>
        </div>

        <figure className="main-image">
          <Image
            width={1903}
            height={595}
            src={event?.image || "/default.jpg"}
            alt="event"
          />
        </figure>

        <DetailsContent event={event} />
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default dynamic(() => Promise.resolve(BlogDetailsDynamic), {
  ssr: false,
});
