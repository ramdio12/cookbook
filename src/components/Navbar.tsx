import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleChevronDown,
  faCircleChevronUp,
  faPowerOff,
  faRightFromBracket,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>("");
  const [display, setDisplay] = useState("hidden");

  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    const uname = localStorage.getItem("username");
    setUsername(uname);
  }, []);

  const dropDownClick = () => {
    setDropDown((prev) => !prev);
  };
  const openSideBar = () => {
    setDisplay(display === "flex" ? "hidden" : "flex");
  };

  const closeMenu = () => {
    setDisplay(display === "flex" ? "hidden" : "flex");
  };

  const logout = () => {
    localStorage.setItem("login", "");
    localStorage.setItem(
      "loginStatus",
      "Logged out successfully. Reloading..."
    );
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-orange-800 w-full p-4 text-white font-bold relative">
      <div className="flex justify-center items-center">
        <img
          src={logo}
          alt="logo"
          width={50}
          height={120}
          onClick={() => navigate("/dashboard")}
          className=" cursor-pointer"
        />
        <span className=" font-mono text-lg">CookBook</span>
      </div>

      <nav className="hidden md:flex gap-8">
        <Link to="/dashboard" className="text-xl hover:text-yellow-400">
          Home
        </Link>
        <Link to="/userrecipes" className="text-xl hover:text-yellow-400">
          My Recipes
        </Link>
        <Link to="/addrecipe" className="text-xl hover:text-yellow-400">
          Add Recipe
        </Link>
      </nav>
      <div className="hidden md:flex items-center justify-center">
        <div className="flex items-center justify-center flex-col relative">
          <div>
            <span className=" mr-2 text-xl">Hi {username}</span>
            {dropDown ? (
              <FontAwesomeIcon
                icon={faCircleChevronUp}
                onClick={dropDownClick}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                onClick={dropDownClick}
                className="text-2xl cursor-pointer"
              />
              // <FontAwesomeIcon
              //   icon={faAngleDown}
              //   onClick={dropDownClick}
              //   className="text-xl cursor-pointer"
              // />
            )}
          </div>
          {dropDown && (
            <div className="absolute top-12 bg-orange-800 w-28 px-2 z-50">
              <div>
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <Link
                  to="/profile"
                  className="py-2 text-xl font-normal hover:text-yellow-400">
                  Profile
                </Link>
              </div>
              <div className="cursor-pointer">
                <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
                <button
                  className="pb-2 text-xl font-normal hover:text-yellow-400"
                  onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="md:hidden absolute right-4 text-3xl cursor-pointer"
        onClick={openSideBar}
      />

      <div
        className={`${display}  md:hidden fixed right-0 bottom-0 top-0 flex-col bg-orange-800 w-60 z-20`}>
        <FontAwesomeIcon
          icon={faX}
          className="absolute right-4 top-4 text-2xl cursor-pointer font-semibold"
          onClick={openSideBar}
        />
        <nav className="flex flex-col mt-20 gap-4 mb-6 pl-6">
          <Link
            to="/dashboard"
            className="text-2xl hover:text-amber-300"
            onClick={closeMenu}>
            Home
          </Link>
          <Link to="/userrecipes" className="text-2xl hover:text-amber-300">
            My Recipe
          </Link>
          <Link to="/addrecipe" className="text-2xl hover:text-amber-300">
            Add Recipe
          </Link>
        </nav>
        <div className="mx-auto">
          <button
            onClick={logout}
            className=" bg-red-500 mx-auto px-8 py-2 rounded-md">
            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
