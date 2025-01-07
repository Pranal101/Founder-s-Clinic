import dynamic from "next/dynamic";
import InvestorProfile from "@/components/dashboard-pages/investors-dashboard/investor-profile";

export const metadata = {
  title: "Investor Profile",
};

const index = () => {
  return (
    <>
      <InvestorProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
