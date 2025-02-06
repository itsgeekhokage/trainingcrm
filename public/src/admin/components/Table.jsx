/** @format */

import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const JsonGrid = ({ data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const columns = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key,
    flex: 1,
  }));
  const rows = data.map((row, index) => ({ id: index, ...row }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
};

export default JsonGrid;
