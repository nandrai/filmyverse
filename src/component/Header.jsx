import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className=" sticky z-10 header top-0 text-2xl flex justify-between text-red-500 font-bold p-3 border-b-2 border-gray-500">
      <Link to={"/"}>
        <span>
          Filmy<span className="text-white">Verse</span>
        </span>
      </Link>
      <Link to={"/addmovie"}>
        <Button className="flex items-center cursor-pointer">
          <AddIcon className="mr-2" color="secondary" />
          <span className="text-lg text-white">ADD New</span>
        </Button>
      </Link>
    </div>
  );
}

export default Header;
