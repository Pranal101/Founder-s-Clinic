import dynamic from "next/dynamic";
import MyResume from "@/components/dashboard-pages/intern-dashboard/my-resume";

export const metadata = {
  title: "My Resume || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <MyResume />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
