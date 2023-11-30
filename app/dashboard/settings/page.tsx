"use client";

import { MdEdit } from "react-icons/md";
import Layout from "../../../src/components/dashboard/Layout";
import { useState } from "react";
import EditCompanyInformation from "../../../src/components/settings/EditCompanyInformation";
import EditAddressInformation from "../../../src/components/settings/EditAddressInformation";

const Page = () => {
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  return (
    <>
      <section>
        <div className="flex flex-row justify-between px-6 py-6 border-b border-\[\#A9A6DC\]\/80 ">
          <p className="pt-0 font-normal text-2xl lg:text-2xl">Settings</p>
        </div>
        <div className="py-10">
          <div className="flex flex-row px-6 mb-10">
            {/* Account Details */}
            <div className="w-full h-60 flex flex-col rounded-md border border-\[\#A9A6DC\]\/80">
              <div className="flex flex-row justify-between px-4 py-3 border-b border-\[\#A9A6DC\]\/80 ">
                <p className="text-black text-lg font-normal">
                  ACCOUNT DETAILS
                </p>
              </div>
              <div className="flex flex-col flex-1 h-fit justify-between px-4 py-4">
                <div>
                  <p className="text-black text-lg font-normal">
                    Lamelo Restaurant
                  </p>
                  <p className="text-gray-500 text-sm font-normal mb-1nn2">
                    qdubsmusk@gmail.com
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm font-normal flex flex-row items-center">
                    Abuja, Nigeria <span className="text-2xl mx-1">&#183;</span>{" "}
                    +2349034107411
                  </p>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="w-full h-60 flex flex-col rounded-md border border-\[\#A9A6DC\]\/80 ml-8">
              <div className="flex flex-row justify-between px-4 py-3 border-b border-\[\#A9A6DC\]\/80 ">
                <p className="text-black text-lg font-normal">
                  COMPANY INFORMATION
                </p>
                <button onClick={() => setShowCompanyModal(true)}>
                  <MdEdit color="#fa8128" size={30} />
                </button>
              </div>
              <div className="flex flex-row flex-1 justify-between h-fit px-4 py-4">
                <div className="flex flex-col flex-1 justify-between h-full">
                  <div>
                    <p className="text-black text-md font-normal">Name:</p>
                    <p className="text-gray-500 text-sm font-normal mb-4">
                      Lamelo Restaurant
                    </p>
                  </div>

                  <div>
                    <p className="text-black text-md font-normal">Address:</p>
                    <p className="text-gray-500 text-sm font-normal">
                      12 Asba & Dantata Street, Lifecamp, Abuja, F.C.T
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row">
                      <p className="text-md mr-1">&#11088;</p>
                      <p className="text-md mr-1">&#11088;</p>
                      <p className="text-md mr-1">&#11088;</p>
                      <p className="text-md mr-1">&#11088;</p>
                      <p className="text-md mr-1">&#11088;</p>
                    </div>
                    <span className="text-gray-500 text-2xl mx-1">&#183;</span>
                    <p className="text-gray-500 text-sm font-normal">
                      Rating 5.0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information & Subscription Management */}
          <div className="flex flex-row px-6">
            {/* Address Information */}
            <div className="w-full h-60 flex flex-col rounded-md border border-\[\#A9A6DC\]\/80 mb-6">
              <div className="flex flex-row justify-between px-4 py-3 border-b border-\[\#A9A6DC\]\/80 ">
                <p className="text-black text-lg font-normal">
                  ADDRESS INFORMATION
                </p>
                <button onClick={() => setShowAddressModal(true)}>
                  <MdEdit color="#fa8128" size={30} />
                </button>
              </div>

              <div className="flex flex-row flex-1 justify-between h-fit px-4 py-4">
                <div className="flex flex-col justify-between w-full h-full">
                  <div>
                    <p className="text-black text-md font-normal">Street:</p>
                    <p className="text-gray-500 text-sm font-normal">
                      12 Asba & Dantata Street, Lifecamp
                    </p>
                  </div>

                  <div>
                    <p className="text-black text-md font-normal">Postal:</p>
                    <p className="text-gray-500 text-sm font-normal">300289</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between w-full h-full">
                  <div>
                    <p className="text-black text-md font-normal">City:</p>
                    <p className="text-gray-500 text-sm font-normal mb-2">
                      Abuja
                    </p>
                  </div>

                  <div>
                    <p className="text-black text-md font-normal">State:</p>
                    <p className="text-gray-500 text-sm font-normal mb-2">
                      Federal Capital Territory
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Management */}
            <div className="w-full h-60 flex flex-col rounded-md border border-\[\#A9A6DC\]\/80 mb-6 ml-8">
              <div className="flex flex-row justify-between px-4 py-3 border-b border-\[\#A9A6DC\]\/80 ">
                <p className="text-black text-lg font-normal">
                  MANAGE SUBSCRIPTIONS
                </p>
              </div>
              <div className="flex flex-col flex-1 justify-between">
                <p className="text-black text-md font-normal px-4 pt-4 mb-0">
                  You are currently not subscribed to any package.
                </p>

                <p className="bg-gray-100 text-orange text-md font-normal p-4 cursor-pointer">
                  EDIT SUBSCRIPTION PREFERENCES
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showCompanyModal && (
        <EditCompanyInformation onClose={() => setShowCompanyModal(false)} />
      )}
      {showAddressModal && (
        <EditAddressInformation onClose={() => setShowAddressModal(false)} />
      )}
    </>
  );
};

const Settings = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Settings;
