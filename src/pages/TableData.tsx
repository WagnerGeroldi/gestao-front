/*imports react */
import { useEffect, useMemo, useState } from "react";

/*imports libs */
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";

/*imports extras */
import { api } from "../api/api";
import { Header } from "./partials/Header";

/*imports styles CSS */
import "react-toastify/dist/ReactToastify.css";
import "./styles/ConfigPage.scss";

/*imports MUI */
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Head } from "./partials/Head";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { useParams } from "react-router-dom";

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

export function TableData(this: any) {
  const { search } = useParams() as { search: string };
  const { count } = useParams() as { count: string };
  const { info } = useParams() as { info: string };
  const [loading, setLoading] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [countAlunos, setCountAlunos] = useState("");

  

  /*Consultas BACKEND */
  useEffect(() => {
    api
      .get(`/dadosAtuais/${search}`)
      .then((res) => {
        setAlunos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/dadosAtuais/${count}`)
      .then((res) => {
        setCountAlunos(res.data);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message);
      });
  }, []);


  /*lidar com filtro da lista */
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = alunos.filter(
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
      name: "Turma",
      selector: (row: any) => row.turma,
      sortable: true,
    },
    {
      name: "Unidade",
      selector: (row: any) => row.unidade,
      sortable: true,
    },
    {
      name: "Fone Aluno",
      selector: (row: any) => row.fone_aluno,
      sortable: true,
    },
    {
      name: "Fone Responsável",
      selector: (row: any) => row.fone_resp,
      sortable: true,
    },
    {
      name: "Matrícula",
      selector: (row: any) => row.matricula,
      sortable: true,
    },
  ];

  return (
    <>
      <Head title="Rede Unisoft - Alunos" />
      <Header />
      <ToastContainer />
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
              <strong>{`Total de Alunos: ${countAlunos}`}</strong>
            </div>
          </div>
          <div className="info-user">
            <h1> {info} </h1>
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
    </>
  );
}
