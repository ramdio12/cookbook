import { render, screen } from "@testing-library/react";
import Login from "./pages/Login";

test("render login component in the document", () => {
  const component = render(<Login />);
  console.log(component);
});
