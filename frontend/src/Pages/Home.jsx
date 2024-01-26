import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePag/HighlightText";
import CTAButton from "../components/core/HomePag/CTAButton";
import banner from "../assests/banner/home.mp4";
import CodeBlocks from "../components/core/HomePag/CodeBlocks";
import LearningLanguageSection from "../components/core/HomePag/LearningLanguageSection";
import TimelineSection from "../components/core/HomePag/TimelineSection";
import section3Img from "../assests/banner/section-3.png";
import ExploreMore from "../components/core/HomePag/ExploreMore";

const Home = () => {
  return (
    <div>
      {/* Section1  */}
      <div className="relative mx-auto text-pure-greys-25 flex flex-col gap-5 w-11/12 items-center max-w-maxContent  justify-between">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 font-mono mx-auto rounded-full bg-richblack-500 font-bold text-richblack-5 transition-all duration-200 hover:scale-95 w-fit  ">
            <div className="flex items-center px-10 py-[5px] transition-all duration-200 rounded-full bg-richblack-600  group-hover:bg-richblack-700">
              <p className="p-1">Become An Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className=" sm:flex sm:flex-row sm:text-4xl flex-col text-pure-greys-25 text-center text-3xl font-semibold font-calibari ">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>
        <div className="text-richblack-200  w-[70%] text-justify text-lg font-calibari ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 ">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className=" w-[50%] shadow-element shadow-blue-200">
          <video muted loop autoPlay>
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlocks
            postion={"flex-row flex flex-col mx-auto"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential"}></HighlightText> with
                our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><body>Example</body>\ntitle>\n/head>\nbody>\nh1><ahref="/">Header</a>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code block section 2 */}
        <div>
          <CodeBlocks
            postion={"flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"}></HighlightText>
              </div>
            }
            subheading={`Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson.`}
            ctabn1={{
              btnText: "Go to lessons",
              linkto: "/signup",
              active: true,
            }}
            ctabn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><body>Example</body>title>\n/head>\nbody>\nh1><ahref="/">Header</a>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>
      </div>
      <ExploreMore/>
      {/* section2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg  w-11/12 mx-auto max-w-maxContent h-[310px] ">
          <div className="  max-auto  max-w-maxContent flex flex-col items-center gap-5">
            <div className="h-[150px]"></div>
            <div className="flex gap-7 text-white ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn more
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent   flex justify-between gap-10">
          <div className="sm:flex sm:gap-10 sm:w-11/12 sm:max-w-maxContent  sm:justify-between sm:items-center flex flex-col">
          
            <div className="sm:text-4xl font-semibold font-calibari  text-3xl mx-auto">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div>
              <div className="flex flex-col sm:gap-10  sm:justify-center sm:items-start sm:ml-5 sm:m-4 sm:p-8 m-4 gap-7 mx-auto  ">
                <div className="font-calibari text-left font-2xl font-semibold pl-6 ">
                  ` The modern StudyNotion is the dictates its own terms. Today,
                  to be a competitive specialist requires more than professional
                  skills.`
                </div>
                <div className="sm:pl-6 sm:w-[35%] mx-auto  pl-10 ">
                  <CTAButton active={true} linkto={"/signup"}>
                    Learn more
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-11/12 sm:mx-auto sm:max-w-maxContent sm:flex sm:justify-between sm:items-center sm:gap-10 flex flex-col">
          <div className=" sm:pl-20 mx-auto pl-7">
            <TimelineSection />
          </div>
        </div>

        <div className=" mx-auto max-w-maxContent flex items-center gap-9 w-11/12 sm:pl-7 ">
          <LearningLanguageSection />
        </div>
      </div>
      
        
      {/* Section 3 */}
      <div className="sm:flex sm:flex-row flex flex-col mx-auto sm:w-11/12 max-w-maxContent sm:gap-28 gap-4 items-center font-calibari text-pure-greys-25 ">
        <div className="">
          {/* image */}
          <img src={section3Img} alt="lady img" />
        </div>
        <div className="flex flex-col sm:gap-6 gap-3 mx-auto justify-center sm:w-[50%] p-4 items-center">
          {/* Description */}

          <div className="sm:text-5xl sm:font-bold font-semibold text-2xl">
            Become an{" "}
            <span className="">
              <HighlightText text={"Instructor"} />
            </span>
          </div>
          <div className="">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>
          <div className="sm:w-[35%] mx-auto m-3">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center justify-between gap-3">
             Start Learning Today 
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
