/** @format */

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { getApi } from "../../apis/admin/getapi";
import { Button } from "@mui/material";
import { inactivateHeader } from "../../apis/agent/headerApis";

const AllTable = ({ data, page}) => {

  if (!data || data.length === 0) return <p>No data available</p>;

  const handleInActivate = (header_code) => {
    inactivateHeader({header_code}).then(res => {
      console.log(res)
    })
  };

  const columns = (page === "headers") ? [
    ...Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: key,
      flex: 0.81,
    })),
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleInActivate(params.row.header_code)}>
          active/inactive
        </Button>
      ),
    },
  ] : [
    ...Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: key,
      flex: 1,
    })),
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.row.id)}>
          Delete
        </Button>
      ),
    },
  ];
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

const DataTable = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const location = useLocation();

    useEffect(() => {
        var pth = location.pathname?.split("/");
        let endpoint = "";
        if (pth.length > 2) {
            var path = pth[2];
            if (path === "agents") {
                setPage("agents");
                endpoint = "agents";
            } else if (path === "questions") {
                setPage("questions");
                endpoint = "questions";
            } else if (path === "headers") {
                setPage("headers");
                endpoint = "headers";
            }
        }

        const fetchData = async () => {
            getApi(endpoint).then((data) => {
              // console.log(data.data)
                setData(data.data);
            });
        };

        fetchData();
    }, []);

    return (
        <AllTable data={data} page={page}/>
    );
}

export default DataTable;