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

const OrderItem = ({ image, name, description, quantity, price }: Props) => {
  return (
    <section className="w-full flex flex-row py-4 border-b-gray cursor-pointer">
      <img
        src="https://www.chefspencil.com/wp-content/uploads/Amala-and-Ewedu.jpg"
        alt=""
        width={100}
        height={100}
        className="w-32 h-32"
      />
      <div className="flex-1 ml-4">
        <p className="text-gray text-md font-medium">{name}</p>
        <p className="text-gray-500 text-sm">{description}</p>

        <div className="mt-6">
          <p className="text-gray text-sm font-medium flex flex-row items-center">
            &#x20A6;{price.toLocaleString()}{" "}
            <span className="text-2xl mx-1">&#183;</span>{" "}
            <span className="text-md">{quantity} Items</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderItem;
