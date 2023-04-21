import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  projetoId: number;
  clienteId?: number;
  // open: boolean;
  // handleModal: (projetoId: number) => void;
  openModal: boolean;
}

export default function ModalCliente({ projetoId, clienteId, openModal }: IProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"edit" | "create">("create");
  const [hasMounted, setHasMounted] = useState(false);
  const handleModal = () => setOpen(!open);
  // const handleClose = () => setOpen(!open);

  useEffect(() => {
    if (hasMounted) {
      console.log("openModal: ", openModal, " - clienteId: ", clienteId);
        if (clienteId) {
          setMode("edit")
          console.log("Modo Edição");
          console.log("[ModalCliente] projetoId: ", projetoId, " - clienteId: ", clienteId);
        } else {
          setMode("create")
          console.log("Modo Criação");
          console.log("[ModalCliente] projetoId: ", projetoId, " - clienteId: ", clienteId);
        }
        setOpen(true);
    } else {
      setHasMounted(true)
    }
    
  }, [openModal])

  const handleSalvar = () => {
    if (mode === "create") {
      window.alert(`Salvar Novo Cliente ref. ProjetoId: ${projetoId}`)
    } else {
      window.alert(`Salvar Edição do Cliente ClientId ${clienteId} ref. ProjetoId: ${projetoId}`)
    }
  }

  return (
    <div>
      {/* <Button onClick={handleModal}>Adicionar Cliente</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {mode === 'edit' ? "Editar" : "Adicionar"} Clientes ao Projeto "{projetoId}"
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Falta incluir os respectivos Select. Se for o caso criar um chamada que mostra apenas Clientes disponíveis, ou seja, Clientes que já não estão relacionados com o ProjetoId especificado.
            </Typography>
            <Button onClick={() => handleSalvar()}>Salvar</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
