"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Error from "../../../src/components/forms/Error";
import AppRoutes from "../../../src/constants/app_routes";
import { ISignupEnterpriseFormInputs } from "../../../src/interfaces/auth";
import { RootState } from "../../../src/redux/store/store";
import {
  restaurantDetailsFormSchema,
  userRegistrationFormSchema,
} from "../../../src/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../src/components/loading/LoadingSpinner";

const SignUpEnterprise = () => {
  const router = useRouter();
  const [signUpError, setSignUpError] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const { userDetails } = useSelector((state: RootState) => state.signup);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupEnterpriseFormInputs | any>({
    resolver: yupResolver(restaurantDetailsFormSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (registrationDetails: FormData | any) =>
      axios.post(`/api/users`, registrationDetails),
    onSuccess: (data) => {
      router.push(AppRoutes.SignUpComplete);
    },
  });

  const onSubmit = async (data: ISignupEnterpriseFormInputs) => {
    const userDetailsValid = await userRegistrationFormSchema.isValid(
      userDetails
    );

    if (!userDetailsValid) {
      setSignUpError(true);
      setSignUpErrorMessage("Please provide a valid email and password");
      return;
    }

    const registrationDetails = { ...data, ...userDetails };
    mutate(registrationDetails);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="bg-[#F3F3F3] h-screen flex flex-col items-center">
        <form
          className="w-4/12 relative top-1/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className=" text-center text-2xl font-thin text-gray-500 mb-5">
            JUST A FEW MORE DETAILS
          </h2>
          <div className="bg-white pt-7 pb-5 px-5">
            <div className="flex flex-col">
              <div className="flex flex-col border-b-2 border-b-gray-300">
                <p className="text-sm font-normal text-gray-500">
                  Restaurant name
                </p>
                <input
                  type="text"
                  className="py-4 bg-transparent flex-1 outset placeholder:font-normal autofill"
                  placeholder="J.C Ventures"
                  {...register("name")}
                />
                {errors.name && <Error message={errors.name.message} />}
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-5 items-center space-y-4">
            <button
              className="login-button w-full"
              type="submit"
              id="login-button"
            >
              FINISH
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUpEnterprise;
