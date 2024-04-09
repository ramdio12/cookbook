import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUserRecipe = () => {
  const navigate = useNavigate();
  const [inputs, setInputs]: any = useState([]);
  const [recipeId, setRecipeId]: any = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getUserRecipe();
  }, []);

  const handleChange = (e: { target: { name: string; value: {} | null } }) => {
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

  // get the recipe of the user by id
  const getUserRecipe = async () => {
    await axios
      // .get(`http://localhost/php_files/createAndGetRecipe.php?id=${id}`)
      .get(
        `https://weebmarclone.000webhostapp.com/createAndGetRecipe.php?id=${id}`
      )
      .then((response) => {
        setInputs(response.data);
        setRecipeId(response.data.id);
      });
  };

  // handles the update of the recipe
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const url = "http://localhost/php_files/userRecipes.php";
    const url = "https://weebmarclone.000webhostapp.com/userRecipes.php";
    const { title, description, ingredients, instructions } = inputs;

    if (!title && !description && !ingredients && !instructions) {
      setError("Some of the fields are not filled");
    } else {
      const formData = new FormData();
      formData.append("id", recipeId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      try {
        await axios.post(url, formData).then((response) => {
          console.log(response);
          console.log(response.data);
          if (response.data.success) {
            setMsg(response.data.success);
            setTimeout(() => {
              navigate("/userrecipes");
            }, 3000);
          } else {
            setError(response.data.error);
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
      <div className="w-full h-full bg-slate-400 flex flex-col items-center justify-center">
        <h1 className="text-4xl my-8">Update Your Recipe</h1>
        <form
          onSubmit={handleUpdate}
          encType="multipart/form-data"
          className="text-center md:w-3/6 bg-white pb-8">
          <noscript> @csrf @method('PUT')</noscript>

          <div className="mb-4 md:w-3/6 mx-auto">
            <label htmlFor="title" className="block text-2xl mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Title..."
              name="title"
              id="title"
              className="py-2 w-full bg-slate-300"
              value={inputs?.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 md:w-9/12 mx-auto">
            <label htmlFor="description" className="block text-2xl mb-2">
              Description
            </label>
            <textarea
              placeholder="Description..."
              name="description"
              id="description"
              className="px-2 w-full resize-none bg-slate-300 rounded-md"
              rows={8}
              value={inputs?.description || ""}
              onChange={handleChange}></textarea>
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
              className="px-2 w-full resize-none bg-slate-300"
              rows={10}
              value={inputs?.ingredients || ""}
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
              className="px-2 w-full resize-none bg-slate-300"
              rows={10}
              value={inputs?.instructions || ""}
              onChange={handleChange}></textarea>
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
            className="text-md bg-red-600 hover:bg-red-800 duration-300 ease-in-out px-6 py-2 text-white rounded-md cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default EditUserRecipe;
