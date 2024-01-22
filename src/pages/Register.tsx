import wallpaper from "../assets/bg-3.jpg";
import logo from "../assets/cookbook_logo.png";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    msg,
    error,
    isDuplicate,
    disable,
    handleChange,
    handleRegistration,
    checkEmail,
    checkUsername,
  } = useContext(UserContext);

  return (
    <div className="md:flex items-center justify-center min-h-screen">
      <div
        className="bg-cover bg-center min-h-screen basis-1/2 w-100 relative"
        style={{
          backgroundImage: `url(${wallpaper})`,
        }}>
        <div className="absolute text-center right-0 top-0 left-0 bottom-0 flex justify-center items-center">
          <h1 className=" text-white  font-serif text-6xl w-3/4 drop-shadow-lg mb-52">
            "Everyone can COOK"
          </h1>
        </div>
      </div>
      <div className="basis-1/2 bg-gray-300 min-h-screen flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="logo" width={150} height={150} />
          <h1 className="text-4xl font-bold">Register</h1>
          <p>Fill all the fields below</p>
        </div>

        <form
          onSubmit={handleRegistration}
          className=" text-center w-full  pt-12">
          <p>
            {msg !== "" ? (
              <span className="text-green-700 text-2xl">{msg}</span>
            ) : (
              <span className="text-red-700 text-md font-semibold text-xl">
                {error}
              </span>
            )}
          </p>
          <div className="my-2">
            <input
              className="py-2.5 px-2  w-3/6  rounded-lg bg-white"
              type="text"
              placeholder="Name..."
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="my-2">
            <input
              className="py-2.5 px-2 w-3/6 rounded-lg bg-white"
              type="text"
              placeholder="Username..."
              name="username"
              onChange={handleChange}
              onBlur={checkUsername}
            />
          </div>
          <div className="my-2">
            <input
              className="py-2.5 px-2 w-3/6 rounded-lg bg-white"
              type="email"
              placeholder="Email..."
              name="email"
              onChange={handleChange}
              onBlur={checkEmail}
            />
          </div>
          <div className="my-2">
            <input
              className="py-2.5 px-2 w-3/6  rounded-lg bg-white"
              type="password"
              placeholder="Password..."
              name="password"
              onChange={handleChange}
            />
            <small className="block text-xs">
              (Password must be 8 characters long with Uppercase , lowercase,
              and special characters)
            </small>
            {/* <small className="block w-full">
              By clicking the Sign Up button,you agree to our <br />
              <a href="#" className=" text-blue-700 underline">
                Terms & Condition
              </a>
              <span> and </span>
              <a href="#" className=" text-blue-700 underline">
                Policy Privacy
              </a>
            </small> */}
          </div>

          {!isDuplicate ? (
            <input
              type="submit"
              className="cursor-pointer bg-red-500 hover:bg-red-700 duration-500 ease-in-out px-8 rounded-md py-2 text-white my-4"
              disabled={disable}
              value="Sign Up"
            />
          ) : (
            <></>
          )}
        </form>
        <span>
          Have an account? Please Login{" "}
          <Link className="text-blue-700" to="/">
            Here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
