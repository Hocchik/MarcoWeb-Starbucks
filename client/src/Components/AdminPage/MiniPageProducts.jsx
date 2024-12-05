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
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAdmin } from '../../context/AdminContext';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';

const columns = [
  { id: 'name', label: 'Nombre', minWidth: 70 },
  { id: 'price', label: 'Precio', minWidth: 100 },
  { id: 'category', label: 'Categoría', minWidth: 10, align: 'right'},
  { id: 'type', label:'Tipo', minWidth: 10 }
];



export default function MiniPageProducts() {
  
  const { register, handleSubmit} = useForm();
  const {createProductos, updateProductos, deleteProductos} = useAdmin();
  
  const onSubmit = handleSubmit((data)  => {
    data.price = "S/" + data.price
    console.log(data);
    console.log(data.type)
    createProductos(data);
  })

  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openCreate, setOpenCreate] = useState(false);
  const [formeditData, setFormeditData] = useState({});

  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [action, setAction] = useState('');

  const handleClickOpen = (row, actionType) => {
    setCurrentRow(row);
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
      updateProductos(formeditData)
    } else if (action === 'delete') {
      console.log('Eliminando:', currentRow);
      // Lógica para eliminar
      deleteProductos(currentRow);
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




  /* Categoria y Tipo */
  const [tipoOptions, setTipoOptions] = useState([]);
  const optionsMap = {
    Bebidas: ['Frappuccinos', 'Expresso Caliente', 'Expresso Frío', 'Refreshers', 'Otras bebidas calientes', 'Otras bebidas frías', 'Shaken Espresso'],

    Alimentos: ['Pastries', 'Postres', 'Sandwiches'],

    "Merch y Café en Grano": ['Café en Grano', 'Merch'],

    "Packs y Boxes": ['Coffee for Share', 'Desayunos', 'Antojos de la tarde'],
  };
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setTipoOptions(optionsMap[selectedCategory] || []);
    console.log(tipoOptions)
  };

  const {getProductos, products} = useAdmin()
  const rows = products

  useEffect(() => {
    getProductos()
  }, [getProductos])  


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
              <TableCell sx={{fontSize: '1.10rem', textAlign:'center'}} >Acciones</TableCell>
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
                <Button sx={{width: '30px'}} 
                  onClick={() => handleClickOpen(row, 'edit')}
                >
                  <EditIcon/>
                </Button>
                <Button sx={{width: '30px'}} 
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
        <DialogTitle>{action === 'edit' ? 'Editar' : 'Eliminar'} Producto </DialogTitle>
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
                key={'urlimagen'}
                margin="dense"
                name={'urlimagen'} // Nombre del campo igual al id de la columna
                label={'URL de la Imagen'}
                variant='outlined'
                type='text'
                fullWidth
                onChange={handleChange}
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
        Agregar Producto +
      </Button>

      {/* Main modal */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("name")}
                required
                placeholder="Type product name"
              />
              <TextField
                name="price"
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("price")}
                required
                placeholder="S/19.90"
              />
              <TextField
                select
                name="category"
                label="Category"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("category")}
                onChange={handleCategoryChange}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Bebidas">Bebidas</MenuItem>
                <MenuItem value="Alimentos">Alimentos</MenuItem>
                <MenuItem value="Merch y Café en Grano">Merch y Café en Grano</MenuItem>
                <MenuItem value="Packs y Boxes">Packs y Boxes</MenuItem>
              </TextField>
              <TextField
                select
                name="type"
                label="Tipo"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("type")}
                >
                <MenuItem value="">Select Type</MenuItem>
                {tipoOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
                ))}
              </TextField>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                margin="dense"
                multiline
                rows={3}
                {...register("description")}
                placeholder="Escribe una breve descripción"
              />
              {/* Insertar link imagen */}
              <TextField
                name="urlimagen"
                label="URL"
                variant="outlined"
                fullWidth
                margin="dense"
                {...register("urlimagen")}
                required
                placeholder="Url de la Imagen"
              />

    </div>

            

            <DialogActions>
              <Button onClick={() => setOpenCreate(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary" onClick={() => setOpenCreate(false)}>
                Agregar Producto
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>



      </div>
    
    )
}
  