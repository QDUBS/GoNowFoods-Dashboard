import { JobApplicationStage } from "@prisma/client";
import React from "react";

type Props = {
  stage: JobApplicationStage ;
  active: boolean;
  title: string;
  handleClick: (sequence: string) => void;
};

const BadgeFilter = ({ stage, active, handleClick, title }: Props) => {
  return (
    <>
      <button
        className={`px-3 py-2 rounded-md mr-2 w-[120px] ${
          active ? `bg-[#E1EBFF] text-bluemedium` : `text-inactive/80`
        }`}
        onClick={(evt) => {
          //evt.preventDefault();
          handleClick(stage);
        }}
      >
        {title}
      </button>
    </>
  );
};

export default BadgeFilter;
