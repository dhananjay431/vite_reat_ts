import { useEffect, useState } from "react";
import "./assets/bootstrap.min.css";
import hero from "./hero";
import { Simulate } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";

import select = Simulate.select;
declare var $: any;
function App() {
  const [data, setData] = useState({ user: "", pass: "" });

  const navigate = useNavigate();
  function set_data(value: any, flag: any) {
    debugger;
    if (flag == "user") setData({ ...data, ...{ user: value } });
    else if (flag == "pass") setData({ ...data, ...{ pass: value } });
    console.log(data);
  }
  let login = () => {
    if (data.user === data.pass) {
      localStorage.setItem("url", data.user);
      navigate("/app/dashboard");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign In
              </h5>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={data.user}
                  onChange={(ev: any) => {
                    set_data(ev.target.value, "user");
                  }}
                />
                <label>Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={data.pass}
                  onChange={(ev: any) => {
                    set_data(ev.target.value, "pass");
                  }}
                />
                <label>Password</label>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="rememberPasswordCheck"
                />
                <label className="form-check-label">Remember password</label>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  onClick={login}
                >
                  Sign in
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button className="btn btn-google btn-login text-uppercase fw-bold">
                  <i className="fab fa-google me-2"></i> Sign in with Google
                </button>
              </div>
              <div className="d-grid">
                <button className="btn btn-facebook btn-login text-uppercase fw-bold">
                  <i className="fab fa-facebook-f me-2"></i> Sign in with
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
