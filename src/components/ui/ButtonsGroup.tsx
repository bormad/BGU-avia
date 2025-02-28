import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { buttonsGroupProps } from "../../data/types";

const ButtonsGroup = ({ value, data, setValue }: buttonsGroupProps) => {
  const onButtonClick = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setValue(newValue);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={onButtonClick}
      className="buttonsGroup"
    >
      {Object.entries(data).map(([key, value]) => (
        <ToggleButton key={key} value={key} className="buttonsGroup__item">
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ButtonsGroup;
