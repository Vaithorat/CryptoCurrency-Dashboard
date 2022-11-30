import { React, useState } from "react";
import { CryptoState } from "../APIs/CryptoContext";

export default function Navbar() {
  const handleChange = (e) => {
    setCurrency(e.target.value);
  };
  // console.log("currencyNav",currency)
  const { currency,setCurrency } = CryptoState();
  return (
    <>
      <div className="flex justify-between pb-4 pt-5">
        <div className="flex items-center ml-8">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            onChange={handleChange}
            value={currency}
            className="bg-white w-24 h-10  text-sm font-semibold rounded-md mr-2 transform transition-transform hover:scale-105"
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <form>
          <label
            htmlFor="default-search"
            className=" mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300 "
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="p-4 pl-10 w-full h-10 text-sm  text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by Coin"
              required=""
            />
            <button
              type="submit"
              className="text-white h-8 absolute right-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
