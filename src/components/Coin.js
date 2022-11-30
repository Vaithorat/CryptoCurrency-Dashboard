import React from "react";
import {TiArrowSortedDown, TiArrowSortedUp} from "react-icons/ti"

const Coin = ({ name, marketcap, image, priceChange }) => {
  return (
    <div className=" flex justify-center border-2-gray-500">
      <div className="flex justify-between w-full mx-4 items-center h-full border-b-2 border-gray-200 w-80%  ">
        <div className="flex items-center pr-6 min-w-min h-fit ">
          <img src={image} alt="crypto" className="h-8 w-fit px-2 hover:drop-shadow-lg  " />
          <div className=" flex-col  mt-2 ">
            <h1 className="h-8 mr-2 text-base w-40 align-center mb-3">{name}</h1>
            <p className=" gap-5 text-gray-500  ">
              Mkt Cap: {marketcap.toLocaleString()}
            </p>
          </div>
        </div>
        <div className=" flex ">
          {priceChange < 0 ? (
            <p className="red text-red-500 flex "> <TiArrowSortedDown className="h-fit w-fit px-2 pt-1"/>{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="green text-green-500 flex"><TiArrowSortedUp className="h-fit w-full px-2 pt-1"/>{priceChange.toFixed(2)}%</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coin;
