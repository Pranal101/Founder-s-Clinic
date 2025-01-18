import dynamic from "next/dynamic";
import AllUsers from "@/components/dashboard-pages/admin-dashboard/users/networking";

export const metadata = {
  title: "Approve Inqueries",
};

const index = () => {
  return (
    <>
      <AllUsers />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
