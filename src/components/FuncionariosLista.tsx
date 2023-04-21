import { Divider, Grid, Stack, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import ModalNovoFuncionario from './ModalNovoFuncionario';

type IProps = {
// children: React.ReactNode;
selectedCliente: number;
funcionarios: Funcionario[];
}

type Funcionario = {
  name: string;
  funcionarioId: number;
  projetoClienteId: number;
  projetoClienteFuncionarioAtivo: boolean;
}

const Item = ({children}: any) => {
  return (
    <div style={{border: "1px solid blue"}}>{children}</div>
  )
}

export const FuncionariosLista = (props: IProps) => {
  const {selectedCliente, funcionarios} = props;

  return (
    <Grid item sm={4} md={3}>
          <Item>
            <h4>Funcionário</h4>
            <Divider sx={{marginBottom: 2}} />
            <Stack>
              <ModalNovoFuncionario key="bnf" ProjetoClienteId={selectedCliente} />
              {funcionarios.map((funcionario) => {
                const [ativo, setAtivo] = useState(funcionario.projetoClienteFuncionarioAtivo);
                const handleUpdateFuncionario = (funcionario: Funcionario) => {
                  console.log(`handleUpdateFuncionario: ${funcionario.name}`);
                  funcionario = {...funcionario, projetoClienteFuncionarioAtivo: !ativo};
                  setAtivo(!ativo);
                  
                  console.log(funcionario);
                  // Chamada à API
                  // Se sucesso, emitir um toast.

                  // Se falhar, reverter o estado
                }
                return (
                    <Stack key={`funcionario-${funcionario.funcionarioId}`} sx={{margin: 2, border: "1px solid green"}}>
                      <span>Nome: {funcionario.name}</span>
                      <span>FuncionarioId: {funcionario.funcionarioId}</span>
                      <span>ClienteId: {funcionario.projetoClienteId}</span>
                      <span>Status: {funcionario.projetoClienteFuncionarioAtivo ? "SIM" : "NÃO"}</span>
                      <Typography>Ativo? <Switch key={funcionario.funcionarioId} checked={ativo} onChange={() => handleUpdateFuncionario(funcionario)} size={'medium'} /></Typography>
                    </Stack>
                )
              })}
              </Stack>
              </Item>
        </Grid>
  )
}