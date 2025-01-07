import dynamic from "next/dynamic";
import DashboadHome from "@/components/dashboard-pages/employers-dashboard/dashboard";

export const metadata = {
  title: "Enterprise Dashboard",
};

const index = () => {
  return (
    <>
      <DashboadHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
