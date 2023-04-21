import { Button, Container, Divider, Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ModalNovoCliente from './components/ModalNovoCliente';
import ModalNovoFuncionario from './components/ModalNovoFuncionario';
import { example, funcionariosResponse } from './data';

const Item = (props: any) => {
  return (
    <div style={{border: "1px solid blue"}}>{props.children}</div>
  )
}

type Funcionarios = {
  name?: string;
  funcionarioId: number;
  projetoClienteId: number;
  projetoClienteFuncionarioAtivo: boolean;
}

export default function App() {
  const [projeto, setProjeto] = useState(example);
  const [funcionarios, setFuncionarios] = useState([] as Funcionarios[]);
  const [selectedCliente, setSelectedCliente] = useState(0);

  useEffect(() => {

    // Cliente foi selecionado
    if (selectedCliente) {
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
    setFuncionarios(funcionariosData as Funcionarios[]);
    console.log(`Selecionado ProjetoClienteId ${selectedCliente}`);
    console.log(funcionariosData);
    }
    }, [selectedCliente]);

    useEffect(() => {
      console.log("Atualização em Funcionários - Renderizando novos dados");
    }, [funcionarios])

  return (
    <Container maxWidth="xl">
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ my: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Cadastro de Projetos
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
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
        <Grid item xs={6} md={6}>
          <Item>
            <Stack>
              <h4>Clientes</h4>
              <Divider sx={{marginBottom: 2}} />
              <ModalNovoCliente ProjetoId={projeto.projetoId} />
              {example.projetoClientes.map((projetoCliente) => {
                return (
                  <Stack key={`projetoCliente-${projetoCliente.projetoClienteId}`} sx={{margin: 2, border: "1px solid green"}}>
                    <Button onClick={() =>setSelectedCliente(projetoCliente.projetoClienteId)}>Selecionar Cliente {projetoCliente.projetoClienteId}</Button>
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
              )})}

            </Stack>
          </Item>
        </Grid>
        {selectedCliente > 0 && <Grid item xs={6} md={3}>
          <Item>
            <h4>Funcionário</h4>
            <Divider sx={{marginBottom: 2}} />
            <Stack>
              <ModalNovoFuncionario key="bnf" ProjetoClienteId={selectedCliente} />
              {funcionarios.map((funcionario) => {
                return (
                    <Stack key={`funcionario-${funcionario.funcionarioId}`} sx={{margin: 2, border: "1px solid green"}}>
                      <span>Nome: {funcionario.name}</span>
                      <span>FuncionarioId: {funcionario.funcionarioId}</span>
                      <span>ClienteId: {funcionario.projetoClienteId}</span>
                      <span>Status: {funcionario.projetoClienteFuncionarioAtivo ? "SIM" : "NÃO"}</span>
                    </Stack>
                )
              })}
              </Stack>
              </Item>
        </Grid>}
      </Grid>
      
    </Container>
  );
}