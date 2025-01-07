import dynamic from "next/dynamic";
import DashboadHome from "@/components/dashboard-pages/networking-dashboard/dashboard";

export const metadata = {
  title: "Networking Dashboard",
};

const index = () => {
  return (
    <>
      <DashboadHome />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
