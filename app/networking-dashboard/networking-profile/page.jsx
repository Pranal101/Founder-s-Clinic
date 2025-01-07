import dynamic from "next/dynamic";
import CompanyProfile from "@/components/dashboard-pages/networking-dashboard/networking-profile";

export const metadata = {
  title: "Networking Community Profile",
};

const index = () => {
  return (
    <>
      <CompanyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
