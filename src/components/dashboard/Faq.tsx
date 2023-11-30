import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface FaqProps {
  description: string;
  title: string;
  clicked: string;
  onClick: () => void;
  index: number | undefined;
  lastIndex: number | null;
}

const Faq = ({
  description,
  title,
  clicked,
  onClick,
  index,
  lastIndex,
}: FaqProps) => {
  return (
    <div>
      <div className="py-4" id="faq-container">
        <div className="flex items-center justify-between">
          <p className="font-medium font-normal">{title}</p>

          {clicked == description ? (
            <p onClick={onClick}>
              <BiChevronUp color="#000" size={25} />
            </p>
          ) : (
            <p onClick={onClick}>
              <BiChevronDown color="#000" size={25} />
            </p>
          )}
        </div>

        <p
          className={`${
            clicked == description ? "relative" : "hidden"
          } text-black mt-4 w-full lg:w-4/5`}
        >
          {description}
        </p>
      </div>

      {index !== lastIndex && (
        <div className="w-full h-[1px] bg-gray-300"></div>
      )}
    </div>
  );
};

export default Faq;
