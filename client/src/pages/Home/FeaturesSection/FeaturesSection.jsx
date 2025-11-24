import React from "react";


import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";
import customerSupport from "../../../assets/safe-delivery.png";

const features = [
  {
    id: 1,
    img: liveTracking,
    title: "Live Parcel Tracking",
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
  },
  {
    id: 2,
    img: safeDelivery,
    title: "100% Safe Delivery",
    desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    id: 3,
    img: customerSupport,
    title: "24/7 Call Center Support",
    desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const FeaturesSection = () => {
  return (
    <div className="w-full px-4 lg:px-10 py-10 space-y-10">
      {features.map((f) => (
        <div
          key={f.id}
          className="bg-base-100 p-6 flex flex-col md:flex-row items-center gap-6 border rounded-xl shadow-sm"
        >
          {/* Left Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img src={f.img} alt={f.title} className="w-48 md:w-60" />
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:flex">
            <div className="divider divider-horizontal"></div>
          </div>

          {/* Right Content */}
          <div className="md:w-2/3">
            <div className="flex items-center gap-3 mb-2">
              
              <h2 className="text-xl md:text-2xl font-semibold">{f.title}</h2>
            </div>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
