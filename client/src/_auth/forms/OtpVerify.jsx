import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

const OtpVerify = () => {
  const length = 6;
  const inputRef = useRef([]);
  const [otp, setotp] = useState(new Array(length).fill(""));
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();


  useEffect(() => {
   inputRef.current[0]?.focus()
  },[])
  

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setotp(newOtp);

    if(index < length - 1 && value)
      e.target.nextSibling.focus()

    // if(value && e.target.nextSibling){
    //   e.target.nextSibling.focus()
    // }

    
    if (value.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      const newOtp = [...otp]
      newOtp[index] = ""
      setotp(newOtp)

      if(index > 0) inputRef.current[index - 1]?.focus();
      
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      inputRef.current[index - 1]?.focus();
      inputRef.current[index - 1].setSelelctionRange(1, 1)
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }
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
            {otp.map((_, index) => (
              <Controller
                key={index}
                name={`otp$(index)`}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={otp[index]}
                    maxLength={1}
                    onChange={(e) => {
                      field.onChange(e)
                      handleInputChange(e, index)
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(ref) => (inputRef.current[index] = ref)}
                    className="rounded-md  border-2 border-[#180161] w-12 text-center p-2"
                  />
                )}
              />
            ))}
          </div>
          {/* {errors && (
            <p className="text-red-500 text-center">All fields are required</p>
          )} */}
          <Button
            type="submit"
            className="rounded-2xl p-6 bg-[#180161]/70 border-none hover:bg-[#180161]"
          >
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;
