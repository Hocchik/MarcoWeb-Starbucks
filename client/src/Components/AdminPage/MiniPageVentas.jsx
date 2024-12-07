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
  { id: 'nombreProducto', label: 'Producto', minWidth: 70 },
  { id: 'precioUnitario', label: 'Precio Unitario', minWidth: 100 },
  { id: 'cantidad', label: 'Cantidad', minWidth: 100 },
  { id: 'total', label: 'Total', minWidth: 100 },
  { id: 'fechaVenta', label: 'Fecha', minWidth: 100,align: 'right',
    type:'date', format: (value) => value.toLocaleString('en-US') }
];

function MiniPageVentas() {
  const { register, handleSubmit} = useForm();
  const { createVentas, updateVentas, deleteVentas } = useAdmin();

  const onSubmit = handleSubmit((data) =>{
    console.log(data)
    createVentas(data)
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
      updateVentas(formeditData)
      
    } else if (action === 'delete') {
      console.log('Eliminando:', currentRow);
      // Lógica para eliminar
      deleteVentas(currentRow)
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

  const {getVentass, ventas} = useAdmin()
  
  const rows = ventas

  useEffect(() => {
    getVentass()
  }, [])

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
          </form>
          ) : (
            <p>¿Está seguro de que desea eliminar el registro: {currentRow?.nombreProducto}?</p>
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
        Agregar Venta +
      </Button>

      {/* Main modal */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Crear Venta</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <TextField
                name="nombreProducto"
                label="Nombre del Producto"
                type="text"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("nombreProducto")}
                required
                placeholder="Ingresa el nombre del Producto"
              />
              <TextField
                name="cantidad"
                label="Cantidad"
                type="number"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("cantidad")}
                required
                placeholder="Ingresa la cantidad a vender"
              />
              <TextField
                name="clienteID"
                label="ID del cliente"
                type="text"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("ClienteID")}
                required
                placeholder="Ingresa id del Cliente"
              />
    </div>

            

            <DialogActions>
              <Button onClick={() => setOpenCreate(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary" onClick={() => setOpenCreate(false)}>
                Agregar Venta
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>


    </div>
  );
}

export default MiniPageVentas