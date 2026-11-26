import { Header } from "./partials/Header";
import { Spinner } from "../components/Spinner";
import { ButtonDefault } from "../components/button/ButtonDefault";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api/api";
import { Head } from "./partials/Head";

import { ReportXLS } from "./filexls/ReportXLS";
import { ReportGeneral } from "./report/PDF/ReportGeneral";

export function RelatorioQuery() {
  const [dados, setDados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /*Consultas BACKEND */

  const uploadData = async (e: any) => {
    e.preventDefault();
    let data = e.target[0].value;
    console.log(e.target[0].value);

    api.get(`/dadosAtuais/relatorioAleatorio/${data}`).then((res) => {
      setDados(res.data);
      if (res.data.length === 0) {
        toast.error("Não existem dados");
      } else {
        toast.success("Verificação concluída");
      }
    });
  };

  return (
    <>
      <Head title="Rede Unisoft - Relatório Via Query" />
      <Header />
      <ToastContainer />
      <div id="home" className="container text-center">
        <div className="row mt-5">
          <p className="bg-light border border-dark p-4 fs-1">
            GERAR RELATÓRIO VIA QUERY
          </p>
        </div>
        <div className="row bg-light mb-4 ">
          <div className="col-12 mt-4">
            <h4>Digite o código SQL</h4>
            <hr />
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Erro código 43 (novos alunos)
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>&gt; Função:</strong> Conferência de alunos com
                    erros de repetição de código
                    <br />
                    Lembrar de desconsiderar as Unidades que não estão estavam em matrículas pós no relatório anterior
                    <br />
                    <br />
                    <mark>
                      SELECT * from dados_atuais where cod &gt; "430001" and cod
                      &lt; "430900" and matricula = "A"
                    </mark>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Espaço para segundo erro
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong>{" "}
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Espaço para terceiro erro
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
            <br />
            <form method="GET" onSubmit={uploadData}>
              <textarea name="conteudo" id="conteudo" cols={100} required />
              <div className="col-12 m-4">
                <ButtonDefault
                  content={isLoading ? <Spinner /> : "Pesquisar"}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row bg-light p-5 mb-2">
          <div className="col-12 col-lg-6 mx-auto">
            {dados.length === 0 ? (
              <button className="btn btn-danger disabled">
                Aguardando Importação
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => ReportGeneral(dados, "Relatório")}
              >
                Gerar PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
