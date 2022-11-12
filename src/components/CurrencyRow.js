import React from 'react'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <div className='flex justify-between items-center px-16 w-full gap-12 mt-8  '>
      <select value={selectedCurrency} onChange={onChangeCurrency} className="rounded-lg">
        {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
            ))}
      </select>
            <input type="number" className="rounded-lg" value={amount} onChange={onChangeAmount} />
    </div>
  )
}