import { ReactNode, useState } from "react";
import UserRecipeContext from "./UserContext";

type RecipeContextProviderProps = {
  children: ReactNode;
};

const ContextProvider = ({ children }: RecipeContextProviderProps) => {
  const [click, setClick] = useState(false);
  const [updatedPhoto, setUpdatedPhoto] = useState("");
  const [preview, setPreview] = useState("");

  //   this is for the editing of the user's or their recipe photo
  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      return setUpdatedPhoto(e.target.files[0]);
    }
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  //   for toggle
  const toggle = () => setClick((prev) => !prev);

  return (
    <UserRecipeContext.Provider
      value={{
        click,
        toggle,
        updatedPhoto,
        preview,
        handleFileChange,
      }}>
      {children}
    </UserRecipeContext.Provider>
  );
};

export default ContextProvider;
