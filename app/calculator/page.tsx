'use client'
import React, { useState } from "react";

import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { calculatePremium } from "../../utils/premium";
import { States } from "../../utils/states";
import { formatNaira } from "../../utils/textHelper";

const CalculationCompleteModal: React.FC<{
  formData: any;
  onClose: () => void;
}> = ({ formData, onClose }) => {
  const handlepayment = () => {
    // Show alert for payment (payment feature coming soon)
    alert("Payment feature coming soon! You can contact us for more details.");
  };

  const premiumAmount = calculatePremium(
    formData.propertyValue,
    formData.insuranceDuration,
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className=" bg-white rounded-2xl shadow-xl px-10 py-10 w-[90%] max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}

        <div className="flex flex-col gap-1">
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          {/* Header */}
          <h2 className="text-xl font-semibold text-center mb-2">
            Calculation Complete!
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Your property premium has been calculated. <br />
            The total amount is{" "}
            <span className="text-primary">
              {" "}
              {formatNaira(premiumAmount)}
            </span>{" "}
            <br /> You can also find the premium quote in your email
          </p>
        </div>

        <div className="my-2 flex flex-col">
          {" "}
          <div className="text-center mb-4 text-gray-700">
            {/* For further and personalized assistance */}
            Secure your property
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handlepayment}
              className="flex-1 uppercase bg-red-700 text-white py-2 rounded-lg font-semibold hover:bg-red-800"
            >
              pay now
            </button>
          </div>
          <div className="mt-6 my-2 flex flex-col gap-2 justify-center items-center">
            <p
              className=" font-medium text-base leading-[24px]
    text-[#6C6667]"
            >
              Need to discuss your coverage first?
            </p>
            <button
              onClick={() =>
                window.open(`https://wa.me/234XXXXXXXXXX`, "_blank")
              }
              className=" w-full  text- py-2 rounded-lg font-semibold text-[#6C6667] border-2 border-gray-200 cursor-pointer"
            >
              Chat with an advisor on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    propertyType: "detached duplex",
    propertyValue: "",
    propertyUsage: "residential",
    numberOfRooms: "",
    insuranceDuration: "12 months",
    coverageType: "fire coverage",
    fireControlEquipment: "",
    street: "",
    estateName: "",
    state: "",
    lga: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "state") {
      setSelectedState(value);
      setFormData((prev: any) => ({
        ...prev,
        state: value,
      }));
    }
    if (id === "lga") {
      setFormData((prev: any) => ({
        ...prev,
        lga: value,
      }));
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCalculatePremium = () => {
    // Show the modal with calculated premium (without backend)
    setIsModalOpen(true);
  };

  const articles = [
    {
      title: "Insurance Basics",
      desc: "Your introduction to property insurance essentials. Learn about coverage types, policy terms, and premium calculations.",
      image: "/images/article1.png",
    },
    {
      title: "Regulations and Rules",
      desc: "Understand NAICOM guidelines, insurance laws, and your rights as a policyholder in Nigeria. Essential knowledge for you.",
      image: "/images/article2.png",
    },
    {
      title: "Claims Guide",
      desc: "Master the claims process from start to finish. Learn what documentation you need, how to file correctly, and handle claim resolution.",
      image: "/images/article3.png",
    },
  ];

  const [selectedState, setSelectedState] = useState<string>("");

  return (
    <>
      <div
        className="relative h-[40vh] bg-cover bg-center flex items-center justify-center bg- bg-blend-overlay"
        style={{
          backgroundImage: `url(/images/calculator.jpg)`,
          backgroundColor: "rgba(130, 3, 8, 0.4)",
        }}
      >
        <div className="flex flex-col justify-center items-center text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Home Insurance Premium Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Get an instant Quote to insure your home
          </p>
          {/* <div className="relative max-w-md mx-auto">
            <button className="bg-primary text-white px-4 py-3 flex gap-2 items-center rounded-md inset-1">
              {" "}
              <img src={phone} alt="" className="" /> Text on Whatsapp
            </button>
          </div> */}
        </div>
      </div>

      {/*  */}

      <div className="bg-white rounded-xl max-w-3xl mx-auto my-6 px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            You will be surprised by how little it costs you to insure your home
          </h1>
          <p className="text-gray-600">
            Put in your property details below to get your quote
          </p>
        </div>

        <form
          // onSubmit={handleSubmit(onSubmit)}
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = [
              "customerName",
              "customerEmail",
              "customerPhone",
              "propertyType",
              "propertyValue",
              "propertyUsage",
              "numberOfRooms",
              "fireControlEquipment",
              "street",
              "state",
              "lga",
              "city",
            ];

            const missingField = requiredFields.find(
              (field) => !formData[field],
            );

            if (missingField) {
              alert(
                `Please fill the ${missingField.replace(/([A-Z])/g, " $1")} field`,
              );
              return;
            }

            handleCalculatePremium();
          }}
          className="space-y-8"
        >
          {/* Contact Information Section */}
          <div>
            <div className="py-2">
              <h2 className="leading-[28px] text-[#111827] text-xl font-semibold py-2">
                Customer Information
              </h2>
              <hr className="" />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor="fullName"
                  className="font-medium text-sm leading-[20px] text-[#374151]"
                >
                  Full Name
                </label>
                <input
                  id="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="email"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Email Address
                  </label>
                  <input
                    id="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Enter email address"
                    className="w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="phone"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Phone Number
                  </label>
                  <input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="Enter phone number"
                    className=" remove-arrows w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="py-2 mb-2">
                <h2 className="leading-[28px] text-[#111827] text-xl font-semibold py-2">
                  Customer Property Information
                </h2>
                <hr className="" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative w-full">
                <select
                  onChange={handleInputChange}
                  value={formData.propertyType}
                  id="propertyType"
                  className="appearance-none w-full p-4 pr-10 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none"
                >
                  <option value="detached duplex">Detached Duplex</option>
                  <option value="deatched bungalow">Detached Bungalow</option>
                  <option value="semi detached bungalow">
                    Semi Detached Bungalow
                  </option>
                  <option value="semi detached duplex">
                    Semi Detached Duplex
                  </option>
                  <option value="terrace duplex">Terrace Duplex</option>
                  <option value="terrace bungalow">Terrace Bungalow</option>
                  <option value="apartment">Apartment</option>
                  <option value="maisonette">Maisonette</option>
                  <option value="retail shop">Retail Shop</option>
                </select>

                <div className="pointer-events-none absolute bottom-[1rem] right-3 flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 14a1 1 0 01-.7-.29l-4-4a1 1 0 011.4-1.42L10 11.58l3.3-3.3a1 1 0 111.4 1.42l-4 4A1 1 0 0110 14z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="propertyValue"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Property Value (₦)
                  </label>
                  <input
                    id="propertyValue"
                    onChange={handleInputChange}
                    type="number"
                    value={formData.propertyValue}
                    placeholder="₦40,000,000"
                    className="w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full relative">
                  <label
                    htmlFor="propertyUsage"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Property usage
                  </label>

                  <select
                    id="propertyUsage"
                    value={formData.propertyUsage}
                    onChange={handleInputChange}
                    className="appearance-none w-full px-4 py-3 pr-10 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>

                  <div className="pointer-events-none absolute bottom-[1rem] right-3 flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 14a1 1 0 01-.7-.29l-4-4a1 1 0 011.4-1.42L10 11.58l3.3-3.3a1 1 0 111.4 1.42l-4 4A1 1 0 0110 14z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="numberOfRooms"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Number of Rooms
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.numberOfRooms}
                    type="number"
                    min="1"
                    max="100"
                    id="numberOfRooms"
                    placeholder="5"
                    className="w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="insuranceDuration"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Insurance duration
                  </label>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="insuranceDuration"
                    value="12 months"
                    readOnly
                    className="w-full p-3 rounded-md border-2 text-[#6B7280] bg-[#F9FAFB] border-gray-100 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="coverageType"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Coverage Type
                  </label>

                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="coverageType"
                    value="fire coverage"
                    readOnly
                    className="w-full p-3 rounded-md border-2 text-[#6B7280] bg-[#F9FAFB] border-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm leading-[20px] text-[#374151]">
                    Availability of fire control equipment
                  </label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <input
                        onChange={handleInputChange}
                        type="radio"
                        name="fireControl"
                        id="fireControlYes"
                        value="yes"
                        checked={formData.fireControlEquipment === "yes"}
                        onClick={() =>
                          setFormData((prev: any) => ({
                            ...prev,
                            fireControlEquipment: "yes",
                          }))
                        }
                        className="peer"
                      />
                      <label
                        htmlFor="fireControlYes"
                        className="font-medium text-sm leading-[20px] text-[#374151]"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        onChange={handleInputChange}
                        type="radio"
                        name="fireControl"
                        id="fireControlNo"
                        value="no"
                        checked={formData.fireControlEquipment === "no"}
                        onClick={() =>
                          setFormData((prev: any) => ({
                            ...prev,
                            fireControlEquipment: "no",
                          }))
                        }
                        className="peer"
                      />
                      <label
                        htmlFor="fireControlNo"
                        className="font-medium text-sm leading-[20px] text-[#374151]"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Location Section */}
          <div>
            <div>
              <div className="py-2">
                <h2 className="leading-[28px] text-[#111827] text-xl font-semibold py-2">
                  Property Location
                </h2>
                <hr className="" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="street"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Street{" "}
                    <span className="text-sm text-gray-500">
                      (Include house number)
                    </span>
                  </label>
                  <input
                    id="street"
                    onChange={handleInputChange}
                    value={formData.street}
                    placeholder="Enter street name"
                    className="w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="estateName"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Estate name{" "}
                    <span className="text-sm text-gray-500">(optional)</span>
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.estateName}
                    type="text"
                    id="estateName"
                    placeholder="Enter estate name"
                    className="w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 w-full relative">
                  <label
                    htmlFor="propertyUsage"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    State
                  </label>

                  <select
                    id="state"
                    value={formData.state || ""}
                    onChange={handleInputChange}
                    className="appearance-none w-full px-4 py-3 pr-10 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none"
                  >
                    <option value="">Select State</option>

                    {Array.from(States.keys()).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  {/* Custom Chevron Icon */}
                  <div className="pointer-events-none absolute bottom-[0.7rem] right-3 flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 14a1 1 0 01-.7-.29l-4-4a1 1 0 011.4-1.42L10 11.58l3.3-3.3a1 1 0 111.4 1.42l-4 4A1 1 0 0110 14z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full relative">
                  <label
                    htmlFor="propertyUsage"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    LGA
                  </label>

                  <select
                    id="lga"
                    value={formData.lga || ""}
                    onChange={handleInputChange}
                    className="appearance-none w-full px-4 py-3 pr-10 rounded-md border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none"
                    disabled={!selectedState}
                  >
                    <option value="">Select LGA</option>
                    {(States.get(selectedState) || []).map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>

                  {/* Custom Chevron Icon */}
                  <div className="pointer-events-none absolute bottom-[0.7rem] right-3 flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 14a1 1 0 01-.7-.29l-4-4a1 1 0 011.4-1.42L10 11.58l3.3-3.3a1 1 0 111.4 1.42l-4 4A1 1 0 0110 14z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="city"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    City
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.city}
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    className="w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="postalCode"
                    className="font-medium text-sm leading-[20px] text-[#374151]"
                  >
                    Postal code{" "}
                    <span className="text-sm text-gray-500">(optional)</span>
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={formData.postalCode}
                    type="text"
                    id="postalCode"
                    placeholder="Enter code"
                    className="w-full p-3 rounded-md border-2 bg-white border-gray-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 text-white py-4 rounded-xl"
          >
            Calculate Premium
          </button>
        </form>
      </div>

      {/* WHY SHOULD I INSURE */}
      <div className="px-6 lg:px-24 py-12 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold lg:text-[48px] text-[22px] leading-[70px]">
            Why should I <span className="text-red-600">insure my Home?</span>
          </h2>
          <a
            href="/resources"
            className="lg:flex hidden bg-primary text-white px-5 py-2 rounded-md"
            aria-label="Learn more about how it works"
          >
            Explore More
          </a>
        </div>
        <p className="text-gray1 leading-[26px] text-base lg:w-[55%]">
          Your Home is one of the most significant investment you’ll ever make.
          Home insurance ensures that no matter what life throws at you, you
          won’t lose everything you’ve worked so hard to build.
        </p>

        <div className="grid md:grid-cols-3 gap-4  ">
          {articles.map((a, i) => (
            <div
              key={i}
              className=" rounded-xl overflow-hidden border border-gray1/10 "
            >
              {/* lg:w-[397px] */}
              <img
                src={a.image}
                alt={a.title}
                className="w-full  object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-[20px] leading-[29px] mb-2">
                  {a.title}
                </h3>
                <p className="text-[18px] leading-[26px] text-gray1">
                  {a.desc}
                </p>
                <Link
                  href="/"
                  className="w-fit py-2 flex gap-2 items-center text-primary"
                >
                  <Image
                    src="/images/arrow-right.svg"
                    alt="Arrow Right"
                    width={16}
                    height={16}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <CalculationCompleteModal
          formData={formData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Calculator;
