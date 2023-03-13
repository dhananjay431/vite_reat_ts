import Hero from "../hero";

import { useEffect, useState } from "react";
import { forkJoin, interval, map, mergeMap, of, Subject, tap } from "rxjs";
import Table_a1 from "../components/Table_a1";

import Store from "../Store";

export default function Indices() {
  const [data, setData] = useState({
    allIndices: { data: [] },
    stockIndices: { data: [] },
    selected: "NIFTY 50",
  });
  useEffect(() => {
    let fk = forkJoin([
      Store.allIndices(),
      Store.stockIndices(data.selected),
    ]).subscribe((resp) => {
      setData({ ...data, ...{ allIndices: resp[0], stockIndices: resp[1] } });
    });
    return () => fk.unsubscribe();
  }, []);
  let drop_change = (value: any) => {
    // setData({ ...data, ...{ stockIndices: { data: [] } } });
    Store.stockIndices(value).subscribe((resp: any) => {
      setData({ ...data, ...{ stockIndices: resp, selected: value } });
    });
  };
  function get_Table_a1() {
    if ((data?.stockIndices?.data || []).length > 0)
      return <Table_a1 data={data}></Table_a1>;
    else return "...";
  }
  return (
    <div className="row">
      <div className="col-12 col-md-3 mt-2 mb-2">
        <select
          className="form-select form-select-sm"
          value={data.selected}
          onChange={(ev: any) => drop_change(ev.target.value)}
        >
          <option value="">--Select--</option>
          {data.allIndices.data.map((d: any) => {
            return <option value={d.index}>{d.index}</option>;
          })}
        </select>
      </div>
      <div className="col-12">
        <div className="table-responsive">{get_Table_a1()}</div>
      </div>
    </div>
  );
}
