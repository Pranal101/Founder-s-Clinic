// import Image from "next/image";

// const CallToAction = () => {
//   return (
//     <section className="call-to-action">
//       <div className="auto-container">
//         <div className="outer-box" data-aos="fade-up">
//           <div className="content-column">
//             <div className="sec-title">
//               <h2>Recruiting?</h2>
//               <div className="text">
//                 Advertise your jobs to millions of monthly users and search 15.8
//                 million
//                 <br /> CVs in our database.
//               </div>
//               <a href="#" className="theme-btn btn-style-one bg-blue">
//                 <span className="btn-title">Start Recruiting Now</span>
//               </a>
//             </div>
//           </div>
//           {/* End .content-column */}

//           <div
//             className="image-column"
//             style={{ backgroundImage: " url(images/resource/image-1.png)" }}
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
import Image from "next/image";
import Testimonial from "../testimonial/ImageSlider";

const CallToAction = () => {
  return (
    <section className="call-to-action">
      <div className="auto-container">
        <div className="outer-box" data-aos="fade-up">
          {/* <!-- Testimonial Carousel --> */}
          <div className="testimonial gap-x25 center-item-active ">
            <Testimonial />
          </div>

          {/* End .content-column */}

          <div
            className="image-column"
            // style={{ backgroundImage: " url(images/resource/image-1.png)" }}
          >
            <figure className="image">
              <Image
                width={417}
                height={328}
                src="/images/b1.jpg"
                alt="resource"
              />
            </figure>
          </div>
          {/* End .image-column */}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
