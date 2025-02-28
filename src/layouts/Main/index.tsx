import React, { ReactFragment, ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import "./styles.sass";

type Props = {
  children?: ReactNode | ReactFragment;
};

const Main = (props: Props) => {
  return (
    <div>
      <Box className="main">
        <Container maxWidth="md">
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={4}
          >
            {props.children}
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Main;
