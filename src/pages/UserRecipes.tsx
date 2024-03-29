import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import foodPic from "../assets/Food Service.png";

const UserRecipes = () => {
  const [userRecipe, setUserRecipe] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = userRecipe.slice(firstIndex, lastIndex);
  const npage = Math.ceil(userRecipe.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const navigate = useNavigate();

  useEffect(() => {
    const uid: any = localStorage.getItem("id");
    getUserRecipe(uid);
  }, []);

  /*
  As the user visits their peofile page, they will also able to see their recipes
  */
  async function getUserRecipe(userId: number) {
    await axios
      // .get(`http://localhost/php_files/userRecipes.php?users_id=${userId}`)
      .get(
        `https://weebmarclone.000webhostapp.com/userRecipes.php?users_id=${userId}`
      )
      .then(function (response) {
        setUserRecipe(response.data);
      });
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCurrentPage = (n: number) => {
    setCurrentPage(n);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" relative md:flex min-h-screen bg-neutral-600">
        <div className="w-full ">
          <h1 className="text-center text-4xl font-bold my-4 text-white ">
            Manage Recipes
          </h1>

          <div className="mx-auto  flex flex-col items-center justify-center">
            {records.length > 0 ? (
              <>
                <table className="shadow-2xl font-[poppins] md:w-10/12 text-center bg-white rounded-xl overflow-hidden mx-auto">
                  <thead className="text-xl border-solid border-2">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Date Created</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map(({ id, title, created_at }) => (
                      <tr
                        key={id}
                        className="border-2 border-solid  divide-black">
                        <td className="py-4 text-lg md:text-2xl">{title}</td>
                        <td className="py-4 md:text-xl">{created_at}</td>
                        <td className="flex pt-2 pr-2 gap-2 ">
                          <button
                            onClick={() => navigate(`/userrecipe/${id}/edit`)}
                            className=" p-2 w-full bg-sky-600 hover:bg-sky-800  text-white rounded-lg ">
                            <FontAwesomeIcon icon={faPenToSquare} /> Edit
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/userrecipe/${id}/myrecipe`)
                            }
                            className=" p-2 w-full bg-green-500 hover:bg-green-800  text-white rounded-lg whitespace-nowrap">
                            <FontAwesomeIcon icon={faEye} /> Show
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ul className="flex mt-6 ">
                  <li className="px-2 text-xl text-white">
                    <button onClick={previousPage}>Previous</button>
                  </li>
                  {numbers.map((n, id) => (
                    <li
                      key={id}
                      className={` ${
                        currentPage === n ? "bg-blue-500 text-white" : ""
                      } w-6 text-center font-medium`}>
                      <button onClick={() => changeCurrentPage(n)}>{n}</button>
                    </li>
                  ))}
                  <li className="px-2 text-xl text-white">
                    <button onClick={nextPage}>Next</button>
                  </li>
                </ul>
              </>
            ) : (
              <div className="bg-white p-8 rounded-lg">
                <div>
                  <img src={foodPic} alt="food pic" className="w-60" />
                </div>
                <h1 className="font-semibold">
                  You have no recipe yet. Add some today!
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRecipes;
