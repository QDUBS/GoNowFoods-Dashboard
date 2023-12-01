import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { ICompanyFormInputs } from "../../interfaces/settings";
import { companyFormSchema } from "../../schemas/settings";
import LoadingSpinner from "../loading/LoadingSpinner";

interface Props {
  onClose: () => void;
}

const EditCompanyInformation = ({ onClose }: Props) => {
  const { data }: any = useSession();
  const [user, setUser] = useState<any>();
  const id = data?.user?.user?.user?.id;
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(companyFormSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (restaurant: ICompanyFormInputs | any) =>
      axios.post(`/api/restaurant`, restaurant),
    onSuccess: async (data: any) => {
      toast.success("Updated successfully");
      onClose();
    },
  });

  const query = useQuery({
    queryKey: ["get-user"],
    queryFn: () => axios.get(`/api/user?id=${id}`),
    enabled: !!id,
    onSuccess: (data) => {
      if (data.data) {
        setUser(data.data);
        setValue("name", data.data.restaurant.name);
        setValue("fileName", data.data.restaurant.image);
        setValue("mobile_number", data.data.profile_data.mobile_number);
        setValue("delivery_fee", data.data.restaurant.delivery_fee);
        setValue("min_delivery_time", data.data.restaurant.min_delivery_time);
        setValue("max_delivery_time", data.data.restaurant.max_delivery_time);
      }
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

  const onSubmit = async (data: ICompanyFormInputs | any) => {
    const {
      name,
      image,
      mobile_number,
      delivery_fee,
      min_delivery_time,
      max_delivery_time,
      fileName,
    } = data;
    const formData = new FormData();

    if (uploadedFile) {
      formData.append("image", uploadedFile);
    }

    let newData: any = {
      name: name,
      image: image,
      mobile_number: mobile_number,
      delivery_fee: delivery_fee,
      min_delivery_time: min_delivery_time,
      max_delivery_time: max_delivery_time,
      isActive: true,
      filename: fileName,
    };

    formData.append("data", JSON.stringify(newData));
    mutate(formData as any);
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
              Manage Company Information
            </p>
            <div
              onClick={onClose}
              className="bg-gray w-6 h-6 rounded-md flex flex-col justify-center items-center cursor-pointer"
            >
              <IoClose color="#666666" size={25} />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row px-8 pt-10 pb-8">
              <div className="w-8/12">
                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">Name</p>
                  <input
                    type="text"
                    placeholder=""
                    className="w-full text-md mt-1 outset"
                    {...register("name")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">
                    Mobile number
                  </p>
                  <input
                    type="text"
                    placeholder=""
                    min={0}
                    className="w-full text-md mt-1 outset"
                    {...register("mobile_number")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">
                    Delivery fee
                  </p>
                  <input
                    type="number"
                    placeholder=""
                    min={0}
                    className="w-full text-md mt-1 outset"
                    {...register("delivery_fee")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2 mb-6">
                  <p className="text-gray-400 text-sm font-normal">
                    Minimum Delivery Time
                  </p>
                  <input
                    type="number"
                    placeholder=""
                    min={0}
                    className="w-full text-md mt-1 outset"
                    {...register("min_delivery_time")}
                  />
                </div>

                <div className="flex flex-col border-gray rounded-md px-2 py-2">
                  <p className="text-gray-400 text-sm font-normal">
                    Maximum Delivery Time
                  </p>
                  <input
                    type="number"
                    placeholder=""
                    min={0}
                    className="w-full text-md mt-1 outset"
                    {...register("max_delivery_time")}
                  />
                </div>
              </div>

              {/* Upload image */}
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

export default EditCompanyInformation;
