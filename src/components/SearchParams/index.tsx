import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Input from "../ui/Input";
import CalendarInput from "../ui/CalendarInput";
import { IconButton } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import type { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setOrigin,
  setDestination,
  switchPlaces,
  setDateEnd,
  setDateStart,
} from "../../redux/filterSlice";

const SearchParams = () => {
  const { origin, destination, dateStart, dateEnd } = useSelector(
    (state: RootState) => state.filters
  );
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          gap: "5px",
          paddingLeft: "15px",
        }}
      >
        <Paper sx={{ position: "relative", flex: 1 }}>
          <Input
            label="Откуда"
            value={origin}
            disabled={destination}
            setValue={(newValue) => dispatch(setOrigin(newValue))}
          />
          <IconButton
            sx={{
              position: "absolute",
              left: "calc(100% + 2px)",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
            color="primary"
            onClick={() => dispatch(switchPlaces())}
          >
            <ChangeCircleIcon fontSize="large" />
          </IconButton>
        </Paper>
        <Paper sx={{ flex: 1 }}>
          <Input
            label="Куда"
            value={destination}
            disabled={origin}
            setValue={(newValue) => dispatch(setDestination(newValue))}
          />
        </Paper>
        <Paper sx={{ flex: 1 }}>
          <CalendarInput
            label="Когда"
            value={dateStart}
            setValue={(newValue) => dispatch(setDateStart(newValue))}
          />
        </Paper>
        <Paper sx={{ flex: 1 }}>
          <CalendarInput
            label="Обратно"
            value={dateEnd}
            setValue={(newValue) => dispatch(setDateEnd(newValue))}
          />
        </Paper>
      </Stack>
    </Box>
  );
};

export default SearchParams;
