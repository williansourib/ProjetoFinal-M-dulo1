import React, { useState } from 'react';
import { Typography, Container, TextField, Grid, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/users', {
        nome,
        sexo,
        cpf,
        dataNascimento,
        email,
        senha,
        endereco
      });

      if (response.data.success) {
        alert('Registro realizado com sucesso! Faça login para continuar.');
        window.location.href = '/login';
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setError('Ocorreu um erro durante o registro.');
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Registre-se
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sexo"
              variant="outlined"
              fullWidth
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="CPF"
              variant="outlined"
              fullWidth
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Data de Nascimento"
              variant="outlined"
              fullWidth
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço"
              variant="outlined"
              fullWidth
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              onBlur={(e) => handleCepChange(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Registrar
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default Registro;
