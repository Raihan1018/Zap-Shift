import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FiPackage } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Delivered: "bg-green-100 text-green-800",
  "In Transit": "bg-blue-100 text-blue-800",
  Cancelled: "bg-red-100 text-red-800",
};

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
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

  const handleParcelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FiPackage /> My Parcels ({parcels.length})
      </h2>

      {parcels.length === 0 ? (
        <p className="text-gray-500">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Cost</th>
                  <th>Payment</th>
                  <th>Delivery Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel, index) => (
                  <tr key={parcel._id}>
                    <th>{index + 1}</th>
                    <td>{parcel.parcelName}</td>
                    <td>{parcel.cost}</td>
                    <td>
                      {parcel.paymentStatus === "paid" ? (
                        <span className="text-green-400">Paid</span>
                      ) : (
                        <Link
                          to={`/dashboard/payment/${parcel._id}`}
                          className="btn bg-primary"
                        >
                          Pay
                        </Link>
                      )}
                    </td>
                    <td>{parcel.deliveryStatus}</td>
                    <td className="flex gap-2">
                      <button className="btn btn-square hover:bg-primary">
                        <FaEye />
                      </button>
                      <button className="btn btn-square hover:bg-primary">
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => handleParcelDelete(parcel._id)}
                        className="btn btn-square hover:bg-primary text-xl"
                      >
                        <MdDeleteOutline className="text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
