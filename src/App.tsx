import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Dashboard } from "./pages/Dashboard";
import { TableData } from "./pages/TableData";
import { UpdateData } from "./pages/UpdateData";
import { TurmaDetalhe } from "./pages/TurmaDetalhe";
import { CertificadosNaoEntregues } from "./pages/CertificadosNaoEntregues";
import { CertificadosEntregues } from "./pages/CertificadosEntregues";
import { RegisterCertificate } from "./pages/RegisterCertificate";
import { AtualizarEvasores } from "./pages/AtualizarEvasores";
import { EvasoresAntigos } from "./pages/EvasoresAntigos";
import { GerarAlertas } from "./pages/GerarAlertas";
import { RelatorioQuery } from "./pages/RelatorioQuery";
import { GoogleContacts } from "./pages/GoogleContacts";
import { UnidadeDetalhe } from "./pages/UnidadeDetalhe";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items/:search/:count/:info" element={<TableData />} />
        <Route path="/updateData" element={<UpdateData />} />
        <Route path="/turmaDetalhe" element={<TurmaDetalhe />} />
        <Route path="/unidadeDetalhe" element={<UnidadeDetalhe />} />
        <Route path="/certificadosNaoEntregues" element={<CertificadosNaoEntregues />} />
        <Route path="/certificadosEntregues" element={<CertificadosEntregues />} />
        <Route path="/cadastrarCertificado" element={<RegisterCertificate />} />
        <Route path="/atualizarEvasores" element={<AtualizarEvasores />} />
        <Route path="/evasoresAntigos" element={<EvasoresAntigos />} />
        <Route path="/gerarAlertas" element={<GerarAlertas />} />
        <Route path="/relatorioAleatorio" element={<RelatorioQuery />} />
        <Route path="/googleContacts" element={<GoogleContacts />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
