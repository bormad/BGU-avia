import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ButtonsGroup from "../ButtonsGroup";
import { sorts } from "../../../data/dummy";
import { useState } from "react";

describe("ButtonsGroup", () => {
  const App = () => {
    const [value, setValue] = useState(Object.keys(sorts)[0]);

    return <ButtonsGroup value={value} setValue={setValue} data={sorts} />;
  };

  beforeEach(() => {
    render(<App />);
  });

  it("renders with correct length of buttons", () => {
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toEqual(
      Object.keys(sorts).length
    );
  });

  it("changes active button", async () => {
    const firstButton = screen.getByText(Object.values(sorts)[0]);
    const secondButton = screen.getByText(Object.values(sorts)[1]);

    expect(firstButton).toHaveClass("Mui-selected");
    fireEvent.click(secondButton);
    expect(firstButton).not.toHaveClass("Mui-selected");
    expect(secondButton).toHaveClass("Mui-selected");
  });
});
