"use client";
import CourseVideoComponent from "@/components/CourseVideoComponent";
import { Badge } from "@/components/ui/badge";
import { data } from "@/data";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Course({ params }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  const id = params.id;
  const { user } = useUser();
  const course = data.filter((course) => course.id.toString() == id);
  if (!user && course[0].course_type === "premium") {
    redirect("/");
  }

  return (
    <div className='max-w-7xl mx-auto py-12'>
      {course && (
        <div className='flex flex-col space-y-2'>
          <div className='flex space-x-3 items-center'>
            <h3 className='text-2xl text-gray-900'>{course[0].course_name}</h3>
            <Badge variant=''>{course[0].course_type}</Badge>
          </div>

          <p className='text-md text-gray-800 py-4'>{course[0].description}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {course[0].video_links.map((link) => (
              <CourseVideoComponent url={link} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
