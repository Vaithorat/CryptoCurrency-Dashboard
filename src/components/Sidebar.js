import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../APIs/api";
import { CryptoState } from "../APIs/CryptoContext";
import Coin from "./Coin";

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
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase());
  return (
    <>
      <h1 className="pt-5 ml-2 text-4xl font-bold">
        Cryptocurrency prices by market cap
      </h1>
      <table>
        <tbody className="">
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                marketcap={coin.total_volume}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Sidebar;
