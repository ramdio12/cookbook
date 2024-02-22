import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import wallpaper from "../assets/wallpaper2.jpg";

const Register = () => {
  const { msg, error, handleChange, handleRegistration, checkEmail } =
    useContext(UserContext);
  const [click, setClick] = useState(false);
  const [confirmClick, setConfirmClick] = useState(false);

  const togglePassword = () => {
    setClick((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setConfirmClick((prev) => !prev);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen flex-col bg-fixed bg-center bg-cover "
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}>
      <div className=" bg-white  w-96 shadow-md rounded-md">
        <h1 className="text-2xl py-4 text-center font-bold">
          Please Register Here
        </h1>

        <form
          className="flex items-center justify-center flex-col py-4"
          onSubmit={handleRegistration}>
          <div className="mb-4">
            <label htmlFor="name" className="block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              className=" bg-gray-200 text-lg py-2 w-72 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              onBlur={checkEmail}
              className=" bg-gray-200 text-lg py-2 w-72 rounded-lg"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type={`${click ? "text" : "password"}`}
              name="password"
              id="password"
              onChange={handleChange}
              className=" bg-gray-200 text-lg py-2 w-72 rounded-lg "
            />

            {click ? (
              <FontAwesomeIcon
                icon={faEye}
                onClick={togglePassword}
                className={`absolute right-2 bottom-4 text-xl cursor-pointer`}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={togglePassword}
                className={`absolute right-2 bottom-4 text-xl cursor-pointer`}
              />
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirm_password" className="block">
              Confirm Password
            </label>
            <input
              type={`${confirmClick ? "text" : "password"}`}
              name="confirm_password"
              id="confirm_password"
              onChange={handleChange}
              className=" bg-gray-200 text-lg py-2 w-72 rounded-lg"
            />

            {confirmClick ? (
              <FontAwesomeIcon
                icon={faEye}
                onClick={toggleConfirmPassword}
                className={`absolute right-2 bottom-4 text-xl cursor-pointer`}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={toggleConfirmPassword}
                className={`absolute right-2 bottom-4 text-xl cursor-pointer`}
              />
            )}
          </div>
          <p className="mx-auto text-center py-2">
            {msg !== "" ? (
              <span className="text-green-700">{msg}</span>
            ) : (
              <span className="text-red-700 text-md font-semibold">
                {error}
              </span>
            )}
          </p>

          <button
            type="submit"
            className=" bg-red-500 hover:bg-red-800 text-white px-5 py-1 rounded-lg">
            Register
          </button>
          <p className="text-center w-full py-2">
            Already Have an account? go 👉
            <Link to="/" className="text-blue underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
