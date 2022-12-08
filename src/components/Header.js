import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../features/darkModeSlice";
import DarkModeToggle from "react-dark-mode-toggle";

const Header = () => {
  const { mode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  return (
    <div
      style={{ background: mode ? "#121212" : "white" }}
      className="w-full shadow-lg flex justify-between"
    >
      <div className="w-20 mx-10 py-2 flex ">
        <img src="./logoAlma.png" alt="" />
      </div>

      <DarkModeToggle
        className="mr-12 mt-2"
        onChange={() => dispatch(toggleDarkMode())}
        checked={mode}
        size={50}
      />
    </div>
  );
};

export default Header;
