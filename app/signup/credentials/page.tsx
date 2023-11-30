"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoMdLock } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Error from "../../../src/components/forms/Error";
import AppRoutes from "../../../src/constants/app_routes";
import { ISignupFormInputs } from "../../../src/interfaces/auth";
import { saveUserDetails } from "../../../src/redux/slices/signupSlice";
import { userRegistrationFormSchema } from "../../../src/schemas/auth";

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegistrationFormSchema),
  });

  const onSubmit = (data: ISignupFormInputs) => {
    dispatch(saveUserDetails(data));
    console.log("Email -", data.email, "Password -", data.password);
    router.push(AppRoutes.SignUpEnterprise);
  };

  return (
    <>
      <section className="bg-[#F3F3F3] h-screen flex flex-col items-center">
        <form
          className="w-4/12 relative top-1/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className=" text-center text-2xl font-thin text-gray-500 mb-5">
            CUSTOMER REGISTER
          </h2>
          <div className="bg-white pt-7 pb-5 px-5">
            <div className="flex flex-col">
              <div className="flex flex-row items-center border-b-2 border-b-gray-300">
                <IoPerson size={20} color="#666" />
                <input
                  type="email"
                  className="py-4 bg-transparent flex-1 ml-4 outset placeholder:font-normal autofill"
                  placeholder="johndoe@gmail.com"
                  {...register("email")}
                />
                {errors.email && <Error message={errors.email.message} />}
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <div className="flex flex-row items-center">
                <IoMdLock size={22} color="#666" />
                <input
                  type="password"
                  className="py-4 bg-transparent flex-1 ml-4 outset placeholder:font-normal autofill"
                  placeholder="Min. 8 characters"
                  {...register("password")}
                />
              </div>
              {errors.password && <Error message={errors.password.message} />}
            </div>
          </div>

          <div className="flex flex-col mt-5 items-center space-y-4">
            <button
              className="login-button w-full"
              type="submit"
              id="login-button"
            >
              REGISTER
            </button>
            <p>
              Already have an account?
              <span className="inline-block text-bluemedium underline underline-offset-4 hover:text-bluestrong ml-2">
                <Link href={AppRoutes.Register}>Login</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUp;
