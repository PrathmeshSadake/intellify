import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const Home = async () => {
  const supabase = createServerComponentClient({ cookies });
  return <div>Home</div>;
};

export default Home;
