import { useEffect } from "react";
import Store from "../Store";
import { forkJoin, map } from "rxjs";
export default function Option_table_popup(props: any) {
  function ref() {
    forkJoin(
      Store.chart_databyindex(props.data.row.CE.identifier),
      Store.chart_databyindex(props.data.row.PE.identifier)
    )
      .pipe(
        map((resp: any) => {
          return resp.map((d: any) => {
            return { name: d.identifier, data: d.grapthData };
          });
        })
      )
      .subscribe((resp: any) => {
        Store.data_swap.next({
          row: props.data.row,
          resp: resp,
          pup_flag: false,
        });
      });
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="btn_exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                onClick={() => {
                  ref();
                }}
              >
                Chart
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div id="container"></div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
