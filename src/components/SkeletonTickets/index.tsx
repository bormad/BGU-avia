import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonTicket = () => (
  <Skeleton
    animation="wave"
    sx={{ marginBottom: "15px" }}
    variant="rectangular"
    width="100%"
    height={160}
  />
);

const SkeletonTickets = () => {
  return (
    <>
      <SkeletonTicket />
      <SkeletonTicket />
      <SkeletonTicket />
      <SkeletonTicket />
      <SkeletonTicket />
    </>
  );
};

export default SkeletonTickets;
