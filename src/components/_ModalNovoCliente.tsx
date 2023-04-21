import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  ProjetoId: number;
}

export default function ModalNovoCliente({ProjetoId}: IProps) {
  const [open, setOpen] = React.useState(false);
  const handleModal = () => setOpen(!open);
  // const handleClose = () => setOpen(!open);

  return (
    <div>
      <Button onClick={handleModal}>Adicionar Cliente</Button>
      <Modal
      // sx={{width: "400px"}}
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
              Adicionar Clientes ao Projeto "{ProjetoId}"
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Falta incluir os respectivos Select. Se for o caso criar um chamada que mostra apenas Clientes disponíveis, ou seja, Clientes que já não estão relacionados com o ProjetoId especificado.
              Falta incluir os respectivos Select. Se for o caso criar um chamada que mostra apenas Clientes disponíveis, ou seja, Clientes que já não estão relacionados com o ProjetoId especificado.
              Falta incluir os respectivos Select. Se for o caso criar um chamada que mostra apenas Clientes disponíveis, ou seja, Clientes que já não estão relacionados com o ProjetoId especificado.
            </Typography>
            <Button onClick={() => window.alert(`Salvar Cliente ref. ProjetoId: ${ProjetoId}`)}>Salvar</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}