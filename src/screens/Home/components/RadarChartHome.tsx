import React, { memo } from "react";
import { RadarChart } from "react-native-charts-wrapper";
import { processColor, StyleSheet, View } from "react-native";
import { Colors } from "@/themes/Colors";

export const RadarChartHome = memo(function RadarChartHome() {
  const data = {
    dataSets: [
      {
        values: [
          { value: 100 },
          { value: 110 },
          { value: 105 },
          { value: 115 },
          { value: 110 },
        ],
        label: "DS 1",
        config: {
          color: Colors.red1,
          drawFilled: true,
          fillColor: processColor(Colors.red1),
          fillAlpha: 1000,
          lineWidth: 2,
        },
      },
    ],
  };

  const xAxis = {
    valueFormatter: ["A", "B", "C", "D", "E"],
  };

  const legend = {
    enabled: false,
    textSize: 14,
    form: "DEFAULT",
    drawInside: false,
    wordWrapEnabled: false,
  };

  return (
    <View style={styles.container}>
      <RadarChart
        style={styles.chart}
        data={data || undefined}
        xAxis={xAxis}
        yAxis={{ drawLabels: false }}
        chartDescription={{ text: "" }}
        legend={legend}
        drawWeb={true}
        webLineWidth={0.5}
        webLineWidthInner={0.5}
        webAlpha={255}
        webColor={processColor(Colors.grey3)}
        webColorInner={processColor(Colors.grey3)}
        skipWebLineCount={1}
        onChange={(event) => console.log(event.nativeEvent)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    height: 130,
    width: 100,
  },
  chart: {
    flex: 1,
  },
});

export default RadarChartHome;
