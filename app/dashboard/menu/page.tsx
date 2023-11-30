"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgNametag } from "react-icons/cg";
import { LuFilter } from "react-icons/lu";
import Dish from "../../../src/components/dashboard/Dish";
import Layout from "../../../src/components/layouts/Layout";
import CreateMenuItem from "../../../src/components/modals/CreateMenuItem";
import EditMenuItem from "../../../src/components/modals/EditMenuItem";
import orders from "../../../src/data/dashboard/orders.json";
import LoadingSpinner from "../../../src/components/loading/LoadingSpinner";

const Page = () => {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dishes, setDishes] = useState<any>([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [id, setId] = useState<String | null>("");
  const [searchName, setSearchName] = useState<String | null>("");
  const [searchStartPrice, setSearchStartPrice] = useState<String | any | null>(
    null
  );
  const [searchEndPrice, setSearchEndPrice] = useState<String | any | null>(
    null
  );

  const query = useQuery({
    queryKey: ["get-dishes"],
    queryFn: () => axios.get(`/api/menu`),
    onSuccess: (data) => {
      setDishes(data.data);
    },
  });

  const handleChangeName = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchName(event.target.value);
  };

  const onEdit = (id: string) => {
    setShowEditModal(true);
    setId(id);
  };

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Menu</p>
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
            <Button
              className="button2"
              onClick={() => setShowCreateModal(true)}
            >
              New Item
            </Button>
          </div>

          {/* Filter form */}
          {showFilters && (
            <div className="mt-5">
              <form>
                {/* Price filter */}
                <div className="w-full flex flex-row">
                  <div className="w-full h-9 flex flex-row items-center border-gray rounded-md px-2">
                    <p className="h-full font-normal text-sm text-black flex flex-row items-center pr-2 border-r-gray">
                      From
                    </p>
                    <input
                      type="number"
                      placeholder="&#x20A6;900"
                      value={searchStartPrice}
                      onChange={(e) => setSearchStartPrice(e.target.value)}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <CgNametag color="#cccccc" size={25} />
                  </div>

                  <div className="w-full h-9 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                    <p className="h-full font-normal text-sm text-black flex flex-row items-center pr-2 border-r-gray">
                      To
                    </p>
                    <input
                      type="number"
                      placeholder="&#x20A6;3000"
                      value={searchEndPrice}
                      onChange={(e) => setSearchEndPrice(e.target.value)}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <CgNametag color="#cccccc" size={25} />
                  </div>

                  <div className="w-full h-9 flex flex-row items-center border-gray rounded-md px-2 ml-4">
                    <p className="h-full font-normal text-sm text-black flex flex-row items-center pr-2 border-r-gray">
                      Name
                    </p>
                    <input
                      type="text"
                      placeholder=""
                      value={searchName as string}
                      onChange={handleChangeName}
                      className="w-full px-2"
                      id="plan-type-input"
                    />
                    <CgNametag color="#cccccc" size={25} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-6 pt-10 pb-20">
          <div className="w-full">
            {dishes?.length > 0 ? (
              <div className="w-full border-gray rounded-md">
                <div className="bg-gray w-full flex flex-row items-center px-3 py-4">
                  <p className="w-2/3 text-dark-gray text-left font-medium text-sm">
                    MENU ITEM
                  </p>
                  <p className="w-2/3 text-dark-gray font-medium text-sm">
                    PRICE
                  </p>
                  <p className="w-1/3 text-dark-gray font-medium text-sm">
                    ACTION
                  </p>
                </div>

                {dishes.map((dish) => (
                  <Dish
                    key={dish.id}
                    id={dish.id}
                    name={dish.name}
                    price={dish.price}
                    onEdit={() => onEdit(dish.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center ">
                {/* No dishes */}
                <div className="w-8/12 flex flex-col items-center px-10 pt-10 pb-20 rounded-md overview-card">
                  <Image
                    src="/images/empty-dishes.png"
                    alt=""
                    width={170}
                    height={170}
                    className="mb-5"
                  />
                  <p className="text-black font-semibold text-xl mb-5">
                    You have nothing on your menu
                  </p>
                  <p className="text-black font-normal text-sm">
                    New dishes you add will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showCreateModal && (
        <CreateMenuItem onClose={() => setShowCreateModal(false)} />
      )}
      {showEditModal && (
        <EditMenuItem id={id as string} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
};

const RestaurantMenu = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default RestaurantMenu;
