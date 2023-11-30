"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { CgNametag } from "react-icons/cg";
import { IoLocation } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import Layout from "../../../src/components/dashboard/Layout";
import OrderHistory from "../../../src/components/dashboard/OrderHistory";
import LoadingSpinner from "../../../src/components/loading/LoadingSpinner";
import { OrderStatuses } from "../../../src/constants/order_statuses";

const Page = () => {
  const [orders, setOrders] = useState<any>([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchCode, setSearchCode] = useState<String | null>("");
  const [searchLocation, setSearchLocation] = useState<String | null>("");
  const [searchStatus, setSearchStatus] = useState<String | null>("");
  const [searchStartDate, setSearchStartDate] = useState<String | any | null>(
    null
  );
  const [searchEndDate, setSearchEndDate] = useState<String | any | null>(null);

  const { isLoading, error } = useQuery({
    queryKey: ["get-orders"],
    queryFn: () => axios.get(`/api/orders`),
    onSuccess: (data) => {
      setOrders(data.data);
    },
  });

  const handleChangeStatus = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchStatus(event.target.value);
  };

  const handleChangeLocation = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchLocation(event.target.value);
  };

  const handleChangeCode = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchCode(event.target.value);
  };

  const getStatus = (status: string) => {
    if (status === OrderStatuses.NEW) {
      return "New";
    }
    if (status === OrderStatuses.IN_PREPARATION) {
      return "In Preparation";
    }
    if (status === OrderStatuses.READY_FOR_PICKUP) {
      return "Ready For Pickup";
    }
    if (status === OrderStatuses.ACCEPTED) {
      return "Accepted";
    }
    if (status === OrderStatuses.PICKED_UP) {
      return "Picked Up";
    }
    if (status === OrderStatuses.COMPLETED) {
      return "Completed";
    }
    if (status === OrderStatuses.CANCELLED) {
      return "Cancelled";
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">
            Orders History
          </p>
        </div>

        {/* Filter */}
        <div className="px-6 py-4 border-b border-\[\#A9A6DC\]\/80">
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-fit bg-transparent py-2 rounded-md flex flex-row items-center justify-center"
            >
              <LuFilter color="#666" size={18} />
              <p className="text-gray-500 font-normal text-sm ml-2">
                {showFilters ? "Hide Filters" : "Show Filters"}
              </p>
            </button>
          </div>

          {/* Filter form */}
          {showFilters && (
            <div className="mt-5">
              <form>
                {/* Order date filter */}
                <div className="w-full flex flex-row">
                  <div className="w-full h-9 flex flex-row items-center border-gray rounded-md px-2">
                    <p className="h-full font-normal text-sm text-black flex flex-row items-center pr-2 border-r-gray">
                      From
                    </p>
                    <input
                      type="date"
                      placeholder="YYYY-MM-DD"
                      value={searchStartDate}
                      onChange={(e) => setSearchStartDate(e.target.value)}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    {/* <FaCalendarDays color="#cccccc" size={20} /> */}
                  </div>

                  <div className="w-full h-9 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                    <p className="h-full font-normal text-sm text-black flex flex-row items-center pr-2 border-r-gray">
                      To
                    </p>
                    <input
                      type="date"
                      placeholder="YYYY-MM-DD"
                      value={searchEndDate}
                      onChange={(e) => setSearchEndDate(e.target.value)}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    {/* <FaCalendarDays color="#cccccc" size={20} /> */}
                  </div>
                </div>

                {/* Order location and status filter */}
                <div className="w-full flex flex-row mt-5">
                  <div className="w-full h-9 flex flex-row items-center border-gray rounded-md px-2">
                    <p className="h-full font-normal text-sm text-black flex flex-row items-center pr-2 border-r-gray">
                      Code
                    </p>
                    <input
                      type="text"
                      placeholder=""
                      value={searchCode as string}
                      onChange={handleChangeCode}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <CgNametag color="#cccccc" size={25} />
                  </div>

                  <div className="w-full h-9 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                    <p className="h-full font-normal text-sm text-black flex flex-row items-center pr-2 border-r-gray">
                      Location
                    </p>
                    <input
                      type="text"
                      placeholder=""
                      value={searchLocation as string}
                      onChange={handleChangeLocation}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <IoLocation color="#cccccc" size={25} />
                  </div>

                  <div className="w-full h-9 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                    <p className="h-full font-normal text-sm text-black flex flex-row items-center pr-2 border-r-gray">
                      Status
                    </p>
                    <select
                      className="w-full px-2"
                      id="category-select"
                      onChange={handleChangeStatus}
                    >
                      <option value="none"></option>
                      <option value="new">New</option>
                      <option value="in-preparation">In preparation</option>
                      <option value="ready-for-pickup">Ready for pickup</option>
                      <option value="picked-up">Picked up</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-6 pt-10 pb-20">
          <div className="w-full">
            {orders?.length > 0 ? (
              <div className="w-full border-gray rounded-md">
                <div className="bg-gray w-full flex flex-row items-center px-3 py-4">
                  <p className="w-1/3 text-dark-gray text-left font-medium text-sm">
                    CODE
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    CUSTOMER
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    COURIER
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    DATE
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    TOTAL
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    STATUS
                  </p>
                </div>

                {orders.map((order) => (
                  <OrderHistory
                    key={order?.id}
                    id={order?.id}
                    code={order?.code}
                    customer={`${
                      order.user.profile_data.first_name
                        ?.charAt(0)
                        .toUpperCase() +
                      order.user.profile_data.first_name?.slice(1)
                    } ${
                      order.user.profile_data.last_name
                        ?.charAt(0)
                        .toUpperCase() +
                      order.user.profile_data.last_name?.slice(1)
                    }`}
                    courierId={order?.courier_id}
                    date={moment(
                      new Date(order?.createdAt),
                      "MMM DD, YYYY, h:mm:ss A"
                    ).format("MMM DD, YYYY")}
                    total={order?.total?.toLocaleString()}
                    currency={"₦"}
                    status={getStatus(order?.status)}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center ">
                {/* No orders */}
                <div className="w-8/12 flex flex-col items-center px-10 pt-10 pb-20 rounded-md overview-card">
                  <Image
                    src="/images/no-order-removebg-preview.png"
                    alt=""
                    width={120}
                    height={120}
                    className="mb-5"
                  />
                  <p className="text-black font-semibold text-xl mb-5">
                    You have no orders
                  </p>
                  <p className="text-black font-normal text-sm">
                    All orders you receive will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const OrdersHistory = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default OrdersHistory;
