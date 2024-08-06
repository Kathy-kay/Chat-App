import { useState,useRef } from "react";
import { useForm } from "react-hook-form";

const OtpVerify = () => {
  const [otp, setotp] = useState(Array(6).fill(""));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e, index) => {
    if(isNaN(e.target.value)) return false
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col md:justify-center gap-7 h-full w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl md:text-5xl">OTP Verification</h1>
          <p className="font-medium text-center text-base leading-[140%] text-[#180161] mt-7">
            Enter the 6-digit OTP sent to your email address.
          </p>
        </div>

        <form
          onSubmit={handleSubmit()}
          className="flex flex-col w-full gap-7 mt-4"
        >
          <div className="flex gap-2 items-center justify-center">
            {otp.map((data, index) => (
              <input
                type="text"
                key={index}
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                {...register(`otp$(index)`, { required: "OTP is verified" })}
                className="rounded-md  border-2 border-[#180161] w-12 text-center p-2"
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;
