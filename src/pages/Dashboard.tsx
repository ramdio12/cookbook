import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import loading from "../assets/loading.png";

export type RecipeProps = {
  id: number;
  title: string;
  description: string;
  photo: string;
  username: string;
  created_at: Date;
};

const Dashboard = () => {
  const {
    data: recipes,
    error,
    isLoading,
  }: any = useQuery({
    queryKey: ["recipe"],
    queryFn: async () =>
      await axios
        .get(`https://weebmarclone.000webhostapp.com/get_all_user_recipes.php`)
        .then((response) => {
          return response.data;
        }),
  });

  if (error) {
    return <h1>Error man</h1>;
  }

  return (
    <>
      <Navbar />

      {isLoading ? (
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
    </>
  );
};

export default Dashboard;
