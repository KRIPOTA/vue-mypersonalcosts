<template>
  <v-chart class="chart h-100px" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

export default {
  name: "Moneycharts",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "white",
  },
  data() {
    return {
      option: {
        title: {
          text: "Costs",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.$store.state.getCategoryList,
        },
        series: [
          {
            name: "Category",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.$store.state.list,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "white",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.chart {
  width: 500px;
  height: 400px;
}
</style>

<style>
body {
  margin: 0;
}
</style>
