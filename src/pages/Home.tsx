import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import RecipeDataCard from "../components/RecipeDataCard";
import errorImage from "../assets/error.png";

export type RecipeProps = {
  id: number;
  title: string;
  photo: string;
  created_at: Date;
};

const Home: React.FC = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecipe();
    cancelSearch();
    return () => {
      console.log(recipeData);
    };
  }, []);

  const getRecipe = async () => {
    try {
      setLoading(true);
      await axios
        .get(
          `https://weebmarclone.000webhostapp.com/searchRecipeByName.php?title=${recipeName}`
        )
        .then((response) => {
          const data = response.data;
          if (data) {
            setRecipeData(data);
          } else {
            setError(`Recipe not found`);
            setTimeout(() => {
              setError("");
            }, 3000);
          }
        });
      setLoading(false);
    } catch (error: any) {
      if (error.message) {
        setFetchError("Fetching problem, please refresh");
      }
    }
  };

  const cancelSearch = async () => {
    setRecipeName("");
    try {
      await axios
        .get(
          `https://weebmarclone.000webhostapp.com/searchRecipeByName.php?title=`
        )
        .then((response) => {
          const data = response.data;
          setRecipeData(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (fetchError) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen flex-col">
          <img className=" w-60" src={errorImage} alt="" />
          <h1 className="text-4xl font-bold">
            Network error, try again later!
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mx-auto text-center my-4">
        <h1 className="text-5xl font-bold">Welcome to CookBook</h1>
        <p className=" my-2">Search for your desired recipes or make one</p>
      </div>

      <div className="w-full">
        <div className=" mx-auto w-full text-center">
          <input
            type="text"
            className=" py-4 w-full mx-4 md:w-96 rounded-lg shadow-lg text-center text-xl font-semibold"
            placeholder="Search Recipes By Name..."
            value={recipeName}
            //   onChange={(e) => searchRecipe(e.target.value)}
            onChange={(e) => setRecipeName(e.target.value)}
          />

          <div className="my-4 flex gap-4 items-center justify-center">
            <button
              className="bg-blue-800 text-white p-2 rounded-md font-bold hover:bg-blue-500 duration-300 ease-in-out"
              onClick={getRecipe}>
              Search Recipe
            </button>
            <button
              className="bg-red-800 text-white p-2 rounded-md font-bold hover:bg-red-500 duration-300 ease-in-out"
              onClick={cancelSearch}>
              Clear Search
            </button>
          </div>
        </div>

        {error !== "" && (
          <div className=" bg-red-300 w-60 text-center mx-auto py-4 rounded-md my-4">
            <h1 className="text-red-800 text-2xl">{error}</h1>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Loading...Please Wait!!!</h1>
          </div>
        )}
        <div className="w-full flex flex-wrap items-center justify-center gap-6 px-8 py-8">
          {recipeData.map((recipe: RecipeProps) => (
            <RecipeDataCard key={recipe.id} {...recipe} />
          ))}
        </div>
        {/* {!fetchError ? (
          <div className="w-full flex flex-wrap items-center justify-center gap-6 px-8 py-8">
            {recipeData.map((recipe: RecipeProps) => (
              <RecipeDataCard key={recipe.id} {...recipe} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-wrap items-center justify-cente">
            <h1 className="text-2xl text-black">{fetchError}</h1>
          </div>
        )} */}
      </div>

      <ScrollToTop />
    </>
  );
};

export default Home;
