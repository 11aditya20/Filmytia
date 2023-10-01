import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { AppState } from "../App";
import { useContext } from "react";

const Header = () => {

const useAppState = useContext(AppState);

  return (
    <div className="flex  md:justify-between md:flex-row header sticky top-0 z-10 font-bold border-b-4 border-b-orange-600">
      <div className="text-4xl md:p-3 p-4">
      <Link to={"/"}>
        <span>Filmy</span>
        <span className=" tia text-orange-600">tia</span>
        </Link>
      </div>
      <div className="md:p-3 p-4">
      {useAppState.login ?
        <Link to={"/addmovie"}>
          <button className="but">
            {" "}
            <div>
              <AddIcon className="mr-1" />
            </div>{" "}
            <div>Add Movie</div>
          </button>
        </Link>
        : <Link to={"/signin"}>
          <button className="but2">
            {" "}
            <div>
            </div>{" "}
            <div>Login</div>
          </button>
        </Link>
      }
      </div>
    </div>
  );
};

export default Header;
