/** @format */

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { getApi } from "../../apis/admin/getapi";
import { Button } from "@mui/material";
import { inactivateHeader } from "../../apis/agent/headerApis";
import { toast } from "react-toastify";
import { deleteApi } from "../../apis/admin/deleteapi";

const AllTable = ({ data, page, fetchData }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const handleInActivate = (header_code) => {
    inactivateHeader({ header_code }).then((res) => {
      if (res) {
        toast.success("Status updated successfully");
        fetchData();
      }
    });
  };

  const handleDelete = async (data) => {
    const specifier = (page === "agents") ? data?.mobile_number : data?.question_code;
    try {
      const res = await deleteApi(page, specifier);
      if (res) {
        toast.success("deleted successfully!");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const columns =
    page === "headers"
      ? [
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
        ]
      : [
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
                onClick={() => handleDelete(params.row)}>
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

  const fetchData = async (endpoint) => {
    getApi(endpoint).then((data) => {
      setData(data.data);
    });
  };

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


    fetchData(endpoint);
  }, []);

  return (
    <AllTable
      data={data}
      page={page}
      fetchData={fetchData}
    />
  );
};

export default DataTable;
