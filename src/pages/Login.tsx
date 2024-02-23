import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import wallpaper from "../assets/wallpaper2.jpg";

const Login = () => {
  const { msg, error, handleLogin, setError, handleChange } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const togglePassword = () => {
    setClick((prev) => !prev);
  };

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (login) {
      navigate("dashboard");
    }
    let loginStatus = localStorage.getItem("loginStatus");
    if (loginStatus) {
      setError(loginStatus);
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
  }, [msg]);

  return (
    <div
      className="flex items-center justify-center min-h-screen flex-col bg-fixed bg-center bg-cover "
      style={{
        backgroundImage: `url(${wallpaper})`,
      }}>
      <div className=" bg-white  w-96 shadow-md rounded-md">
        <h1 className="text-4xl py-4 text-center font-bold">Log In</h1>
        <form
          onSubmit={handleLogin}
          className="flex items-center justify-center flex-col py-10">
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              className=" bg-gray-200 text-lg py-3 w-72 rounded-lg"
            />
          </div>

          <div className="relative m-2">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type={`${click ? "text" : "password"}`}
              name="password"
              id="password"
              onChange={handleChange}
              className=" bg-gray-200 text-lg py-3 w-72 rounded-lg "
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
          {/* <Link
            to="/forgotpassword"
            className=" text-left mb-4 mr-36 underline text-blue-600">
            Forgot Password?
          </Link> */}
          <p className="text-center w-full py-2">
            {msg !== "" ? (
              <span className="text-green-700 text-md">{msg}</span>
            ) : (
              <span className="text-red-700 text-md">{error}</span>
            )}
          </p>

          <button
            type="submit"
            className=" bg-red-500 hover:bg-red-800 text-white px-7 py-2 text-md rounded-lg">
            LOGIN
          </button>
          <p className="text-xl mt-2">
            No account? Register
            {/* <Link to="/register" className="underline text-blue-700 ml-2">
              Here
            </Link> */}
            <a href="/register" className="text-blue underline ml-2">
              Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
