import { OrderStatuses } from "../constants/order_statuses";

export const OrderStages = [
  {
    id: "1",
    name: "New",
    key: OrderStatuses.NEW,
  },
  {
    id: "2",
    name: "In Preparation",
    key: OrderStatuses.IN_PREPARATION,
  },
  {
    id: "3",
    name: "Ready For Pickup",
    key: OrderStatuses.READY_FOR_PICKUP,
  },
  // {
  //   id: "4",
  //   name: "Accepted",
  //   key: OrderStatuses.ACCEPTED,
  // },
  // {
  //   id: "5",
  //   name: "Picked Up",
  //   key: OrderStatuses.PICKED_UP,
  // },
  // {
  //   id: "6",
  //   name: "Completed",
  //   key: OrderStatuses.COMPLETED,
  // },
  // {
  //   id: "7",
  //   name: "Cancelled",
  //   key: OrderStatuses.CANCELLED,
  // },
];
