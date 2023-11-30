import Link from "next/link";
import AppRoutes from "../../constants/app_routes";

type Props = {
  id: string;
  name: string;
  price: number;
  onEdit: () => void;
};

const Dish = ({ id, name, price, onEdit }: Props) => {
  const onDelete = () => {};

  return (
    <section className="w-full flex flex-row items-center px-3 py-4 border-b-gray cursor-pointer hover:bg-gray-50">
      <p className="w-2/3 text-gray text-sm">{name}</p>
      <p className="w-2/3 text-gray text-sm">
        &#x20A6;{price.toLocaleString()}
      </p>
      <div className="w-1/3 text-gray text-sm flex flex-row">
        <button
          className="order-status border-1 border-gray-300 rounded-md"
          onClick={() => onEdit()}
        >
          Edit
        </button>
        <button
          className="order-status border-1 border-gray-300 rounded-md ml-4"
          onClick={onDelete}
        >
          Remove
        </button>
      </div>
    </section>
  );
};

export default Dish;
