import { useEffect, useState } from "react";
import Store from "../Store";
import Option_table from "../components/Option_table";
import Option_table_popup from "../components/Option_table_popup";
import { forkJoin, map } from "rxjs";
declare var $: any;
export default function Option() {
  const [data, setData] = useState({
    popup_selected: {},
    selected_index: "NIFTY",
    option_chain_indices: {
      expiryData_key: [],
      expiryData: { "": {} },
    },
  });
  const [popupData, setPopupData] = useState({});
  let dis: any = [];
  useEffect(() => {
    let dd = Store.data_swap.subscribe((resp: any) => {
      console.log("data_swap=>", resp);
      setPopupData({ ...resp });
      Store.put_call_chart({ data: resp.resp, _data: resp.row }, "container");
      if (resp.pup_flag == true) $("#btn_exampleModal").click();
    });
    dis.push(dd);
    let d = forkJoin([
      Store.master_quote,
      Store.option_chain_indices(data.selected_index).pipe(Store._getNew()),
    ]).subscribe((resp) => {
      setData({
        ...data,
        ...{ master_quote: resp[0], option_chain_indices: resp[1] },
      });
      console.log(data);
    });
    dis.push(d);
    return () => dis.map((d: any) => d.unsubscribe());
  }, []);
  function show() {
    console.log(data);
  }
  function index_change(value: any) {
    setData({ ...data, ...{ selected_index: value } });
    let t = Store.option_chain_indices(value)
      .pipe(Store._getNew())
      .subscribe((resp) => {
        setData({
          ...data,
          ...{ selected_index: value, option_chain_indices: resp },
        });
      });
    dis.push(t);
  }
  function tbl() {
    return data.option_chain_indices.expiryData_key.map((d) => {
      return (
        <div className="col-6">
          <Option_table
            data={data.option_chain_indices.expiryData[d]}
            all={data.option_chain_indices}
          ></Option_table>
        </div>
      );
    });
  }
  return (
    <div>
      <div className="row">
        <div className="col-3 mt-2">
          <select
            className="form-select form-select-sm"
            value={data.selected_index}
            onChange={(ev) => {
              index_change(ev.target.value);
            }}
          >
            <option value="NIFTY"> NIFTY</option>
            <option value="BANKNIFTY"> BANKNIFTY </option>
            <option value="FINNIFTY"> FINNIFTY </option>
            <option value="MIDCPNIFTY"> MIDCPNIFTY </option>
          </select>
        </div>
        <div className="col-3 mt-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => index_change(data.selected_index)}
          >
            <i className="fa-sharp fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
        <div className="col-12"></div>
        {tbl()}
      </div>
      <Option_table_popup data={popupData}></Option_table_popup>
    </div>
  );
}
