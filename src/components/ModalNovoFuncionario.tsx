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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  ProjetoClienteId: number;
}

export default function ModalNovoFuncionario({ProjetoClienteId}: IProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(!open);

  return (
    <div>
      <Button onClick={handleOpen}>Adicionar Funcionário</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
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
              Adicionar Funcionários ao ProjetoCliente "{ProjetoClienteId}"
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Falta incluir os respectivos Select. Se for o caso criar um chamada que mostra apenas funcionários disponíveis, ou seja, funcionários que já não estão relacionados com o ProjetoClienteId especificado.
            </Typography>
            <Button onClick={() => window.alert(`Salvar Funcionário ref. ProjetoClienteId ${ProjetoClienteId}`)}>Salvar</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}