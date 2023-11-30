import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinnerMembershipCreation = () => {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner-icon" />
      <p className="text-black text-xl font-medium mt-8">
        Verifying your details. You will be logged out.
      </p>
      <p className="text-black text-md font-medium mt-8">
        Please log back in.
      </p>
    </div>
  );
};

export default LoadingSpinnerMembershipCreation;
