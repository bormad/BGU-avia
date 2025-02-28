import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Logo from "../Logo";

describe("Button", () => {
  render(<Logo />);

  it("renders without crashing", () => {
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });
});
