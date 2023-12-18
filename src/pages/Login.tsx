import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import wallpaper from "../assets/bg-3.jpg";
import logo from "../assets/cookbook_logo.png";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
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
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, [msg]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "") {
      setError(`${name} is empty`);
    } else {
      setError("");
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "https://weebmarclone.000webhostapp.com/login.php";
    const { username, password }: any = inputs;

    if (!username && !password) {
      setError("Some of the fields are not filled");
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      try {
        await axios.post(url, formData).then((response) => {
          console.log(response);
          const status = response.data.status;
          if (status === "failed") {
            setError(response.data.message);
          } else if (status === "empty") {
            setError(response.data.message);
          } else {
            setMsg(response.data.message);
            const userId = response.data.data.id;
            const username = response.data.data.username;
            localStorage.setItem("id", userId);
            localStorage.setItem("username", username);
            setTimeout(() => {
              localStorage.setItem("login", "logged");
              navigate("/dashboard");
            }, 5000);
          }
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

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
          <h1 className="text-4xl font-bold">Welcome Back</h1>
        </div>
        <form onSubmit={handleSubmit} className=" text-center w-full  py-16">
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
            className="cursor-pointer bg-red-500 px-8 rounded-md py-2 mt-4 text-white"
            type="submit"
            value="Login"
          />
        </form>
        <div className="mb-16">
          <span>No Account? Please Register </span>
          <button
            className="text-blue-700"
            onClick={() => navigate("/register")}>
            Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
