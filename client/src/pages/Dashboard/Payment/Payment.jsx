import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  console.log(parcel);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Pay for: {parcel?.parcelName}</h2>
    </div>
  );
};

export default Payment;
