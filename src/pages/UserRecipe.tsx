import Navbar from "../components/Navbar";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserRecipeContext from "../context/UserContext";

const UserRecipe = () => {
  const [recipeId, setRecipeId]: any = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [ingredients, setingredients] = useState([]);
  const [instructions, setInstructions] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const { click, toggle, updatedPhoto, preview, handleFileChange } =
    useContext(UserRecipeContext);
  const { id } = useParams();

  useEffect(() => {
    getMyrecipe();
  }, []);

  /*
  At the user's profile page, they can access their all recipes that has been made
  */
  const getMyrecipe = async () => {
    try {
      await axios
        // .get(`http://localhost/php_files/createAndGetRecipe.php?id=${id}`)
        .get(
          `https://weebmarclone.000webhostapp.com/createAndGetRecipe.php?id=${id}`
        )
        .then((response) => {
          console.log(response);
          const data = response.data;
          const { id, title, description, ingredients, instructions, photo } =
            data;
          const ingredientsList = ingredients
            .split(",")
            .map((item: string) => item.trim());
          setRecipeId(id);
          setTitle(title);
          setDescription(description);
          setingredients(ingredientsList);
          setInstructions(instructions);
          setPhoto(photo);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // the can also update their recipe photo

  const handleEditPhoto = async () => {
    const formData = new FormData();
    formData.set("id", recipeId);
    formData.set("photo", updatedPhoto);
    await axios
      .post(
        // `http://localhost/php_files/updateUserRecipePhoto.php/${id}`,
        `https://weebmarclone.000webhostapp.com/updateUserRecipePhoto.php/${id}`,
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
        console.log(response.data);
        if (response.data.success) {
          setMsg(response.data.success);
          setTimeout(() => {
            setMsg("");
            window.location.reload();
          }, 3000);
        } else {
          setError(response.data.error);
        }

        // const status = response.data.status;
        // const message = response.data.message;
        // switch (status) {
        //   case "large_file":
        //     setError(message);
        //     break;
        //   case "incompatible":
        //     setError(message);
        //     break;
        //   case "invalid":
        //     setError(message);
        //     break;
        //   case "failed":
        //     setError(message);
        //     break;
        //   case "success":
        //     setMsg(response.data.message);
        //     setTimeout(() => {
        //       window.location.reload();
        //     }, 3000);
        //     break;
        //   default:
        //     break;
        // }
      });
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-neutral-200">
        <div>
          <div className="w-3/4 mx-auto text-center block ">
            <div className="mb-4 pt-8">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
            </div>
            <div>
              <noscript>md:w-3/6</noscript>
              <div className=" w-5/6 md:w-96 mx-auto shadow-lg rounded-md overflow-hidden">
                {photo && (
                  <img
                    src={
                      preview
                        ? preview
                        : // : `http://localhost/php_files/recipe_uploads/${photo}`
                          `https://weebmarclone.000webhostapp.com/uploads/${photo}`
                    }
                    className="w-full "
                  />
                )}
              </div>

              <div>
                {click ? (
                  <div className="pt-2">
                    <div className=" py-4">
                      {msg !== "" ? (
                        <p className=" text-green-700 font-medium text-xl">
                          {msg}
                        </p>
                      ) : (
                        <p className=" text-red-700 font-medium text-xl">
                          {error}
                        </p>
                      )}
                    </div>

                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      onChange={handleFileChange}
                    />
                    <button
                      onClick={handleEditPhoto}
                      className=" bg-blue-700 mr-2 rounded-md text-white px-2 font-bold">
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 font-bold"
                      onClick={toggle}>
                      X
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={toggle}
                    className=" bg-red-500 text-white py-2 px-4 mt-2 rounded-md">
                    ✏ Edit my Dish Photo
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-12 md:w-3/4 mx-auto pb-6">
            <div className="text-center">
              <h2 className="text-2xl font-medium">DESCRIPTION</h2>
              <p className="text-lg">{description}</p>
            </div>
            <div className="mt-8 ">
              <h3 className="text-center text-2xl font-medium mb-4">
                INGREDIENTS:
              </h3>

              {ingredients.map((ingredient, index) => (
                <li key={index} className="ml-4">
                  {ingredient}
                </li>
              ))}
            </div>

            <div className=" px-6 mt-8">
              <h3 className="text-center text-2xl font-medium mb-4">
                INSTRUCTIONS:
              </h3>
              <p className="text-md leading-7">{instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRecipe;
