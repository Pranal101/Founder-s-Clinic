import dynamic from "next/dynamic";
import Messages from "@/components/dashboard-pages/investors-dashboard/messages";

export const metadata = {
  title: "Messages",
};

const index = () => {
  return (
    <>
      <Messages />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
