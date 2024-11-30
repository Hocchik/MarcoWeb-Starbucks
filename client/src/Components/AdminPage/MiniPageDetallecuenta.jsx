import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Modal,
  Box,
  FormHelperText,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MiniPageDetallecuenta = () => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    password: '',
    repetirPassword: '',
    direccion: '',
    photo: null,
  });


  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormValid, setFormValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const validateForm = () => {
    const { codigo, nombre, password, repetirPassword, direccion } = formData;
    if (
      !codigo ||
      !nombre ||
      !password ||
      !direccion ||
      password !== repetirPassword
    ) {
      setFormValid(false);
      return false;
    }
    setFormValid(true);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setModalOpen(true);
    }
  };

  const handleConfirm = () => {
    // Reset form
    setFormData({
      codigo: '',
      nombre: '',
      password: '',
      repetirPassword: '',
      direccion: '',
      photo: null,
    });
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h6" component="h1" gutterBottom>
        ACTUALIZAR DATOS DE LA CUENTA
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Código"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              error={!isFormValid && !formData.codigo}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              error={!isFormValid && !formData.nombre}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label htmlFor="photo-upload" style={{ width: '100%' }}>
              <input
                accept="image/*"
                id="photo-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <IconButton color="primary" component="span" sx={{ width: '100%', height: '100%' }}>
                <Avatar
                  src={formData.photo ? URL.createObjectURL(formData.photo) : ''}
                  sx={{ width: '100%', height: '100%', aspectRatio: '1' }} // Mantener la proporción
                >
                  <PhotoCamera />
                </Avatar>
              </IconButton>
            </label>
          </Grid>
        </Grid>
        
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          label="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!isFormValid && !formData.password}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          label="Repetir Contraseña"
          name="repetirPassword"
          value={formData.repetirPassword}
          onChange={handleChange}
          error={!isFormValid && formData.repetirPassword !== formData.password}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Dirección"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          error={!isFormValid && !formData.direccion}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Siguiente
        </Button>
        {!isFormValid && (
          <FormHelperText error>
            Por favor, complete todos los campos requeridos correctamente.
          </FormHelperText>
        )}
      </form>

      <Modal open={isModalOpen} onClose={handleCancel}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Confirmar cambios
          </Typography>
          <Typography sx={{ mt: 2 }}>
            ¿Desea conservar los cambios realizados?
          </Typography>
          <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ mt: 2 }}>
            OK
          </Button>
          <Button variant="outlined" onClick={handleCancel} sx={{ mt: 2, ml: 2 }}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};


export default MiniPageDetallecuenta