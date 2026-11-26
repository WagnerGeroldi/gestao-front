/*imports react */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
/*imports IMAGENS */
import logo from "../../assets/images/logo-mini.svg";

/*imports MUI */
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import UpdateIcon from "@mui/icons-material/Update";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import TerminalIcon from '@mui/icons-material/Terminal';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AnalyticsIcon from '@mui/icons-material/Analytics';


import "./Header.scss";
import { ModalConfirm } from "../../components/Modals/ModalConfirm";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const handleClose = () => setOpen(false);
  let info = useLocation();
  let navigate = useNavigate();

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (route: any) => {
    navigate(route);
    handleToggleMenu();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const limparListas = async (e: any) => {
    api.get("/dadosAtuais/limparListas").then((res) => {
      toast.success(res.data.message);
    });
  };

  const limparListasEvasores = async (e: any) => {
    api.get("/evasores/limparListas").then((res) => {
      toast.success(res.data.message);
      setDisabledButton(false);
    });
  };

  const trocarListaEvasores = async (e: any) => {
    let resposta = confirm("Deseja trocar a lista de evasores?");

    if (resposta === true) {
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
      <Drawer open={menuOpen} onClose={() => handleToggleMenu()}>
        <List>
          <ListItem button onClick={() => handleMenuClick(`/`)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Início</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleMenuClick(`/updateData`)}>
            <ListItemIcon>
              <SyncAltIcon />
            </ListItemIcon>
            <ListItemText>Atualizar Relatórios</ListItemText>
          </ListItem>

          <ListItem button onClick={() => handleMenuClick(`/turmaDetalhe`)}>
            <ListItemIcon>
              <SwitchAccountIcon />
            </ListItemIcon>
            <ListItemText>Visualizar Turmas</ListItemText>
          </ListItem>

          <ListItem button onClick={() => handleMenuClick(`/unidadeDetalhe`)}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText>Visão Geral da Unidade</ListItemText>
          </ListItem>

          <ListItem
            button
            onClick={() => handleMenuClick(`/certificadosNaoEntregues`)}
          >
            <ListItemIcon>
              <WorkspacePremiumIcon />
            </ListItemIcon>
            <ListItemText>Certificados Alunos</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => handleMenuClick(`/atualizarEvasores`)}
          >
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <ListItemText>Atualização de Evasores</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleClickOpen()}>
            <ListItemIcon>
              <GppMaybeIcon />
            </ListItemIcon>
            <ListItemText>Atualizar Alunos</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleMenuClick(`/gerarAlertas`)}>
            <ListItemIcon>
              <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText>Gerar lista de Alertas</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleMenuClick(`/relatorioAleatorio`)}>
            <ListItemIcon>
              <TerminalIcon />
            </ListItemIcon>
            <ListItemText>Relatório via Query</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleMenuClick(`/googleContacts`)}>
            <ListItemIcon>
              <DesignServicesIcon />
            </ListItemIcon>
            <ListItemText>Gerar arquivo Google Contacts</ListItemText>
          </ListItem>
        </List>
      </Drawer>

      <div className="row bg-light d-flex justify-content-between p-2">
        <div className="col-md-6 col-sm-12 d-flex align-items-center">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => handleToggleMenu()}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="LOGO" width={55} />
          <div className="area-logo-text">
            <span className="unisoft">Rede Unisoft</span>
            <div>
              <small>Gestão de Aunos</small>
            </div>
          </div>
        </div>
        {info.pathname != "/" ? (
          <div className="col-md-6 col-sm-12 d-flex gap-3 justify-content-end h-50 mt-3">
            {info.pathname == "/updateData" ? (
              <div className="d-flex gap-3">
                <button className="btn btn-warning" onClick={limparListas}>
                  Zerar Listas
                </button>
              </div>
            ) : (
              ""
            )}

            {info.pathname == "/atualizarEvasores" ? (
              <div className="d-flex gap-3">
                <button
                  className="btn btn-warning"
                  onClick={limparListasEvasores}
                >
                  Zerar Lista de Evasores
                </button>
                <button
                  className="btn btn-info"
                  onClick={trocarListaEvasores}
                  disabled={disabledButton}
                >
                  Trocar lista de Evasores
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
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
