import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "@/global";
import { Colors } from "@/themes/Colors";
import { Stopwatch } from "react-native-stopwatch-timer";
import _ from "lodash";

export interface practiceProps {
  practice: any;
  dataMapTime: any[];
  replay: boolean;
  restart: boolean;
}

const PointHitComponent = memo(function PointHitComponent({
  practice,
  dataMapTime,
  replay,
  restart,
}: practiceProps) {
  const [dt, setDt] = useState(0);
  const pointObject = useMemo(() => {
    if (dt == 0) return { point: 0, position: 0 };
    const key = String(dt).split(":");
    const data = key[0] + ":" + key[1] + ":" + key[2];
    // @ts-ignore
    const actionCurrent = dataMapTime[data];

    return { point: actionCurrent?.f, position: actionCurrent?.p };
  }, [dt, dataMapTime]);

  useEffect(() => {
    setDt(0);
  }, [replay, setDt, practice]);

  return (
    <SViewContainerHitPoint>
      <ItemHitPointTop
        point={pointObject.point}
        position={pointObject.position == 1}
      />
      <SViewHitPointLeftRight>
        <ItemHitPointLeft
          point={pointObject.point}
          position={pointObject.position == 2}
        />
        <ItemHitPointRight
          point={pointObject.point}
          position={pointObject.position == 3}
        />
      </SViewHitPointLeftRight>
      <ItemHitPointBottom
        point={pointObject.point}
        position={pointObject.position == 4}
      />
      <Stopwatch
        laps
        start={!replay}
        reset={restart}
        options={{ container: { width: 0 } }}
        getTime={setDt}
      />
    </SViewContainerHitPoint>
  );
});

export default PointHitComponent;

const SViewHitPoint = styled.View<{ isHighLight: boolean }>`
  height: 40px;
  width: 40px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isHighLight ? Colors.orange1 : Colors.red1 + "20"};
  border-width: 1px;
  border-color: darkred;
`;

const SViewHitPointLeft = styled(SViewHitPoint)`
  margin-right: 100px;
`;

const SViewHitPointLeftRight = styled.View`
  flex-direction: row;
`;

const SViewContainerHitPoint = styled.View`
  height: 150px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 140px;
  right: 10px;
`;

const STextHitPoint = styled.Text`
  font-family: Roboto-Medium;
  font-size: 13px;
  color: ${Colors.red1};
`;

interface ItemHitPointProps {
  point: any;
  position: boolean;
}

const ItemHitPointTop = memo(function ItemHitPointTop({
  point,
  position,
}: ItemHitPointProps) {
  const [currentPoint, setCurrentPoint] = useState(0);

  const hideActive = useCallback(
    _.debounce(() => {
      setCurrentPoint(0);
    }, 500),
    []
  );

  useEffect(() => {
    if (position) {
      setCurrentPoint(point);
    }
    hideActive();
  }, [point, position]);

  return (
    <SViewHitPoint isHighLight={currentPoint != 0}>
      <STextHitPoint>{currentPoint || ""}</STextHitPoint>
    </SViewHitPoint>
  );
});

const ItemHitPointBottom = memo(function ItemHitPointBottom({
  point,
  position,
}: ItemHitPointProps) {
  const [currentPoint, setCurrentPoint] = useState(0);

  const hideActive = useCallback(
    _.debounce(() => {
      setCurrentPoint(0);
    }, 500),
    []
  );

  useEffect(() => {
    if (position) {
      setCurrentPoint(point);
    }
    hideActive();
  }, [point, position]);

  return (
    <SViewHitPoint isHighLight={currentPoint != 0}>
      <STextHitPoint>{currentPoint || ""}</STextHitPoint>
    </SViewHitPoint>
  );
});

const ItemHitPointLeft = memo(function ItemHitPointLeft({
  point,
  position,
}: ItemHitPointProps) {
  const [currentPoint, setCurrentPoint] = useState(0);

  const hideActive = useCallback(
    _.debounce(() => {
      setCurrentPoint(0);
    }, 500),
    []
  );

  useEffect(() => {
    if (position) {
      setCurrentPoint(point);
    }
    hideActive();
  }, [point, position]);

  return (
    <SViewHitPointLeft isHighLight={currentPoint != 0}>
      <STextHitPoint>{currentPoint || ""}</STextHitPoint>
    </SViewHitPointLeft>
  );
});

const ItemHitPointRight = memo(function ItemHitPointRight({
  point,
  position,
}: ItemHitPointProps) {
  const [currentPoint, setCurrentPoint] = useState(0);

  const hideActive = useCallback(
    _.debounce(() => {
      setCurrentPoint(0);
    }, 500),
    []
  );

  useEffect(() => {
    if (position) {
      setCurrentPoint(point);
    }
    hideActive();
  }, [point, position]);

  return (
    <SViewHitPoint isHighLight={currentPoint != 0}>
      <STextHitPoint>{currentPoint || ""}</STextHitPoint>
    </SViewHitPoint>
  );
});
