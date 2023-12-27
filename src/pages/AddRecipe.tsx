import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [userId, setUserId]: any = useState(null);
  const [username, setUsername]: any = useState("");
  const [inputs, setInputs] = useState({});
  const [photo, setPhoto] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const uname = localStorage.getItem("username");
    const uid = localStorage.getItem("id");
    setUserId(uid);
    setUsername(uname);
  }, []);

  const handleFileChange = (e: any) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const handleChange = (e: { target: { name: string; value: {} | null } }) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "") {
      setError(`${name} is empty!`);
    } else {
      setError("");
      setInputs((values) => ({
        ...values,
        [name]: value,
        users_id: userId,
        photo: photo,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = "https://weebmarclone.000webhostapp.com/recipe_crud.php/";
    const { title, description, ingredients, instructions }: any = inputs;

    const formData = new FormData();
    formData.append("username", username);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("users_id", userId);
    formData.append("photo", photo);

    try {
      await axios
        .post(url, formData, {
          headers: {
            Accept: "*",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status === "success") {
            setMsg("Recipe Created");
            setTimeout(() => {
              navigate("/dashboard");
            }, 3000);
          } else {
            setError(response.data.message);
          }
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }

    setInputs({});
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full bg-slate-400 flex flex-col items-center justify-center">
        <h1 className="text-4xl my-8 font-semibold">Add Some Recipes</h1>
        <h2 className=" text-lg text-center">
          All the fields below are required to fill, please check the homepage
          for the reference
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="text-center w-full md:w-3/6 bg-white py-8 rounded-md">
          <div className="mb-4 md:w-3/6 mx-auto">
            <label htmlFor="title" className="block text-2xl mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Title..."
              name="title"
              id="title"
              className="py-2 w-full bg-slate-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 md:w-3/6 mx-auto">
            <label htmlFor="description" className="block text-2xl mb-2">
              Description
            </label>
            <small>(How would you describe your dish?)</small>
            <input
              type="text"
              placeholder="Description..."
              name="description"
              id="description"
              className="py-2 w-full bg-slate-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 md:w-9/12 mx-auto">
            <label htmlFor="ingredients" className="block text-2xl mb-2">
              Ingredients
            </label>
            <small>(Separate each ingredients by comma)</small>
            <textarea
              placeholder="Ingredients..."
              name="ingredients"
              id="ingredients"
              className="px-2 w-full resize-none bg-slate-300 rounded-md"
              rows={10}
              onChange={handleChange}></textarea>
          </div>
          <div className="mb-4 md:w-9/12 mx-auto">
            <label htmlFor="instructions" className="block text-2xl mb-2">
              Instructions
            </label>
            <textarea
              placeholder="Instructions..."
              name="instructions"
              id="instructions"
              className="px-2 w-full resize-none bg-slate-300 rounded-md"
              rows={10}
              onChange={handleChange}></textarea>
          </div>
          <div className="mb-8">
            <label htmlFor="photo" className="block text-2xl">
              Image
            </label>
            <small className="block mb-4">
              (At least one but awesome pic of your dish is required : jpg,jpeg
              or png)
            </small>
            <input type="file" name="photo" onChange={handleFileChange} />
          </div>
          <p className="py-4">
            {msg !== "" ? (
              <span className="text-green-500 text-2xl">{msg}</span>
            ) : (
              <span className="text-red-500 text-2xl">{error}</span>
            )}
          </p>
          <input
            type="submit"
            value="SUBMIT"
            className="text-md bg-red-600 px-6 py-2 text-white rounded-md cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
