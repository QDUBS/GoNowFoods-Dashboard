import Link from "next/link";
import AppRoutes from "../../constants/app_routes";

type Props = {
  id: string;
  code: string;
  customer: string;
  date: string;
  total: string;
  currency: string;
  status: string;
};

const Order = ({ id, code, customer, date, total, currency, status }: Props) => {
  return (
    <Link
      href={{
        pathname: `${AppRoutes.Orders}/${id}`,
        query: {
          id: id,
        },
      }}
      className="w-full flex flex-row items-center px-3 py-4 border-b-gray cursor-pointer hover:bg-gray-50"
    >
      <p className="w-1/3 text-gray text-sm">{code}</p>
      <p className="w-1/3 text-gray text-sm">{customer}</p>
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

export default Order;
