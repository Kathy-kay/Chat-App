import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";


const EmailVerify = () => {
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
            <h1 className="font-bold text-3xl md:text-5xl">
              Email Verification
            </h1>
          </div>
          <p className="font-medium text-center text-base leading-[140%] text-[#180161] mt-7">
            Enter your email address to receive an OTP for password reset.
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
            <p className="text-red-500 ">{errors.email.message}</p>
          )}
          

          <Button className="rounded-2xl p-6 bg-[#180161]/70 border-none hover:bg-[#180161]">
            Email Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
