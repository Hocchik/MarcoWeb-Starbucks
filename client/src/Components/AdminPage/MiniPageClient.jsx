import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAdmin } from '../../context/AdminContext';
import { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const columns = [
  { id: 'username', label: 'Nombre', minWidth: 70 },
  { id: 'email', label: 'Correo', minWidth: 100 },
];

export default function MiniPageClient() {
  
  const { register, handleSubmit} = useForm();
  const { createClientes, updateClientes, deleteClientes } = useAdmin();

  const onSubmit = handleSubmit((data) =>{
    console.log(data)
    createClientes(data)
  })
  
  
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [action, setAction] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [formeditData, setFormeditData] = useState({});

  const handleClickOpen = (row, actionType) => {
    setCurrentRow(row);
    console.log(row)
    setAction(actionType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRow(null);
  };

  const handleConfirm = () => {
    if (action === 'edit') {
      console.log('Editando:', currentRow);
      // Lógica para editar
      formeditData._id = currentRow._id
      console.log(formeditData)
      updateClientes(formeditData)
      
    } else if (action === 'delete') {
      console.log('Eliminando:', currentRow);
      // Lógica para eliminar
      deleteClientes(currentRow)
    }
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormeditData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    })); // Actualizar el estado del formulario

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const {getClientes, clients} = useAdmin()
  const rows = clients

  useEffect(() => {
    getClientes()
  }, [getClientes])

  return (
    <div className='flex justify-between items-end flex-col'>
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 440}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{fontSize: '1.10rem'}}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{fontSize: '1.10rem', textAlign:'center'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            
                        </TableCell>
                      );
                    })}
                <TableCell>
                <Button
                  onClick={() => handleClickOpen(row, 'edit')}
                >
                  <EditIcon/>
                </Button>
                <Button
                  onClick={() => handleClickOpen(row, 'delete')}
                >
                  <DeleteIcon/>
                </Button>
              </TableCell>

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

 
    {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{action === 'edit' ? 'Editar' : 'Eliminar'} Registro</DialogTitle>
        <DialogContent>
          {action === 'edit' ? (
            <form>
            {columns.map((column) => (
              <TextField
                key={column.id}
                margin="dense"
                name={column.id} // Nombre del campo igual al id de la columna
                label={column.label}
                variant="outlined" // Usar variante "outlined" para la etiqueta flotante
                type="text"
                fullWidth
                onChange={handleChange} // Manejar cambios en los inputs
              />
            ))}
            <TextField
                key={'password'}
                margin="dense"
                name={'password'} // Nombre del campo igual al id de la columna
                label={'Contraseña'}
                variant="outlined" // Usar variante "outlined" para la etiqueta flotante
                type="text"
                fullWidth
                onChange={handleChange} // Manejar cambios en los inputs
              />
          </form>
          ) : (
            <p>¿Está seguro de que desea eliminar el registro: {currentRow?.id}?</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>




      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

{/* Modal Submitº */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreate(true)}
        style={{ marginTop: '16px' }}
      >
        Agregar Cliente +
      </Button>

      {/* Main modal */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <TextField
                name="username"
                label="Nombre de Usuario"
                variant="outlined"
                type='text'
                fullWidth
                margin="dense"
                {...register("username")}
                required
                placeholder="Escribe tu nombre de usuario"
              />
              <TextField
                name="email"
                label="Correo Electrónico"
                type="email"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("email")}
                required
                placeholder="Ingresar Correo"
              />
              <TextField
                name="password"
                label="Contraseña"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("password")}
                required
                placeholder='Ingresar Contraseña'
              />
    </div>

            

            <DialogActions>
              <Button onClick={() => setOpenCreate(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary" onClick={() => setOpenCreate(false)}>
                Agregar Cliente
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>


    </div>
  );
}
