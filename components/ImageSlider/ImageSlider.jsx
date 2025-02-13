import React, { useEffect, useState } from "react";

// assets
import RightSliderIcon from "@/data/rightSliderIcon";
import LeftSliderIcon from "@/data/leftSliderIcon";

// css
import "./ImageSlider";

// constants
import { imageSliderText } from "@/data/imageSliderSection";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // NEXT SLIDE
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSliderText?.length);
  };

  // PREVIOUS SLIDE
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + imageSliderText?.length) % imageSliderText?.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Automatically change slide every 3 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSliderText.length);
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSliderText.length]);

  return (
    <div className="carousel-container">
      <div className="carousel">
        {imageSliderText.map((_, index) => (
          <>
            <div
              key={index}
              className={index === currentIndex ? "slide active" : "slide"}
            >
              <img
                src={imageSliderText[currentIndex]?.imageUrl}
                alt=""
                width={"100%"}
                height={"100%"}
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
                style={{ cursor: "pointer" }}
              />
            </div>
            {/* <div className="sliderInner">
              <h1 className="textCommonSlider textOneSlider">
                {imageSliderText[currentIndex]?.textOne}
              </h1>
              <h1 className="textCommonSlider textTwoSlider">
                {imageSliderText[currentIndex]?.textTwo}
              </h1>
              <h1 className="textCommonSlider textThreeSlider">
                {imageSliderText[currentIndex]?.textThree}
              </h1>
            </div> */}
          </>
        ))}
        <div
          className="arrow left"
          style={{
            backgroundColor: "black",
            height: "26px",
            width: "26px",
            borderRadius: "50%",
          }}
          onClick={prevSlide}
        >
          <div
            style={{
              position: "absolute",
              top: "-6px",
              right: "10px",
            }}
          >
            <LeftSliderIcon />
          </div>
        </div>
        <div
          className="arrow right"
          style={{
            backgroundColor: "black",
            height: "26px",
            width: "26px",
            borderRadius: "50%",
          }}
          onClick={nextSlide}
        >
          <div
            style={{
              position: "absolute",
              top: "-6px",
              right: "10px",
            }}
          >
            <RightSliderIcon />
          </div>
        </div>
      </div>
      <div className="dots">
        {imageSliderText.map((_, index) => (
          <div
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
