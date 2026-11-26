import { Header } from "./partials/Header";

import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api/api";
import { Button, Paper } from "@mui/material";
import { Head } from "./partials/Head";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "react-data-table-component";
import { HandleOnlyDate } from "./services/HandleOnlyDate";


const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <>
    <div className="d-flex  ">
      <input
        id="search"
        type="text"
        placeholder="Pesquisar..."
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <Button variant="contained" id="button" type="button" onClick={onClear}>
        <ClearIcon />
      </Button>
    </div>
  </>
);


export function EvasoresAntigos() {


  const [loading, setLoading] = useState(true);
  const [evasoresAntigos, setEvasoresAntigos] = useState([] as any);
  const [countEvasoresAntigos, setCountEvasoresAntigos] = useState("");
  

  /*Consultas BACKEND */
  useEffect(() => {
    api
      .get(`/evasoresAntigos/findAll`)
      .then((res) => {        
        setEvasoresAntigos(res.data);
        setLoading(false);
        
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/evasoresAntigos/count`)
      .then((res) => {
        setCountEvasoresAntigos(res.data);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message);
      });
  }, []);




  /*lidar com filtro da lista */
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = evasoresAntigos.filter(
    (item: any) =>
      item.nome && item.nome.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  /*fim lidar com filtro da lista */

  /*criando colunas datatable */

  const columns = [
    {
      name: "Código",
      selector: (row: any) => row.cod,
      sortable: true,
    },
    {
      name: "Nome",
      selector: (row: any) => row.nome,
      sortable: true,
    },
    {
      name: "Número",
      selector: (row: any) => row.numeros,
      sortable: true,
    },
    {
      name: "Data do Envio",
      selector: (row: any) => HandleOnlyDate( new Date(row.createdAt)),
      sortable: true,
    }
  ];


  return (
    <>
      <Head title="Rede Unisoft - Atualização Semanal de Evasores" />
      <Header />
      <ToastContainer />
      <div id="home" className="container text-center">
        <div className="row mt-5">
          <p className="bg-light border border-dark p-4 fs-1">
            LISTA GERAL DE ENVIO - EVASORES
          </p>
        </div>
        <div className="p-3">
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 1100,
            flexGrow: 1,
            marginTop: 3,
          }}
        >
          <div className="d-flex flex-wrap justify-content-between gap-2">
            <div>
              <strong>{`Total de altertas enviados: ${countEvasoresAntigos}`}</strong><br />
            </div>
          </div>

          {loading === true ? (
            <p className="loading">Carregando informações...</p>
          ) : (
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              paginationResetDefaultPage={resetPaginationToggle}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              dense
            />
          )}
        </Paper>
      </div>
      </div>
    </>
  );
}
