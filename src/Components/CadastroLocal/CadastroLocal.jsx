import React, { useState } from 'react';
import { Typography, Container, TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';
import { adicionarLocal } from '../ListaLocal/ListaLocal'; // Importe a função adicionarLocal

function CadastroLocal() {
  const [nomeLocal, setNomeLocal] = useState('');
  const [usuario, setUsuario] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [tipoPratica, setTipoPratica] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCepChange = async (cep) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      const formattedAddress = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
      setEndereco(formattedAddress);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      setError('Erro ao buscar endereço. Verifique o CEP e tente novamente.');
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nomeLocal || !usuario || !cep || !endereco || !latitude || !longitude || !tipoPratica) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    // Chame a função adicionarLocal com os dados do novo local
    adicionarLocal({
      nomeLocal,
      usuario,
      endereco,
      tipoPratica
    });
    // Limpe o formulário após adicionar o local
    setNomeLocal('');
    setUsuario('');
    setCep('');
    setEndereco('');
    setLatitude('');
    setLongitude('');
    setTipoPratica('');
    // Lógica para enviar os dados do formulário para o backend
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Cadastro de Local de Exercício
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nome do Local"
              variant="outlined"
              fullWidth
              value={nomeLocal}
              onChange={(e) => setNomeLocal(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Usuário"
              variant="outlined"
              fullWidth
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="CEP"
              variant="outlined"
              fullWidth
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={(e) => handleCepChange(e.target.value)}
            />
            {loading && <CircularProgress />}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço"
              variant="outlined"
              fullWidth
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Latitude"
              variant="outlined"
              fullWidth
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Longitude"
              variant="outlined"
              fullWidth
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Prática Esportiva</InputLabel>
              <Select
                value={tipoPratica}
                onChange={(e) => setTipoPratica(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value="caminhada">Caminhada</MenuItem>
                <MenuItem value="trilha">Trilha</MenuItem>
                <MenuItem value="musculacao">Musculação</MenuItem>
                <MenuItem value="natacao">Natação</MenuItem>
                <MenuItem value="surf">Surf</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {error && <Typography color="error">{error}</Typography>}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default CadastroLocal;
