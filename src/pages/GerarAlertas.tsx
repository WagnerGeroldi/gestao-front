import { Header } from "./partials/Header";
import { Spinner } from "../components/Spinner";
import { ButtonDefault } from "../components/button/ButtonDefault";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api/api";
import { Head } from "./partials/Head";

import {ReportXLS} from "./filexls/ReportXLS";


export function GerarAlertas() {
  const [dados, setDados] = useState();
  const [alertOne, setAlertOne] = useState([]);
  const [alertTwo, setAlertTwo] = useState([]);
  const [alertThree, setAlertThree] = useState([]);
  const [alertFour, setAlertFour] = useState([]);
  const [alertEvasores, setAlertEvasores] = useState([]);
  const [classeDisabled, setClasseDisabled] = useState("disabled");
  const [isLoading, setIsLoading] = useState(false);


  /*Consultas BACKEND */

  const uploadData = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("lista_alertas", dados as any);
    api.post("/alertas/insertData", formData).then((res) => {
      setIsLoading(false);
      toast.success(res.data.message);
      setClasseDisabled("");
    });
  };

  const gerarAlertaOne = async (e: any) => {
    api.get("/alertas/generateAlertOne").then((res) => {
      setAlertOne(res.data);

      if (res.data.length === 0) {
        toast.error("Não existe Alerta 1");
      } else {
        toast.success("Verificação concluída para Alerta 1");
      }
    });
  };

  const gerarAlertaTwo = async (e: any) => {
    api.get("/alertas/generateAlertTwo").then((res) => {
      setAlertTwo(res.data);

      if (res.data.length === 0) {
        toast.error("Não existe Alerta 2");
      } else {
        toast.success("Verificação concluída para Alerta 2");
      }
    });
  };

  const gerarAlertaThree = async (e: any) => {
    api.get("/alertas/generateAlertThree").then((res) => {
      setAlertThree(res.data);

      if (res.data.length === 0) {
        toast.error("Não existe Alerta 3");
      } else {
        toast.success("Verificação concluída para Alerta 3");
      }
    });
  };

  const gerarAlertaFour = async (e: any) => {
    api.get("/alertas/generateAlertFour").then((res) => {
      setAlertFour(res.data);

      if (res.data.length === 0) {
        toast.error("Não existe Alerta 4");
      } else {
        toast.success("Verificação concluída para Alerta 4");
      }
    });
  };

  const gerarAlertaEvasores = async (e: any) => {
    api.get("/alertas/generateAlertEvasores").then((res) => {
      setAlertEvasores(res.data);

      if (res.data.length === 0) {
        toast.error("Não existe Evasores");
      } else {
        toast.success("Verificação concluída novos Evasores");
      }
    });
  };

  const limparLista = async (e: any) => {
    api.get("/alertas/limparListas").then((res) => {
      toast.success(res.data.message);
    });
  };



  return (
    <>
      <Head title="Rede Unisoft - Atualização Semanal de Evasores" />
      <Header />
      <ToastContainer />
      <div id="home" className="container text-center">
        <div className="row mt-5">
          <p className="bg-light border border-dark p-4 fs-1">
            GERAR LISTA DE ALERTAS
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
                name="lista_alertas"
                id="lista_alertas"
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
              onClick={gerarAlertaOne}
            >
              Gerar Lista Alerta 1
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {alertOne.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Importação
              </button>
            ) : (

              <button
                className="btn btn-success"
                onClick={() =>
                  ReportXLS( {
                  data:  alertOne,
                  fileName: "Relatório Alerta 1"}
                  )
                }
              >
                Gerar Arquivo
              </button>
            )}
          </div>
          
        </div>
        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6">
            <button
              className={`btn btn-info ${classeDisabled}`}
              onClick={gerarAlertaTwo}
            >
              Gerar Lista Alerta 2
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {alertTwo.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Importação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() =>
                  ReportXLS( {
                  data:  alertTwo,
                  fileName: "Relatório Alerta 2"}
                  )
                }
              >
                Gerar Arquivo
              </button>
            )}
          </div>
          
        </div>  
        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6">
            <button
              className={`btn btn-warning ${classeDisabled}`}
              onClick={gerarAlertaThree}
            >
             Gerar Lista Alerta 3
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {alertThree.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Importação
              </button>
            ) : (
              <button
              className="btn btn-success"
              onClick={() =>
                ReportXLS( {
                data:  alertThree,
                fileName: "Relatório Alerta 3"}
                )
              }
            >
              Gerar Arquivo
            </button>
            )}
          </div>
          
        </div>
        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6">
            <button
              className={`btn btn-success ${classeDisabled}`}
              onClick={gerarAlertaFour}
            >
              Gerar Lista Alerta 4
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {alertFour.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Importação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() =>
                  ReportXLS( {
                  data:  alertFour,
                  fileName: "Relatório Alerta 4"}
                  )
                }
              >
                Gerar Arquivo
              </button>
            )}
          </div>
          
        </div>
        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6">
            <button
              className={`btn btn-secondary ${classeDisabled}`}
              onClick={gerarAlertaEvasores}
            >
              Gerar Lista de Evasores
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {alertEvasores.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Importação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() =>
                  ReportXLS( {
                  data:  alertEvasores,
                  fileName: "Relatório semanal de Evasores"}
                  )
                }
              >
                Gerar Arquivo
              </button>
            )}
          </div>
          
        </div>
        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6 mx-auto">
            <button
              className={`btn btn-danger`}
              onClick={limparLista}
            >
             Zerar Lista de Alertas
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
