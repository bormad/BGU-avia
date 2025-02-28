import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Input from "../Input";
import { cities } from "../../../data/dummy";

const DISABLED_ITEM = 3;

const App = ({ disabled }: { disabled?: string }) => {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Label"
      value={value}
      setValue={setValue}
      disabled={disabled || ""}
    />
  );
};

describe("Input", () => {
  beforeEach(() => {
    render(<App disabled={cities[DISABLED_ITEM].value} />);
  });

  it("renders without crashing", () => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("changes value while typing", () => {
    const inputElem: HTMLInputElement = screen.getByRole("combobox");
    const clearButton = screen.getByTitle("Clear");

    userEvent.type(inputElem, "123");
    fireEvent.keyDown(inputElem, { key: "Enter", code: "Enter" });
    expect(inputElem).toHaveValue("123");

    fireEvent.click(clearButton);
    expect(inputElem).toHaveValue("");
  });

  it("changes value while press list item", () => {
    const inputElem: HTMLInputElement = screen.getByRole("combobox");

    fireEvent.mouseDown(inputElem);
    expect(screen.getByRole("presentation")).toBeVisible();

    const optionElems = screen.getAllByRole("option");
    fireEvent.click(optionElems[0]);
    expect(inputElem).toHaveValue(cities[0].label);
  });

  it("don't set disabled item", () => {
    const inputElem: HTMLInputElement = screen.getByRole("combobox");

    fireEvent.mouseDown(inputElem);

    const optionElem = screen.queryByText(new RegExp(/DISABLED_ITEM/i));
    expect(optionElem).not.toBeInTheDocument();
  });
});
