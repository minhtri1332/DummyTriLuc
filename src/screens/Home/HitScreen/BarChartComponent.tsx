import React, { memo, useMemo } from "react";
import { BarChart } from "react-native-charts-wrapper";
import { processColor, StyleSheet, View } from "react-native";
import { RawDataStrengthGoal } from "@/store/home/function";
import { Colors } from "@/themes/Colors";

interface dataProps {
  dataStrength: RawDataStrengthGoal;
}

export const BarChartComponent = memo(function BarChartComponent() {
  const data = useMemo(() => {
    return {
      dataSets: [
        {
          values: [
            { y: 100 },
            { y: 105 },
            { y: 102 },
            { y: 110 },
            { y: 114 },
            { y: 109 },
            { y: 105 },
            { y: 99 },
            { y: 5 },
          ],
          label: "Bar dataSet",
          config: {
            barShadowColor: processColor(Colors.white),
            valueTextColor: processColor(Colors.colorText),
            chartBackgroundColor: processColor(Colors.colorText),
            textColor: processColor(Colors.colorText),
            color: processColor(Colors.blue3),
            highlightAlpha: 100,
            highlightColor: processColor(Colors.purple2),
          },
        },
      ],

      config: {
        barWidth: 0.6,
      },
    };
  }, []);

  const legend = useMemo(() => {
    return {
      enabled: false,
      formSize: 1000,
      textColor: processColor(Colors.colorText),
    };
  }, []);

  const highlights = useMemo(() => {
    return [{ x: 6 }];
  }, []);

  const xAxis = useMemo(() => {
    return {
      valueFormatter: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      drawGridLines: false,
      drawAxisLine: false,
      granularityEnabled: true,
      granularity: 1,
      position: "BOTTOM",
      textColor: processColor(Colors.colorText),
    };
  }, []);

  const yAxis = {
    left: {
      drawLabels: true,
      drawAxisLine: false,
      drawGridLines: true,
      spaceTop: 0.4,
      textColor: processColor(Colors.colorText),
    },
    right: {
      drawLabels: false,
      drawAxisLine: false,
      drawGridLines: false,
      spaceTop: 0.4,
    },
  };

  return (
    <View style={styles.container}>
      <BarChart
        marker={{ textColor: processColor("#ffffff") }}
        style={styles.chart}
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        animation={{ durationX: 2000 }}
        legend={legend}
        gridBackgroundColor={processColor("#ffffff")}
        visibleRange={{ x: { min: 1, max: 8 } }}
        drawBarShadow={false}
        drawValueAboveBar={false}
        highlightFullBarEnabled={false}
        onSelect={() => {}}
        highlights={highlights}
        onChange={(event) => console.log(event.nativeEvent)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  chart: {
    flex: 1,
  },
});

export default BarChartComponent;
