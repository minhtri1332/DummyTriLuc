import React, { memo } from "react";
import styled from "styled-components/native";
import { IC_LOGO_LOGIN } from "@/assets";

const SImage = styled.Image`
  width: 100%;
  height: 120px;
`;

export const Logo = memo(() => {
  return <SImage source={IC_LOGO_LOGIN} />;
});
