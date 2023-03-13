import axios from "axios";
import { finalize, forkJoin, from, mergeMap, of, tap } from "rxjs";
import "./assets/bootstrap.min.css";

declare var $: any, Highcharts: any;

function start() {
  $("body").append("<div class='loader'></div>");
}
function stop() {
  $(".loader").last().remove();
}
function xmltojson(resp: any, key: any) {
  return $.cordys.json.find(resp, key);
}
let ajax_ob = (url: any, option: any, flag = true) =>
  of([]).pipe(
    tap((d) => {
      if (flag == true) start();
    }),
    mergeMap((d) =>
      from(
        axios.post(url, option).then(function (response: any) {
          return response.data;
        })
      )
    ),
    finalize(() => {
      if (flag == true) stop();
    })
  );
function ajax(method: any, namespace: any, parameters: any) {
  return new Promise((rev, rej) => {
    $.cordys.ajax({
      method: method,
      namespace: namespace,
      dataType: "* json",
      parameters: parameters,
      success: function success(resp: any) {
        rev(resp);
        //let test = $.cordys.json.find(resp, 'ScreenAccess');
      },
      error: function error(e1: any, e2: any, e3: any) {
        console.log("err=>", e1, e2, e3);
        rev([e1, e2, e3]);
      },
    });
  });
}
function line_chart(id: any, data: any) {
  Highcharts.chart(id, {
    chart: {
      zoomType: "x",
    },
    title: {
      text: data.name,
      align: "center",
    },

    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: "area",
        name: data.name,
        data: data.grapthData,
      },
    ],
  });
}

export default {
  ajax,
  xmltojson,
  line_chart,
  ajax_ob,
};
