import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Homepage", () => {
  it("should be a link that has href value to /sign-up", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /Get Started/i });

    expect(link).toHaveAttribute("href", "/sign-up");
  });
});
