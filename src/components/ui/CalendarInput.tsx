import React from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";

const CalendarInput = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: number | null;
  setValue: (newDate: number | null) => void;
}) => {
  const handleChange = (newValue: Date | null) => {
    setValue(newValue ? newValue.getTime() : newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
      <DesktopDatePicker
        label={label}
        inputFormat="d MMMM, cccccc"
        value={value}
        onChange={handleChange}
        disableMaskedInput
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CalendarInput;
