/*imports react */
import { useEffect, useState } from "react";

/*imports libs */
import { ToastContainer, toast } from "react-toastify";

/*imports extras */
import { api } from "../api/api";
import { Header } from "./partials/Header";

/*imports styles CSS */
import "react-toastify/dist/ReactToastify.css";
import "./styles/ConfigPage.scss";

/*imports MUI */
import Paper from "@mui/material/Paper";
import { Head } from "./partials/Head";
import { ReportGeneral } from "./report/PDF/ReportGeneral";

export function TurmaDetalhe(this: any) {
  const [alunos, setAlunos] = useState([] as any);

  const [codUnidades, setCodUnidades] = useState([] as any);
  const [numeroTurmas, setNumeroTurmas] = useState([] as any);
  const [unidade, setUnidade] = useState("");
  const [turma, setTurma] = useState("");

  const handleChangeUnidade = (event: any) => {
    setUnidade(event.target.value as string);
  };

  const handleChangeTurma = (event: any) => {
    setTurma(event.target.value as string);
  };

  /*Consultas BACKEND */

  function consulta() {
    api
      .get(`/dadosAtuais/turmaDetalhe/${unidade}/${turma}`)
      .then((res) => {
        setAlunos(res.data[0]);
        numeroAtivos();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  function numeroAtivos() {
    let quantidade = 0;

    for (let i = 0; i < alunos.length; i++) {
      if (alunos[i].matricula == "A") {
        quantidade = quantidade + 1;
      }
    }

    return quantidade;
  }

  useEffect(() => {
    api
      .get(`/dadosAtuais/codUnidades`)
      .then((res) => {
        setCodUnidades(res.data[0]);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/dadosAtuais/codTurmas`)
      .then((res) => {
        setNumeroTurmas(res.data[0]);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

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
          <h3 className="text-center m-3">Consulta de turmas</h3>
          <select
            className="form-select form-select-lg mb-3"
            name="unidade"
            id="unidade"
            onChange={handleChangeUnidade}
            required
          >
            <option selected value="">
              Escolha Unidade
            </option>
            {codUnidades.map((item: any) => (
              <option value={item.unidade}>{item.unidade}</option>
            ))}
          </select>
          <select
            className="form-select form-select-lg mb-3"
            name="turma"
            id="turma"
            onChange={handleChangeTurma}
            required
          >
            <option selected value="">
              Escolha Turma
            </option>
            {numeroTurmas.map((item: any) => (
              <option value={item.turma}>{item.turma}</option>
            ))}
          </select>
          <div className="d-flex gap-4">
            <button onClick={() => consulta()} className="btn btn-primary">
              Consultar
            </button>
            <div className="col-12 col-lg-6">
              {alunos.length === 0 ? (
                <button className="btn btn-danger disabled">Sem Alunos</button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => ReportGeneral(alunos, "individual de Turma")}
                >
                  Gerar PDF
                </button>
              )}
            </div>
          </div>

          <br />
          <hr />
          <div className="col-11 d-flex align-items-end flex-column ">
            <div>Total de alunos ativos: <strong> {numeroAtivos()} </strong></div>
          </div>
          <br />

          <div className="tabela">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Turma</th>
                  <th scope="col">Unidade</th>
                  <th scope="col">Fone Aluno</th>
                  <th scope="col">Fone Responsável</th>
                  <th scope="col">Matrícula</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((item: any) => (
                  <tr>
                    <>
                      <td>{item.cod}</td>
                      <td>{item.nome}</td>
                      <td>{item.turma}</td>
                      <td>{item.unidade}</td>
                      <td>{item.fone_aluno}</td>
                      <td>{item.fone_resp}</td>
                      <td>{item.matricula}</td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Paper>
      </div>
    </>
  );
}
