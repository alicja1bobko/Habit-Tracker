import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../components/notLogged/Navbar";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/",
    };
  },
}));

describe("Navbar", () => {
  it("change active Sign In color to purple", () => {
    render(<Navbar />);
    const signInNavElement = screen.getByRole("menuitem", { name: /Sign In/i });
    fireEvent.click(signInNavElement);
    expect(signInNavElement).toHaveStyle("color: rgb(192 132 252)");
  });

  it("change active Sign Up color to purple", () => {
    render(<Navbar />);
    const signInNavElement = screen.getByRole("menuitem", {
      name: /Sign Up/i,
    });
    fireEvent.click(signInNavElement);
    expect(signInNavElement).toHaveStyle("color: rgb(192 132 252)");
  });
});
