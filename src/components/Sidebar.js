import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../APIs/api";
import { CryptoState } from "../APIs/CryptoContext";
import Coin from "./Coin";
import { Spinner } from "./Graph";

const Sidebar = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState();
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(TrendingCoins(currency));
    setCoins(data);
    setLoading(false);
  };
  // console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase());
  return (
    <div className="flex-col border-2 rounded-lg mx-4 mt-4 flex overflow-y-scroll">
      <h1 className="pt-5 ml-6 text-4xl font-bold z-10">
        Cryptocurrency prices by market cap
      </h1>
      <table>
        <tbody className="flex-col flex">
          {filteredCoins.map((coin) => {
            return !Coin ? (
              <Spinner />
            ) : (
              <div className=" transform transition-transform hover:text-blue-800 hover:font-bold hover:border-2 hover:border-blue-300 rounded-lg hover:scale-y-110 hover:drop-shadow-xl hover:cursor-pointer hover:bg-blue-100">
                <Coin
                  key={coin.id}
                  name={coin.name}
                  marketcap={coin.total_volume}
                  image={coin.image}
                  priceChange={coin.price_change_percentage_24h}
                />
              </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
