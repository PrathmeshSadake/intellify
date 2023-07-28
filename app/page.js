"use client";
import { Badge } from "@/components/ui/badge";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { data } from "@/data";
import { useUser } from "@/hooks/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user } = useUser();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (data) redirect("/");
      else throw new Error("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
          Courses
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {data.map((course) => (
            <div
              onClick={
                user || course.course_type === "free"
                  ? () => router.push(`/course/${course.id}`)
                  : () => {
                      toast({
                        title: "Please Login to Continue",
                        variant: "outline",
                        action: (
                          <ToastAction
                            altText='Sign In'
                            onClick={handleGoogleLogin}
                          >
                            Sign in with Google
                          </ToastAction>
                        ),
                      });
                    }
              }
              key={course.id}
              className='group relative w-full cursor-pointer'
            >
              <div className='overflow-hidden h-44 w-full rounded-sm'>
                <img
                  src={course.image_link}
                  alt={course.course_name}
                  className='object-cover'
                />
              </div>
              <div className='mt-2 flex'>
                <div className='flex-1'>
                  <h3 className='text-sm text-gray-700'>
                    {course.course_name}
                  </h3>
                </div>
                <Badge variant='outline' className='self-start'>
                  {course.course_type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
