import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="card bg-white w-full max-w-sm shadow-xl rounded-2xl">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="card-body space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center mb-2">Login</h2>

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
              <p className="text-red-500 text-sm italic">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="input input-bordered rounded-xl focus:outline-none focus:ring focus:ring-primary focus:border-primary transition"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm italic">Email is required</p>
            )}

            <label className="label justify-end">
              <Link to="#" className="label-text-alt link link-hover text-sm">
                Forgot password?
              </Link>
            </label>
          </div>

          {/* Button */}
          <div className="form-control mt-4">
            <button className="btn bg-primary px-6 py-2 rounded-xl">
              Login
            </button>
          </div>

          {/* Bottom text */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Do not have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-medium link hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
