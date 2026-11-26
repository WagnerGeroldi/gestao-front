/*imports MUI */
import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";

/*imports CSS */
import "./styles/ModalConfirm.scss";

/*imports Estilo Modal */
import { styleModal } from "./StyleModal";
import { api } from "../../api/api";
import { ButtonDefault } from "../button/ButtonDefault";
import { Spinner } from "../Spinner";
import { useState } from "react";
import { toast } from "react-toastify";

function ModalConfirm(props: any) {
  const [dados, setDados] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const uploadData = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("dados_atuais", dados as any);
    api.post("/dadosAtuais/loadData", formData).then((res) => {
      setIsLoading(false);
      toast.success(res.data.message);
      setTimeout(() => {
        location.reload()
      }, 600);
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.setOpen}
      onClose={props.setClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.setOpen}>
        <Box sx={styleModal}>
          <Typography
            id="transition-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
          >
            {props.title}
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2 }}
            textAlign={"justify"}
          >
            {props.text}
          </Typography>
          <div className="line-button">
            <div className="row bg-light mb-4 ">
            <div className="col-12 mt-4">
              Substituir a lista do mês anterior para a lista do mês atual
              </div>
              <div className="col-12 mt-4">
                <small>Adicione o arquivo CSV</small>
                <hr />
                <form
                  method="POST"
                  onSubmit={uploadData}
                  encType="multipart/form-data"
                >
                  <input
                    type="file"
                    name="dados_atuais"
                    id="dados_atuais"
                    required
                    onChange={(e: any) => setDados(e.target.files[0])}
                  />
                  <div className="col-12 d-flex gap-3 m-4 justify-content-center">
                    <ButtonDefault
                      content={isLoading ? <Spinner /> : "Atualizar"}
                    />
                    <Button onClick={() => props.setClose(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export { ModalConfirm };
