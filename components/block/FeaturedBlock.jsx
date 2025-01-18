// import Image from "next/image";
// import Link from "next/link";

// const FeaturedBlock = () => {
//   const blockContent = [
//     {
//       id: 1,
//       block: [
//         {
//           img: "/images/enterprise.jpeg",
//           city: "Enterprises",
//           width: "411",
//           height: "511",
//         },
//       ],
//     },
//     {
//       id: 2,
//       block: [
//         {
//           img: "/images/user-2.jpg",
//           city: "Professionals",

//           width: "411",
//           height: "240",
//         },
//         {
//           img: "/images/user-3.jpg",
//           city: "Interns",

//           width: "411",
//           height: "240",
//         },
//       ],
//     },
//     {
//       id: 3,
//       block: [
//         {
//           img: "/images/user-4.jpg",
//           city: "Investors",

//           width: "411",
//           height: "240",
//         },
//         {
//           img: "/images/user-5.jpg",
//           city: "Networking Communities",
//           width: "411",
//           height: "240",
//         },
//       ],
//     },
//   ];
//   return (
//     <>
//       {blockContent.map((item) => (
//         <div className="column col-lg-4 col-md-6 col-sm-12" key={item.id}>
//           {item.block.map((value, i) => (
//             <div className="feature-block" key={i}>
//               <div className="inner-box">
//                 <figure className="image">
//                   <Image
//                     width={value.width}
//                     height={value.height}
//                     src={value.img}
//                     alt="featued"
//                   />
//                 </figure>
//                 <div className="overlay-box">
//                   <div className="content">
//                     <h5>{value.city}</h5>
//                     <Link href="/job-list-v12" className="overlay-link"></Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </>
//   );
// };

// export default FeaturedBlock;
// import Image from "next/image";
// import Link from "next/link";

// const FeaturedBlock = () => {
//   const blockContent = [
//     {
//       id: 1,
//       block: [
//         {
//           img: "/images/enterprise.jpeg",
//           city: "Enterprises",
//           width: "411",
//           height: "511",
//           link: "/employers-dashboard/overview", // Add the route link for each item
//         },
//       ],
//     },
//     {
//       id: 2,
//       block: [
//         {
//           img: "/images/user-2.jpg",
//           city: "Professionals",
//           width: "411",
//           height: "240",
//           link: "/candidates-dashboard/overview", // Add the route link for each item
//         },
//         {
//           img: "/images/user-3.jpg",
//           city: "Interns",
//           width: "411",
//           height: "240",
//           link: "/candidates-dashboard/overview", // Add the route link for each item
//         },
//       ],
//     },
//     {
//       id: 3,
//       block: [
//         {
//           img: "/images/user-4.jpg",
//           city: "Investors",
//           width: "411",
//           height: "240",
//           link: "/investors-dashboard/overview", // Add the route link for each item
//         },
//         {
//           img: "/images/user-5.jpg",
//           city: "Networking Communities",
//           width: "411",
//           height: "240",
//           link: "/networking-dashboard/overview", // Add the route link for each item
//         },
//       ],
//     },
//   ];

//   return (
//     <>
//       {blockContent.map((item) => (
//         <div className="column col-lg-4 col-md-6 col-sm-12" key={item.id}>
//           {item.block.map((value, i) => (
//             <div className="feature-block" key={i}>
//               <div className="inner-box">
//                 <figure className="image">
//                   <Image
//                     width={value.width}
//                     height={value.height}
//                     src={value.img}
//                     alt={value.city}
//                   />
//                 </figure>
//                 <div className="overlay-box">
//                   <div className="content">
//                     <h5>{value.city}</h5>
//                     {/* Link to the respective page using value.link */}
//                     <Link href={value.link} className="overlay-link"></Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </>
//   );
// };

// export default FeaturedBlock;
import Image from "next/image";
import Link from "next/link";

const FeaturedBlock = () => {
  const blockContent = [
    {
      id: 1,
      block: [
        {
          img: "/images/enterprise.jpeg",
          city: "Enterprises",
          width: "411",
          height: "511",
          link: "/employers-dashboard/overview",
        },
      ],
    },
    {
      id: 2,
      block: [
        {
          img: "/images/user-2.jpg",
          city: "Professionals",
          width: "411",
          height: "240",
          link: "/candidates-dashboard/overview",
        },
        {
          img: "/images/user-3.jpg",
          city: "Interns",
          width: "411",
          height: "240",
          link: "/candidates-dashboard/overview",
        },
      ],
    },
    {
      id: 3,
      block: [
        {
          img: "/images/user-4.jpg",
          city: "Investors",
          width: "411",
          height: "240",
          link: "/investors-dashboard/overview",
        },
        {
          img: "/images/user-5.jpg",
          city: "Networking Communities",
          width: "411",
          height: "240",
          link: "/networking-dashboard/overview",
        },
      ],
    },
  ];

  return (
    <>
      {blockContent.map((item) => (
        <div className="column col-lg-4 col-md-6 col-sm-12" key={item.id}>
          {item.block.map((value, i) => (
            <div
              className="feature-block"
              key={i}
              data-bs-toggle="modal"
              data-bs-target="#loginPopupModal" // Trigger the modal
            >
              <div className="inner-box">
                <figure className="image">
                  <Image
                    width={value.width}
                    height={value.height}
                    src={value.img}
                    alt={value.city}
                  />
                </figure>
                <div className="overlay-box">
                  <div className="content">
                    <h5>{value.city}</h5>
                    {/* Add the link inside the modal logic */}
                    <Link href={value.link} className="overlay-link"></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default FeaturedBlock;
