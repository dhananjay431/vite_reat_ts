import { useEffect, useState } from "react";
import "./assets/bootstrap.min.css";
import hero from "./hero";
import { Simulate } from "react-dom/test-utils";
import select = Simulate.select;
declare var $: any;
function App() {
  const [data, setData] = useState({
    user: "",
    pass: "",
    getbsa_allcadrecodes: [],
  });
  function show() {
    $.cordys.authentication.sso
      .authenticate(data.user, data.pass)
      .done((resp: any) => {
        console.log("Done");
      });
  }
  function set_d(value: any, flag: any) {
    if (flag == "user") {
      setData({ ...data, ...{ user: value } });
    }
    if (flag == "pass") {
      setData({ ...data, ...{ pass: value } });
    }
    console.log("===>", data);
  }
  function test() {
    hero
      .ajax("GetBSA_allCadrecodes", "http://schemas.cordys.com/bsaWsApp", {})
      .then((resp) => {
        let xx = hero.xmltojson(resp, "bsa_cadre_master");
        setData({ ...data, ...{ getbsa_allcadrecodes: xx } });
      });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {" "}
          <select
            className="form-select"
            onChange={(ev) => {
              set_d(ev.target.value, "user");
            }}
          >
            <option value="">--select--</option>
            {data.getbsa_allcadrecodes.map((d: any) => {
              return <option value={d.cadre_code}>{d.pay_grade_code}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          value={data.user}
          onChange={(ev) => {
            set_d(ev.target.value, "user");
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Enter Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlTextarea1"
          placeholder="123@gmail.com"
          onChange={(ev) => {
            set_d(ev.target.value, "pass");
          }}
        />
      </div>

      <div className="row">
        <div className="col-12 text-end">
          <button type="button" className="btn btn-primary" onClick={show}>
            login
          </button>{" "}
          <button type="button" className="btn btn-primary" onClick={test}>
            tet
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
