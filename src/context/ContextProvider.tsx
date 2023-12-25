import { ReactNode, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Inputs {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

type RecipeContextProviderProps = {
  children: ReactNode;
};

const ContextProvider = ({ children }: RecipeContextProviderProps) => {
  const [click, setClick] = useState(false);
  const [updatedPhoto, setUpdatedPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername]: any = useState(null);

  const [inputs, setInputs] = useState<Inputs>({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [disable, setDisable] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  /*
  Fetching all data from localStorage such as login,loginStatus and user's id
*/
  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 3000);
    const uid: any = localStorage.getItem("id");
    const uname = localStorage.getItem("username");
    setUsername(uname);
    setUserId(uid);
  }, [msg]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "") {
      setError(`${name} is empty!`);
    } else {
      setError("");
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  /* 
    REGISTRATION,EMAIL CHECKER , USERNAME CHECKER FUNCTION SECTION
    handleRegistration - Registers a user
    checkEmail - checks email at the database, if found a match . duplication error appear
    checkUsername - same on checkEmail Function. If found a match. duplication error appear
  */

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    const url = "https://weebmarclone.000webhostapp.com/register.php";
    const { name, username, email, password }: any = inputs;

    if (!name && !username && !email && !password) {
      setError("All fields must be filled");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      try {
        await axios.post(url, formData).then((response) => {
          const status = response.data.status;
          const message = response.data.message;
          if (status === "empty") {
            setError("some fields needs to be filled");
          } else if (status === "password_error") {
            setError(message);
          } else if (status === "username_error") {
            setError(message);
          } else {
            setMsg(message);
            setTimeout(() => {
              navigate("/");
            }, 5000);
          }
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }

    setDisable(false);
  };

  const checkEmail = async () => {
    const { email }: any = inputs;
    const formData = new FormData();
    formData.append("email", email);

    await axios
      .post("https://weebmarclone.000webhostapp.com/check_email.php", formData)
      .then((response) => {
        if (response.data.status === "duplicate") {
          setError(response.data.message);
          setIsDuplicate(true);
        } else {
          setIsDuplicate(false);
        }
      });
  };

  const checkUsername = async () => {
    const { username }: any = inputs;
    const formData = new FormData();
    formData.append("username", username);
    await axios
      .post(
        "https://weebmarclone.000webhostapp.com/check_username.php",
        formData
      )
      .then((response) => {
        if (response.data.status === "duplicate") {
          setError(response.data.message);
          setIsDuplicate(true);
        } else {
          setIsDuplicate(false);
        }
      });
  };

  /*LOGIN FUNCTION*/

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "https://weebmarclone.000webhostapp.com/login.php";
    const { username, password }: any = inputs;

    if (!username && !password) {
      setError("Some of the fields are not filled");
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      try {
        await axios.post(url, formData).then((response) => {
          console.log(response);
          const status = response.data.status;
          if (status === "failed") {
            setError(response.data.message);
          } else if (status === "empty") {
            setError(response.data.message);
          } else {
            setMsg(response.data.message);
            const userId = response.data.data.id;
            const username = response.data.data.username;
            localStorage.setItem("id", userId);
            localStorage.setItem("username", username);
            setTimeout(() => {
              localStorage.setItem("login", "logged");
              navigate("/dashboard");
            }, 5000);
          }
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  /*
    FUNCTION TO FETCH USER'S DATA 
  */

  /*
 FUNCTION FOR FETCHING RECIPES MADE BY ALL USERS
*/
  const {
    data: recipes,
    error: failFetch,
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

  /*LOGIN FUNCTION*/
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
        updatedPhoto,
        preview,
        recipes,
        failFetch,
        recipesFetchLoading,
        msg,
        error,
        disable,
        isDuplicate,
        userId,
        username,
        // FUNCTION CONTEXTS
        toggle,
        handleFileChange,
        handleChange,
        handleRegistration,
        checkEmail,
        checkUsername,
        handleLogin,
        setError,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
