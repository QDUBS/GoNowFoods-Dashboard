"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiDotsHorizontalRounded, BiSolidFoodMenu } from "react-icons/bi";
import { BsChatFill } from "react-icons/bs";
import { FaBagShopping, FaCircleUser } from "react-icons/fa6";
import { FiHelpCircle, FiSettings } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoMail } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdWorkHistory } from "react-icons/md";
import AppRoutes from "../../../src/constants/app_routes";
import NavItem from "./NavItem";
import Link from "next/link";

const SideNav = () => {
  const { data } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState();
  const [active, setActive] = useState("orders");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logout = () => {
    signOut({
      callbackUrl: `${process.env.NEXT_PUBLIC_AUTH_URL}/login`,
    });
  };

  useEffect(() => {
    setUser(data?.user?.user?.user);
  }, [data?.user, user]);

  return (
    <>
      <section className="bg-black fixed bottom-0 w-full py-7 left-0 md:fixed md:bottom-0 lg:sticky lg:left-0 lg:top-0 lg:w-1/5 lg:h-screen font-thin">
        <div className="relative">
          <div className="w-full flex flex-col items-center">
            {user?.profile_data?.photo ? (
              <div className="w-16 h-16 bg-white rounded-full mb-3">
                <FaCircleUser color="#3fc060" size={64} />
              </div>
            ) : (
              <div className="w-16 h-16 bg-white rounded-full mb-3">
                <FaCircleUser color="#3fc060" size={64} />
              </div>
            )}
            <p className="text-white text-md text-center font-normal">
              {user?.email}
            </p>
          </div>

          <div className="mt-12">
            <NavItem
              icon={
                <FaBagShopping
                  color={pathname?.includes("orders") ? "#3fc060" : "#94a3b8"}
                  size={22}
                />
              }
              title={
                <p
                  className={
                    pathname?.includes("orders")
                      ? "text-white font-semibold text-sm ml-5"
                      : "text-slate-400 font-semibold text-sm ml-5"
                  }
                >
                  Orders
                </p>
              }
              route={AppRoutes.Orders}
            />
            <NavItem
              icon={
                <BiSolidFoodMenu
                  color={pathname?.includes("menu") ? "#3fc060" : "#94a3b8"}
                  size={22}
                />
              }
              title={
                <p
                  className={
                    pathname?.includes("menu")
                      ? "text-white font-semibold text-sm ml-5"
                      : "text-slate-400 font-semibold text-sm ml-5"
                  }
                >
                  Menu
                </p>
              }
              route={AppRoutes.Menu}
            />
            <NavItem
              icon={
                <MdWorkHistory
                  color={
                    pathname?.includes("order-history") ? "#3fc060" : "#94a3b8"
                  }
                  size={22}
                />
              }
              title={
                <p
                  className={
                    pathname?.includes("order-history")
                      ? "text-white font-semibold text-sm ml-5"
                      : "text-slate-400 font-semibold text-sm ml-5"
                  }
                >
                  Order History
                </p>
              }
              route={AppRoutes.OrderHistory}
            />
            <NavItem
              icon={
                <IoMail
                  color={pathname?.includes("inbox") ? "#3fc060" : "#94a3b8"}
                  size={22}
                />
              }
              title={
                <p
                  className={
                    pathname?.includes("inbox")
                      ? "text-white font-semibold text-sm ml-5"
                      : "text-slate-400 font-semibold text-sm ml-5"
                  }
                >
                  Inbox
                </p>
              }
              route={AppRoutes.Inbox}
            />
            <NavItem
              icon={
                <BsChatFill
                  color={pathname?.includes("support") ? "#3fc060" : "#94a3b8"}
                  size={22}
                />
              }
              title={
                <p
                  className={
                    pathname?.includes("support")
                      ? "text-white font-semibold text-sm ml-5"
                      : "text-slate-400 font-semibold text-sm ml-5"
                  }
                >
                  Support
                </p>
              }
              route={AppRoutes.Support}
            />
          </div>
        </div>

        <div className="w-full p-2 absolute bottom-0">
          {showLogoutModal && (
            <div className="bg-dark-gray w-full rounded-md mb-2">
              <Link
                className="flex flex-row items-center px-2 py-5 hover-logout-modal"
                href={`${AppRoutes.Settings}`}
              >
                <FiSettings color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Settings</p>
              </Link>

              <div className="flex flex-row items-center px-2 py-5 hover-logout-modal">
                <FiHelpCircle color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Help</p>
              </div>

              <div
                className="flex flex-row items-center px-2 py-5 hover-logout-modal border-t-dark-gray"
                onClick={logout}
              >
                <LuLogOut color="#ffffff" size={18} className="dot" />
                <p className="text-white text-sm font-medium ml-4">Log out</p>
              </div>
            </div>
          )}

          <div
            className={
              showLogoutModal
                ? "bg-very-dark-gray w-full h-24 px-2 flex flex-row items-center justify-between py-4 rounded-md relative cursor-pointer"
                : "w-full h-24 px-2 flex flex-row items-center justify-between py-4 relative cursor-pointer"
            }
            onClick={() => setShowLogoutModal(!showLogoutModal)}
          >
            <h2 className="flex flex-row app-name">
              <p className="text-white text-2xl font-bold">GoNow</p>
              <GoDotFill color="#ffffff" size={22} className="dot" />
            </h2>
            <BiDotsHorizontalRounded color="#fff" size={22} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SideNav;
