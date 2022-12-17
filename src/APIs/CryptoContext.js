import React, { createContext, useContext, useEffect, useState } from "react";
import { TrendingCoins } from "../APIs/api";
import axios from "axios";
//allows to use currency in all components
const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(TrendingCoins(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line 
  }, [currency]);
  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "INR") setSymbol("₹");
  }, [currency]);
  const filteredCoins = coins.filter((coin) => coin.name.toLowerCase());


  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, coins, loading,fetchCoins,setCoins,filteredCoins }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
