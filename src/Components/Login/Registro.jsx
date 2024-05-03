import React, { useState } from 'react';
import { Typography, Container, TextField, Grid, Button, CircularProgress } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from 'axios'; // Importe o axios para fazer a chamada à API do ViaCEP
import './Registro.css';

const Registro = () => {
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCepChange = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      const formattedAddress = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
      setEndereco(formattedAddress);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Simulação de envio dos dados do formulário (substituir com lógica de envio real)
    setTimeout(() => {
      // Lógica para enviar os dados do formulário para o backend
      console.log('Dados do usuário cadastrado:', { nome, sexo, cpf, dataNascimento, email, senha, endereco });
      setLoading(false);
    }, 2000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Registre-se
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Sexo"
              variant="outlined"
              fullWidth
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
            >
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="CPF"
              variant="outlined"
              fullWidth
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Data de Nascimento"
              variant="outlined"
              fullWidth
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Senha"
              variant="outlined"
              fullWidth
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="CEP"
              variant="outlined"
              fullWidth
              value={endereco}
              onChange={(e) => handleCepChange(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Registro;
