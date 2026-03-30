import { tablesName, tableContent, tableUpdate } from "../api/api";
import { useState, useEffect } from "react";

export function useTables() {
  const [TablesNames, setTablesName] = useState([]);
  const [TableContent, setTableContent] = useState(null);



  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);


  const triggerTablesName = () => {
    setLoading(true);
    tablesName()
      .then(data => {
        setTablesName(data.result);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };


  const triggerTableContent = (tableName) => {
    setLoading2(true);
    tableContent(tableName)
      .then(data => {
        setTableContent(data.result);
        console.log(data.result);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading2(false));
  };


  const triggerTableUpdate = (column) => {
    setLoading3(true);
    tableUpdate(column)
      .then(data => {
        console.log(data.result);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading3(false));
  };


  return {
    TablesNames,
    triggerTablesName,
    loading,
    TableContent,
    triggerTableContent,
    loading2,
    triggerTableUpdate,
    loading3
  };
}