import Image from "next/image";
import React from "react";

type Props = {
  value: number;
  label: string;
  onClose: (value: number) => void;
};

const Badge = ({ value, label, onClose }: Props) => {
  return (
    <div className="flex flex-row gap-2 align-middle items-center bg-[#E0EBFF] max-w-fit px-4 py-3 rounded-md">
      <p>{label}</p>
      <Image
        unoptimized={true}
        width={10}
        height={10}
        src="/images/Cancel.svg"
        alt=""
        className="absolute w-6 h-6 top-5 left-4"
        onClick={() => onClose(value)}
      />
    </div>
  );
};

export default Badge;
