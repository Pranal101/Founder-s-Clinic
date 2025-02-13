// import Link from "next/link";

// const CallToAction2 = () => {
//   return (
//     <section
//       className="call-to-action-two"
//       style={{ backgroundImage: "url(/images/background/1.jpg)" }}
//     >
//       <div className="auto-container" data-aos="fade-up">
//         <div className="sec-title light text-center">
//           <h2>Your Dream Jobs Are Waiting</h2>
//           <div className="text">
//             Over 1 million interactions, 50,000 success stories Make yours now.
//           </div>
//         </div>

//         <div className="btn-box">
//           <Link href="/job-list-v6" className="theme-btn btn-style-three">
//             Search Job
//           </Link>
//           <Link href="/register" className="theme-btn btn-style-two">
//             Apply Job Now
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CallToAction2;
// import Image from "next/image";
// import Testimonial from "../testimonial/ImageSlider2";

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
            src="/images/b2.jpg" // Display only the first image
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
