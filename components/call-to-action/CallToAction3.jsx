// import Link from "next/link";

// const CallToAction3 = () => {
//   return (
//     <section className="call-to-action-three">
//       <div className="auto-container">
//         <div className="outer-box">
//           <div className="sec-title">
//             <h2>Let employers find you</h2>
//             <div className="text">
//               Advertise your jobs to millions of monthly users and search 15.8
//               million CVs in our database.
//             </div>
//           </div>
//           {/* End sec title */}

//           <div className="btn-box">
//             <Link
//               href="/job-list-v7"
//               className="theme-btn btn-style-one bg-blue"
//             >
//               <span className="btn-title">Search Job</span>
//             </Link>
//           </div>
//           {/* End btn-box */}
//         </div>
//         {/* End outer-box */}
//       </div>
//     </section>
//   );
// };

// export default CallToAction3;
// import Image from "next/image";
// import Testimonial from "../testimonial/ImageSlider3";

// const CallToAction = () => {
//   return (
//     <section className="call-to-action">
//       <div className="auto-container">
//         <div className="outer-box" data-aos="fade-up">
//           {/* <!-- Testimonial Carousel --> */}
//           <div className="testimonial gap-x25 center-item-active ">
//             <Testimonial />
//           </div>

//           {/* End .content-column */}

//           <div
//             className="image-column"
//             // style={{ backgroundImage: " url(images/resource/image-1.png)" }}
//           >
//             <figure className="image">
//               <Image
//                 width={417}
//                 height={328}
//                 src="/images/b1.jpg"
//                 alt="resource"
//               />
//             </figure>
//           </div>
//           {/* End .image-column */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CallToAction;
import React from "react";

// assets
import "@/components/ImageSlider/ImageSlider.css";

// constants
import { imageSliderText } from "@/data/imageSliderSection";

const ImageSlider = () => {
  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="slide active">
          <img
            src="/images/b3.jpg"
            alt="Static Banner"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
