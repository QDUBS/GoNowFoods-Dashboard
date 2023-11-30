import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { IDishFormInputs } from "../../interfaces/dish";
import { addressFormSchema } from "../../schemas/settings";
import LoadingSpinner from "../loading/LoadingSpinner";

interface Props {
  onClose: () => void;
}

const EditAddressInformation = ({ onClose }: Props) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addressFormSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (expense: IDishFormInputs) =>
      axios.post(`/api/expenses`, expense),
    onSuccess: async (data: any) => {
      toast("Expense added successfully");
      onClose();
    },
  });

  const onSubmit = async (data: IDishFormInputs | any) => {
    const { name, image, description, price } = data;
    const formData = new FormData();

    if (uploadedFile) {
      formData.append("image", uploadedFile);
    }

    let newData: any = {
      name,
      image,
      description,
      price,
      filename: "",
    };

    formData.append("data", JSON.stringify(newData));
    mutate(formData as any);
    onClose();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="w-full h-screen bg-slight-opaque flex flex-col justify-center items-center fixed top-0 left-0 z-30">
        <div className="w-3/5 pb-10 bg-white rounded-md">
          <div className="flex flex-row justify-between items-center px-8 py-4 border-b-gray">
            <p className="text-black text-lg font-medium">
              Manage Address Information
            </p>
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row px-8 pt-10 pb-12">
              <div className="w-full">
                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">House No.</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("house_no")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">Street</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("street1")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">Street2</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("street2")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">City</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("city")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">State</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("state")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">Country</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("country")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2">
                  <p className="text-gray-400 text-sm font-normal">Postal Code</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("postal_code")}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row items-center justify-between px-8">
              <div className="flex flex-row">
                <p className="text-gray-500 text-md font-normal">*</p>
                <p className="text-gray-500 text-md font-normal">
                  This field is mandatory
                </p>
              </div>

              <div className="flex flex-row">
                <button className="finish-button ml-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditAddressInformation;
