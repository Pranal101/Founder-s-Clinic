import dynamic from "next/dynamic";
import ManageEvents from "@/components/dashboard-pages/networking-dashboard/manage-events";

export const metadata = {
  title: "Manage Events",
};

const index = () => {
  return (
    <>
      <ManageEvents />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
