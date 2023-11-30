"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillTagsFill } from "react-icons/bs";
import Layout from "../../../../src/components/dashboard/Layout";
import OrderHistoryItem from "../../../../src/components/dashboard/OrderHistoryItem";
import LoadingSpinner from "../../../../src/components/loading/LoadingSpinner";
import { OrderStatuses } from "../../../../src/constants/order_statuses";
import moment from "moment";
import Link from "next/link";
import AppRoutes from "../../../../src/constants/app_routes";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState<any>();
  const [courier, setCourier] = useState<any>();

  const query = useQuery({
    queryKey: ["get-order"],
    queryFn: () => axios.get(`/api/order?id=${id}`),
    enabled: !!id,
    onSuccess: (data) => {
      setOrder(data.data);
    },
  });

  const queryCourier = useQuery({
    queryKey: ["get-courier"],
    queryFn: () => axios.get(`/api/user?id=${order?.courier_id}`),
    enabled: !!order?.courier_id,
    onSuccess: (data) => {
      setCourier(data.data);
    },
  });

  const formatPrice = (amount: number) => {
    const formattedPrice = amount?.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedPrice;
  };

  const formatLocation = (address) => {
    const formatted_address = `${address?.city}, ${address?.state}`;
    return formatted_address;
  };

  const formatLocation2 = (address) => {
    const formatted_address = `${address?.house_no} ${address?.street1}, ${address?.city}, ${address?.state}`;
    return formatted_address;
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

  if (query.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="flex px-10 pt-16">
        {/* Left section */}
        <section className="w-8/12 h-full mr-4 px-4 pt-4 border-1 border-gray-400">
          {/* Header */}
          <div className="flex border-1 border-gray-400 px-4 py-6">
            <div className="flex flex-1">
              <div className=" w-12 bg-black flex flex-col items-center justify-center">
                <BsFillTagsFill color="#ccc" size={20} />
              </div>
              <div className="flex flex-col justify-between ml-4">
                <p className="text-sm font-sans">Order number</p>
                <p className="text-md font-medium">#{order?.code}</p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between ml-4">
              <p className="text-xl font-sans">{formatPrice(order?.total)}</p>
              <p className="text-sm font-sans text-gray-400">
                Delivery costs included
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-10">
            <p className="text-xl mb-4">Items in this order</p>

            {order?.order_dishes?.map((order_dish) => (
              <OrderHistoryItem
                image={order_dish.dish.image}
                name={order_dish.dish.name}
                description={order_dish.dish.description}
                quantity={order_dish.quantity}
                price={order_dish.dish.price}
              />
            ))}
          </div>
        </section>

        {/* Right section */}
        <section className="w-4/12">
          {/* Order Details */}
          <div className=" bg-yellow-200 px-5 py-8">
            <p className="text-xl font-medium">Order Details</p>
            <div className="flex flex-row justify-between mt-5">
              <p className="text-sm font-sans">Status</p>
              <p className="text-md font-medium">{getStatus(order?.status)}</p>
            </div>
            <div className="flex flex-row justify-between mt-5">
              <p className="text-sm font-sans">Order Code</p>
              <p className="text-md font-medium">{order?.code}</p>
            </div>
            <div className="flex flex-row justify-between mt-5">
              <p className="text-sm font-sans">Payment</p>
              <p className="text-md font-medium">{order?.payment}</p>
            </div>
            <div className="flex flex-row justify-between mt-5">
              <p className="text-sm font-sans">Total</p>
              <p className="text-md font-medium">{formatPrice(order?.total)}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className=" bg-yellow-200 px-5 py-8 mt-2">
            <p className="text-xl font-medium">Customer</p>
            <p className="text-sm font-medium mb-2 mt-5">
              {`${
                order?.user?.profile_data?.first_name?.charAt(0).toUpperCase() +
                order?.user?.profile_data?.first_name?.slice(1)
              } ${
                order?.user?.profile_data?.last_name?.charAt(0).toUpperCase() +
                order?.user?.profile_data?.last_name?.slice(1)
              }`}
            </p>
            <div className="mb-1">
              <p className="text-sm font-normal">
                {formatLocation(order?.user?.address_data)}
                <span className=" font-medium"> (NGN &#x20A6;)</span>
              </p>
            </div>
            <p className="text-sm font-medium">
              {formatLocation2(order?.user?.address_data)}
            </p>
          </div>

          {/* Courier Details */}
          <div className=" bg-yellow-200 px-5 py-8 mt-2">
            <p className="text-xl font-medium">Courier</p>
            {courier ? (
              <div>
                <p className="text-sm font-medium mb-2 mt-5">
                  {`${
                    courier?.profile_data.first_name?.charAt(0).toUpperCase() +
                    courier?.profile_data.first_name?.slice(1)
                  } ${
                    courier?.profile_data.last_name?.charAt(0).toUpperCase() +
                    courier?.profile_data.last_name?.slice(1)
                  }`}
                </p>
                <p className="text-sm font-normal mb-1">
                  {formatLocation(courier?.address_data)}{" "}
                  <span className=" font-medium"> (DISPATCH BIKE)</span>
                </p>
                <p className="text-sm font-medium">
                  Delivered on{" "}
                  {moment(
                    new Date(order?.completedAt),
                    "MMM DD, YYYY, h:mm:ss A"
                  ).format("MMM DD, YYYY")}
                </p>
              </div>
            ) : (
              <p className="text-sm font-medium mb-2 mt-5">
                Order has not been accepted
              </p>
            )}
          </div>

          {/* Enquiries */}
          <div className=" bg-yellow-200 px-5 py-8 mt-2">
            <Link href={`${AppRoutes.Support}`}>
              <button className="w-full h-12 bg-black rounded-sm text-white text-sm font-medium cursor-pointer">
                ASK A QUESTION
              </button>
            </Link>
          </div>
        </section>
      </section>
    </>
  );
};

const Order = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Order;
