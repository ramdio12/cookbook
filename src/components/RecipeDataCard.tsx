import { useNavigate } from "react-router-dom";
import { RecipeProps } from "../pages/Home";

const RecipeDataCard = ({ id, title, photo, created_at }: RecipeProps) => {
  const date: Date = new Date();
  const publishDate: Date = new Date(created_at);
  const dateDifference = Math.abs(publishDate.getTime() - date.getTime());
  const daysPassed = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
  const day = daysPassed - 1;
  const navigate = useNavigate();

  return (
    <div
      className="overflow-hidden rounded-md cursor-pointer hover:scale-105 duration-500 ease-in-out"
      onClick={() => navigate(`/recipe/${id}/recipe`)}>
      <div className=" md:w-72 md:h-56">
        <img
          src={`https://weebmarclone.000webhostapp.com/uploads/${photo}`}
          className="w-full h-full"
        />
      </div>
      <h1 className="text-xl font-bold">{title}</h1>
      {day === 0 ? (
        <p>Posted Today</p>
      ) : (
        <p>{day === 1 ? <>Posted 1 day ago</> : <>Posted {day} days ago</>}</p>
      )}
    </div>
  );
};

export default RecipeDataCard;
