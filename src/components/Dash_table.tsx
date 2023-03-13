export default function Dash_table(props: any) {
  return (
    <table className="table table-striped table-hover table-sm">
      <thead>
        <tr>
          <th>Index Symbol</th>
          <th>Advances</th>
          <th>Declines</th>
          <th>Pe</th>
          <th>Percent Change</th>
          <th>Year High</th>
          <th>Last</th>
          <th>Yea rLow</th>
          <th>Chart Today</th>
          <th>Chart 30d</th>
          <th>Chart 365d</th>
        </tr>
      </thead>
      <tbody>
        {props.data.allIndices.data.map((d: any) => {
          return (
            <tr>
              <td>{d.indexSymbol}</td>
              <td>{d.advances}</td>
              <td>{d.declines}</td>
              <td>{d.pe}</td>
              <td>{d.percentChange}</td>
              <td>{d.yearHigh}</td>
              <td>{d.last}</td>
              <td>{d.yearLow}</td>
              <td>
                <img src={d.chartTodayPath} alt="" />
              </td>
              <td>
                <img src={d.chart30dPath} alt="" />
              </td>
              <td>
                <img src={d.chart365dPath} alt="" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
