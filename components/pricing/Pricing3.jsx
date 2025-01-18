// import Image from "next/image";
// import Link from "next/link";

// const Pricing3 = () => {
//   const pricingCotent = [
//     {
//       id: 1,
//       img: "/images/index-13/pricing/1.svg",
//       type: "Are you a PROFESSIONAL offering Business support service/s?",
//       // price: "Free",
//       duration: "Build your clientele with ease",
//       features: [
//         "Offer your services to the enterprises/ companies worldwide",
//         "We'll connect you with companies searching specifically for your services",
//         " We'll improve the reach and visibility of your services",
//         "Networking & Collaboration opportunities",
//       ],
//     },
//     {
//       id: 2,
//       img: "/images/index-13/pricing/2.svg",
//       type: "Are you an ENTERPRISE wanting to connect the ecosystem?",
//       // price: "₹1900",
//       duration: "Grow your business within our platform",
//       features: [
//         "Find the best professionals, interns and other resources to grow your enterprise",
//         "Find suitable investor/ fund for your business",
//         "Discover the right business community",
//         "Position your company within the ecosystem",
//       ],
//     },
//     {
//       id: 3,
//       img: "/images/index-13/pricing/3.svg",
//       type: "Are you an INVESTOR looking for the perfect investment opportunity?",
//       // price: "₹2900",
//       duration: "Choose from curated opportunitie",
//       features: [
//         "Access to a carefully vetted enterprises that align with your investment goals",
//         "Explore a wide range of sectors and business models",
//         "Streamlined search connecting you with businesses that meet the criteria",
//         "Detailed business information and due diligence",
//       ],
//     },
//     {
//       id: 4,
//       img: "/images/index-13/pricing/1.svg",
//       type: "Are you an INTERN looking for the right opportunity?",
//       // price: "₹3900",
//       duration: "Get ready to Connect with Enterprises Seeking Tale",
//       features: [
//         "Personalized Job Matches",
//         "Streamlined Application Process",
//         "Skill Development Opportunities",
//         "Access a wide range of companies, from startups to established firm",
//       ],
//     },
//     {
//       id: 5,
//       img: "/images/index-13/pricing/2.svg",
//       type: "Are you a BUSINESS NETWORKING COMMUNITY?",
//       // price: "₹11900",
//       duration: "Boost Visibility and Grow Your Membership",
//       features: [
//         "Attract members aligning with community's goals through personalized matchmaking",
//         "Get exposure to a wider audience of potential members and collaborators",
//         "Access a pool of entrepreneurs and professionals",
//         "Partner with other communities and organizations",
//       ],
//     },
//   ];

//   return (
//     <>
//       {pricingCotent.map((item) => (
//         <div className="col-lg-4 col-md-6" key={item.id}>
//           <div className="pricingCard -type-2">
//             <h4 className="pricingCard__title">{item.type}</h4>
//             <div className="pricingCard__price">{item.price}</div>
//             <div className="pricingCard__subtitle">{item.duration}</div>

//             <div className="pricingCard__img">
//               <Image width={90} height={91} src={item.img} alt="images" />
//             </div>

//             <div className="pricingCard__text text-left">
//               Standard listing submission, active for 30 days
//             </div>

//             <ul className="pricingCard__list">
//               {item.features.map((val, i) => (
//                 <li key={i}>{val}</li>
//               ))}
//             </ul>

//             <div className="pricingCard__btn">
//               <Link href="/shop/cart" className="theme-btn btn-style-modern">
//                 Join Founders’ Clinic
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Pricing3;
import Image from "next/image";
import Link from "next/link";

const Pricing3 = () => {
  const pricingCotent = [
    {
      id: 1,
      img: "/images/index-13/pricing/1.svg",
      type: "Are you a PROFESSIONAL offering Business support service/s?",
      duration: "Build your clientele with ease",
      features: [
        "Offer your services to the enterprises/ companies worldwide",
        "We'll connect you with companies searching specifically for your services",
        " We'll improve the reach and visibility of your services",
        "Networking & Collaboration opportunities",
      ],
    },
    {
      id: 2,
      img: "/images/index-13/pricing/2.svg",
      type: "Are you an ENTERPRISE wanting to connect the ecosystem?",
      duration: "Grow your business within our platform",
      features: [
        "Find the best professionals, interns and other resources to grow your enterprise",
        "Find suitable investor/ fund for your business",
        "Discover the right business community",
        "Position your company within the ecosystem",
      ],
    },
    {
      id: 3,
      img: "/images/index-13/pricing/3.svg",
      type: "Are you an INVESTOR looking for the perfect investment opportunity?",
      duration: "Choose from curated opportunities",
      features: [
        "Access to a carefully vetted enterprises that align with your investment goals",
        "Explore a wide range of sectors and business models",
        "Streamlined search connecting you with businesses that meet the criteria",
        "Detailed business information and due diligence",
      ],
    },
    {
      id: 4,
      img: "/images/index-13/pricing/1.svg",
      type: "Are you an INTERN looking for the right opportunity?",
      duration: "Get ready to Connect with Enterprises Seeking Talent",
      features: [
        "Personalized Job Matches",
        "Streamlined Application Process",
        "Skill Development Opportunities",
        "Access a wide range of companies, from startups to established firm",
      ],
    },
    {
      id: 5,
      img: "/images/index-13/pricing/2.svg",
      type: "Are you a BUSINESS NETWORKING COMMUNITY?",
      duration: "Boost Visibility and Grow Your Membership",
      features: [
        "Attract members aligning with community's goals through personalized matchmaking",
        "Get exposure to a wider audience of potential members and collaborators",
        "Access a pool of entrepreneurs and professionals",
        "Partner with other communities and organizations",
      ],
    },
  ];

  return (
    <>
      {pricingCotent.map((item) => (
        <div className="col-lg-4 col-md-6" key={item.id}>
          <div className="pricingCard -type-2">
            <h4 className="pricingCard__title">{item.type}</h4>
            <div className="pricingCard__subtitle">{item.duration}</div>

            {/* <div className="pricingCard__img">
              <Image width={90} height={91} src={item.img} alt="images" />
            </div> */}

            <ul className="pricingCard__list">
              {item.features.map((val, i) => (
                <li key={i}>{val}</li>
              ))}
            </ul>

            <div className="pricingCard__btn">
              <button
                className="theme-btn btn-style-modern"
                data-bs-toggle="modal"
                data-bs-target="#loginPopupModal"
              >
                Join Founders’ Clinic
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing3;
