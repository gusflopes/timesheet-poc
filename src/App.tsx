import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FuncionariosLista } from './components/FuncionariosLista';
import ModalCliente from './components/ModalCliente';
import { example, funcionariosResponse } from './data';

const Item = (props: any) => {
  return (
    <div style={{border: "1px solid blue"}}>{props.children}</div>
  )
}

type Funcionario = {
  name: string;
  funcionarioId: number;
  projetoClienteId: number;
  projetoClienteFuncionarioAtivo: boolean;
}

export default function App() {
  const [clienteModal, setClienteModal] = useState(false);
  const [projeto, setProjeto] = useState(example);
  const [funcionarios, setFuncionarios] = useState([] as Funcionario[]);
  const [selectedCliente, setSelectedCliente] = useState(0);
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleModalCliente = (projetoClienteId: number) => setClienteModal(!clienteModal);

  const handleChange =
  (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    // console.log("Chamado useEffect 1 - MAIOR")
    // Cliente foi selecionado
    if (selectedCliente) {
      console.log("SelectedCliente");
    // Buscar Funcionarios
    const projetoCliente = example.projetoClientes.find(
      (projetoCliente) => projetoCliente.projetoClienteId === selectedCliente
    );
    const funcionariosData = projetoCliente?.projetoClienteFuncionarios.map((projetoClienteFuncionario) => {
      const funcionario = funcionariosResponse.find(
        (funcionarioResponse) =>
          funcionarioResponse.funcionarioId === projetoClienteFuncionario.funcionarioId
      );
      return {
        name: funcionario?.funcionarioNome,
        funcionarioId: funcionario?.funcionarioId,
        projetoClienteId: projetoClienteFuncionario.projetoClienteId,
        projetoClienteFuncionarioAtivo: projetoClienteFuncionario.projetoClienteFuncionarioAtivo,
      };
    });
    setFuncionarios(funcionariosData as Funcionario[]);
    console.log(`Selecionado ProjetoClienteId ${selectedCliente}`);
    console.log(funcionariosData);
    }
    }, [selectedCliente]);

  useEffect(() => {
    // console.log("Chamado useEffect 2 - MENOR")
    // console.log("Atualização em Funcionários - Renderizando novos dados");
  }, [funcionarios])

  return (
    <Container maxWidth="xl">
      <ModalCliente
        projetoId={projeto.projetoId}
        clienteId={selectedCliente}
        openModal={clienteModal}
         />
      <Grid container spacing={2}>
        {/* Titulo */}
        <Grid item sm={12} >
          <Box sx={{ my: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Cadastro de Projetos
            </Typography>
          </Box>
        </Grid>
        {/* Projeto */}
        <Grid item sm={12} md={3}>
          <Item>
            <h4>Projeto</h4>
            <Divider sx={{marginBottom: 2}} />
            <Stack>
              <span>"projetoId": {projeto.projetoId}</span>
              <span>"projetoNome": {projeto.projetoNome}</span>
              <span>"projetoGeraFatura": {projeto.projetoGeraFatura}</span>
              <span>"projetoAtivo": {projeto.projetoAtivo ? "SIM" : "NÃO"}</span>
            </Stack>
          </Item>
        </Grid>
        {/* Clientes */}
        <Grid item sm={8} md={6}>
          <Item>
            <Stack key="Clientes">
              <h4>Clientes</h4>
              <Divider sx={{marginBottom: 2}} />
              {/* <ModalNovoCliente ProjetoId={projeto.projetoId}  /> */}
              <Button onClick={() => {
                  setSelectedCliente(0)
                  handleModalCliente(projeto.projetoId)

              }}>Novo Cliente</Button>

                  {/* <Button onClick={async () => {
                      setSelectedCliente(projetoCliente.projetoClienteId)
                      handleModalCliente(projetoCliente.projetoClienteId)
                    }}>Editar Cliente {projetoCliente.projetoClienteId}</Button> */}
              {example.projetoClientes.map((projetoCliente) => {
                return (
                  <Accordion key={`clientes-${projetoCliente.projetoClienteId}`} expanded={expanded === projetoCliente.projetoClienteId} onChange={handleChange(projetoCliente.projetoClienteId)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    {/* <Typography sx={{ width: '20%', flexShrink: 0 }}>
                      Cliente
                    </Typography> */}
                      <Button
                        sx={{
                          // color: 'text.secondary'
                          display: 'flex',
                          flex: 1
                        }}
                        onClick={() =>setSelectedCliente(projetoCliente.projetoClienteId)}
                      >
                        {projetoCliente.projetoClienteAlias}
                      </Button>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Stack key={`projetoCliente-${projetoCliente.projetoClienteId}`} sx={{margin: 2, border: "1px solid green"}}>
                    <Button onClick={async () => {
                      setSelectedCliente(projetoCliente.projetoClienteId)
                      handleModalCliente(projetoCliente.projetoClienteId)
                      // AQUI

                    }}>Editar Cliente {projetoCliente.projetoClienteId}</Button>
                    <span>ProjetoClienteId: {projetoCliente.projetoClienteId}</span>
                    <span>ClienteId: {projetoCliente.clienteId}</span>
                    <span>"gestorId": {projetoCliente.gestorId},</span>
                    <span>"projetoId": {projetoCliente.projetoId}</span>
                    <span>"projetoClienteAlias": {projetoCliente.projetoClienteAlias}</span>
                    <span>"projetoClienteValorHora": {projetoCliente.projetoClienteValorHora}</span>
                    <span>"projetoClienteValorReferencia": {projetoCliente.projetoClienteValorReferencia}</span>
                    <span>"projetoClienteDataCadastro": {projetoCliente.projetoClienteDataCadastro}</span>
                    <span>"projetoClienteAprovacao": {projetoCliente.projetoClienteAprovacao}</span>
                    <span>"projetoClienteNumPedido": {projetoCliente.projetoClienteNumPedido}</span>
                    <span>"projetoClienteAtivo": {projetoCliente.projetoClienteAtivo ? "SIM" : "NÃO"}</span>
                  </Stack>
                  </AccordionDetails>
                </Accordion>
                  
                  
              )})}

            </Stack>
          </Item>
        </Grid>
        {/* Funcionários */}
        {selectedCliente > 0 &&
          <FuncionariosLista funcionarios={funcionarios} selectedCliente={selectedCliente}  />}
      </Grid>
    </Container>
  );
}