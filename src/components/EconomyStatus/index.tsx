import clsx from "clsx";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useState } from "react";

import { useColorMode } from "@docusaurus/theme-common";

import styles from "./index.module.css";

function EconomyStatus() {
  echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout,
    TitleComponent,
  ]);
  const option = {
    title: {
      text: "经费",
      subtext: "经费情况",
      left: "8%",
    },
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        return `
        <b style="font-size:14px;">${params.seriesName}</b>
        <br>
        <span style="display:inline-block;border-radius:5px;width:10px;height:10px;background-color:${params.color};"></span>
        <span>${params.name}: ${params.value} 元 (${params.percent}%)</span>
        </div>
        `;
      },
    },
    legend: {
      orient: "horizontal",
      bottom: "0",
      right: "5%",
    },
    series: [
      {
        name: "经费情况",
        type: "pie",
        radius: ["35%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderWidth: 3,
        },
        label: {
          show: true,
          fontSize: 14,
          //position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 100, name: "喝奶茶" },
          { value: 200, name: "团建" },
          { value: 600, name: "剩余" },
        ],
      },
    ],
  };

  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const lightTheme = {
    title: {
      textStyle: {
        color: "#000",
      },
    },
    pie: {
      itemStyle: {
        borderColor: backgroundColor,
      },
      label: {
        color: "#000",
      },
    },
    legend: {
      textStyle: {
        color: "#000",
      },
    },
  };
  const darkTheme = {
    title: {
      textStyle: {
        color: "#fff",
      },
    },
    pie: {
      itemStyle: {
        borderColor: backgroundColor,
      },
    },
    label: {
      color: "#fff",
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
  };

  const { colorMode } = useColorMode();

  useEffect(() => {
    //延迟获取背景色，否则获取到的是上一个颜色
    const timer = setTimeout(() => {
      setBackgroundColor(
        getComputedStyle(document.getElementById("card"))
          .getPropertyValue("--ifm-card-background-color")
          .trim()
      );
    }, 0);

    // 清除定时器以防组件卸载时的内存泄漏
    return () => clearTimeout(timer);
  }, [colorMode]);

  return (
    <div className={clsx("card shadow--md", styles.statusCard)} id="card">
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        lazyUpdate={true}
        theme={colorMode === "light" ? lightTheme : darkTheme}
      />
    </div>
  );
}

export default EconomyStatus;
