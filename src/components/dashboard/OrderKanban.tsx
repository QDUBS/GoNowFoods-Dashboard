import Image from "next/image";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { OrderStages } from "../../data/order_stages";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../loading/LoadingSpinner";
import { OrderStatuses } from "../../constants/order_statuses";

interface Props {
  order: any;
  refetch: () => void;
}

const OrderKanban = ({ order, refetch }: Props) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (orderData: any) => axios.put(`/api/order`, orderData),
    onSuccess: async (data: any) => {
      refetch();
      toast.success("Order status was updated successfully.");
    },
  });

  const getOrderStage = (status: string) => {
    if (status == "1") {
      return OrderStatuses.NEW;
    }
    if (status == "2") {
      return OrderStatuses.IN_PREPARATION;
    }
    if (status == "3") {
      return OrderStatuses.READY_FOR_PICKUP;
    }
    if (status == "4") {
      return OrderStatuses.ACCEPTED;
    }
    if (status == "5") {
      return OrderStatuses.PICKED_UP;
    }
    if (status == "6") {
      return OrderStatuses.COMPLETED;
    }
    if (status == "7") {
      return OrderStatuses.CANCELLED;
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId !== source.droppableId ||
      destination.index !== source.index
    ) {
      const newStatus = destination.droppableId.toUpperCase();
      console.log(
        `Change order status to: ${newStatus} ${getOrderStage(newStatus)}`
      );
      updateOrder(getOrderStage(newStatus));
    }
  };

  const updateOrder = async (status: string) => {
    const formData = new FormData();

    let orderData: any = {
      id: order?.id,
      user_id: order?.user_id,
      courier_id: order?.courier_id,
      restaurant_id: order?.restaurant_id,
      total: order?.total,
      status: status,
    };
    formData.append("data", JSON.stringify(orderData));
    mutate(formData as any);
  };

  const formatAddress = (address) => {
    const formatted_address = `${address.house_no} ${address.street1}, ${address.city}, ${address.state},  ${address.country}`;
    return formatted_address;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="">
      <div className="w-full bg-gray-100 pl-2 pt-2 flex justify-center">
        {OrderStages.map((stage, index) => (
          <div
            key={index}
            className="w-full bg-white px-2 py-2 mr-2 kanban-card"
          >
            <p className="text-sm font-medium text-gray-500">
              {stage.name.toUpperCase()}
            </p>
          </div>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="order-stages" direction="horizontal">
          {(provided) => (
            <div
              className="w-full bg-gray-100 pl-2 py-2 flex justify-center overflow-x-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {OrderStages.map((stage, index) => (
                <Droppable
                  key={stage.id}
                  droppableId={stage.id}
                  direction="vertical"
                >
                  {(provided) => (
                    <div
                      className={`w-full h-42 px-2 py-2 mr-2  ${
                        order?.status !== stage.key
                          ? "bg-gray-100"
                          : "bg-white kanban-card"
                      }`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {order?.status === stage.key && (
                        <Draggable
                          key={order?.id}
                          draggableId={order?.id}
                          index={0}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="flex flex-row justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-400">
                                    {order?.code}
                                  </p>
                                  <p className="text-md font-normal text-black">{`${
                                    order?.user?.profile_data?.first_name
                                      ?.charAt(0)
                                      .toUpperCase() +
                                    order?.user?.profile_data?.first_name?.slice(
                                      1
                                    )
                                  } ${
                                    order?.user?.profile_data?.last_name
                                      ?.charAt(0)
                                      .toUpperCase() +
                                    order?.user?.profile_data?.last_name?.slice(
                                      1
                                    )
                                  }`}</p>
                                </div>
                                <Image
                                  src={require("../../../public/images/category-advert-5.jpg")}
                                  alt=""
                                  width={50}
                                  height={50}
                                  className="kanban-image"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-normal text-gray-400">
                                  {formatAddress(order?.user?.address_data)}
                                </p>
                              </div>
                              <div className="mt-10 border-t-1 py-2">
                                <p className="text-sm font-normal text-gray-400">
                                  {formatAddress(
                                    order?.restaurant?.user?.address_data
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )}
                    </div>
                  )}
                </Droppable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default OrderKanban;
