import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";

const Recipe = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [ingredients, setingredients] = useState([]);
  const [instructions, setInstructions] = useState(null);
  const [photo, setPhoto] = useState(null);
  const pdfRef: any = useRef();

  const { id } = useParams();

  useEffect(() => {
    getRecipe();
  }, []);

  // when the user click a recipe card, they will be redirected in this page
  // a specific recipe will be displayed
  const getRecipe = async () => {
    await axios
      // .get(`http://localhost/php_files/createAndGetRecipe.php?id=${id}`)
      .get(
        `https://weebmarclone.000webhostapp.com/createAndGetRecipe.php?id=${id}`
      )
      .then((response) => {
        const data = response.data;
        const { name, title, description, ingredients, instructions, photo } =
          data;

        const ingredientsList = ingredients
          .split(",")
          .map((item: string) => item.trim());

        setName(name);
        setTitle(title);
        setDescription(description);
        setingredients(ingredientsList);
        setInstructions(instructions);
        setPhoto(photo);
      });
  };

  // this will split the user's name. each first letter of first name and last name will be capitalized
  const capitalizedName = () => {
    const splitName = name.split(" ");
    let x = [];

    for (let i = 0; i < splitName.length; i++) {
      x[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1);
    }
    return x.join(" ");
  };

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: `${title}`,
  });

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-neutral-200">
        <div ref={pdfRef}>
          <div className="w-3/4 mx-auto text-center block ">
            <div className="mb-4 pt-8">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>

              <h2 className="text-xl font-semibold">
                Posted by : {capitalizedName()}
              </h2>
            </div>
            {photo && (
              // a photo will be fetched from the database
              <img
                // src={`https://weebmarclone.000webhostapp.com/uploads/${photo}`}
                src={`https://weebmarclone.000webhostapp.com/uploads/${photo}`}
                className="md:w-2/4 mx-auto shadow-lg rounded-md overflow-hidden"
              />
            )}
          </div>
          <div className="mt-12 md:w-3/4 mx-auto pb-6">
            <div className="text-center">
              <h2 className="text-2xl font-medium">DESCRIPTION</h2>
              <p className="text-lg px-2">{description}</p>
            </div>
            <div className="pl-6 mt-6">
              <h3 className="text-center text-2xl font-medium mb-4">
                INGREDIENTS:
              </h3>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </div>

            <div className="px-6 mt-6">
              <h3 className="text-center text-2xl font-medium mb-4">
                INSTRUCTIONS:
              </h3>
              <p className="text-md leading-7">{instructions}</p>
            </div>
          </div>
        </div>
        <div className="pb-4 w-full flex justify-center">
          <button
            className="bg-red-500 text-white font-medium px-6 py-2"
            onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} />
            <span className="ml-2">Export as PDF</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Recipe;
