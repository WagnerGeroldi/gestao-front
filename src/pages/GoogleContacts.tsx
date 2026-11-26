import { Header } from "./partials/Header";
import { Spinner } from "../components/Spinner";
import { ButtonDefault } from "../components/button/ButtonDefault";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api/api";
import { Head } from "./partials/Head";
import { ReportGoogleContacts } from "./filexls/ReportGoogleContacts";

export function GoogleContacts() {
  const [dados, setDados] = useState([]);
  const [dadosTratados, setDadosTradados] = useState([]);
  const [classeDisabled, setClasseDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /*Consultas BACKEND */

  const uploadData = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();

    formData.append("google_contatos", dados as any);

    api.post("/dadosAtuais/insertData", formData).then((res) => {
      setIsLoading(false);
      toast.success(res.data.message);
      setClasseDisabled(false);
      setDadosTradados(res.data.contatosGoogle);
    });
  };

  return (
    <>
      <Head title="Rede Unisoft - Relarório Google Contacts" />
      <Header />
      <ToastContainer />
      <div id="home" className="container text-center">
        <div className="row mt-5">
          <h2 className="bg-light border border-dark p-4 ">
            GERAR ARQUIVO DE IMPORTAÇÃO DE CONTATOS DO GOOGLE
          </h2>
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
          <div className="col-12 col-lg-6 mx-auto">
            <button
              className="btn btn-success"
              disabled={classeDisabled}
              onClick={() =>
                ReportGoogleContacts({
                  data: dadosTratados,
                  fileName: "ContatosGoogle",
                })
              }
            >
              Gerar Arquivo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
