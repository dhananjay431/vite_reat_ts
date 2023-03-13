import { useEffect, useState } from "react";

import hero from "../hero";

import { forkJoin, from } from "rxjs";
import Store from "../Store";
import Dash_table from "../components/Dash_table";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Dashboard() {
  const [data, setData] = useState({
    chart: {},
    allIndices: { data: [{}] },
    drop_selected: "NIFTY 50",
  });

  useEffect(() => {
    let _b2 = forkJoin([Store.update_chart(), Store.allIndices()]).subscribe(
      (resp: any) => {
        hero.line_chart("container", resp[0]);
        setData({ ...data, ...{ allIndices: resp[1] } });
      }
    );
    return () => _b2.unsubscribe();
  }, []);

  let data_option = () => {
    return (
      <select
        className="form-select form-select-sm"
        value={data.drop_selected}
        onChange={(ev) => {
          if (ev.target.value != "" && ev.target.value != undefined)
            drop_change(ev.target.value);
        }}
      >
        <option>--select--</option>
        {data.allIndices != undefined && data.allIndices.data.length > 0
          ? data.allIndices.data.map((d: any) => {
              return <option value={d.indexSymbol}>{d.index}</option>;
            })
          : ""}
      </select>
    );
  };
  function drop_change(selected: any) {
    Store.update_chart(selected).subscribe((resp) => {
      hero.line_chart("container", resp);
    });
    setData({ ...data, ...{ drop_selected: selected } });
  }
  return (
    <div className="row">
      <div className="col-12">
        {data_option()}
        <div className="col-12">
          <div id="container"></div>
        </div>

        <div className="col-12">
          <Dash_table data={data}></Dash_table>
        </div>
      </div>
    </div>
  );
}
