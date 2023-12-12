import { createContext } from "react";
type UserRecipeProps = {
  click: boolean;
  toggle: () => void;
  updatedPhoto: string;
  preview: string;
  handleFileChange: (e: any) => void;
};
const UserRecipeContext = createContext({} as UserRecipeProps);

export default UserRecipeContext;
