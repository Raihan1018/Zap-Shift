import React from "react";
import {
  FaShippingFast,
  FaGlobe,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaWarehouse,
  FaShoppingCart,
} from "react-icons/fa";

const OurServices = () => {
  const servicesData = [
    {
      id: 1,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery in Dhaka within 4–6 hours.",
      icon: <FaShippingFast className="text-4xl text-blue-500 mb-4" />,
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      icon: <FaGlobe className="text-4xl text-green-500 mb-4" />,
    },
    {
      id: 3,
      title: "Fulfillment Solution",
      description:
        "Customized service with inventory management, online order processing, packaging, and after-sales support.",
      icon: <FaMapMarkedAlt className="text-4xl text-purple-500 mb-4" />,
    },
    {
      id: 4,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: <FaMoneyBillWave className="text-4xl text-yellow-500 mb-4" />,
    },
    {
      id: 5,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services including warehouse and inventory management support.",
      icon: <FaWarehouse className="text-4xl text-red-500 mb-4" />,
    },
    {
      id: 6,
      title: "Parcel Return",
      description:
        "Through reverse logistics, customers can return or exchange their products with online business merchants.",
      icon: <FaShoppingCart className="text-4xl text-pink-500 mb-4" />,
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      {" "}
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            {service.icon}{" "}
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>{" "}
            <p className="text-gray-600 text-sm">{service.description}</p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default OurServices;
