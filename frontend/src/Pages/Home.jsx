import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePag/HighlightText";
import CTAButton from "../components/core/HomePag/CTAButton";
import banner from "../assests/banner/home.mp4";
import CodeBlocks from "../components/core/HomePag/CodeBlocks";

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

        <div className="flex  text-pure-greys-25 text-center text-4xl font-semibold font-calibari">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>
        <div className="text-richblack-200  w-[70%] text-center text-lg font-calibari ">
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
            postion={"lg:flex-row"}
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
            codeblock={`<!DOCTYPE html>\n<html>\nhead><body>Example</body>title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code block section 2 */}
        <div>
          <CodeBlocks
            postion={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start 
                <HighlightText text={"coding in seconds"}></HighlightText> 
              
              </div>
            }
            subheading={
                `Go ahead, give it a try. Our hands-on learning environment means
                you'll be writing real code from your very first lesson.`
            }
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
            codeblock={`<!DOCTYPE html>\n<html>\nhead><body>Example</body>title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>




      </div>

      {/* section2 */}

      {/* Section 3 */}

      {/* Footer */}
    </div>
  );
};

export default Home;
