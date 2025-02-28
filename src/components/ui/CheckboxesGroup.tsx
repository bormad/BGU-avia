import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { checkboxesProps } from "../../data/types";

const CheckboxesGroup = ({ data, setData }: checkboxesProps) => {
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    setData({
      [key]: {
        ...data[key],
        value: event.target.checked,
      },
    });
  };

  return (
    <FormGroup>
      {Object.entries(data).map(([key, value]) => (
        <FormControlLabel
          key={key}
          control={
            <Checkbox
              checked={value.value}
              onChange={onChangeValue}
              name={key}
            />
          }
          label={value.label}
        />
      ))}
    </FormGroup>
  );
};

export default CheckboxesGroup;
