import { createContext } from "react";
type UserProps = {
  click: boolean;
  toggle: () => void;
  updatedPhoto: string;
  preview: string;
  handleFileChange: (e: any) => void;
  recipes: never[];
  error: Error;
  recipesFetchLoading: boolean;
  userId: any;
};
const UserContext = createContext({} as UserProps);

export default UserContext;
