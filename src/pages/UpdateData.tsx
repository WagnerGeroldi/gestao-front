import { Header } from "./partials/Header";
import { Spinner } from "../components/Spinner";
import { ButtonDefault } from "../components/button/ButtonDefault";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api/api";

import { ReportGeneral } from "../pages/report/PDF/ReportGeneral";

import { Head } from "./partials/Head";
import { ReportTrocaTurma } from "./report/PDF/ReportTrocaTurma";
import { ReportTrocaTelefone } from "./report/PDF/ReportTrocaTelefone";
import { ModalDelivered } from "../components/Modals/ModalDelivered";

export function UpdateData() {
  const [dados, setDados] = useState();
  const [newAlunos, setNewAlunos] = useState([]);
  const [desistentes, setDesistentes] = useState([]);
  const [corrigirTelefone, setCorrigirTelefone] = useState([]);
  const [trocarTurma, setTrocarTurma] = useState([]);
  const [classeDisabled, setClasseDisabled] = useState("disabled");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDataDisabled, setButtonDataDisabled] = useState(true);

  const uploadData = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("nova_lista", dados as any);
    api.post("/novaLista/ImportData", formData).then((res) => {
      setIsLoading(false);
      toast.success(res.data.message);
      setClasseDisabled("");
    });
  };

  const verifyNewStudents = async (e: any) => {
    api.get("/alunosAdicionar/generate").then((res) => {
      setNewAlunos(res.data);

      if (res.data.length === 0) {
        toast.error("Não existe novos Alunos");
      } else {
        toast.success("Verificação concluída! Novos Alunos para adicionar");
      }
    });
  };

  const verifyDesistentes = async (e: any) => {
    api.get("/desistentes/generate").then((res) => {
      setDesistentes(res.data);
      if (res.data.length === 0) {
        toast.error("Não existe novos Desistentes");
      } else {
        toast.success(
          "Verificação concluída! Novos Desistentes para dar Baixa"
        );
      }
    });
  };

  const verifyCorrigirTelefone = async (e: any) => {
    api.get("/corrigirTelefone/generate").then((res) => {
      setCorrigirTelefone(res.data);
      if (res.data.length === 0) {
        toast.error("Não existe telefones para Corrigir");
      } else {
        toast.success("Verificação concluída! Novos Telefones para corrigir");
      }
    });
  };

  const verifyTrocarTurma = async (e: any) => {
    api.get("/trocarTurma/generate").then((res) => {
      setTrocarTurma(res.data);
      if (res.data.length === 0) {
        toast.error("Não existe Alunos para trocar de turma");
      } else {
        toast.success(
          "Verificação concluída! Novos Alunos para trocar de turma"
        );
      }
    });
  };

  return (
    <>
      <Head title="Rede Unisoft - Atualização de Dados" />
      <Header />
      <ToastContainer />
      <div id="home" className="container text-center">
        <div className="row mt-5">
          <p className="bg-light border border-dark p-4 fs-1">
            ATUALIZAÇÃO DE DADOS
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
              onClick={verifyNewStudents}
            >
              Verificar Novos Alunos
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {newAlunos.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Verificação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => ReportGeneral(newAlunos, "de Novos Alunos")}
              >
                Gerar PDF
              </button>
            )}
          </div>
        </div>
        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6">
            <button
              className={`btn btn-primary ${classeDisabled}`}
              onClick={verifyDesistentes}
            >
              Verificar Desistentes
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {desistentes.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Verificação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => ReportGeneral(desistentes, "de Desistentes")}
              >
                Gerar PDF
              </button>
            )}
          </div>
        </div>
        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6">
            <button
              className={`btn btn-primary ${classeDisabled}`}
              onClick={verifyCorrigirTelefone}
            >
              Verificar Troca de Telefone
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {corrigirTelefone.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Verificação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() =>
                  ReportTrocaTelefone(corrigirTelefone, "de Troca de Telefone")
                }
              >
                Gerar PDF
              </button>
            )}
          </div>
        </div>

        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6">
            <button
              className={`btn btn-primary ${classeDisabled}`}
              onClick={verifyTrocarTurma}
            >
              Verificar Troca de Turma
            </button>
          </div>
          <div className="col-12 col-lg-6">
            {trocarTurma.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Verificação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() =>
                  ReportTrocaTurma(trocarTurma, "de Troca de Turma")
                }
              >
                Gerar PDF
              </button>
            )}
          </div>
        </div>
      </div>
      <ModalDelivered />
    </>
  );
}
