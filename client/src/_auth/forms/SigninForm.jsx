import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col md:justify-center gap-7  h-full w-full">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex items center justify-between">
            <h1 className="font-bold text-5xl md:text-6xl">Welcome back</h1>
          </div>
          <p className="font-medium text-center text-base leading-[140%] text-[#180161] mt-7">
            Please enter your details to sign in to your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit()}
          className="flex flex-col w-full gap-7 mt-4"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            type="email"
            className={`rounded-2xl p-6  border-2 ${
              errors.email ? "border-red-500" : "border-[#180161]"
            }`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
            })}
            placeholder="Password"
            type="password"
            className={`rounded-2xl p-6 outline-none  border-2 ${
              errors.email ? "border-red-500" : "border-[#180161]"
            }`}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button className="rounded-2xl p-6 bg-[#180161]/70 border-none hover:bg-[#180161]">
            Signup
          </Button>

          <div className="flex justify-between items-center ">
            <Link
              to="/forgotpassword/email-verify"
              className="text-[#180161] text-sm font-semibold"
            >
              Forgot Password?
            </Link>
            <p className="text-[14px] font-semibold leading-[140%] text-center">
            Don&apos;t have an account?
              <Link
                to="/sign-up"
                className="text-[#180161] text-sm font-bold ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
