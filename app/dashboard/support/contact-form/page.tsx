"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillPhone } from "react-icons/ai";
import { CgNametag } from "react-icons/cg";
import { IoMail } from "react-icons/io5";
import Layout from "../../../../src/components/dashboard/Layout";
import LoadingSpinner from "../../../../src/components/loading/LoadingSpinner";
import { SupportType } from "../../../../src/constants/support";
import { ISupportFormInputs } from "../../../../src/interfaces/support";
import { supportFormSchema } from "../../../../src/schemas/support";

const Page = () => {
  const { data }: any = useSession();
  const [user, setUser] = useState<any>();
  const id = data?.user?.user?.user?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(supportFormSchema),
  });

  const query = useQuery({
    queryKey: ["get-user"],
    queryFn: () => axios.get(`/api/user?id=${id}`),
    enabled: !!id,
    onSuccess: (data) => {
      setUser(data.data);
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (dish: ISupportFormInputs | any) =>
      axios.post(`/api/menu`, dish),
    onSuccess(data) {
      if (data.status == 200) {
        toast.success("Request submitted successfully");
      }
    },
  });

  const onSubmit = async (data: ISupportFormInputs | any) => {
    const { issue, subject, message } = data;
    const formData = new FormData();

    let newData: any = {
      issue: issue,
      subject: subject,
      message: message,
    };

    formData.append("data", JSON.stringify(newData));
    mutate(formData as any);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Contact Form</p>
        </div>

        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-4/5 px-8 pt-10">
            <div className="flex flex-row card-overview">
              {/* Form */}
              <form
                className="bg-purplestrong-lighter p-8 pt-10 contact-left-side"
                onSubmit={handleSubmit(onSubmit)}
              >
                <p className="text-white text-2xl font-semibold mb-10">
                  Write Us
                </p>

                <div className="mb-10">
                  <select
                    className="border-dark-gray flex flex-row justify-between text-gray-400 rounded-md px-2 py-3 w-full mt-3"
                    id="input-border-bottom-transparent"
                  >
                    <option>Issue</option>
                    <option value={SupportType.ORDER}>Order</option>
                    <option value={SupportType.PAYMENT}>Payment</option>
                    <option value={SupportType.DELIVERY}>Delivery</option>
                  </select>
                </div>

                <div className="mb-10">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full rounded-md border-dark-gray text-grey px-3 py-3 mt-3"
                    id="input-border-bottom-transparent"
                  />
                </div>

                <div className="mb-20">
                  <textarea
                    placeholder="Message"
                    rows={5}
                    className="w-full rounded-md border-dark-gray text-grey px-3 pt-2 mt-3 textarea-resize"
                    id="input-border-bottom-transparent"
                  ></textarea>
                </div>

                <div className="w-full flex flex-row items-center justify-between mt-10 mb-4">
                  <div className="flex flex-row">
                    <p className="text-gray-400 text-md font-normal">*</p>
                    <p className="text-gray-400 text-md font-normal">
                      This field is mandatory
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <button className="send-message-button ml-2 rounded-md">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>

              {/* Contact Info */}
              <div className="bg-purplestrong p-8 pt-10 contact-right-side">
                <div className="mb-10">
                  <p className="font-semibold text-2xl text-white mb-3">
                    Contact Information
                  </p>
                  <p className="font-normal text-md text-gray-400">
                    We are open to handle your issues, welcome suggestions or
                    just to have a chat
                  </p>
                </div>

                <div className="mt-16">
                  <div className="flex flex-row items-center mb-7">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <CgNametag color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Name:
                    </p>
                    <p className="font-normal text-md text-gray-400 ml-2">
                      {user?.profile_data?.first_name}
                    </p>
                  </div>

                  <div className="flex flex-row items-center mb-7">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <AiFillPhone color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Phone:
                    </p>
                    <p className="font-normal text-md text-gray-400 ml-2">
                      {user?.profile_data?.mobile_number}
                    </p>
                  </div>

                  <div className="flex flex-row items-center">
                    <div className="w-11 h-11 bg-purplestrong-lighter rounded-full flex flex-row items-center justify-center">
                      <IoMail color="#fff" size={20} />
                    </div>

                    <p className="font-semibold text-md text-white ml-2">
                      Email:
                    </p>
                    <p className="font-normal text-md text-gray-400 ml-2">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const SupportTicket = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default SupportTicket;
