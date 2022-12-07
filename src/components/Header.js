import React from "react";
import { useState } from 'react';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

const Header = () => {
  const [mode, setMode] = useState('dark');
  return (
    <div className="w-full shadow-lg flex justify-between">
      <div className="w-20 mx-10 py-2 flex ">
        <img src="./logoAlma.png" alt="" />
      </div>
      <DarkModeToggle
      mode={mode}
      dark="Dark"
      light="Light"
      size="sm"
      inactiveTrackColor="#e2e8f0"
      inactiveTrackColorOnHover="#f8fafc"
      inactiveTrackColorOnActive="#cbd5e1"
      activeTrackColor="#334155"
      activeTrackColorOnHover="#1e293b"
      activeTrackColorOnActive="#0f172a"
      inactiveThumbColor="#1e293b"
      activeThumbColor="#e2e8f0"
      onChange={(mode) => {
        setMode(mode);
      }}
    />
    </div>
  );
};

export default Header;
