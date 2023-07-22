import React from "react";
import { RiSettings3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Userdropdown from "./Userdropdown";
import { useState } from "react";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const searchSubmit = (e) => {
    e.preventDefault();

    if (searchText.length > 0) {
      alert(`Searching ${searchText}`);
      setSearchText("");
    }
  };
  return (
    <div className="flex bg-white w-full h-full items-center justify-around ">
      <span className="font-bold text-[24px] w-1/5  px-24">Aghosh</span>

      <div className="w-3/5  px-24">
        <form
          className="flex items-center w-3/5"
          onSubmit={(e) => searchSubmit(e)}
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full outline-blue-700 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required=""
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
        </form>
      </div>

      <div className="w-1/5 px-24 flex justify-end gap-6">
        <div className=" rounded-full cursor-pointer text-gray-500">
          <FaUser size={28} className={"mx-auto"} />
        </div>
        <div className="  rounded-full cursor-pointer text-gray-500 flex items-center justify-center">
          <RiSettings3Fill size={28} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
