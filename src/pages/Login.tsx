import { Link, useNavigate } from "react-router-dom";
import wallpaper from "../assets/bg-3.jpg";
import logo from "../assets/cookbook_logo.png";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

const Login = () => {
  const { msg, error, handleLogin, setError, handleChange } =
    useContext(UserContext);

  const navigate = useNavigate();

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
    <div className="md:flex items-center justify-center min-h-screen">
      <div
        className=" bg-cover bg-center min-h-screen basis-1/2 w-100 relative"
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
          <h1 className="text-4xl font-bold">Welcome back, please login!</h1>
        </div>

        <form onSubmit={handleLogin} className=" text-center w-full  py-16">
          <p>
            {msg !== "" ? (
              <span className="text-green-700 text-2xl">{msg}</span>
            ) : (
              <span className="text-red-700 text-2xl">{error}</span>
            )}
          </p>
          <div>
            <input
              className="py-3 px-2 text-black w-3/6 my-2 rounded-lg "
              type="text"
              placeholder="Username..."
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="py-3 px-2 w-3/6 my-2 rounded-lg "
              type="password"
              placeholder="Password..."
              name="password"
              onChange={handleChange}
            />
          </div>
          <input
            className="cursor-pointer bg-red-500  hover:bg-red-700 duration-500 ease-in-out px-8 rounded-md py-2 mt-4 text-white"
            type="submit"
            value="Login"
          />
        </form>
        <div className="mb-16">
          <span>No Account? Please Register </span>
          <Link className="text-blue-700" to="/register">
            Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
