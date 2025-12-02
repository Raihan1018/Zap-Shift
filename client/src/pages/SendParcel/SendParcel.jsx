import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenter = useLoaderData();

  // Extract unique regions
  const regions = [...new Set(serviceCenter.map((c) => c.region))];

  // watch region values
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const districtByRegion = (region) => {
    if (!region) return [];
    const regionDistricts = serviceCenter.filter((c) => c.region === region);
    return [...new Set(regionDistricts.map((d) => d.district))];
  };

  const handleSendParcel = (data) => {
    const sameDistrict = data.senderDistrict === data.receiverDistrict;

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log(cost);

    data.cost = cost;
    Swal.fire({
      title: "Agree with the cost?",
      text: `Total charge is ${cost} tk`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving the parcel info in DB", res.data);
          Swal.fire({
            title: "Congratulate!",
            text: "Your parcel request has been received",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="p-6 lg:p-12 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Send Your Parcel
        </h1>

        <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-10">
          {/* === PARCEL TYPE === */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-4">Parcel Type</h3>

            <div className="flex items-center gap-10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("parcelType")}
                  className="radio  radio-warning"
                  defaultChecked
                />
                <span>Document</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("parcelType")}
                  className="radio  radio-warning"
                />
                <span>Non Document</span>
              </label>
            </div>
          </div>

          {/* === PARCEL INFO === */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="form-control">
              <label className="label font-medium">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName")}
                className="input input-bordered w-full"
                placeholder="Enter parcel name"
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Parcel Weight (kg)</label>
              <input
                type="number"
                {...register("parcelWeight")}
                className="input input-bordered w-full"
                placeholder="Enter weight"
              />
            </div>
          </div>

          {/* === SENDER & RECEIVER === */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* ========== SENDER DETAILS ========== */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-2xl font-semibold mb-4">Sender Details</h3>

              <label className="label font-medium">Sender Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                {...register("senderName")}
                className="input input-bordered w-full"
                placeholder="Sender Name"
              />

              <label className="label mt-4 font-medium">Sender Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                {...register("senderEmail")}
                className="input input-bordered w-full"
                placeholder="Sender Email"
              />

              {/* Sender Region */}
              <label className="label mt-4 font-medium">Sender Region</label>
              <select
                {...register("senderRegion")}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Pick Region
                </option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/* Sender District */}
              <label className="label mt-4 font-medium">Sender District</label>
              <select
                {...register("senderDistrict")}
                className="select select-bordered w-full"
                defaultValue=""
                disabled={!senderRegion}
              >
                <option value="" disabled>
                  Pick District
                </option>
                {districtByRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <label className="label mt-4 font-medium">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input input-bordered w-full"
                placeholder="Sender Address"
              />
            </div>

            {/* ========== RECEIVER DETAILS (same as sender) ========== */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-2xl font-semibold mb-4">Receiver Details</h3>

              <label className="label font-medium">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input input-bordered w-full"
                placeholder="Receiver Name"
              />

              <label className="label mt-4 font-medium">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input input-bordered w-full"
                placeholder="Receiver Email"
              />

              {/* Receiver Region */}
              <label className="label mt-4 font-medium">Receiver Region</label>
              <select
                {...register("receiverRegion")}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Pick Region
                </option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/* Receiver District */}
              <label className="label mt-4 font-medium">
                Receiver District
              </label>
              <select
                {...register("receiverDistrict")}
                className="select select-bordered w-full"
                defaultValue=""
                disabled={!receiverRegion}
              >
                <option value="" disabled>
                  Pick District
                </option>

                {districtByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <label className="label mt-4 font-medium">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input input-bordered w-full"
                placeholder="Receiver Address"
              />
            </div>
          </div>

          {/* === SUBMIT === */}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-primary text-black w-full md:w-auto px-10 text-lg"
            >
              Send Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
