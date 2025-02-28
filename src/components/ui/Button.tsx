import React, { ReactFragment, ReactNode } from "react";
import Button from "@mui/material/Button";

const CustomButton = (props: {
  children?: ReactNode | ReactFragment;
  onButtonClick?: () => void;
}) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={props.onButtonClick}
        className="button"
      >
        {props.children}
      </Button>
    </>
  );
};

export default CustomButton;
