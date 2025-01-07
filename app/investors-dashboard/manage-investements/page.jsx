import dynamic from "next/dynamic";
import ManageInvestements from "@/components/dashboard-pages/investors-dashboard/manage-investements";

export const metadata = {
  title: "Manage Events",
};

const index = () => {
  return (
    <>
      <ManageInvestements />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
