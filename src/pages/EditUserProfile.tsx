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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "") {
      setError(`${name} is empty!`);
    } else {
      setError("");
      setInputs((values: {} | null) => ({
        ...values,
        [name]: value,
      }));
    }
  };
  // fetch users data
  const getUserData = async () => {
    try {
      await axios
        .get(
          `https://weebmarclone.000webhostapp.com/updateAndGetUser.php?id=${id}`
        )
        .then(function (response) {
          setUserId(response.data.id);
          setInputs(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  // the inputs will be sent to the database if there are no errors
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = "https://weebmarclone.000webhostapp.com/updateAndGetUser.php";
    const { name, email } = inputs;

    console.log(inputs);

    if (!name && !email) {
      setError("Some of the fields are not filled");
    } else {
      const formData = new FormData();
      formData.append("id", userId);
      formData.append("name", name);
      formData.append("email", email);

      try {
        await axios.post(url, formData).then((response) => {
          const status = response.data.status;
          console.log(response);
          if (status === "empty") {
            setError(response.data.message);
          } else {
            setMsg(response.data.success);
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
      <div className="flex items-center  flex-col min-h-screen bg-neutral-600">
        <h1 className="text-4xl py-12 text-white">Edit your profile</h1>

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
            <div className="mb-4">
              <label htmlFor="username" className="block text-2xl mb-2">
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="pl-2 py-2 w-64 text-lg rounded-md bg-slate-600 text-white"
                value="Will be available soon"
                disabled
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
            <input
              type="button"
              value="CANCEL"
              onClick={() => navigate("/userrecipes")}
              className="text-md md:hidden bg-blue-600 ml-2 px-6 py-2 text-white rounded-md cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
