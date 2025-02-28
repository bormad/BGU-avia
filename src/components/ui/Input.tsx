import React from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { cities } from "../../data/dummy";

const getCity = (value: string) =>
  cities.find((city) => city.value === value) || null;

const Input = ({
  label,
  value,
  disabled = "",
  setValue,
}: {
  label: string;
  value: string;
  disabled?: string;
  setValue: (newValue: string) => void;
}) => {
  return (
    <Autocomplete
      freeSolo
      value={getCity(value) || ""}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          const city = getCity(newValue);
          setValue(city ? city.value : "");
        } else if (newValue && newValue.value) {
          setValue(newValue.value);
        } else {
          setValue("");
        }
      }}
      options={cities.filter((city) => city.value !== disabled)}
      getOptionDisabled={(option) =>
        disabled !== "" && disabled === option.value
      }
      renderOption={(props, option) => (
        <li {...props}>{`${option.label} (${option.value})`}</li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          id="outlined-basic"
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default Input;
