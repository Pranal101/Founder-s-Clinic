// const TopCardBlock = () => {
//   const cardContent = [
//     {
//       id: 1,
//       icon: "flaticon-briefcase",
//       countNumber: "22",
//       metaName: "Manage Inqueries",
//       uiClass: "ui-blue",
//     },
//     {
//       id: 2,
//       icon: "la-file-invoice",
//       countNumber: "9382",
//       metaName: "Proposals",
//       uiClass: "ui-red",
//     },
//     {
//       id: 3,
//       icon: "la-comment-o",
//       countNumber: "74",
//       metaName: "Messages",
//       uiClass: "ui-yellow",
//     },
//     {
//       id: 4,
//       icon: "la-bookmark-o",
//       countNumber: "32",
//       metaName: "Shortlisted Profiles",
//       uiClass: "ui-green",
//     },
//   ];

//   return (
//     <>
//       {cardContent.map((item) => (
//         <div
//           className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
//           key={item.id}
//         >
//           <div className={`ui-item ${item.uiClass}`}>
//             <div className="left">
//               <i className={`icon la ${item.icon}`}></i>
//             </div>
//             <div className="right">
//               <h4>{item.countNumber}</h4>
//               <p>{item.metaName}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default TopCardBlock;
import Link from "next/link";

const TopCardBlock = () => {
  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: "22",
      metaName: "Inquiries",
      uiClass: "ui-blue",
      route: "/employers-dashboard/manage-jobs",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: "9382",
      metaName: "Proposals",
      uiClass: "ui-red",
      route: "/employers-dashboard/all-applicants",
    },
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: "74",
      metaName: "Messages",
      uiClass: "ui-yellow",
      route: "/employers-dashboard/messages",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: "32",
      metaName: "Shortlisted Profiles",
      uiClass: "ui-green",
      route: "/employers-dashboard/shortlisted-resumes",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
          style={{ cursor: "pointer" }} // You can remove the onClick handler
        >
          <Link href={item.route}>
            <div className={`ui-item ${item.uiClass}`}>
              <div className="left">
                <i className={`icon la ${item.icon}`}></i>
              </div>
              <div className="right">
                <h4>{item.countNumber}</h4>
                <p>{item.metaName}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
