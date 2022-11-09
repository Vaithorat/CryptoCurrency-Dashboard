import React from "react";

const Exchange = () => {
  return (
    <div id="exchange" className="border-2 h-fit p-2 ml-4 w-full rounded-lg flex-col flex items-center">
      <div>
      <div  className="text-lg font-bold p-t2 flex justify-center">Exchange Coins</div>
      <div id="container" className="flex items-center p-2">
        <div id="sell">Sell</div>
        <div>
          <div className="w-56 text-right">
            <div className="flex items-center ml-8">
              <label htmlFor="coins-sell" className="sr-only">
                coins-sell
              </label>
              <select
                id="coins-sell"
                name="coins-sell"
                // onChange={handleChange}
                // value={coins-sell}
                className="border-none w-fit h-10  text-sm font-semibold rounded-md bg-gray-200"
              >
                <option
                  value="coin-sell"
                  className="hover:bg-gray-100 hello rounded-lg"
                >
                  Etherium
                </option>
                <option value="coin-sell">Bitcoin</option>
              </select>
            </div>
          </div>
        </div>
        <input type="text" className="rounded ml-2 h-1/2 w-full" />
      </div>
      <div id="container" className="flex items-center mt-1 p-2">
        <div id="sell">Buy</div>
        <div>
          <div className="flex items-center ml-8">
            <label htmlFor="coins-buy" className="sr-only">
              coins-buy
            </label>
            <select
              id="coins-buy"
              name="coins-buy"
              // onChange={handleChange}
              // value={coins-buy}
              className="border-none w-fit h-10  text-sm font-semibold rounded-md bg-gray-200"
            >
              <option
                value="Bitcoin"
                className="hover:bg-gray-100 hello rounded-md"
              >
                Bitcoin
              </option>
              <option value="Etherium">Etherium</option>
            </select>
          </div>
        </div>
        <div className="ml-24">2300 Eth</div>
      </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-800 rounded-lg p-2 w-24 font-bold text-white h-fit text-sm flex justify-center">
        Exchange
      </button>
    </div>
  );
};

export default Exchange;
