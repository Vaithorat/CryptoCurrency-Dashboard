import React from 'react'

export default function Currency(props) {
  const {
    exchangeOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    value,
    amount
  } = props
  return (
    <div className='flex justify-between items-center px-16 w-full gap-12 mt-8  '>
      {value===2
      ? <div className='text-green-500 font-medium'>Buy</div> 
      : <div className='text-orange-500 font-medium '>Sell</div>}
      <select value={selectedCurrency} onChange={onChangeCurrency} className="transform transition-transform hover:scale-105 hover:shadow-lg bg-gray-200 border-none text-gray-700 font-bold rounded-lg">
        {exchangeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
            ))}
      </select>
            <input  type="number" className="rounded-lg transform transition-transform hover:scale-105 hover:shadow-lg" value={amount} onChange={onChangeAmount} />
    </div>
  )
}