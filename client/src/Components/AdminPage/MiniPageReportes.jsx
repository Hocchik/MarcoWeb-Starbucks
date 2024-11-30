import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Grid,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from 'recharts';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';

// Estilo del modal
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

// Color personalizado para botones
const customColor = '#00362e';

// Colores vivos para gráficos
const colors = {
  line: '#ff4d4d', // Rojo
  bar: '#ff9900',  // Naranja
  pie: '#ffcc00',  // Amarillo
  radial: '#ff4d4d', // Rojo
  area: '#1B77E1',  // Naranja
  scatter: '#ffcc00', // Amarillo
};

const Dashboard = ({ title, report, data, chartType }) => {
  const [openPrint, setOpenPrint] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [email, setEmail] = useState('');

  const handlePrintOpen = () => setOpenPrint(true);
  const handlePrintClose = () => setOpenPrint(false);

  const handleEmailOpen = () => setOpenEmail(true);
  const handleEmailClose = () => setOpenEmail(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSendEmail = () => {
    console.log(`Enviando a ${email}`);
    handleEmailClose();
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {chartType === 'line' && (
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ventas" stroke={colors.line} />
        </LineChart>
      )}
      {chartType === 'bar' && (
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Bar dataKey="ventas" fill={colors.bar} />
        </BarChart>
      )}
      {chartType === 'pie' && (
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            dataKey="ventas"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={colors.pie}
            label
          />
          <Tooltip />
        </PieChart>
      )}
      {chartType === 'radial' && (
        <RadialBarChart width={500} height={300} innerRadius="10%" outerRadius="80%" data={data}>
          <RadialBar minAngle={15} label={{ fill: '#fff', position: 'inside' }} background clockWise={true} dataKey="ventas" fill={colors.radial} />
          <Tooltip />
        </RadialBarChart>
      )}
      {chartType === 'area' && (
        <AreaChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="ventas" stroke={colors.area} fill={colors.area} />
        </AreaChart>
      )}
      {chartType === 'scatter' && (
        <ScatterChart width={500} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis dataKey="name" type="category" />
          <YAxis />
          <Tooltip />
          <Scatter name="Clientes" data={data} fill={colors.scatter} />
        </ScatterChart>
      )}
      <Typography variant="body2" gutterBottom>
        {report}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap:"20px" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: customColor, color: '#fff' }}
          onClick={handlePrintOpen}
          startIcon={<PrintIcon />}
        >
          Imprimir
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: customColor, color: '#fff' }}
          onClick={handleEmailOpen}
          startIcon={<EmailIcon />}
        >
          Enviar por Correo
        </Button>
      </div>

      {/* Modal de Imprimir */}
      <Modal open={openPrint} onClose={handlePrintClose}>
        <Box sx={style}>
          <Typography variant="h6">Imprimir Reporte</Typography>
          <Typography sx={{ mt: 2 }}>
            ¿Está seguro de que desea imprimir este reporte?
          </Typography>
          <Button variant="contained" color="primary" onClick={handlePrintClose} sx={{ mt: 2 }}>
            Confirmar
          </Button>
          <Button variant="outlined" onClick={handlePrintClose} sx={{ mt: 2, ml: 2 }}>
            Cancelar
          </Button>
        </Box>
      </Modal>

      {/* Modal de Enviar por Correo */}
      <Modal open={openEmail} onClose={handleEmailClose}>
        <Box sx={style}>
          <Typography variant="h6">Enviar Reporte por Correo</Typography>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSendEmail} sx={{ mt: 2 }}>
            Enviar
          </Button>
          <Button variant="outlined" onClick={handleEmailClose} sx={{ mt: 2, ml: 2 }}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

const MiniPageReportes = () => {
  const dashboards = [
    {
      title: 'Ventas de Café - Enero',
      report: 'Reporte de ventas para el mes de enero...',
      data: [
        { name: 'Semana 1', ventas: 4000 },
        { name: 'Semana 2', ventas: 3000 },
        { name: 'Semana 3', ventas: 2000 },
        { name: 'Semana 4', ventas: 2780 },
      ],
      chartType: 'line', // Gráfico de líneas
    },
    {
      title: 'Clientes que Compraron Más - Febrero',
      report: 'Clientes que más compraron en febrero...',
      data: [
        { name: 'Cliente 1', ventas: 5000 },
        { name: 'Cliente 2', ventas: 4000 },
        { name: 'Cliente 3', ventas: 3000 },
      ],
      chartType: 'bar', // Gráfico de barras
    },
    {
      title: 'Descuentos Aplicados - Marzo',
      report: 'Reporte de descuentos aplicados...',
      data: [
        { name: 'Descuento 1', ventas: 1500 },
        { name: 'Descuento 2', ventas: 2500 },
        { name: 'Descuento 3', ventas: 3500 },
      ],
      chartType: 'pie', // Gráfico circular
    },
    {
      title: 'Establecimientos Más Vendidos - Abril',
      report: 'Los establecimientos que más venden...',
      data: [
        { name: 'Establecimiento A', ventas: 6000 },
        { name: 'Establecimiento B', ventas: 7000 },
        { name: 'Establecimiento C', ventas: 8000 },
      ],
      chartType: 'radial', // Gráfico radial
    },
    {
      title: 'Tendencia de Ventas - Mayo',
      report: 'Tendencia de ventas en mayo...',
      data: [
        { name: 'Semana 1', ventas: 4000 },
        { name: 'Semana 2', ventas: 6000 },
        { name: 'Semana 3', ventas: 8000 },
        { name: 'Semana 4', ventas: 9000 },
      ],
      chartType: 'area', // Gráfico de área
    },
    {
      title: 'Clientes Nuevos - Junio',
      report: 'Reporte de nuevos clientes...',
      data: [
        { name: 'Mes 1', ventas: 2000 },
        { name: 'Mes 2', ventas: 3500 },
        { name: 'Mes 3', ventas: 5000 },
      ],
      chartType: 'area', // Gráfico de dispersión
    },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        {dashboards.map((dashboard, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Dashboard
              title={dashboard.title}
              report={dashboard.report}
              data={dashboard.data}
              chartType={dashboard.chartType}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MiniPageReportes