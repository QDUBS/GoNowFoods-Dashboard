import Link from "next/link";
import AppRoutes from "../../constants/app_routes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

type Props = {
  id: string;
  code: string;
  customer: string;
  courierId: string;
  date: string;
  total: string;
  currency: string;
  status: string;
};

const OrderHistory = ({
  id,
  code,
  customer,
  courierId,
  date,
  total,
  currency,
  status,
}: Props) => {
  const {data: courier} = useQuery({
    queryKey: ["get-courier"],
    queryFn: () => axios.get(`/api/user?id=${courierId}`),
    enabled: !!courierId,
    onSuccess: (data) => {
    },
  });

  return (
    <Link
      href={{
        pathname: `${AppRoutes.OrderHistory}/${id}`,
        query: {
          id: id,
        },
      }}
      className="w-full flex flex-row items-center px-3 py-4 border-b-gray cursor-pointer hover:bg-gray-50"
    >
      <p className="w-1/3 text-gray text-sm">{code}</p>
      <p className="w-1/3 text-gray text-sm">{customer}</p>
      <p className="w-1/3 text-gray text-sm">
        {courier ? `${
          courier?.data?.profile_data.first_name?.charAt(0).toUpperCase() +
          courier?.data?.profile_data.first_name?.slice(1)
        } ${
          courier?.data?.profile_data.last_name?.charAt(0).toUpperCase() +
          courier?.data?.profile_data.last_name?.slice(1)
        }` : ""}
      </p>
      <p className="w-1/3 text-gray text-sm">{date}</p>
      <p className="w-1/3 text-gray text-sm">
        {currency} {total}
      </p>
      <div className="w-1/3 text-gray text-sm ">
        <button className="order-status border-1 border-red-500 rounded-md">
          {status}
        </button>
      </div>
    </Link>
  );
};

export default OrderHistory;
