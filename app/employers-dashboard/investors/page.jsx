import dynamic from "next/dynamic";
import Investors from "@/components/dashboard-pages/employers-dashboard/investors";

export const metadata = {
  title: "Manage Jobs || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <Investors />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
