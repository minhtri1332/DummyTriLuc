import React, { memo, useEffect, useState } from "react";
import { Text } from "react-native";
import moment from "moment";

interface TimeStartPracticeProps {
  stopTime: number;
}

export const TimeStartPractice = memo(function TimeStartPractice({
  stopTime,
}: TimeStartPracticeProps) {
  const [dt, setDt] = useState(0);
  useEffect(() => {
    if (stopTime == 0 || stopTime / 10000 > dt) {
      let secTimer = setInterval(async () => {
        setDt(dt + 1000);
      }, 1000);

      return () => clearInterval(secTimer);
    }
  }, [dt, stopTime]);

  return <Text>{moment(dt || 0).format("mm:ss")}</Text>;
});

export default TimeStartPractice;
