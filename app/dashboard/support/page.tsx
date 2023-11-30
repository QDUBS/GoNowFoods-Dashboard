"use client";

import Link from "next/link";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Faq from "../../../src/components/dashboard/Faq";
import Layout from "../../../src/components/dashboard/Layout";
import AppRoutes from "../../../src/constants/app_routes";
import { faqs } from "../../../src/data/faq";

const Page = () => {
  const [clicked, setClicked] = useState("");

  return (
    <>
      <section>
        <div className="h-fit bg-blue-400 px-40 pt-20 pb-20 flex flex-col items-center">
          <p className="text-white text-4xl text-center font-semibold mb-10">
            Welcome! How can we help?
          </p>
          <div className="w-2/3 bg-white flex flex-row items-center px-2 mb-3 mt-3 border-gray-500 rounded-md">
            <BiSearchAlt2 color="#666666" size={25} />
            <input
              type="text"
              placeholder="Search"
              className="w-full px-2 py-3 text-dark-grey"
              id="plan-type-input"
            />
          </div>
          <p className="text-gray-200 text-md text-center font-normal">
            Find quick answers by looking through popular articles
          </p>
          <p className="text-gray-200 text-md text-center font-normal">
            Or contact us directly{" "}
            <Link href={AppRoutes.ContactForm} className="underline">
              here
            </Link>
          </p>
        </div>

        {/* Lower part */}
        <div className="px-40 mt-10 mb-20">
          <div>
            <p className="text-purplestrong text-2xl font-normal mb-5">
              Popular Articles
            </p>

            <div className="flex flex-col w-full p-8 rounded-md overview-card">
              {faqs.map((faq) => (
                <Faq
                  description={faq.description}
                  title={faq.title}
                  clicked={clicked}
                  onClick={() => setClicked(faq.description)}
                  index={faqs.indexOf(faq)}
                  lastIndex={faqs.length - 1}
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-200 mt-20 pt-10 pb-10 flex flex-col items-center rounded-md">
            <p className="text-purplestrong text-2xl font-normal text-center mb-10">
              Can't find what you need? Send us a help request.
            </p>
            <Link href={AppRoutes.ContactForm}>
              <button className="contact-button mb-10">Contact Us</button>
            </Link>
            <p className="text-dark-grey text-md font-normal">
              Or tweet us{" "}
              <Link href={""} className="text-blue-normal text-md font-normal">
                @expensify
              </Link>{" "}
              for quick questions
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

const Support = () => {
  return (
    <Layout>
      <Page />
    </Layout>
  );
};

export default Support;
