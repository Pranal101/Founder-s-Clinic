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
        {testimonilaContent.slice(8, 9).map((item) => (
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
