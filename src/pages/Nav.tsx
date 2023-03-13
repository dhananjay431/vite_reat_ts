import { Outlet, Link } from "react-router-dom";
import Store from "../Store";
import { useEffect, useState } from "react";
export default function Nav() {
  const [data, setData] = useState([{ last: "", percentChange: 0 }]);
  function ref() {
    Store.marketStatus.subscribe((r) => {
      debugger;
      if (r[0].marketStatus == "Open") {
        setTimeout(() => {
          ref();
        }, 10000);
      }
      setData(r);
    });
  }
  useEffect(() => {
    ref();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand text-white fw-semibold">
          <span
            onClick={ref}
            className={
              data[0].percentChange > 0 ? "badge bg-success" : "badge bg-danger"
            }
          >
            {data[0].last}
          </span>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to={`/app/dashboard`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to={`/app/indices`}>
                Indices
              </Link>
            </li>{" "}
            <li className="nav-item">
              <Link className="nav-link text-white" to={`/app/option`}>
                Option
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`/app/option`}>
                    option
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item " href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled text-white">Disabled</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
