import dynamic from "next/dynamic";
import DashboadHome from "@/components/dashboard-pages/event-dashboard/dashboard";

export const metadata = {
  title: "Event-Hosts Dashboard",
};

const index = () => {
  return (
    <>
      <DashboadHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
