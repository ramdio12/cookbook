import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import wallpaper from "../assets/bg-3.jpg";
import logo from "../assets/cookbook_logo.png";

interface Inputs {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

const Register = () => {
  const [inputs, setInputs] = useState<Inputs>({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [disable, setDisable] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, [msg]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "") {
      setError(`${name} is empty!`);
    } else {
      setError("");
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisable(true);
    const url = "https://weebmarclone.000webhostapp.com/register.php";
    const { name, username, email, password }: any = inputs;

    if (!name && !username && !email && !password) {
      setError("Some of the fields are not filled");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      try {
        await axios.post(url, formData).then((response) => {
          console.log(response);
          console.log(response);
          if (response.data.status === "empty") {
            setError("some fields needs to be filled");
          } else if (response.data.status === "password_error") {
            setError(response.data.message);
          } else if (response.data.status === "username_error") {
            setError(response.data.message);
          } else {
            setMsg(response.data.message);
            console.log(response);
            console.log(response.data.message);
            setTimeout(() => {
              navigate("/");
            }, 5000);
          }
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }

    setDisable(false);
  };

  const checkEmail = async () => {
    const { email }: any = inputs;
    const formData = new FormData();
    formData.append("email", email);

    await axios
      .post("https://weebmarclone.000webhostapp.com/check_email.php", formData)
      .then((response) => {
        if (response.data.status === "duplicate") {
          setError(response.data.message);
          setIsDuplicate(true);
          console.log(response.data.status);
        } else {
          setIsDuplicate(false);
        }
      });
  };

  const checkUsername = async () => {
    const { username }: any = inputs;
    const formData = new FormData();
    formData.append("username", username);
    await axios
      .post(
        "https://weebmarclone.000webhostapp.com/check_username.php",
        formData
      )
      .then((response) => {
        if (response.data.status === "duplicate") {
          setError(response.data.message);
          setIsDuplicate(true);
          console.log(response.data.status);
        } else {
          setIsDuplicate(false);
        }
      });
  };

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

        <form onSubmit={handleSubmit} className=" text-center w-full  pt-16">
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
        <button className="text-blue-700" onClick={() => navigate("/")}>
          Here
        </button>
      </div>
    </div>
  );
};

export default Register;
