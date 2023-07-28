"use client";
import React from "react";
import ReactPlayer from "react-player";

const CourseVideoComponent = ({ url }) => {
  return (
    <div className='w-full h-full'>
      <ReactPlayer url={url} width={"100%"}/>
    </div>
  );
};

export default CourseVideoComponent;
