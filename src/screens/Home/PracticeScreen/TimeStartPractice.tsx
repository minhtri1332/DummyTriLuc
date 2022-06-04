import React, { memo, useEffect, useState } from "react";
import { Stopwatch } from "react-native-stopwatch-timer";

interface TimeStartPracticeProps {
  stopTime: number;
  replay?: boolean;
  onReplay?: (replay: boolean) => void;
}

export const TimeStartPractice = memo(function TimeStartPractice({
  stopTime,
  replay,
  onReplay,
}: TimeStartPracticeProps) {
  const [dt, setDt] = useState(0);

  useEffect(() => {
    setDt(0);
  }, [replay, setDt]);

  return (
    <Stopwatch
      laps
      msecs
      start={true}
      reset={false}
      options={{}}
      getTime={setDt}
    />
  );
});

export default TimeStartPractice;
