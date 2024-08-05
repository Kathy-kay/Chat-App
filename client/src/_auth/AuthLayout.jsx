import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10 ">
        <div className="bg-white border-2 px-20  py-10 border-white text-opacity-90 rounded-3xl max-xl:shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-full">
          <Outlet />
        </div>
      </section>
      <img
        src="/assets/images/side-img.svg"
        alt="authentication side image"
        className="hidden xl:block h-screen w-1/2 object-cover no-repeat"
      />
    </>
  );
};

export default AuthLayout;
