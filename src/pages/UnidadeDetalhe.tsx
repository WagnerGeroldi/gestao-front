/*imports react */
import { useEffect, useState } from "react";

/*imports libs */
import { ToastContainer, toast } from "react-toastify";

import ApexCharts from "apexcharts";

/*imports extras */
import { api } from "../api/api";
import { Header } from "./partials/Header";

/*imports styles CSS */
import "react-toastify/dist/ReactToastify.css";
import "./styles/ConfigPage.scss";

/*imports MUI */
import Paper from "@mui/material/Paper";
import { Head } from "./partials/Head";

export function UnidadeDetalhe(this: any) {
  const [dados, setDados] = useState([] as any);
  const [codUnidades, setCodUnidades] = useState([] as any);
  const [unidade, setUnidade] = useState("");

  const handleChangeUnidade = (event: any) => {
    setUnidade(event.target.value as string);
  };

  let ativos = 0;
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].matricula === "A") ativos++;
  }

  let evasores = 0;
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].matricula === "E") evasores++;
  }

  let desistentes = 0;
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].matricula === "D") desistentes++;
  }

  let cancelamentos = 0;
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].matricula === "C") cancelamentos++;
  }

  /*Consultas BACKEND */

  function consulta() {
    api
      .get(`/dadosAtuais/${unidade}`)
      .then( (res) =>  {
        setDados(res.data);
        render()
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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
 

  let options = {
    chart: {
      type: "bar",
    },
    series: [
      {
        data: [
          {
            x: "Matriculados",
            y: dados.length,
            fillColor: "#008000",
          },
          {
            x: "Ativos",
            y: ativos,
            fillColor: "#0000FF",
          },
          {
            x: "Evasores",
            y: evasores,
            fillColor: "#FF0000",
          },
          {
            x: "Desistentes",
            y: desistentes,
            fillColor: "#000080",
          },
          {
            x: "Cancelamentos",
            y: cancelamentos,
            fillColor: "#00FFFF",
          },
        ],
      },
    ],
  };

  function render() {
    let chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

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
          <h3 className="text-center m-3">Visão Geral da Unidade</h3>
          <select
            className="form-select form-select-lg mb-3"
            name="unidade"
            id="unidade"
            onChange={handleChangeUnidade}
            required
            key={0}
          >
            <option selected value="" key={0}>
              Escolha Unidade
            </option>
            {codUnidades.map((item: any) => (
              <option value={item.unidade} key={item.cod}>
                {item.unidade}
              </option>
            ))}
          </select>
          <div className="d-flex gap-4">
            <button onClick={() => consulta()} className="btn btn-primary">
              Consultar
            </button>
          </div>

          <br />
          <hr />
          {dados.length === 0 ? (
            ""
          ) : (
            <div className="area-chart">
              <div id="chart"></div>
            </div>
          )}
        </Paper>
      </div>
    </>
  );
}
