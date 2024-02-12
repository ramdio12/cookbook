import { useContext, useEffect, useState } from "react";
import axios from "axios";
import pic from "../assets/preview.jpg";
import UserRecipeContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const { click, toggle, updatedPhoto, preview, handleFileChange } =
    useContext(UserRecipeContext);
  const navigate = useNavigate();
  const { userId }: any = useContext(UserContext);
  const { name, username, email, photo }: any = userData;
  const myName = name?.split(" ");

  useEffect(() => {
    getMyData();
  });

  // get the users data to display it
  async function getMyData() {
    await axios
      .get(`https://weebmarclone.000webhostapp.com/my_data.php?id=${userId}`)
      .then(function (response) {
        setUserData(response.data);
      });
  }

  for (let i = 0; i < myName?.length; i++) {
    myName[i] = myName[i][0].toUpperCase() + myName[i]?.substr(1);
  }

  // if the user decided to change the profile pic, this function will handle the task
  const editProfilePhoto = async () => {
    const formData = new FormData();
    formData.set("id", userId);
    formData.set("photo", updatedPhoto);
    await axios
      .post(
        `https://weebmarclone.000webhostapp.com/update_myprofile_photo.php/${userId}`,
        formData,
        {
          headers: {
            Accept: "*",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const status = response.data.status;
        const message = response.data.message;

        switch (status) {
          case "large_file":
            setError(message);
            break;
          case "incompatible":
            setError(message);
            break;
          case "invalid":
            setError(message);
            break;
          case "failed":
            setError(message);
            break;
          case "success":
            setMsg(response.data.message);
            setTimeout(() => {
              setMsg("");
              window.location.reload();
            }, 3000);
            getMyData();
            break;
          default:
            break;
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center flex-col text-center bg-slate-300">
        <h1 className="text-4xl mb-4">My Profile</h1>
        <div className=" bg-neutral-600 text-white w-96 pt-4 rounded-md">
          <div className="h-1/5  mx-auto mb-2">
            {photo ? (
              <img
                src={
                  preview
                    ? preview
                    : `https://weebmarclone.000webhostapp.com/uploads/${photo}`
                }
                className="w-40 h-40 mx-auto rounded-full"
              />
            ) : (
              <img
                className="w-40 h-40 mx-auto rounded-full"
                src={pic}
                alt="#"
              />
            )}
          </div>

          {click ? (
            <div className="pt-8">
              {msg !== "" ? (
                <p className="text-green-700 bg-green-200 mb-2">{msg}</p>
              ) : (
                <p className=" mx-auto text-red-700 bg-red-200 mb-2 w-full">
                  {error}
                </p>
              )}
              <input
                type="file"
                name="photo"
                id="photo"
                onChange={handleFileChange}
              />
              <button
                onClick={editProfilePhoto}
                className=" bg-blue-700 mr-2 rounded-md text-white px-2 font-bold">
                Save
              </button>
              <button
                className=" bg-red-700 text-white px-2 font-bold"
                onClick={toggle}>
                X
              </button>
            </div>
          ) : (
            <div className="mb-4 pt-12 flex gap-2 items-center justify-center text-white">
              <button
                className="rounded-md bg-red-600 hover:bg-red-800 px-4 py-1"
                onClick={toggle}>
                Edit Photo
              </button>
              <button
                className="rounded-md bg-green-500 hover:bg-green-800 px-4 py-1"
                onClick={() => navigate(`/userprofile/${userId}/edituser`)}>
                Edit Profile
              </button>
            </div>
          )}

          <div className="pb-8">
            <div className="mb-4">
              <h2 className="text-xl">Name</h2>
              <p className="text-xl">{myName?.join(" ")}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl">Username</h2>

              <p className="text-xl">@{username}</p>
            </div>
            <div className="">
              <h2 className="text-xl">Email</h2>
              <p className="text-xl">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
