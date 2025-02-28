import React, { useCallback, useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import Filters from "../Filters";
import SkeletonTickets from "../SkeletonTickets";
import Tickets from "../Tickets";
import ButtonsGroup from "../ui/ButtonsGroup";

import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/companiesSlice";
import { setSortType } from "../../redux/filterSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchTickets } from "../../redux/ticketsSlice";
import sortTickets from "../../utils/sortTickets";
import { sorts } from "../../data/dummy";
import SkeletonFilters from "../SkeletonFilters";

const Body = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const { entities, loading } = useSelector(
    (state: RootState) => state.tickets
  );
  const { loading: loadingCompanies } = useSelector(
    (state: RootState) => state.companies
  );
  const dispatch = useDispatch<AppDispatch>();

  const sortedTickets = useMemo(
    () => sortTickets(entities, filters),
    [entities, filters]
  );

  useEffect(() => {
    dispatch(fetchTickets());
    dispatch(fetchCompanies());
    // eslint-disable-next-line
  }, []);

  const FiltersContent = useCallback(() => {
    switch (loadingCompanies) {
      case "rejected":
        return (
          <h3 className="tickets__empty">
            Ошибка загрузки! Перезагрузите страницу!
          </h3>
        );
      case "fulfilled":
        return <Filters />;
      case "idle":
      case "pending":
      default:
        return <SkeletonFilters />;
    }
  }, [loadingCompanies]);

  const TicketsContent = useCallback(() => {
    switch (loading) {
      case "rejected":
        return (
          <h3 className="tickets__empty">
            Ошибка загрузки! Перезагрузите страницу!
          </h3>
        );
      case "fulfilled":
        return <Tickets tickets={sortedTickets} />;
      case "idle":
      case "pending":
      default:
        return <SkeletonTickets />;
    }
  }, [loading, sortedTickets]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FiltersContent />
      </Grid>

      <Grid item xs={8}>
        <ButtonsGroup
          value={filters.sortType}
          data={sorts}
          setValue={(newData) => dispatch(setSortType(newData))}
        />
        <TicketsContent />
      </Grid>
    </Grid>
  );
};

export default Body;
