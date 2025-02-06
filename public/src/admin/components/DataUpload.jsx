import Papa from "papaparse";

const DataUpload = (file, callback, errorCallback) => {
  if (file) {
    Papa.parse(file, {
      complete: (result) => {
        const validRows = result.data.filter((row) =>
          Object.values(row).some((value) => value !== "" && value !== null)
        );

        if (validRows.length !== result.data.length) {
          errorCallback("Error: Empty rows found in the file.");
          return;
        }

        callback(validRows);
      },
      header: true,
      skipEmptyLines: true,
    });
  }
};

export default DataUpload;
