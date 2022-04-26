import React, { memo, useEffect, useState } from "react";
import { Text, View } from "react-native";
import _ from "lodash";
import moment from "moment";

export const Test = memo(function Test() {
  const [dt, setDt] = useState(example.start_time2);
  const data = _.keyBy(example.data, function (o) {
    return String(moment(o.t).format("HH:mm:ss"));
  });

  console.log(
    moment(82402).format("HH:mm:ss"),
    moment(dt).format("HH:mm:ss"),
    data[moment(dt).format("HH:mm:ss")]
  );

  useEffect(() => {
    if (example.end_time / 10000 > dt) {
      let secTimer = setInterval(async () => {
        setDt(dt + 1000);
      }, 1000);

      return () => clearInterval(secTimer);
    }
  }, [dt, example.end_time]);

  return (
    <View
      style={{
        height: 50,
        width: "100%",
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>asd</Text>
    </View>
  );
});

export default Test;

const example = {
  mode: 5,
  start_time1: 1650697385,
  start_time2: 82402,
  user_id: "64d91c69-6ebb-4b3e-afa1-a32bc54071aa",
  boxid: "nodeesp32",
  data: [
    { f: 20.14, p: 4, t: 85302, o: 1 },
    { f: 20.14, p: 2, t: 88026, o: 1 },
    { f: 20.14, p: 2, t: 89061, o: 1 },
    { f: 20.14, p: 2, t: 89774, o: 1 },
    { f: 20.14, p: 4, t: 89846, o: 1 },
    { f: 20.14, p: 2, t: 90116, o: 1 },
    { f: 20.14, p: 4, t: 90418, o: 1 },
    { f: 20.14, p: 2, t: 90660, o: 1 },
    { f: 20.14, p: 4, t: 90812, o: 1 },
    { f: 20.14, p: 4, t: 90965, o: 1 },
    { f: 20.14, p: 4, t: 91740, o: 1 },
    { f: 20.14, p: 2, t: 91842, o: 1 },
    { f: 20.14, p: 4, t: 91907, o: 1 },
    { f: 20.14, p: 4, t: 92956, o: 1 },
    { f: 20.14, p: 1, t: 93028, o: 1 },
    { f: 20.14, p: 4, t: 93334, o: 1 },
    { f: 20.14, p: 2, t: 93537, o: 1 },
    { f: 20.14, p: 2, t: 94534, o: 1 },
    { f: 20.14, p: 4, t: 94596, o: 1 },
    { f: 20.14, p: 1, t: 112674, o: 1 },
    { f: 20.14, p: 2, t: 112753, o: 1 },
    { f: 20.14, p: 2, t: 113058, o: 1 },
    { f: 20.14, p: 4, t: 113091, o: 1 },
    { f: 20.14, p: 2, t: 113345, o: 1 },
    { f: 20.14, p: 4, t: 113660, o: 1 },
    { f: 20.14, p: 2, t: 113966, o: 1 },
    { f: 20.14, p: 4, t: 114271, o: 1 },
    { f: 20.14, p: 2, t: 114578, o: 1 },
    { f: 20.14, p: 2, t: 114847, o: 1 },
    { f: 20.14, p: 2, t: 115164, o: 1 },
    { f: 20.14, p: 2, t: 115425, o: 1 },
    { f: 20.14, p: 4, t: 115489, o: 1 },
    { f: 20.14, p: 2, t: 115970, o: 1 },
    { f: 20.14, p: 2, t: 116285, o: 1 },
    { f: 20.14, p: 2, t: 116600, o: 1 },
    { f: 20.14, p: 2, t: 116916, o: 1 },
    { f: 20.14, p: 2, t: 117275, o: 1 },
    { f: 20.14, p: 4, t: 117345, o: 1 },
    { f: 20.14, p: 2, t: 117609, o: 1 },
    { f: 20.14, p: 4, t: 117671, o: 1 },
    { f: 20.14, p: 2, t: 117974, o: 1 },
    { f: 20.14, p: 2, t: 118341, o: 1 },
    { f: 20.14, p: 4, t: 118377, o: 1 },
    { f: 20.14, p: 2, t: 118736, o: 1 },
    { f: 20.14, p: 2, t: 119101, o: 1 },
    { f: 20.14, p: 2, t: 120424, o: 1 },
    { f: 20.14, p: 1, t: 121371, o: 1 },
    { f: 20.14, p: 2, t: 121849, o: 1 },
    { f: 20.14, p: 2, t: 122477, o: 1 },
    { f: 20.14, p: 4, t: 122539, o: 1 },
    { f: 20.14, p: 1, t: 122966, o: 1 },
    { f: 20.14, p: 1, t: 123580, o: 1 },
    { f: 20.14, p: 1, t: 123644, o: 1 },
    { f: 20.14, p: 2, t: 123953, o: 1 },
    { f: 20.14, p: 2, t: 124281, o: 1 },
    { f: 20.14, p: 2, t: 124720, o: 1 },
    { f: 20.14, p: 1, t: 124759, o: 1 },
    { f: 20.14, p: 2, t: 126512, o: 1 },
    { f: 20.14, p: 1, t: 126574, o: 1 },
    { f: 20.14, p: 1, t: 127015, o: 1 },
    { f: 20.14, p: 4, t: 127382, o: 1 },
  ],
  end_time: 1650697430,
};
