// "use client";

// import Image from "next/image";
// import testimonilaContent from "../../data/testimonial";
// import Slider from "react-slick";

// const Testimonial = () => {
//   const settings = {
//     dots: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     center: true,
//   };

//   return (
//     <>
//       <Slider {...settings} arrows={false}>
//         {testimonilaContent.slice(0, 3).map((item) => (
//           <div className="testimonial-block" key={item.id}>
//             <div className="inner-box">
//               <h4 className="title">{item.feedback}</h4>
//               <div className="text">{item.feedbackText}</div>
//               <div className="info-box">
//                 <div className="thumb">
//                   <Image
//                     width={50}
//                     height={50}
//                     layout="responsive"
//                     src={item.avatar}
//                     alt="testimonial"
//                   />
//                 </div>
//                 <h4 className="name">{item.name}</h4>
//                 <span className="designation">{item.designation}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </>
//   );
// };

// export default Testimonial;
"use client";

import Image from "next/image";
import testimonilaContent from "../../data/testimonial";
import Slider from "react-slick";

const Testimonial = () => {
  const settings = {
    dots: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: false, // Keep center mode for better display
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {testimonilaContent.slice(6, 9).map((item) => (
          <div className="testimonial-block" key={item.id}>
            {/* <div className="inner-box"> */}
            <Image
              width={2500} // Adjust width as needed
              height={2000} // Adjust height as needed
              src={item.avatar} // Display only the image
              alt="testimonial"
              className="testimonial-image"
            />
            {/* </div> */}
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
