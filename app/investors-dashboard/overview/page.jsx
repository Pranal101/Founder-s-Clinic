import dynamic from "next/dynamic";

import InvestorsList from "@/components/dashboard-pages/investors-dashboard/overview";

export const metadata = {
  title: "Investors List",
};

const index = () => {
  return (
    <>
      <InvestorsList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
