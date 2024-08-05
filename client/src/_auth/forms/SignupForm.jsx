import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col md:justify-center gap-7 h-full w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-5xl md:text-6xl">Welcome</h1>
            <img src="/assets/images/victory.svg" alt="victory emoji" className="h-[100px]" />
          </div>
          <p className="font-medium text-center text-base leading-[140%] text-[#180161]">
            Fill in the details to get started with the chat app
          </p>
        </div>
        <form onSubmit={handleSubmit()} className="flex flex-col w-full gap-5 mt-4">
          <input 
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            }
          })}
          placeholder="Email"
          type="email"
          className={`rounded-2xl p-6  border-2 ${errors.email ? "border-red-500" : "border-[#180161]"}`}
          />
          {errors.email && <p className="text-red-500 ">{errors.email.message}</p>}
          <input 
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters"
            }
          })}
          placeholder="Password"
          type="password"
          className={`rounded-2xl p-6 outline-none  border-2 ${errors.email ? "border-red-500" : "border-[#180161]"}`}
          />
           {errors.password && <p className="text-red-500 ">{errors.password.message}</p>}

           <Button className="rounded-2xl p-6 bg-[#180161]/70 border-none hover:bg-[#180161]">Signup</Button>

           <p className="text-[14px] font-normal leading-[140%] text-center">Already have an account?
            <Link to="/sign-in" className="text-[#180161] font-semibold text-base">Signin</Link>
           </p> 
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
