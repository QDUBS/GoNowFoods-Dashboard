"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import Layout from "../../../../src/components/dashboard/Layout";
import OrderItem from "../../../../src/components/dashboard/OrderItem";
import OrderKanban from "../../../../src/components/dashboard/OrderKanban";
import LoadingSpinner from "../../../../src/components/loading/LoadingSpinner";
import GoogleMaps from "../../../../src/components/maps/GoogleMap";
import OrderCompleted from "../../../../src/components/order-tracking/OrderCompleted";
import OrderInPrep from "../../../../src/components/order-tracking/OrderInPrep";
import OrderNew from "../../../../src/components/order-tracking/OrderNew";
import OrderPicked from "../../../../src/components/order-tracking/OrderPicked";
import OrderReady from "../../../../src/components/order-tracking/OrderReady";
import moment from "moment";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState<any>();
  const [courier, setCourier] = useState<any>();
  const [activeTab, setActiveTab] = useState("Track");

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

  const getStatus = (status: string) => {
    if (status == "NEW") {
      return <OrderNew />;
    } else if (status == "IN_PREPARATION") {
      return <OrderInPrep />;
    } else if (status == "READY_FOR_PICKUP") {
      return <OrderReady />;
    } else if (status == "PICKED_UP") {
      return <OrderPicked />;
    } else if (status == "COMPLETED") {
      return <OrderCompleted />;
    }
  };

  const getStatusText = (status: string) => {
    if (status == "NEW") {
      return "Order was placed";
    } else if (status == "IN_PREPARATION") {
      return "Order is in preparation";
    } else if (status == "READY_FOR_PICKUP") {
      return "Order is ready for pickup";
    } else if (status == "ACCEPTED") {
      return "Driver has accepted order";
    } else if (status == "PICKED_UP") {
      return "Driver has picked up order";
    } else if (status == "COMPLETED") {
      return "Order has been fulfilled";
    }
  };

  const refetch = () => {
    query.refetch();
  };

  if (query.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="px-10 pt-16">
        {/* Header */}
        <div className="flex flex-row justify-between card-overview py-6 px-5">
          <div>
            <h2 className="text-xl font-medium">Track this order</h2>
            <div className="flex mt-3">
              <p className="text-sm font-medium">Estimated Delivery:</p>
              <p className="text-sm font-normal text-gray-400 ml-2">
                {moment(
                  new Date(order?.createdAt),
                  "MMM DD, YYYY, h:mm:ss A"
                ).format("MMM DD, YYYY")}
              </p>
            </div>
            <p className="text-sm font-normal text-gray-400 mt-1">
              {getStatusText(order?.status)}
            </p>
          </div>
          <div className="bg-gray-200 w-4/12 h-11 flex flex-row items-center rounded-md px-1 py-1">
            <button
              onClick={() => setActiveTab("Track")}
              className={
                activeTab == "Track"
                  ? "w-6/12 h-9 bg-white rounded-md text-black"
                  : "w-6/12 bg-transparent text-gray-400"
              }
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("Details")}
              className={
                activeTab == "Details"
                  ? "w-6/12 h-9 bg-white rounded-md text-black"
                  : "w-6/12 bg-transparent text-gray-400"
              }
            >
              Track
            </button>
          </div>
        </div>

        {/* Tracking */}
        <div className="flex flex-col">
          {/* Map Tracking */}
          <div>
            <div className="tracking-container mt-10">
              <div className="w-10/12 flex justify-between mb-2">
                <p className="text-sm new">New</p>
                <p className="text-sm in-prep">In preparation</p>
                <p className="text-sm ready">Ready for pickup</p>
                <p className="text-sm pickup">Picked up</p>
                <p className="text-sm completed">Completed</p>
              </div>

              {getStatus(order?.status)}
            </div>
          </div>

          <div className="flex-1">
            {activeTab === "Track" ? (
              <>
                <div className="flex flex-row mt-10">
                  <div className="bg-blue-300 w-5/12 flex flex-col items-center justify-center">
                    <div className="mb-5">
                      <h2 className="text-sm font-semibold text-white">
                        Estimated Delivery Date
                      </h2>
                      <h2 className="text-2xl font-normal text-white">
                        {moment(
                          new Date(order?.createdAt),
                          "MMM DD, YYYY, h:mm:ss A"
                        ).format("MMM DD, YYYY")}
                      </h2>
                    </div>

                    <div className="mb-10">
                      <p className="text-sm font-medium text-white flex items-center">
                        Courier <span className="text-2xl mx-2">&#183;</span>{" "}
                        {courier
                          ? `${
                              courier?.profile_data.first_name
                                ?.charAt(0)
                                .toUpperCase() +
                              courier?.profile_data.first_name?.slice(1)
                            } ${
                              courier?.profile_data.last_name
                                ?.charAt(0)
                                .toUpperCase() +
                              courier?.profile_data.last_name?.slice(1)
                            }`
                          : "Order has not been accepted"}
                      </p>
                      <p className="text-sm font-normal text-white text-center">
                        {courier?.profile_data.mobile_number}
                      </p>
                    </div>

                    <button
                      className={
                        courier ? "call-button mt-10" : "disabled-call-button mt-10"
                      }
                      disabled={courier ? true : false}
                    >
                      Call courier
                    </button>
                  </div>
                  <GoogleMaps />
                </div>

                {/* Order Items */}
                <div className="mb-16">
                  <h2 className="text-md font-medium mt-10 mb-3">
                    Items in this order
                  </h2>
                  {order?.order_dishes?.map((dish) => (
                    <OrderItem
                      image={`${dish.dish.image}`}
                      name={`${dish.dish.name}`}
                      description={`${dish.dish.description}`}
                      quantity={dish.quantity}
                      price={dish.dish.price}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Stages */}
                <div className="mt-10">
                  <OrderKanban order={order} refetch={refetch} />
                </div>
              </>
            )}
          </div>
        </div>
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
