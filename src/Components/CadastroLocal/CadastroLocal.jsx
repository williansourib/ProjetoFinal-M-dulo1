// CadastroLocal.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';
import ListaLocal from '../ListaLocal/ListaLocal';
import "./CadastroLocal.css";

const CadastroLocal = () => {
  const [nomeLocal, setNomeLocal] = useState('');
  const [usuario, setUsuario] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [tipoPratica, setTipoPratica] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [error, setError] = useState('');
  const [locais, setLocais] = useState([]); // State para armazenar os locais cadastrados

  useEffect(() => {
    // Função para carregar os locais cadastrados quando o componente for montado
    const fetchLocais = async () => {
      try {
        const response = await axios.get('http://localhost:3001/locais');
        setLocais(response.data);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };

    fetchLocais();
  }, []); // Executa apenas uma vez, quando o componente é montado

  const handleCepChange = async (cep) => {
    // Função para buscar o endereço com base no CEP
    try {
      setLoadingCep(true);
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      const formattedAddress = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
      setEndereco(formattedAddress);
      setLoadingCep(false);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      setError('Erro ao buscar endereço. Verifique o CEP e tente novamente.');
      setLoadingCep(false);
    }
  };

  const handleSubmit = async (event) => {
    // Função para lidar com o envio do formulário
    event.preventDefault();
    if (!nomeLocal || !usuario || !cep || !endereco || !latitude || !longitude || !tipoPratica) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    try {
      // Envia os dados do novo local para o servidor
      const response = await axios.post('http://localhost:3001/locais', {
        nomeLocal,
        usuario,
        cep,
        endereco,
        latitude,
        longitude,
        tipoPratica
      });
      console.log('Local cadastrado:', response.data); // Verifica se o cadastro foi bem-sucedido
      setLocais([...locais, response.data]); // Adiciona o novo local à lista de locais
      setNomeLocal('');
      setUsuario('');
      setCep('');
      setEndereco('');
      setLatitude('');
      setLongitude('');
      setTipoPratica('');
      setError('');
    } catch (error) {
      console.error('Erro ao cadastrar local:', error);
      setError('Erro ao cadastrar local. Por favor, tente novamente.');
    }
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
            {loadingCep && <CircularProgress />}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço"
              variant="outlined"
              fullWidth
              value={endereco}
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
            <FormControl fullWidth variant="outlined">
              <InputLabel>Tipo de Prática</InputLabel>
              <Select
                value={tipoPratica}
                onChange={(e) => setTipoPratica(e.target.value)}
                label="Tipo de Prática"
              >
                <MenuItem value="Musculação">Musculação</MenuItem>
                <MenuItem value="Cardio">Cardio</MenuItem>
                <MenuItem value="Yoga">Yoga</MenuItem>
                <MenuItem value="Outro">Outro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar Local
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      {/* Passa os locais cadastrados para o componente ListaLocal */}
      <ListaLocal locais={locais} />
    </Container>
  );
};

export default CadastroLocal;
