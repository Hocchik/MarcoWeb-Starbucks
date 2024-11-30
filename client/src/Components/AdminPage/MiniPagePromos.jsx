import { useState } from 'react';
import * as React from 'react';
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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAdmin } from '../../context/AdminContext';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs'
import { useAuth } from '../../context/AuthContextAdmin';
import { useNavigate } from 'react-router-dom';


/* Datos tabla */
const columns = [
  { id: 'producto', label: 'Producto', edit: 'Producto', minWidth: 70, type:'text' },

  { id: 'descuento', label: 'Descuento', edit: 'Descuento', minWidth: 100, type:'text' },
  {
    id: 'dateString',
    label: 'Fecha',
    edit: '',
    minWidth: 10,
    align: 'right',
    type:'date',
    format: (value) => value.toLocaleString('en-US'),
  },
];


function MiniPagePromos() {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const {createPromociones, updatePromociones, deletePromociones} = useAdmin();
  const {admin} = useAuth()

  const onSubmit = handleSubmit((data) =>{
    data.date = dayjs(data.dateString).toISOString()
    data.admin = admin.id
    console.log(data)
    createPromociones(data).then(() => {
      window.location.reload();
    });
  })


  /* Tabla promociones */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const [action, setAction] = useState('');
  const [formeditData, setFormeditData] = useState({});
  

  const handleClickOpen = (row, actionType) => {
    setCurrentRow(row);
    setAction(actionType);
    setOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormeditData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
      formeditData.admin = admin.id
      formeditData.date = dayjs(formeditData.dateString).toISOString()
      console.log(formeditData)
      updatePromociones(formeditData).then(() => {
        window.location.reload();
      });
    } else if (action === 'delete') {
      console.log('Eliminando:', currentRow);
      // Lógica para eliminar
      deletePromociones(currentRow).then(() => {
        window.location.reload();
      });
    
    }
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const {getPromociones, promos} = useAdmin()
  const {getProductos, products} = useAdmin()

  const rows = promos

  React.useEffect(() => {
    getPromociones(),
    getProductos()
  }, [])


  return (
    <div className='flex gap-4'>
    <div className="container w-fit mr-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Formulario de Promoción</h1>
      <form onSubmit={onSubmit} className="bg-stone-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="producto">
            Producto
          </label>
          <select name="producto" id="producto" className="shadow appearance-none border rounded py-2 px-3 w-fit bg-stone-500 text-white leading-tight focus:outline-none focus:shadow-outline"
          {...register("producto")}
          >
            <option value="">Selecciona un producto</option>
            {products.map((product) => (
            <option key={product._id} value={product.name}>
            {product.name}
            </option>
            ))}
                      
          </select>

          {errors.producto && <p className="text-red-500 text-xs italic">{errors.producto}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descuento">
            Descuento (%)
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-fit bg-stone-500 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="descuento"
            type="text"
            name="descuento"
            {...register("descuento")}
          />
          {errors.descuento && <p className="text-red-500 text-xs italic">{errors.descuento}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Fecha de la Promoción
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-fit bg-stone-500 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            name="date"
            {...register("dateString")}
          />
          {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
            Duración de la Promoción
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 w-fit bg-stone-500 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="duration"
            type="number"
            name="duration"
            {...register("duration")}
          />
          {errors.duration && <p className="text-red-500 text-xs italic">{errors.duration}</p>}
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
    <div className='container w-fit ml-auto py-12'>
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
              <TableCell sx={{fontSize: '1.10rem', textAlign: 'center'}}>Acciones</TableCell>
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
                label={column.edit}
                variant="outlined" // Usar variante "outlined" para la etiqueta flotante
                type={column.type}
                fullWidth
                onChange={handleChange} // Manejar cambios en los inputs
              />
            ))}
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    </div>
  );
}

export default MiniPagePromos;

