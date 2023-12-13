import { createContext } from "react";
type UserRecipeProps = {
  click: boolean;
  toggle: () => void;
  updatedPhoto: string;
  preview: string;
  handleFileChange: (e: any) => void;
  recipes: never[];
  error: Error;
  isLoading: boolean;
};
const UserRecipeContext = createContext({} as UserRecipeProps);

export default UserRecipeContext;
