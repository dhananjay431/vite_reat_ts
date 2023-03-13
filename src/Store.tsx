import { BehaviorSubject, map, tap } from "rxjs";
import Hero from "./hero";
declare var _: any, Highcharts: any;
// const b1$ = new BehaviorSubject(0);
// const b2$ = b1$.pipe(
//   tap((d) => {
//     console.log("b2$=>", d);
//   })
// );
const data_swap = new BehaviorSubject({});

const marketStatus = Hero.ajax_ob(
  "/nse",
  { url: "/api/marketStatus" },
  false
).pipe(
  map((d: any) => {
    return d.marketState.filter((dx: any) => {
      return dx.market === "Capital Market";
    });
  })
);
const stockIndices = (id: any) =>
  Hero.ajax_ob("/nse", {
    url: `api/equity-stockIndices?index=${id}`,
  });
const allIndices = () => Hero.ajax_ob("/nse", { url: "/api/allIndices" });
const update_chart = (id = "NIFTY 50") => {
  return Hero.ajax_ob("/nse", {
    url: `/api/chart-databyindex?index=${id}&indices=true`,
  });
};
////// option
const master_quote = Hero.ajax_ob("/nse", { url: "/api/master-quote" });
const option_chain_indices = (id: any = "NIFTY") =>
  Hero.ajax_ob("/nse", { url: `/api/option-chain-indices?symbol=${id}` });

const chart_databyindex = (id: any) =>
  Hero.ajax_ob("/nse", { url: `/api/chart-databyindex?index=${id}` });

function getexpiryData(expiryDate: any, _data: any) {
  let temp_data: any = _.chain(_data.data.records.data)
    .filter({ expiryDate: expiryDate })
    .value();
  if (temp_data.length < 6)
    return _.chain(temp_data).sortBy("strikePrice").value();
  let a = _.chain(temp_data)
    .filter({ flag: false })
    .sortBy("strikePrice")
    .takeRight(8)
    .value();
  let b = _.chain(temp_data)
    .filter({ flag: true })
    .sortBy("strikePrice")
    .take(8)
    .value();
  return _.chain([...a, ...b])

    .sortBy("strikePrice")
    .value();
}
function getAllopData(_data: any) {
  return _.chain(_data.data.records.expiryDates)
    .take(4)
    .reduce((a: any, b: any) => {
      let t: any = {};
      a[b] = getexpiryData(b, _data);
      return a;
    }, {})
    .value();
}
let _getNew = () =>
  map((d: any) => {
    d.records.data = d.records.data.map((d: any) => {
      if (d.PE != undefined)
        d.flag = !(d.PE.underlyingValue > d.PE.strikePrice);
      // d.flag = d.PE.underlyingValue - d.PE.strikePrice;
      return d;
    });
    let expiryData = getAllopData({ data: d });
    let expiryData_key = Object.keys(expiryData);
    let PCR = expiryData_key.reduce((a: any, d: any) => {
      let CE = _.chain(expiryData[d]).map("CE.openInterest").sum().value();
      let PE = _.chain(expiryData[d]).map("PE.openInterest").sum().value();
      let C_CE = _.chain(expiryData[d])
        .map("CE.changeinOpenInterest")
        .sum()
        .value();
      let C_PE = _.chain(expiryData[d])
        .map("PE.changeinOpenInterest")
        .sum()
        .value();
      a[d] = {
        PCR: Number(PE / CE).toFixed(2),
        C_PCR: Number(C_PE / C_CE).toFixed(2),
        TTL_CE: CE,
        TTL_PE: PE,
        TTL_C_CE: C_CE,
        TTL_C_PE: C_PE,
      };
      return a;
    }, {});
    let dt: any = { data: d, expiryData, expiryData_key, PCR };
    return dt;
  });

const put_call_chart = (data: any, id: any) => {
  Highcharts.chart(id, {
    chart: {
      type: "spline",
    },
    // '' + data._data.CE.underlyingValue,
    title: {
      text: data._data.CE.underlying,
    },
    subtitle: {
      text: data._data.expiryDate,
    },
    xAxis: {
      type: "datetime",
      crosshair: {
        snap: true,
      },
      dateTimeLabelFormats: {
        // don't display the year
        month: "%e. %b",
        year: "%b",
      },
      title: {
        text: "Date",
      },
    },
    // yAxis: {
    //   title: {
    //     text: 'Snow depth (m)',
    //   },
    //   min: 0,
    // },
    tooltip: {
      crosshairs: true,
      animation: true,
      distance: 16,
      enabled: true,
      followTouchMove: true,
      followPointer: true,
      headerFormat: "<b>{point.key}</b><br>",
      pointFormat: " {point.y:.2f}",
      shared: true,
      split: true,
    },

    plotOptions: {
      series: {
        marker: {
          enabled: false,
          radius: 1,
        },
      },
    },

    colors: ["green", "red", "#06C", "#036", "#000"],
    series: data.data,
  });
};

export default {
  // b1$,
  // b2$,
  marketStatus,
  stockIndices,
  allIndices,
  update_chart,
  master_quote,
  option_chain_indices,
  _getNew,
  chart_databyindex,
  data_swap,
  put_call_chart,
};
