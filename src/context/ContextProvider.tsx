import { ReactNode, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type RecipeContextProviderProps = {
  children: ReactNode;
};

const ContextProvider = ({ children }: RecipeContextProviderProps) => {
  const [click, setClick] = useState(false);
  const [updatedPhoto, setUpdatedPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch the user's ID to use it everywhere
  useEffect(() => {
    const uid: any = localStorage.getItem("id");
    setUserId(uid);
  }, []);

  // fetching all the users recipes on the homepage
  const {
    data: recipes,
    error,
    isLoading: recipesFetchLoading,
  }: any = useQuery({
    queryKey: ["recipe"],
    queryFn: async () =>
      await axios
        .get(`https://weebmarclone.000webhostapp.com/get_all_user_recipes.php`)
        .then((response) => {
          return response.data;
        }),
    refetchInterval: 1000,
  });

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
    <UserContext.Provider
      value={{
        click,
        toggle,
        updatedPhoto,
        preview,
        handleFileChange,
        recipes,
        error,
        recipesFetchLoading,

        userId,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
