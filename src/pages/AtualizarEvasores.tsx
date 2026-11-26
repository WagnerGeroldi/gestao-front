import { Header } from "./partials/Header";
import { Spinner } from "../components/Spinner";
import { ButtonDefault } from "../components/button/ButtonDefault";

import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api/api";
import { Button, Paper } from "@mui/material";
import { Head } from "./partials/Head";
import ClearIcon from "@mui/icons-material/Clear";
import { ReportGeneral } from "./report/PDF/ReportGeneral";
import DataTable from "react-data-table-component";
import { ReportEvasores } from "./report/PDF/ReportEvasores";
import { HandleOnlyDate } from "./services/HandleOnlyDate";
import {ReportXLS} from "./filexls/ReportXLS";

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

export function AtualizarEvasores() {
  const [dados, setDados] = useState();
  const [newEvasores, setNewEvasores] = useState([]);
  const [classeDisabled, setClasseDisabled] = useState("disabled");
  const [isLoading, setIsLoading] = useState(false);
  const [dataCadastro, setDataCadastro] = useState() as any;

  const [loading, setLoading] = useState(true);
  const [certificados, setCertificados] = useState([] as any);
  const [countCertificados, setCountCertificados] = useState("");

  /*Consultas BACKEND */
  useEffect(() => {
    api
      .get(`/evasores/findAll`)
      .then((res) => {        
        setCertificados(res.data);
        setLoading(false);
        setDataCadastro(res.data[0].createdAt);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/evasores/count`)
      .then((res) => {
        setCountCertificados(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  const uploadData = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("evasores_novos", dados as any);
    api.post("/evasoresNovos/insertData", formData).then((res) => {
      setIsLoading(false);
      toast.success(res.data.message);
      setClasseDisabled("");
    });
  };

  const verificarEvasores = async (e: any) => {
    api.get("/evasoresNovos/generate").then((res) => {
      setNewEvasores(res.data);

      if (res.data.length === 0) {
        toast.error("Não existe novos Evasores");
      } else {
        toast.success("Verificação concluída! Novos Evasores");
      }
    });
  };

  /*lidar com filtro da lista */
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = certificados.filter(
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
  ];

  return (
    <>
      <Head title="Rede Unisoft - Atualização Semanal de Evasores" />
      <Header />
      <ToastContainer />
      <div id="home" className="container text-center">
        <div className="row mt-5">
          <p className="bg-light border border-dark p-4 fs-1">
            ATUALIZAÇÃO SEMANAL DE EVASORES
          </p>
        </div>
        <div className="row bg-light mb-4 ">
          <div className="col-12 mt-4">
            <h4>Adicione o arquivo CSV</h4>
            <hr />
            <form
              method="POST"
              onSubmit={uploadData}
              encType="multipart/form-data"
            >
              <input
                type="file"
                name="nova_lista"
                id="nova_lista"
                required
                onChange={(e: any) => setDados(e.target.files[0])}
              />
              <div className="col-12 m-4">
                <ButtonDefault content={isLoading ? <Spinner /> : "Importar"} />
              </div>
            </form>
          </div>
        </div>

        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6">
            <button
              className={`btn btn-primary ${classeDisabled}`}
              onClick={verificarEvasores}
            >
              Verificar novos Evasores
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {newEvasores.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Importação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() =>
                  ReportXLS( {
                  data:  newEvasores,
                  fileName: " semanal de Evasores"}
                  )
                }
              >
                Gerar Arquivo
              </button>
            )}
          </div>
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
                <strong>{`Total de envios na última semana: ${countCertificados}`}</strong>
                <br />
                <strong>{`Data do envio: ${
                  HandleOnlyDate(new Date(dataCadastro)).props.children
                }`}</strong>
              </div>
              <div>
                <a href="/evasoresAntigos">
                  <button className="btn btn-danger">
                    Conferir Envios Antigos
                  </button>
                </a>
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
