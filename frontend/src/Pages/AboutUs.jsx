import React from "react";
import HighlightText from "../components/core/HomePag/HighlightText";
import Image1 from "../../src/assests/banner/AboutUS/Image1.png";
import Image2 from "../../src/assests/banner/AboutUS/Image2.png";
import Image3 from "../../src/assests/banner/AboutUS/Image3.png";
import Founding from  "../../src/assests/banner/AboutUS/Founding.png";

const AboutUs = () => {
  return (
    <div className="font-calibari ">
      {/* Section 1 */}

      <section className="text-richblack-25 flex flex-col w-11/12 max-w-maxContent mx-auto items-center justify-center">
        <header>
          Driving Innovation in Online Education for
          <HighlightText text={"Brighter Future"} />
        </header>
        <p className="text-center">
          Studynotion is at the forefront of driving innovation in online
          education.
          <br /> We're passionate about creating a brighter future by offering
          cutting-edge courses, leveraging emerging technologies, and nurturing
          a vibrant learning community.
        </p>
        {/* images */}
        <div className="flex ">
          <img src={Image1} />
          <img src={Image2} />
          <img src={Image3} />
        </div>
      </section>

      <div className="text-richblack-25">
        "We are passionate about revolutionizing the way we learn. Our
        innovative platform combines technology, expertise, and community to
        create an unparalleled educational experience.""
      </div>

     
    </div>
  );
};

export default AboutUs;
