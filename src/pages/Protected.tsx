import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
  Components are protected from outsiders, A  guest will be redirected to authentication page before entering the protected components

*/
const Protected = (props: { Component: any }) => {
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    let login = localStorage.getItem("login");
    if (!login) {
      localStorage.setItem("loginStatus", "Please login first");
      navigate("/", { replace: true });
    }
  }, []);

  return <Component />;
};

export default Protected;
