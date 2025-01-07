import Image from "next/image";
import Link from "next/link";

const Pricing3 = () => {
  const pricingCotent = [
    {
      id: 1,
      img: "/images/index-13/pricing/1.svg",
      type: "Professional Tier 1",
      price: "Free",
      duration: "3 Responses",
      features: [],
    },
    {
      id: 2,
      img: "/images/index-13/pricing/2.svg",
      type: "Professional Tier 2",
      price: "₹1900",
      duration: "5 Responses",
      features: [],
    },
    {
      id: 3,
      img: "/images/index-13/pricing/3.svg",
      type: "Professional Tier 3",
      price: "₹2900",
      duration: "10 Responses",
      features: [],
    },
    {
      id: 4,
      img: "/images/index-13/pricing/1.svg",
      type: "Professional Tier 4",
      price: "₹3900",
      duration: "15 Responses",
      features: [],
    },
    {
      id: 5,
      img: "/images/index-13/pricing/2.svg",
      type: "Professional Tier 5",
      price: "₹11900",
      duration: "50 Responses",
      features: [],
    },
    {
      id: 6,
      img: "/images/index-13/pricing/3.svg",
      type: "Professional Tier 6",
      price: "₹19900",
      duration: "Unlimited",
      features: [],
    },
  ];

  return (
    <>
      {pricingCotent.map((item) => (
        <div className="col-lg-4 col-md-6" key={item.id}>
          <div className="pricingCard -type-2">
            <h4 className="pricingCard__title">{item.type}</h4>
            <div className="pricingCard__price">{item.price}</div>
            <div className="pricingCard__subtitle">{item.duration}</div>

            <div className="pricingCard__img">
              <Image width={90} height={91} src={item.img} alt="images" />
            </div>

            <div className="pricingCard__text text-left">
              Standard listing submission, active for 30 days
            </div>

            <ul className="pricingCard__list">
              {item.features.map((val, i) => (
                <li key={i}>{val}</li>
              ))}
            </ul>

            <div className="pricingCard__btn">
              <Link href="/shop/cart" className="theme-btn btn-style-modern">
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing3;
