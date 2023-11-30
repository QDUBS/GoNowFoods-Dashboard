import Link from "next/link";
import AppRoutes from "../../constants/app_routes";
import Image from "next/image";

type Props = {
  image: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

const OrderHistoryItem = ({
  image,
  name,
  description,
  quantity,
  price,
}: Props) => {
  const formatPrice = (amount: number) => {
    const formattedPrice = amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedPrice;
  };

  return (
    <section className="w-full flex flex-row py-4 px-4 mb-5 border-gray cursor-pointer">
      <img
        src="https://www.chefspencil.com/wp-content/uploads/Amala-and-Ewedu.jpg"
        alt=""
        width={80}
        height={80}
        className="w-24 h-24 box-shadow-sm"
      />

      <div className="flex flex-col ml-4">
        <p className="text-black text-md font-medium mb-2">{name}</p>
        <p className="text-black text-sm">{description}</p>
      </div>

      <div className="ml-4 flex-1">
        <p className="text-gray-400 text-md font-normal flex flex-row items-center mb-2">
          Price:{" "}
          <span className="text-md mx-1 font-medium">{formatPrice(price)}</span>
        </p>
        <p className="text-gray-400 text-md font-normal flex flex-row items-center">
          Quantity: <span className="text-md mx-1 font-medium">{quantity}</span>
        </p>
      </div>

      <div className="flex flex-col items-end ml-4">
        <p className="text-gray text-2xl font-medium">
          {formatPrice(price * quantity)}
        </p>
      </div>
    </section>
  );
};

export default OrderHistoryItem;
