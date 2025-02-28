import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CustomButton from "../Button";

describe("Button", () => {
  render(<CustomButton>Click me</CustomButton>);

  it("renders without crashing", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/click/i);
  });
});
