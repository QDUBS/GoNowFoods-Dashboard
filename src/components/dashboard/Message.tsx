import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

interface InboxMessageProps {
  time: string;
  title: string;
  message: string;
  recent: boolean;
}

const InboxMessage = ({ time, title, message, recent }: InboxMessageProps) => {
  return (
    <>
      {recent ? (
        <div className="w-full px-8 py-5 rounded-md border border-\[\#A9A6DC\]\/80 mb-6">
          <div className="flex flex-row items-center mb-4">
            <p className="text-inactive/80 text-sm font-normal">{time}</p>
            <GoDotFill color="#FFA500" size={15} />
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-2">{title}</p>
            <p className="text-black text-md font-normal">{message}</p>
          </div>
        </div>
      ) : (
        <div className="w-full px-8 py-5 rounded-md border border-\[\#A9A6DC\]\/80 mb-6">
          <div className="flex flex-row items-center mb-4">
            <p className="text-inactive/80 text-sm font-normal">{time}</p>
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-2">{title}</p>
            <p className="text-black text-md font-normal">{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default InboxMessage;
