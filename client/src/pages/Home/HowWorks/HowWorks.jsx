import {
  FaTruck,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const HowWorks = () => {
  const deliveryData = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description: "Schedule a pickup and drop-off for your parcel with ease.",
      icon: <FaTruck size={24} />,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description: "Offer cash on delivery option for your customers.",
      icon: <FaMoneyBillWave size={24} />,
    },
    {
      id: 3,
      title: "Delivery Hub",
      description: "Multiple delivery hubs for faster processing.",
      icon: <FaWarehouse size={24} />,
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description: "Specialized services for SMEs and corporate clients.",
      icon: <FaBuilding size={24} />,
    },
  ];

  return (
    <div>
      <h2 className=" md:text-2xl lg:text-3xl font-bold my-3 text-center py-4">How it's Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">
        {deliveryData.map((item) => (
          <div key={item.id} className="space-y-2 bg-white p-4 rounded-lg hover:bg-primary ">
            <p>{item.icon}</p>
            <h2 className="font-semibold ">{item.title}</h2>
            <h3 className="text-gray-600">{item.description}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWorks;
