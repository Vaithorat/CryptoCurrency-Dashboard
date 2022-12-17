import React from "react";
import { CryptoState } from "../APIs/CryptoContext";
import Coin from "./Coin";
import { Spinner } from "./Graph";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const { symbol, filteredCoins } = CryptoState();

  //convert coin names into lowercase to allow effective usability
  // const filteredCoins = coins.filter((coin) => coin.name.toLowerCase());
  return (
    <div
      style={{
        background: mode ? "#121212" : "white",
        color: mode ? "white" : "#121212",
      }}
      className=" flex-col border-2 rounded-lg mx-4 mt-4 flex overflow-y-scroll  no-scrollbar"
      id="sidebar"
    >
      <h1
        className="md:w-full pt-3 pb-2 pl-6 text-4xl font-bold z-10 bg-white border-b-2 border-black "
        style={{
          position: "sticky",
          top: 0,
          background: mode ? "#121212" : "white",
          color: mode ? "white" : "#121212",
        }}
      >
        Cryptocurrency prices by market cap
      </h1>
      <hr />
      <table>
        <tbody className="flex-col flex">
          {filteredCoins.map((coin) => { const marketcap = coin.market_cap.toLocaleString();
            const formattedMarketcap = `${symbol}${marketcap}`;
            return !Coin ? (
              <Spinner />
            ) : (
              <tr key={coin.id}>
                <td className="transform transition-transform w-screen hover:text-blue-800 hover:font-bold hover:border-2 hover:border-blue-300 rounded-lg hover:scale-y-110 hover:drop-shadow-xl hover:cursor-pointer hover:bg-blue-100">
                  {/* parameters for the coin */}
                  <Coin
                    name={coin.name}
                    marketcap={`${formattedMarketcap}`}
                    image={coin.image}
                    priceChange={coin.price_change_percentage_24h}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
