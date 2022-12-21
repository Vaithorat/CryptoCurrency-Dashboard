import React from 'react';
import { render,screen } from '@testing-library/react';
import Coin from '../src/components/Coin';
import '@testing-library/jest-dom/extend-expect';

it('renders without crashing', () => {
    render(<Coin marketcap={123456} priceChange={12.34} />);
});

it('renders the name of the coin', () => {
  render(<Coin marketcap={123456} priceChange={12.34} name="Bitcoin" />);
  expect(screen.getByText('Bitcoin')).toBeInTheDocument();
});
