import React, { useState } from 'react';
import { Typography, Container, Card, CardContent, Grid } from '@mui/material';

function ListaLocal() {
  // Estado para armazenar os locais cadastrados
  const [locais, setLocais] = useState([]);

  // Função para adicionar um novo local à lista
  const adicionarLocal = (novoLocal) => {
    setLocais([...locais, novoLocal]);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Locais de Exercício
      </Typography>
      <Grid container spacing={3}>
        {/* Mapear os locais cadastrados para renderizar os cards */}
        {locais.map((local, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{local.nomeLocal}</Typography>
                <Typography variant="body1">Usuário: {local.usuario}</Typography>
                <Typography variant="body1">Endereço: {local.endereco}</Typography>
                <Typography variant="body1">Tipo de Prática: {local.tipoPratica}</Typography>
                {/* Adicionar mais informações aqui, se necessário */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ListaLocal;
