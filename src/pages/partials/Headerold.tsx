/*imports react */
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
/*imports IMAGENS */
import logo from "../../assets/images/logo-mini.svg";

import "./Header.scss";
import { api } from "../../api/api";
import { ModalConfirm } from "../../components/Modals/ModalConfirm";
import { useState } from "react";

export function Headerold(this: any) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleMenuClick = (route: any) => {
    navigate(route);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const limparListas = async (e: any) => {
    api.get("/dadosAtuais/limparListas").then((res) => {
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    });
  };

  const trocarListaEvasores = async (e: any) => {
    let resposta = confirm("Deseja trocar a lista de evasores?")
    
    if(resposta === true) {
      api.get("/evasores/loadData").then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
    }
    
    
  };

  return (
    <>
      <ToastContainer />
      <div className="row bg-light d-flex p-1 justify-content-between">
        <div className="col-12 col-md-4 d-flex align-items-center mb-3">
          <img src={logo} alt="LOGO" width={55} />
          <div className="area-logo-text">
            <span className="unisoft">Rede Unisoft</span>
            <div>
              <small>Gestão de Alunos</small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 d-flex gap-3 justify-content-end align-items-center mb-3">
          <button
            className="btn btn-primary"
            onClick={() => handleMenuClick(`/`)}
          >
            Início
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleMenuClick(`/updateData`)}
          >
            Atualizar Relatórios
          </button>
          <button
            className="btn btn-info"
            onClick={() => handleMenuClick(`/turmaDetalhe`)}
          >
            Visualizar Turmas
          </button>
          <button className="btn btn-warning" onClick={limparListas}>
            Zerar Listas
          </button>
          <button className="btn btn-danger" onClick={() => handleClickOpen()}>
            Atualizar alunos
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleMenuClick(`/certificadosNaoEntregues`)}
          >
            Certificados Alunos
          </button>
          <button
            className="btn btn-info"
            onClick={() => handleMenuClick(`/atualizarEvasores`)}
          >
            Atualização de evasores
          </button>
          <button className="btn btn-warning" onClick={trocarListaEvasores}>
            Trocar lista de Evasores
          </button>
        </div>
      </div>
      <ModalConfirm
        action={""}
        title="Atualizar lista"

        setOpen={open}
        setClose={handleClose}
        infoOne="Atualizar"
      />
    </>
  );
}
