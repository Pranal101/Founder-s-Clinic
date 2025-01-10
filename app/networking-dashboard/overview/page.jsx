import dynamic from "next/dynamic";

import NetworkingList from "@/components/dashboard-pages/networking-dashboard/overview";

export const metadata = {
  title: "Networking Community List",
};

const index = () => {
  return (
    <>
      <NetworkingList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
