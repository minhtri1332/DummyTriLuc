import React, { memo } from "react";
import { ScreenWrapper } from "@/common/CommonStyles";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import RadarChartHome from "@/screens/Home/components/RadarChartHome";

export const QRCodeScanScreen = memo(function QRCodeScanScreen() {
  return (
    <ScreenWrapper>
      <DynamicHeader title={"QR"} />
    </ScreenWrapper>
  );
});

export default QRCodeScanScreen;
