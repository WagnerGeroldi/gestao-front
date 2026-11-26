
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Header } from "./partials/Header";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../api/api";

import { Head } from "./partials/Head";
import { Spinner } from "../components/Spinner";

export function Dashboard() {
  const [items, setItems] = useState([] as any);
  const [mes, setMes] = useState(" ") as any;
  const [countAtivos, setCountAtivos] = useState("");
  const [countDesistentes, setCountDesistentes] = useState("");
  const [countEvasores, setCountEvasores] = useState("");
  const [countCancelamentos, setCountCancelamentos] = useState("");

  function dataMes() {
    let data: any = mes.createdAt;
    let item: any = ""
    let onlyMonth = data?.split("-") || []

    

    switch (onlyMonth[1]) {
      case "01":
        item = "Janeiro"
        break;
      case "02":
        item = "Fevereiro"
        break;
      case "03":
        item = "Março"
        break;
      case "04":
        item = "Abril"
        break;
      case "05":
        item = "Maio"
        break;
      case "06":
        item = "Junho"
        break;
      case "07":
        item = "Julho"
        break;
      case "08":
        item = "Agosto"
        break;
      case "09":
        item = "Setembro"
        break;
      case "10":
        item = "Outubro"
        break;
      case "11":
        item = "Novembro"
        break;
      case "12": 
        item = "Dezembro"
        break;
    }

    return item;
  }

  useEffect(() => {
    api
      .get("/dadosAtuais/countTotal")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get("/dadosAtuais/countEvasores")
      .then((res) => {
        setCountEvasores(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get("/dadosAtuais/countCancelamentos")
      .then((res) => {
        setCountCancelamentos(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get("/dadosAtuais/verifyMonth")
      .then((res) => {
        setMes(res.data);
        
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get("/dadosAtuais/countDesistentes")
      .then((res) => {
        setCountDesistentes(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    api
      .get("/dadosAtuais/countAtivos")
      .then((res) => {
        setCountAtivos(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <>
      <Head title="Rede Unisoft - Dashboard" />
      <Header />
      <ToastContainer />
      <div id="home" className="container-fluid">
        <div className="row col-12 mt-4 text-center m-0">
          <p className="bg-light border border-dark p-4 fs-1">{`DASHBOARD - Mês atual ${dataMes()}`}</p>
        </div>
        <div className="content-dashboard">
          <div className="row bg-light border border-dark mt-4 p-4 m-0 text-justify">
            Bem-vindo!
            <br />
            Sistema de Atualização de Relatórios Unisoft.
          </div>
          <div className="d-flex mx-auto justify-content-center mt-5 ">
            <Grid container spacing={1} justifyContent="center">
              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Link to={`/items/findAll/countTotal/Total de Alunos`}>
                  <Card
                    sx={{
                      maxWidth: 220,
                      minWidth: 200,
                      textAlign: "center",
                      background: "blue",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        MATRICULADOS
                      </Typography>
                      <Typography variant="h4" component="div">
                        {items.length === 0 ? <Spinner /> : items}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Link to={`/items/findAtivos/countAtivos/Total de Ativos`}>
                  <Card
                    sx={{
                      maxWidth: 220,
                      minWidth: 200,
                      textAlign: "center",
                      background: "green",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        ATIVOS
                      </Typography>
                      <Typography variant="h4" component="div">
                        {countAtivos.length === 0 ? <Spinner /> : countAtivos}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Link
                  to={`/items/findDesistentes/countDesistentes/Total de Desistentes`}
                >
                  <Card
                    sx={{
                      maxWidth: 220,
                      minWidth: 200,
                      textAlign: "center",
                      background: "red",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        DESISTENTES
                      </Typography>
                      <Typography variant="h4" component="div">
                        {countDesistentes.length === 0 ? (
                          <Spinner />
                        ) : (
                          countDesistentes
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Link
                  to={`/items/findEvasores/countEvasores/Total de Evasores`}
                >
                  <Card
                    sx={{
                      maxWidth: 220,
                      minWidth: 200,
                      textAlign: "center",
                      background: "yellow",
                      color: "black",
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        EVASORES
                      </Typography>
                      <Typography variant="h4" component="div">
                        {countEvasores.length === 0 ? (
                          <Spinner />
                        ) : (
                          countEvasores
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Link
                  to={`/items/findCancelamentos/countCancelamentos/Total de Cancelamentos`}
                >
                  <Card
                    sx={{
                      maxWidth: 220,
                      minWidth: 200,
                      textAlign: "center",
                      background: "purple",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        CANCELAMENTOS
                      </Typography>
                      <Typography variant="h4" component="div">
                        {countCancelamentos.length === 0 ? (
                          <Spinner />
                        ) : (
                          countCancelamentos
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
