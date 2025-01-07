import dynamic from "next/dynamic";
import PostEvent from "@/components/dashboard-pages/networking-dashboard/post-events";

export const metadata = {
  title: "Post Event",
};

const index = () => {
  return (
    <>
      <PostEvent />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
