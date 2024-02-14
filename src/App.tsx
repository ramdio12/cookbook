import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Recipe from "./pages/Recipe";
import Protected from "./pages/Protected";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import UserRecipe from "./pages/UserRecipe";
import UserRecipes from "./pages/UserRecipes";
import EditUserRecipe from "./pages/EditUserRecipe";
import ContextProvider from "./context/ContextProvider";
import EditUserProfile from "./pages/EditUserProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function App() {
  const client = new QueryClient();

  return (
    <div className=" overflow-hidden">
      <QueryClientProvider client={client}>
        <ContextProvider>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={<Protected Component={Dashboard} />}
            />
            <Route
              path="/recipe/:id/recipe"
              element={<Protected Component={Recipe} />}
            />
            <Route
              path="userrecipes"
              element={<Protected Component={UserRecipes} />}
            />
            <Route
              path="/addrecipe"
              element={<Protected Component={AddRecipe} />}
            />
            <Route
              path="/profile"
              element={<Protected Component={Profile} />}
            />
            <Route
              path="/userrecipe/:id/myrecipe"
              element={<Protected Component={UserRecipe} />}
            />
            <Route
              path="/userrecipe/:id/edit"
              element={<Protected Component={EditUserRecipe} />}
            />
            <Route
              path="/userprofile/:id/edituser"
              element={<Protected Component={EditUserProfile} />}
            />
            <Route path="*" element={<Protected Component={NotFound} />} />
          </Routes>
        </ContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
