import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const EditUserProfile = () => {
  const [inputs, setInputs]: any = useState([]);
  const [userId, setUserId]: any = useState(null);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "") {
      setError(`${name} is empty!`);
    } else {
      setError("");
      setInputs((values: any) => ({
        ...values,
        [name]: value,
      }));
    }
  };

  const getUserData = async () => {
    await axios
      .get(`https://weebmarclone.000webhostapp.com/my_data.php?id=${id}`)
      .then(function (response) {
        setUserId(response.data.id);
        setInputs(response.data);
      });
  };

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();

    const url = "https://weebmarclone.000webhostapp.com/my_data.php";
    const { name, username, email }: any = inputs;

    console.log(inputs);

    if (!name && !username && !email) {
      setError("Some of the fields are not filled");
    } else {
      const formData = new FormData();
      formData.append("id", userId);
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);

      try {
        await axios.post(url, formData).then((response) => {
          const status = response.data.status;
          if (status === "empty") {
            setError(response.data.message);
          } else {
            setMsg("Edit data success. Reloading...");
            setTimeout(() => {
              navigate("/userrecipes");
            }, 3000);
          }
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center flex-col ">
        <h1 className="text-4xl py-12">Edit your profile</h1>

        <div className="text-center bg-white px-16 py-4 rounded-md shadow-md">
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4 ">
              <label htmlFor="name" className="block text-2xl mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="pl-2 py-2 w-64 text-lg rounded-md bg-slate-300"
                value={inputs?.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-2xl mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="pl-2 py-2 w-64 text-lg rounded-md bg-slate-300"
                value={inputs?.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 ">
              <label htmlFor="email" className="block text-2xl mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="pl-2 py-2 w-64 text-lg rounded-md bg-slate-300"
                value={inputs?.email || ""}
                onChange={handleChange}
              />
            </div>
            <p className=" mb-4">
              {msg !== "" ? (
                <span className="text-green-500 text-2xl">{msg}</span>
              ) : (
                <span className="text-red-500 text-md">{error}</span>
              )}
            </p>
            <input
              type="submit"
              value="SUBMIT"
              className="text-md bg-red-600 px-6 py-2 text-white rounded-md cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
