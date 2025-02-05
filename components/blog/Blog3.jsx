// import Link from "next/link";
// import blogContent from "../../data/blogs";
// import Image from "next/image";

// const Blog3 = () => {
//   return (
//     <>
//       {blogContent.slice(10, 11).map((item) => (
//         <div className=" col-xl-6 col-lg-12 col-md-12 col-sm-12" key={item.id}>
//           {/* <!-- News Block --> */}
//           <div className="news-block">
//             <div className="inner-box">
//               <div className="image-box">
//                 <figure className="image image-large">
//                   <Image width={608} height={468} src={item.img} alt="blog" />
//                 </figure>
//               </div>
//               <div className="lower-content">
//                 <ul className="post-meta">
//                   <li>
//                     <a href="#">August 31, 2021</a>
//                   </li>
//                   <li>
//                     <a href="#">12 Comment</a>
//                   </li>
//                 </ul>
//                 {/* End post meta */}
//                 <h3>
//                   <Link href={`/blog-details/${item.id}`}>{item.title}</Link>
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className=" col-xl-6 col-lg-12 col-md-12 col-sm-12">
//         <div className="row">
//           {blogContent.slice(11, 15).map((item) => (
//             <div
//               className="news-block col-lg-6 col-md-6 col-sm-12"
//               key={item.id}
//             >
//               <div className="inner-box">
//                 <div className="image-box image-regular">
//                   <figure className="image">
//                     <Image
//                       width={282}
//                       height={163}
//                       src={item.img}
//                       alt="blog post"
//                     />
//                   </figure>
//                 </div>
//                 <div className="lower-content">
//                   <ul className="post-meta">
//                     <li>
//                       <a href="#">August 31, 2021</a>
//                     </li>
//                     <li>
//                       <a href="#">12 Comment</a>
//                     </li>
//                   </ul>
//                   <h3>
//                     <Link href={`/blog-details/${item.id}`}>{item.title}</Link>
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Blog3;
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// const Blog3 = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(
//           "http://13.126.254.235:4000/api/user/events/all-events"
//         ); // API Call
//         const data = await response.json();
//         setEvents(data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   return (
//     <>
//       {events.slice(0, 1).map((event) => (
//         <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12" key={event._id}>
//           <div className="news-block">
//             <div className="inner-box">
//               <div className="image-box">
//                 <figure className="image image-large">
//                   <Image
//                     width={608}
//                     height={468}
//                     src={event.image || "/default-event.jpg"} // Default Image if missing
//                     alt="Event Image"
//                   />
//                 </figure>
//               </div>
//               <div className="lower-content">
//                 <ul className="post-meta">
//                   <li>
//                     <a href="#">
//                       {new Date(event.eventStartDate).toDateString()}
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#">Hosted by {event.hostName}</a>
//                   </li>
//                 </ul>
//                 <h3>
//                   <Link href={`/blog-details/${event._id}`}>
//                     {event.eventTitle}
//                   </Link>
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
//         <div className="row">
//           {events.slice(1, 5).map((event) => (
//             <div
//               className="news-block col-lg-6 col-md-6 col-sm-12"
//               key={event._id}
//             >
//               <div className="inner-box">
//                 <div className="image-box image-regular">
//                   <figure className="image">
//                     <Image
//                       width={282}
//                       height={163}
//                       src={event.image || "/default-event.jpg"}
//                       alt="Event Image"
//                     />
//                   </figure>
//                 </div>
//                 <div className="lower-content">
//                   <ul className="post-meta">
//                     <li>
//                       <a href="#">
//                         {new Date(event.eventStartDate).toDateString()}
//                       </a>
//                     </li>
//                     <li>
//                       <a href="#">Hosted by {event.hostName}</a>
//                     </li>
//                   </ul>
//                   <h3>
//                     <Link href={`/blog-details/${event._id}`}>
//                       {event.eventTitle}
//                     </Link>
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Blog3;
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Blog3 = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://13.126.254.235:4000/api/user/events/all-events"
        ); // API Call
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      {events.slice(0, 1).map((event) => (
        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12" key={event._id}>
          <Link href={`/blog-details/${event._id}`} passHref>
            <div className="news-block" style={{ cursor: "pointer" }}>
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image image-large">
                    <Image
                      width={608}
                      height={468}
                      src={event.image || "/default-event.jpg"} // Default Image if missing
                      alt="Event Image"
                    />
                  </figure>
                </div>
                <div className="lower-content">
                  <ul className="post-meta">
                    <li>
                      <a href="#">
                        {new Date(event.eventStartDate).toDateString()}
                      </a>
                    </li>
                    <li>
                      <a href="#">Hosted by {event.hostName}</a>
                    </li>
                  </ul>
                  <h3>{event.eventTitle}</h3>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
        <div className="row">
          {events.slice(1, 5).map((event) => (
            <div
              className="news-block col-lg-6 col-md-6 col-sm-12"
              key={event._id}
            >
              <Link href={`/blog-details/${event._id}`} passHref>
                <div className="inner-box" style={{ cursor: "pointer" }}>
                  <div className="image-box image-regular">
                    <figure className="image">
                      <Image
                        width={282}
                        height={163}
                        src={event.image || "/default-event.jpg"} // Default Image if missing
                        alt="Event Image"
                      />
                    </figure>
                  </div>
                  <div className="lower-content">
                    <ul className="post-meta">
                      <li>
                        <a href="#">
                          {new Date(event.eventStartDate).toDateString()}
                        </a>
                      </li>
                      <li>
                        <a href="#">Hosted by {event.hostName}</a>
                      </li>
                    </ul>
                    <h3>{event.eventTitle}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog3;
