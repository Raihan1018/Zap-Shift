import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="card bg-white w-full max-w-sm shadow-xl rounded-2xl">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="card-body space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center mb-2">
            Create Account
          </h2>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="input input-bordered rounded-xl focus:outline-none focus:ring focus:ring-primary focus:border-primary transition"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Enter your password"
              className="input input-bordered rounded-xl focus:outline-none focus:ring focus:ring-primary focus:border-primary transition"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}

            {errors.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">
                Password must be at least 6 characters
              </span>
            )}

            <label className="label justify-end">
              <a href="#" className="label-text-alt link link-hover text-sm">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Button */}
          <div className="form-control mt-4">
            <button className="btn bg-primary px-6 py-2 rounded-xl text-white">
              Register
            </button>
          </div>

          {/* Bottom text */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <a href="#" className="text-primary font-medium link">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
