import React, { useEffect, useState } from "react";
import Currency from "./Currency";

const url = "https://api.exchangerate.host/latest";

function Exchange() {
  const [exchangeOptions, setExchangeOptions] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState();
  const [newCurrency, setNewCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState();
  const [amountInbaseCurrency, setAmountInbaseCurrency] = useState(true);

  let to, from;
  //Allows user to input currency in any field
  if (amountInbaseCurrency) {
    from = amount;
    to = amount * exchangeRate;
  } else {
    to = amount;
    from = amount / exchangeRate;
  }

  useEffect(() => {
    // fetching from currency converter api 
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setExchangeOptions([data.base, ...Object.keys(data.rates)]);
        setBaseCurrency(data.base);
        setNewCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (baseCurrency != null && newCurrency != null) {
      fetch(`${url}?base=${baseCurrency}&symbols=${newCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[newCurrency]));
    }
  }, [baseCurrency, newCurrency]);

  function fromChange(e) {
    setAmount(e.target.value);
    setAmountInbaseCurrency(true);
  }

  function toChange(e) {
    setAmount(e.target.value);
    setAmountInbaseCurrency(false);
  }

  return (
    
    <div className="flex flex-col justify-center items-center border-2 ml-2 rounded-lg flex-shrink">
      <h1 className=" text-2xl font-bold">Exchange Currencies</h1>
      <Currency
      value={1}
        exchangeOptions={exchangeOptions}
        selectedCurrency={baseCurrency}
        onChangeCurrency={(e) => setBaseCurrency(e.target.value)}
        onChangeAmount={fromChange}
        amount={from}
      />

      <Currency
      value={2}
        exchangeOptions={exchangeOptions}
        selectedCurrency={newCurrency}
        onChangeCurrency={(e) => setNewCurrency(e.target.value)}
        onChangeAmount={toChange}
        amount={to}
      />
    </div>
  );
}

export default Exchange;
