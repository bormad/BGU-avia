import React, { useMemo } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckboxesGroup from "../ui/CheckboxesGroup";
import RadioButtonsGroup from "../ui/RadioButtonsGroup";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store";
import { setCompany, setTransfers } from "../../redux/filterSlice";

import "./styles.sass";
import transformCompanies from "../../utils/transformCompanies";

const Filters = () => {
  const company = useSelector((state: RootState) => state.filters.company);
  const transfers = useSelector((state: RootState) => state.filters.transfers);
  const companies = useSelector((state: RootState) => state.companies.entities);
  const dispatch = useDispatch();

  const transformedCompanies = useMemo(
    () => transformCompanies(companies),
    [companies]
  );

  return (
    <Stack direction="column" spacing={2}>
      <Card>
        <CardContent>
          <p className="filters__title">Количество пересадок</p>
          <CheckboxesGroup
            data={transfers}
            setData={(newData) => dispatch(setTransfers(newData))}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <p className="filters__title">Компания</p>
          <RadioButtonsGroup
            state={company}
            data={transformedCompanies}
            setData={(newState) => dispatch(setCompany(newState))}
          />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Filters;
