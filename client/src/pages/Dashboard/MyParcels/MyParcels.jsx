import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FiPackage } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Delivered: "bg-green-100 text-green-800",
  "In Transit": "bg-blue-100 text-blue-800",
  Cancelled: "bg-red-100 text-red-800",
};

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-500 animate-pulse">Loading parcels...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FiPackage /> My Parcels ({parcels.length})
      </h2>

      {parcels.length === 0 ? (
        <p className="text-gray-500">No parcels found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parcels.map((parcel) => (
            <div
              key={parcel._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Tracking Number:{parcel.trackingNumber || "Unknown"}
                </h3>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <AiOutlineClockCircle />
                  {new Date(parcel.date).toLocaleDateString()}
                </span>
              </div>

              {/* Parcel Details */}
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Type:</span> {parcel.parcelType}
                </p>
                <p>
                  <span className="font-medium">Name:</span> {parcel.parcelName}
                </p>
                <p>
                  <span className="font-medium">Weight:</span>{" "}
                  {parcel.parcelWeight} kg
                </p>
                <p>
                  <span className="font-medium">From:</span>{" "}
                  {parcel.senderDistrict}
                </p>
                <p>
                  <span className="font-medium">To:</span>{" "}
                  {parcel.receiverDistrict}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[parcel.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyParcels;
