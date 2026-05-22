import ChceckMarkSvg from "../svg/ChceckMarkSvg";

const pricingData = [
  {
    id: 1,
    badge: "Individual",
    title: "Freelance",
    price: "$2.5k",
    billingCycle: "/ Project Start",
    features: [
      "Custom UI Development",
      "Static Performance Opt.",
      "Email Support",
    ],
    buttonText: "Select Tier",
    isPopular: false, // Added for potential future logic
  },
  {
    id: 2,
    badge: "Team",
    title: "Studio",
    price: "$5.0k",
    billingCycle: "/ Project Start",
    features: [
      "Custom UI/UX Design",
      "Dynamic CMS Integration",
      "Priority Support",
      "SEO Optimization",
    ],
    buttonText: "Select Tier",
    isPopular: true,
  },
  {
    id: 3,
    badge: "enterprise",
    title: "Agency",
    price: "$10k+",
    billingCycle: "/ Project Start",
    features: [
      "Full Product Strategy",
      "Multi-platform App Dev",
      "24/7 Dedicated Support",
      "Infrastructure Setup",
    ],
    buttonText: "Contact Us",
    isPopular: false,
  },
];

export const Pricing = () => {
  return (
    <section className="p-6 md:p-12 lg:p-20 bg-primary border-b-2 lg:border-b-4 border-brand-dark">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24 gap-4">
        <h2 className="text-5xl md:text-6xl font-bold leading-none uppercase tracking-tighter">
          INVESTMENT
        </h2>
        <div className="flex flex-col mb-4">
          <span className="font-bold tracking-widest text-sm md:text-base uppercase pb-2 text-primary-text">
            PRICING MODELS
          </span>
          <div className="h-1 w-full bg-primary-text"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-7xl mx-auto items-end">
        {/* Tier 1 - Individual */}
        {pricingData.map((tier) => (
          <div
            key={tier.id}
            className={`border-4 border-primary-text p-8 shadow-[7px_7px_0px_0px_rgba(26,26,26,1)] h-137 flex flex-col justify-between ${tier.isPopular ? "bg-secondary" : tier.badge === "enterprise" ? "bg-primary-text text-primary" : "bg-primary text-primary-text"}`}
          >
            <div>
              {tier?.isPopular ? (
                <span className="bg-red-500 text-primary text-[10px] font-bold px-3 py-1 uppercase tracking-widest inline-block mb-8">
                  Most Popular
                </span>
              ) : (
                <span
                  className={` text-[10px] font-bold px-3 py-1 uppercase tracking-widest inline-block mb-8 ${tier.badge === "enterprise" ? "bg-secondary text-primary-text" : "bg-primary-text text-primary"}`}
                >
                  {tier.badge}
                </span>
              )}

              <h3 className="text-3xl md:text-4xl font-bold mb-2 uppercase tracking-tight">
                {tier.title}
              </h3>
              <div className="font-bold mb-10 uppercase flex flex-col sm:flex-row sm:items-baseline">
                <span className="text-4xl md:text-6xl">
                  {tier.badge === "enterprise" ? "custome" : tier.price}
                </span>
                {tier.badge !== "enterprise" && (
                  <span className="text-sm sm:ml-2 font-bold opacity-80 mt-2 sm:mt-0">
                    {tier.billingCycle}
                  </span>
                )}
              </div>

              <ul className="space-y-6 mb-auto">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div
                      className={`${tier.badge === "enterprise" && "text-secondary"}`}
                    >
                      <ChceckMarkSvg />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-wide">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`w-full border-4 border-primary-text active:transition duration-300 active:shadow-[0px_0px_0px_0px_rgba(26,26,26,1)] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] py-5 font-bold uppercase tracking-widest ${tier.isPopular ? "bg-primary-text text-primary" : "bg-primary text-primary-text"}`}
            >
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
