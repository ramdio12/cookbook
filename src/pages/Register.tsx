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
        </div>

        <form
          onSubmit={handleRegistration}
          className=" text-center w-full  pt-16">
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
          </div>

          {!isDuplicate ? (
            <input
              type="submit"
              className="cursor-pointer bg-red-500 px-8 rounded-md py-2 text-white"
              disabled={disable}
              value="submit"
            />
          ) : (
            <></>
          )}
        </form>
        <span>Have an account? Please Login </span>
        <Link className="text-blue-700" to="/">
          Here
        </Link>
      </div>
    </div>
  );
};

export default Register;
