import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { radioBtnsProps } from "../../data/types";

const RadioButtonsGroup = ({ state, data, setData }: radioBtnsProps) => {
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={state}
        onChange={onChangeValue}
      >
        {Object.entries(data).map(([key, value]) => (
          <FormControlLabel
            key={key}
            value={key}
            control={<Radio />}
            label={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
