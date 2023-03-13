import { forkJoin, map } from "rxjs";
import Store from "../Store";
declare var $: any;
export default function Option_table(props: any) {
  function bg_color(i: any, flag: any) {
    let CE_PE = flag == false ? "CE" : "PE";
    if (i[CE_PE] == undefined || i[CE_PE].change == undefined)
      i[CE_PE] = { change: 0 };
    i[CE_PE].change = i[CE_PE]?.change || 0;
    let str = "text-end ";
    if (i.flag == flag) {
      str += "bg-warning";
    }
    if (i[CE_PE].change < 0) str += " text-danger fw-semibold";
    else if (i[CE_PE].change > 0) str += " text-success fw-semibold";
    return str;
  }
  function open_popup(row: any) {
    forkJoin(
      Store.chart_databyindex(row.CE.identifier),
      Store.chart_databyindex(row.PE.identifier)
    )
      .pipe(
        map((resp: any) => {
          return resp.map((d: any) => {
            return { name: d.identifier, data: d.grapthData };
          });
        })
      )
      .subscribe((resp: any) => {
        Store.data_swap.next({ row: row, resp: resp, pup_flag: true });
      });
  }
  return (
    <div>
      <b>{props.data[0].expiryDate}</b> Underlying Index :
      <b>
        {" "}
        {props.data[0].PE.underlying}
        {"  "}
        {props.data[0].PE.underlyingValue}{" "}
      </b>
      As on <b>{props.all.data.records.timestamp}</b>
      <table className="table table-hover table-striped table-sm">
        <thead>
          <tr>
            <th className="text-end">OI</th>
            <th className="text-end">COI</th>
            <th className="text-end">PRICE</th>
            <th className="text-center">strike</th>
            <th className="text-end">PRICE</th>
            <th className="text-end">COI</th>
            <th className="text-end">OI</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((i: any) => {
            return (
              <tr>
                <td className={bg_color(i, false)}>{i?.CE?.openInterest}</td>
                <td className={bg_color(i, false)}>
                  {i?.CE?.changeinOpenInterest}
                </td>
                <td className={bg_color(i, false)}>{i?.CE?.lastPrice}</td>
                <td className="text-center" onClick={() => open_popup(i)}>
                  {i?.strikePrice}
                </td>
                <td className={bg_color(i, true)}>{i?.PE?.lastPrice}</td>
                <td className={bg_color(i, true)}>
                  {i?.PE?.changeinOpenInterest}
                </td>
                <td className={bg_color(i, true)}>{i?.PE?.openInterest}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
