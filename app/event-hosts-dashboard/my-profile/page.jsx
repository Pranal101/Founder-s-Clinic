import dynamic from "next/dynamic";
import EventProfile from "@/components/dashboard-pages/event-dashboard/event-profile";

export const metadata = {
  title: "Company Profile || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <EventProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
