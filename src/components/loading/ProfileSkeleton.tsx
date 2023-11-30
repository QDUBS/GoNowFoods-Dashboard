import { AppRoutes } from "@/constants/app_routes";
import { FaCircleUser } from "react-icons/fa6";
import { RiFileListFill } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NavItem from "../sidenav/NavItem";
import { TbReport } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { BsChatFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

const ProfileSkeleton = () => {
  return (
    <>
      <section>
        <div className="h-40 bg-blue-700 px-30 pt-20 pb-30">
          <p className="text-white text-3xl font-semibold">
            <Skeleton />
          </p>
          <p className="text-white text-md font-semibold mt-8">
            <Skeleton count={3} className="custom-skeleton" />
          </p>
        </div>

        <div className="overview-lower-section px-30">
          <div className="bg-white flex flex-row w-full p-8 rounded-md overview-card">
            {/* Left */}
            <div className="left-side">
              <div className="w-fit relative">
                <Skeleton circle width={200} height={200} />

                <div className="absolute bottom-0 right-0 cursor-pointer">
                  <Skeleton
                    circle
                    width={50}
                    height={50}
                    className="absolute bottom-0 right-0"
                  />
                </div>
              </div>

              <Skeleton className="my-5" />

              <div className="flex flex-row items-center justify-between">
                <div className="w-full">
                  <Skeleton />
                  <Skeleton />
                </div>

                <div className="w-full ml-2">
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="right-side ml-10">
              <div className="flex flex-row justify-between pb-5 mb-10 border-b-gray">
                <p className="w-full">
                  <Skeleton />
                  <Skeleton />
                </p>
              </div>

              <div className="flex flex-row mb-5">
                <p className="w-2/12">
                  <Skeleton />
                </p>
                <p className="w-full ml-2">
                  <Skeleton count={2} />
                </p>
              </div>

              <div className="flex flex-row mb-5">
                <p className="w-2/12">
                  <Skeleton />
                </p>
                <p className="w-full ml-2">
                  <Skeleton count={2} />
                </p>
              </div>

              <div className="flex flex-row">
                <p className="w-2/12">
                  <Skeleton />
                </p>
                <p className="w-full ml-2">
                  <Skeleton count={3} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row px-30">
          {/* Overview */}
          <div className="w-2/3 rounded-md bg-white p-8 overview-card">
            <p className="text-black text-lg font-semibold">
              <Skeleton />
              <Skeleton />
            </p>

            <div className="flex flex-row">
              <Skeleton circle width={170} height={170} />
              <Skeleton circle width={170} height={170} className="ml-4" />
              <Skeleton circle width={170} height={170} className="ml-4" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="w-1/3 ml-6">
            <div className="w-full flex flex-row p-8 rounded-md bg-purplestrong overview-card">
              <Skeleton />
              <div className="w-full ml-2">
                <p className="text-white text-md font-semibold">
                  <Skeleton />
                </p>
                <p className="text-grey text-sm font-small mt-4">
                  <Skeleton />
                </p>
                <p className="text-grey text-sm font-small italic underline">
                  <Skeleton />
                  <Skeleton />
                </p>
              </div>
            </div>

            <div className="w-full flex flex-row p-8 rounded-md bg-gray mt-6 overview-card">
              <div className="w-full ml-2">
                <p className="text-purplestrong text-md font-semibold">
                  <Skeleton />
                </p>
                <p className="text-purplestrong text-sm font-small mt-4">
                  <Skeleton />
                </p>
                <p className="text-purplestrong text-sm font-small italic underline">
                  <Skeleton containerClassName="text-dark-grey" />
                  <Skeleton />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileSkeleton;
