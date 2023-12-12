import { RecipeProps } from "../pages/Dashboard";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({
  id,
  title,
  photo,
  username,
  created_at,
}: RecipeProps) => {
  const navigate = useNavigate();
  const date: any = new Date();
  const publishDate: any = new Date(created_at);
  const dateDifference = Math.abs(publishDate - date);
  const daysPassed = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
  const day = daysPassed - 1;

  return (
    <div
      title="Click to see further details"
      className=" w-72 h-4/5 overflow-hidden rounded-md cursor-pointer hover:scale-105 duration-500 ease-in-out"
      onClick={() => navigate(`/recipe/${id}/recipe`)}>
      <div className=" w-72 h-52">
        <img
          src={`https://weebmarclone.000webhostapp.com/uploads/${photo}`}
          className="w-full h-full"
        />
      </div>

      <div className="w-full text-center bg-white py-2">
        <h1 className="text-xl font-semibold">{title}</h1>

        <p className=" text-base font-semibold">@{username}</p>
        {day === 0 ? (
          <p>Posted Today</p>
        ) : (
          <p>
            {day === 1 ? <>Posted 1 day ago</> : <>Posted {day} days ago</>}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
