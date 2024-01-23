import React from "react";
import { useState } from "react";

import { HomePageExplore } from "./data/homepage_explore";
import HighlightText from "./HighlightText";
const tabsName = [
  "Free",
  "New to Coding",
  "Most popular Skill Path",
  "Carrer Paths",
];


const ExploreMore = () => {
  const [currentTab, setcurrentTab] = useState(tabsName[0]);
const [courses, setCourses] = useState(HomePageExplore[0].courses);
const [currentCard, setcurrentCard] = useState(
  HomePageExplore[0].courses[0].heading
);

const setMyCards = (value) => {
  setcurrentTab(value);
  const result = HomePageExplore.filter((course) => course.tag === value); //get the course for selected tab
  setCourses(result[0].courses);
  setcurrentCard(result[0].courses[0].heading);
};


  return (
    <div className="font-calibari mx-auto">
      <div className="sm:text-3xl text-pure-greys-25 font-calibari  font-semibold text-center">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>
      <p className="text-center text-richblack-300 text-sm sm:text-[16px] text-[10px] mt-3">
        Learn to build anything you can imagine
      </p>
      <div className="sm:w-[60%] mx-auto">
        <div className="sm:mt-5 mt-2 mx-auto  flex flex-row  rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1">
          {tabsName.map((element, index) => {
            return (
              <div className="mx-auto">
                <div
                  className={`sm:text-[16px] text-[10px] flex flex-row items-center gap-2 ${
                    currentTab === element
                      ? "bg-richblue-900 text-richblack-5 font-medium"
                      : "text-richblack-200"
                  } rounded-full
                          transistion-all duration-200 cursor-pointer hover:bg-richblack-200"} hover:text-richblack-5 px-7 py-2`}
                  key={index}
                  onClick={() => setMyCards(element)}
                >
                  {element}
               
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sm:h-[150px]">
        {/* course Card */}
        <div>
          {courses.map((element, index) => {
            return (
              <CourseCard
                key={index}
                cardData={element}
                setcurrentCard={setcurrentCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
