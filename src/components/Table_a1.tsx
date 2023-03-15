import Hero from "../hero";
import { useEffect, useState } from "react";
import { interval, mergeMap, Subject, tap } from "rxjs";

export default function Table_a1(props: any) {
  return (
    <div>
      <table className="table table-sm table-striped table-hover">
        <thead className="header-fixed bg">
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">symbol</th>
            <th className="text-center">industry</th>
            <th className="text-end">ffmc</th>
            <th className="text-end">open</th>
            <th className="text-end">dayHigh</th>
            <th className="text-end">dayLow</th>
            <th className="text-end">pClose</th>
            <th className="text-end">52WL%</th>
            <th className="text-end">Close</th>
            <th className="text-end">52WH%</th>
            <th className="text-end">NH</th>
            <th className="text-end">NW</th>
            <th className="text-end">D%</th>
            <th className="text-end">30D%</th>
            <th className="text-end">365D%</th>
          </tr>
        </thead>
        <tbody>
          {props.data.stockIndices.data.map((d: any, i: any) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <a
                    href={
                      "https://www.tradingview.com/chart/ceDp98UV/?symbol=NSE:" +
                      d.symbol
                    }
                    target="_blank"
                  >
                    {d.symbol}
                  </a>{" "}
                </td>
                <td>{d?.meta?.industry}</td>
                <td className="text-end">
                  {Number(d.ffmc / 1000000000).toFixed(2)}
                </td>
                <td className="text-end">{d.open}</td>
                <td className="text-end">{d.dayHigh}</td>
                <td className="text-end">{d.dayLow}</td>
                <td
                  className={
                    d.lastPrice > d.previousClose
                      ? "text-end text-success"
                      : "text-danger text-end"
                  }
                >
                  {d.previousClose}
                </td>
                <td className="text-end">{d.yearLow}</td>
                <td
                  className={
                    d.pChange > 0
                      ? "text-end text-success"
                      : "text-danger text-end"
                  }
                >
                  {d.lastPrice}
                </td>
                <td className="text-end">{d.yearHigh}</td>
                <td
                  className={
                    d.nearWKH >= 30
                      ? "text-end text-success"
                      : "text-danger text-end"
                  }
                >
                  {Number(d.nearWKH).toFixed(2)}
                </td>
                <td
                  className={
                    Number(d.nearWKL) <= -30
                      ? "text-end text-success"
                      : "text-danger text-end"
                  }
                >
                  {Number(d.nearWKL).toFixed(2)}
                </td>
                <td
                  className={
                    d.pChange > 0
                      ? "text-end text-success"
                      : "text-danger text-end"
                  }
                >
                  {d.pChange}
                </td>
                <td
                  className={
                    d.perChange30d > 0
                      ? "text-end text-success"
                      : "text-danger text-end"
                  }
                >
                  {d.perChange30d}
                </td>
                <td
                  className={
                    d.perChange365d > 0
                      ? "text-end text-success"
                      : "text-danger text-end"
                  }
                >
                  {d.perChange365d}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
