// import Navbar from "../components/Navbar";
// import RecipeCard from "../components/RecipeCard";
// import loading from "../assets/loading.png";
// import { useContext } from "react";
// import UserContext from "../context/UserContext";
// import ScrollToTop from "../components/ScrollToTop";

// /*

// This Page is for Preference and a practice area for using tanstack-query in which we can fetch data even without using useEffect Hook
// */

// export type RecipeProps = {
//   id: number;
//   title: string;
//   photo: string;
//   name: string;
//   created_at: Date;
// };

// const Dashboard = () => {
//   const { recipes, failFetch, recipesFetchLoading } = useContext(UserContext);

//   if (failFetch) {
//     return (
//       <>
//         <Navbar />
//         <h1 className="text-center text-2xl">Houston, We got a problem!!!</h1>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       {recipesFetchLoading ? (
//         <div className="flex flex-col items-center justify-center w-full min-h-screen bg-neutral-600">
//           <h1 className=" text-4xl font-extrabold text-white">
//             Fetching All Recipes. Please Wait...{" "}
//           </h1>
//           <span className="mx-auto mt-4">
//             <img src={loading} alt="loading" height={300} width={300} />
//           </span>
//         </div>
//       ) : (
//         <div className="w-full min-h-screen bg-neutral-600">
//           <div className="w-full text-center py-5">
//             <h2 className="text-4xl font-bold text-white"> All Recipes</h2>
//           </div>

//           <div className="w-full flex flex-wrap items-center justify-center gap-6 px-8">
//             {recipes.map((recipe: RecipeProps) => (
//               <RecipeCard key={recipe.id} {...recipe} />
//             ))}
//           </div>
//         </div>
//       )}
//       <ScrollToTop />
//     </>
//   );
// };

// export default Dashboard;
