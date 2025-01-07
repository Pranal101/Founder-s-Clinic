import dynamic from "next/dynamic";
import DashboadHome from "@/components/dashboard-pages/investors-dashboard/dashboard";

export const metadata = {
  title: "Investors Dashboard",
};

const index = () => {
  return (
    <>
      <DashboadHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
