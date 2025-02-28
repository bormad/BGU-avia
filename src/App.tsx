import React from "react";

import Main from "./layouts/Main";
import Logo from "./components/ui/Logo";
import SearchParams from "./components/SearchParams";
import Body from "./components/Body";

function App() {
  return (
    <Main>
      <Logo />
      <SearchParams />
      <Body />
    </Main>
  );
}

export default App;
