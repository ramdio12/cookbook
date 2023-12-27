import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import loading from "../assets/loading.png";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import ScrollToTop from "../components/ScrollToTop";

export type RecipeProps = {
  id: number;
  title: string;
  photo: string;
  username: string;
  created_at: Date;
};

const Dashboard = () => {
  const { recipes, failFetch, recipesFetchLoading } = useContext(UserContext);

  if (failFetch) {
    return (
      <>
        <Navbar />
        <h1 className="text-center text-2xl">Houston, We got a problem!!!</h1>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {recipesFetchLoading ? (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
          <h1 className=" text-4xl font-extrabold">
            Fetching All Recipes. Please Wait...{" "}
          </h1>
          <span className="mx-auto mt-4">
            <img src={loading} alt="loading" height={300} width={300} />
          </span>
        </div>
      ) : (
        <div className="w-full min-h-screen bg-neutral-200">
          <div className="w-full text-center py-5">
            <h2 className="text-4xl font-bold"> All Recipes</h2>
          </div>

          <div className="w-full flex flex-wrap items-center justify-center gap-6 px-8">
            {recipes.map((recipe: RecipeProps) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </div>
      )}
      <ScrollToTop />
    </>
  );
};

export default Dashboard;
