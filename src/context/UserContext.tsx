import { createContext } from "react";
type UserProps = {
  click: boolean;
  toggle: () => void;
  updatedPhoto: string;
  preview: string;
  msg: string;
  error: string;
  handleFileChange: (e: React.FormEvent) => void;
  // recipes: never[];
  // failFetch: Error;
  // recipesFetchLoading: boolean;
  userId: number | null;
  setError: (a: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegistration: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  checkEmail: () => void;
  name: string | null;
  baseUrl: string;
};
const UserContext = createContext({} as UserProps);

export default UserContext;
