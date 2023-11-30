import { Form, Input, Button, Card, InputNumber } from "antd";
import LoadingSpinner from "../loading/LoadingSpinner";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { dishFormSchema } from "../../schemas/dish";
import { IDishFormInputs } from "../../interfaces/dish";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface Props {
  onClose: () => void;
}

const NewsLetter = ({ onClose }: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(dishFormSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (expense: IDishFormInputs) =>
      axios.post(`/api/expenses`, expense),
    onSuccess: async (data: any) => {
      toast("Expense added successfully");
      onClose();
    },
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file) as any);
    setUploadedFile(file);
    setValue("image", file!!);

    if (file) {
      const fileName = file.name;
      setSelectedFileName(fileName);
    }
  };

  useEffect(() => {
    setValue("image", selectedFile!!);
  }, [selectedFile]);

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
        <div className="w-3/5 h-3/5 pb-10 bg-white rounded-md">
          <div className="flex flex-row justify-between items-center px-8 py-4 border-b-gray">
            <p className="text-black text-lg font-semibold">Add New Item</p>
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row px-8 pt-10 pb-12">
              <div className="w-8/12">
                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">Item name</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("name")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">
                    Item price
                  </p>
                  <input
                    type="number"
                    placeholder=""
                    min={0}
                    className="w-full text-md mt-1 outset"
                    {...register("price")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2">
                  <p className="text-gray-400 text-sm font-normal">
                    Item description
                  </p>
                  <textarea
                    placeholder=""
                    rows={4}
                    className="w-full mt-1 outset"
                    id="resize"
                    {...register("description")}
                  ></textarea>
                </div>
              </div>

              {/* Upload receipt */}
              <div className="w-4/12 flex flex-col justify-center items-center border-gray rounded-md ml-10">
                <div className="relative">
                  <div className="bg-gray-100 p-10 rounded-full cursor-pointer relative">
                    <Image
                      src="/images/add-image.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="w-full h-receipt-container absolute top-0">
                    <input
                      type="file"
                      className="w-full h-receipt"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <p className="text-gray-500 text-md text-center font-normal mt-3">
                  {selectedFileName}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-row items-center justify-between px-8 pb-10">
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

export default NewsLetter;
