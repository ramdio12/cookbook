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
  const date: Date = new Date();
  const publishDate: Date = new Date(created_at);
  const dateDifference = Math.abs(publishDate.getTime() - date.getTime());
  const daysPassed = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
  const day = daysPassed - 1;

  return (
    <div
      title={`View ${title}`}
      className=" md:w-72 md:h-84 overflow-hidden rounded-md cursor-pointer hover:scale-105 duration-500 ease-in-out"
      onClick={() => navigate(`/recipe/${id}/recipe`)}>
      <div className=" md:w-72 md:h-56">
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
