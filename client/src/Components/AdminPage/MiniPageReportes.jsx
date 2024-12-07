import { useEffect, useState } from 'react';
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
/* import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email'; */
import { useAdmin } from '../../context/AdminContext.jsx';


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
/* const customColor = '#00362e'; */

// Colores vivos para gráficos
const colors = {
  line: '#ff4d4d', // Rojo
  bar: '#ff9900',  // Naranja
  bar1: '#00b300', // Verde
  pie: '#ffcc00',  // Amarillo
  radial: '#ff4d4d', // Rojo
  area: '#1B77E1',  // Naranja
  scatter: '#ffcc00', // Amarillo
};

const Dashboard = ({ title, /* report */ data, chartType }) => {
  const [openPrint, setOpenPrint] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [email, setEmail] = useState('');

  /* const handlePrintOpen = () => setOpenPrint(true); */
  const handlePrintClose = () => setOpenPrint(false);

  /* const handleEmailOpen = () => setOpenEmail(true); */
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
          <Line type="monotone" dataKey="cantidad" stroke={colors.line} />
        </LineChart>
      )}
      {chartType === 'bar'  && (
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content="name"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Legend/>
          <Bar dataKey="cantidad" fill={colors.bar} />
        </BarChart>
      )}
      {chartType === 'bar1'  && (
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content="name"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Legend/>
          <Bar dataKey="cantidad" fill={colors.bar1} />
        </BarChart>
      )}
      {chartType === 'pie' && (
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            dataKey="cantidad"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={colors.pie}
            label
          />
          <Tooltip/>
        </PieChart>
      )}
      {chartType === 'radial' && (
        <RadialBarChart width={500} height={300} innerRadius="10%" outerRadius="80%" data={data}>
          <RadialBar minAngle={15} label={{ fill: '#fff', position: 'inside' }} background clockWise={true} dataKey="cantidad" fill={colors.radial} />
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
          <Area type="monotone" dataKey="cantidad" stroke={colors.area} fill={colors.area} />
        </AreaChart>
      )}
      {chartType === 'scatter' && (
        <ScatterChart width={500} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis dataKey="name" type="name" />
          <YAxis />
          <Tooltip />
          <Scatter name="cantidad" dataKey="cantidad"  data={data} fill={colors.scatter} />
        </ScatterChart>
      )}
      {/* <Typography variant="body2" gutterBottom>
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
      </div> */}

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
  
  const {reportesCatePro, getReporteCategoProducts} = useAdmin()
  const {graficoTendencia, getGraficodeTendencia} = useAdmin()
  const {graficoPie, getGraficodePie} = useAdmin()
  const {graficoLineas, getGraficodeLineas} = useAdmin()
  const {graficoBarra, getGraficodeBarra} = useAdmin()

  useEffect(() =>{
    getReporteCategoProducts()
    getGraficodeTendencia()
    getGraficodePie()
    getGraficodeLineas()
    getGraficodeBarra()
  },[])


  const dashboards = [
    {
      title: 'Ventas en la Semana - Semana 1 Diciembre',
      report: '',
      data: graficoLineas,
      chartType: 'line', // Gráfico de líneas
    },
    {
      title: 'Cantidad de Productos Por Categoria',
      report: '',
      data: reportesCatePro,
      chartType: 'bar', // Gráfico de barras
    },
    {
      title: 'Ventas por producto - Diciembre',
      report: '',
      data: graficoPie,
      chartType: 'pie', // Gráfico circular
    },
    {
      title: 'Top 5 productos más vendidos - Diciembre',
      report: '',
      data: graficoBarra,
      chartType: 'bar1', // Gráfico bar
    },
    {
      title: 'Ventas por Dia - Diciembre',
      report: '',
      data: graficoTendencia,
      chartType: 'area', // Gráfico de área
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