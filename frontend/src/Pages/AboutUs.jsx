import React from "react";
import HighlightText from "../components/core/HomePag/HighlightText";
import Image1 from "../../src/assests/banner/AboutUS/Image1.png";
import Image2 from "../../src/assests/banner/AboutUS/Image2.png";
import Image3 from "../../src/assests/banner/AboutUS/Image3.png";
import Founding from  "../../src/assests/banner/AboutUS/Founding.png";
import Stats from "../components/core/AboutUS/Stats";
import LearningGrid from "../components/core/AboutUS/LearningGrid";
import ContactForm from "../components/core/AboutUS/ContactForm";

const AboutUs = () => {
  return (
    <div className="font-calibari text-richblack-25">
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
          <img src={Image1} alt='aboutUs_1'/>
          <img src={Image2} alt='aboutUs_2'/>
          <img src={Image3} alt='aboutUs_3' />
        </div>
      </section>

      <div className="text-richblack-25">
        "We are passionate about revolutionizing the way we learn. Our
        innovative platform combines technology, expertise, and community to
        create an unparalleled educational experience.""
      </div>

    {/* section 2 ----> Founding Story */}
    <section className='flex flex-col'>
      {/* left part */}
            <div className="flex text-richblack-25">
                <header>Our Founding Story </header>
              <div>
                <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                  </p>

                  <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>


            </div>
            <div>

              {/* iamge */}
              <img src={Founding} alt="iamge of foundation"/>
              
            </div>

    </section>  
    {/* section 3 for vision and Our Mission */}
    <section className="flex ">
      <div>
        <p className="flex flex-col">Our Vision</p>
        <p>
        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
        </p>
      </div>
      <div>
        <p className="flex flex-col font-mono">Our Mission</p>
        <p>
        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
        </p>
      </div>
    </section>
      
      <Stats/>

      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
      <LearningGrid/>
      <ContactForm/>
     
      </div>
      
    



     
    </div>
  );
};

export default AboutUs;
