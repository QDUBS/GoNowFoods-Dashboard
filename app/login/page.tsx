"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdLock } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import Error from "../../src/components/forms/Error";
import AppRoutes from "../../src/constants/app_routes";
import { ILoginFormInputs } from "../../src/interfaces/auth";
import { loginFormSchema } from "../../src/schemas/auth";

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs | any>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (data: ILoginFormInputs) => {
    const { email, password } = data;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response?.ok) {
      console.log("Logged in...");
      return router.push(AppRoutes.Orders);
    }
    if (response?.status === 403) {
      setLoginError(true);
      setLoginErrorMessage("Please verify your account");
    } else {
      setLoginError(true);
      setLoginErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      <section className="bg-[#F3F3F3] h-screen flex flex-col items-center">
        <form
          className="w-4/12 relative top-1/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {loginError && (
            <div className="flex flex-col text-center text-red-600 mb-2 pt-2 pb-2">
              {loginErrorMessage}
            </div>
          )}

          <h2 className=" text-center text-2xl font-thin text-gray-500 mb-5">
            CUSTOMER LOGIN
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
              LOGIN
            </button>
            <p>
              Don&apos;t have an account yet?
              <span className="inline-block text-bluemedium underline underline-offset-4 hover:text-bluestrong ml-2">
                <Link href={AppRoutes.SignUpCredentials}>Sign up</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
