import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonFilter = () => (
  <Skeleton
    animation="wave"
    sx={{ marginBottom: "15px" }}
    variant="rectangular"
    width="100%"
    height={240}
  />
);

const SkeletonFilters = () => {
  return (
    <>
      <SkeletonFilter />
      <SkeletonFilter />
    </>
  );
};

export default SkeletonFilters;
