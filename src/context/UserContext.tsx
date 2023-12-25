import { createContext } from "react";
type UserProps = {
  click: boolean;
  toggle: () => void;
  updatedPhoto: string;
  preview: string;
  msg: string;
  error: string;
  handleFileChange: (e: any) => void;
  recipes: never[];
  failFetch: Error;
  recipesFetchLoading: boolean;
  disable: boolean;
  isDuplicate: boolean;
  userId: any;
  setError: (a: any) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegistration: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  checkEmail: () => void;
  checkUsername: () => void;
  username: string | null;
};
const UserContext = createContext({} as UserProps);

export default UserContext;
