import React from "react";
import LogoSrc from "../../assets/Logo.svg";

import "./styles.sass";

const Logo = () => {
  return (
    <div className="logo logo_circle logo_withShadow">
      <img src={LogoSrc} alt="Logo" />
    </div>
  );
};

export default Logo;
