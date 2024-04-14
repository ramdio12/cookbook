import { ReactNode, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
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
  const [name, setName] = useState<string | null>(null);

  const [inputs, setInputs] = useState<Inputs>({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const url = "https://weebmarclone.000webhostapp.com/";
  /*
  Fetching all data from localStorage such as login,loginStatus and user's id
*/
  useEffect(() => {
    setTimeout(() => {
      setMsg("");
    }, 4000);
    setTimeout(() => {
      setError("");
    }, 4000);

    const uid: any = localStorage.getItem("id");
    const usersname = localStorage.getItem("name");
    setName(usersname);
    setUserId(uid);
  }, [msg, error]);

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

    // const url = "http://localhost/php_files/registerUser.php";
    const url = "https://weebmarclone.000webhostapp.com/registerUser.php";
    const { name, confirm_password, email, password }: any = inputs;

    if (!name || !confirm_password || !email || !password) {
      setError("Fill all the fields please!");
    } else if (confirm_password !== password) {
      setError("Passwords do not matched!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      try {
        await axios.post(url, formData).then((response) => {
          if (response.data.success) {
            setMsg(response.data.success);
            setInputs({});
            setTimeout(() => {
              navigate("/");
            }, 5000);
          } else {
            setError(response.data.error);
          }
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  /*
    Check Email and check username functions will remind the user to input a unique email address, even if they were able to submit it, the backend server will handle it and send it back to the user  along with the error messages
  */
  const checkEmail = async () => {
    const { email }: any = inputs;
    const formData = new FormData();
    formData.append("email", email);

    await axios
      .post("https://weebmarclone.000webhostapp.com/check_email.php", formData)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        }
      });
  };

  /*LOGIN FUNCTION*/

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const url = "http://localhost/php_files/loginUser.php";
    const url = "https://weebmarclone.000webhostapp.com/loginUser.php";
    const { email, password }: any = inputs;

    if (!email && !password) {
      setError("All fields must be filled!");
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      try {
        await axios.post(url, formData).then((response) => {
          if (response.data.success) {
            setMsg(response.data.success);
            const userId = response.data.data.id;
            const usersname = response.data.data.name;

            localStorage.setItem("id", userId);
            localStorage.setItem("name", usersname);

            setTimeout(() => {
              localStorage.setItem("login", "logged");
              navigate("/home");
            }, 5000);
          } else {
            setError(response.data.error);
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
 This is also a practice area or preference for fetching all users data
 We are Using Home.tsx Component instead of Dashboard.tsx Component for now
*/
  // const {
  //   data: recipes,
  //   error: failFetch,
  //   isLoading: recipesFetchLoading,
  // }: any = useQuery({
  //   queryKey: ["recipe"],
  //   queryFn: async () =>
  //     await axios
  //       .get(`https://weebmarclone.000webhostapp.com/allRecipes.php`)
  //       .then((response) => {
  //         return response.data;
  //       }),
  //   refetchInterval: 1000,
  // });

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
        // recipes,
        // failFetch,
        // recipesFetchLoading,
        msg,
        error,
        userId,
        name,
        url,
        // FUNCTION CONTEXTS
        toggle,
        handleFileChange,
        handleChange,
        handleRegistration,
        checkEmail,
        handleLogin,
        setError,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
