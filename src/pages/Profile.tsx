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
  const { name, email, photo }: any = userData;
  const myName = name?.split(" ");

  useEffect(() => {
    getUserData();
  });

  async function getUserData() {
    await axios
      .get(
        `https://weebmarclone.000webhostapp.com/updateAndGetUser.php?id=${userId}`
      )
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
        // `http://localhost/php_files/updateUserProfilePhoto.php/${userId}`,
        `https://weebmarclone.000webhostapp.com/updateUserProfilePhoto.php/${userId}`,
        formData,
        {
          headers: {
            Accept: "*",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setMsg(response.data.success);
          setTimeout(() => {
            setMsg("");
            window.location.reload();
          }, 3000);
          getUserData();
        } else {
          setError(response.data.error);
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center  flex-col text-center min-h-screen bg-neutral-600">
        <h1 className="text-4xl mb-4 text-white mt-8">My Profile</h1>
        <div className=" bg-neutral-900 text-white  w-96 pt-4 rounded-md">
          <div className="h-1/5  mx-auto mb-2">
            {photo ? (
              <img
                src={
                  preview
                    ? preview
                    : `https://weebmarclone.000webhostapp.com/uploads/${photo}`
                  // `http://localhost/php_files/user_uploads/${photo}`
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
