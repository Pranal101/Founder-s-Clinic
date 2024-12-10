"use client";
import Link from "next/link";

const selectRole = () => {
  const pricingCotent = [
    {
      id: 1,
      packageType: "",
      price: "Enterprise",
      tag: "",
      features: [],
      redirectTo: "/onboarding/enterprise-onboarding",
    },
    {
      id: 2,
      packageType: "",
      price: "Professional",
      tag: "",
      features: [],
      redirectTo: "/onboarding/professional-onboarding",
    },
    {
      id: 3,
      packageType: "",
      price: "Intern",
      tag: "",
      features: [],
      redirectTo: "/onboarding/intern-onboarding",
    },
    // {
    //   id: 4,
    //   packageType: "",
    //   price: "Networking community",
    //   tag: "",
    //   features: [],
    //   redirectTo: "/onboarding/intern-onboarding",
    // },
    // {
    //   id: 5,
    //   packageType: "",
    //   price: "Investor",
    //   tag: "",
    //   features: [],
    //   redirectTo: "/onboarding/intern-onboarding",
    // },
  ];

  return (
    <div className="pricing-tabs tabs-box wow fadeInUp">
      {/* <!--Tabs Container--> */}
      <div className="row">
        {pricingCotent.map((item) => (
          <div
            className={`pricing-table col-lg-4 col-md-6 col-sm-12 ${item.tag}`}
            key={item.id}
          >
            <div className="inner-box">
              {item.tag ? (
                <>
                  <span className="tag">Recommended</span>
                </>
              ) : (
                ""
              )}

              <div className="title">{item.packageType}</div>
              <div className="price">
                {item.price} <span className="duration"></span>
              </div>
              <div className="table-content">
                <ul>
                  {item.features.map((feature, i) => (
                    <li key={i}>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="table-footer">
                <Link
                  href={item.redirectTo}
                  className="theme-btn btn-style-three"
                >
                  Select
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default selectRole;
