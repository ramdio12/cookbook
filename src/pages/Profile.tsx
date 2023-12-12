import { useContext, useEffect, useState } from "react";
import axios from "axios";
import pic from "../assets/preview.jpg";
import UserRecipeContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [myData, setMyData]: any = useState({});
  const { name, username, email, photo } = myData;
  const [id, setId]: any = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const myName = name?.split(" ");
  const { click, toggle, updatedPhoto, preview, handleFileChange } =
    useContext(UserRecipeContext);

  const navigate = useNavigate();

  for (let i = 0; i < myName?.length; i++) {
    myName[i] = myName[i][0].toUpperCase() + myName[i]?.substr(1);
  }

  useEffect(() => {
    const uid: any = localStorage.getItem("id");
    setId(uid);
    getMyData(uid);
  }, []);

  async function getMyData(userId: number) {
    await axios
      .get(`https://weebmarclone.000webhostapp.com/my_data.php?id=${userId}`)
      .then(function (response) {
        setMyData(response.data);
      });
  }

  const editProfilePhoto = async () => {
    const formData = new FormData();
    formData.set("id", id);
    formData.set("photo", updatedPhoto);
    await axios
      .post(
        `https://weebmarclone.000webhostapp.com/update_myprofile_photo.php/${id}`,
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
        if (response.data.status === "large_file") {
          setError(response.data.message);
        } else if (response.data.status === "success") {
          setMsg(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
  };

  return (
    <>
      <div className="text-center bg-neutral-900 text-white md:w-96 pt-8">
        <h1 className="text-4xl mb-4">My Profile</h1>
        <div className="h-1/5  mx-auto mb-8 overflow-visible">
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
            <img className="w-40 h-40 mx-auto rounded-full" src={pic} alt="#" />
          )}
        </div>

        {click ? (
          <div className="pt-8">
            {msg !== "" ? (
              <p className="text-green-700 bg-green-200 mb-2">{msg}</p>
            ) : (
              <p className=" mx-autotext-red-700 bg-red-200 mb-2 w-28">
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
          <div className="mb-4 pt-12 flex gap-2 items-center justify-center">
            <button
              className="rounded-md bg-red-600 px-4 py-1"
              onClick={toggle}>
              Edit Photo
            </button>
            <button
              className="rounded-md bg-green-500 px-4 py-1"
              onClick={() => navigate(`/userprofile/${id}/edituser`)}>
              Edit Profile
            </button>
          </div>
        )}

        <div>
          <div className="mb-4">
            <h2 className="text-xl">Name</h2>
            <p className="text-xl">{myName?.join(" ")}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl">Username</h2>
            <p className="text-xl">@{username}</p>
          </div>
          <div className="mb-2">
            <h2 className="text-xl">Email</h2>
            <p className="text-xl">{email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
