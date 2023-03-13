import Hero from "../hero";
import { useEffect, useState } from "react";
import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
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
            <th className="text-center">ffmc</th>
            <th>open</th>
            <th>dayHigh</th>
            <th>dayLow</th>
            <th className="text-center">pClose</th>
            <th className="text-center">52WL%</th>
            <th className="text-center">Close</th>
            <th className="text-center">52WH%</th>
            <th className="text-center">NH</th>
            <th className="text-center">NW</th>
            <th className="text-center">D%</th>
            <th className="text-center">30D%</th>
            <th className="text-center">365D%</th>
          </tr>
        </thead>
        <tbody>
          {props.data.stockIndices.data.map((d: any, i: any) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{d.symbol}</td>
                <td>{d?.meta?.industry}</td>
                <td>{d.ffmc}</td>
                <td>{d.open}</td>
                <td>{d.dayHigh}</td>
                <td>{d.dayLow}</td>
                <td>{d.previousClose}</td>
                <td>{d.yearLow}</td>
                <td>{d.lastPrice}</td>
                <td>{d.yearHigh}</td>
                <td>{Number(d.nearWKH).toFixed(2)}</td>
                <td>{Number(d.nearWKL).toFixed(2)}</td>
                <td>{d.pChange}</td>
                <td>{d.perChange30d}</td>
                <td>{d.perChange365d}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
