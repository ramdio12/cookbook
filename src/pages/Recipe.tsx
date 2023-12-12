import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";

const Recipe = () => {
  const [username, setUsername] = useState(null);
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

  const getRecipe = async () => {
    await axios
      .get(`https://weebmarclone.000webhostapp.com/recipe_crud.php?id=${id}`)
      .then((response) => {
        const data = response.data;
        const {
          username,
          title,
          description,
          ingredients,
          instructions,
          photo,
        } = data;
        const ingredientsList = ingredients
          .split(",")
          .map((item: any) => item.trim());

        setUsername(username);
        setTitle(title);
        setDescription(description);
        setingredients(ingredientsList);
        setInstructions(instructions);
        setPhoto(photo);
      });
  };

  // const downloadPdf = () => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/*");
  //     const pdf = new jsPDF("p", "mm", "a4", true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 10;
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       imgX,
  //       imgY,
  //       imgWidth * ratio,
  //       imgHeight * ratio
  //     );
  //     pdf.save(`${title}.pdf`);
  //   });
  // };

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

              <h2 className="text-xl font-semibold">Posted by : @{username}</h2>
            </div>
            {photo && (
              <img
                src={`https://weebmarclone.000webhostapp.com/uploads/${photo}`}
                className="md:w-2/4 mx-auto"
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
