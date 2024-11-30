import { AuthProvider } from "./context/AuthContext.jsx"
import { AuthProviderAdmin } from "./context/AuthContextAdmin.jsx"
import {ViewContext} from './context/ClientContext.jsx'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import TaskFormPage from "./pages/TaskFormPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import TaskPage from "./pages/TaskPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import Rewards from "./pages/RewardPage/Rewards.jsx"
import AdminLogin from "./pages/Admin/AdminLogin.jsx"
import ProtectedRouteAdmin from "./pages/Admin/ProtectedRouteAdmin.jsx"
import Admin from "./pages/Admin/Admin.jsx"
import { AdminContext } from "./context/AdminContext.jsx"
import AdminRegister from "./pages/Admin/AdminRegister.jsx"


function App() {
  return (
    <>
    <AuthProvider>
    <ViewContext>
    <BrowserRouter>
      <Routes>
        {/* Son rutas publicas para el mundo */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/rewards" element={<Rewards/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        
        {/* Son rutas privadas segun el usuario */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/tasks" element={<TaskPage/>} /> {/* Aqui podemos variar segun el rubro y e objetivo */}
          <Route path="/add-task" element={<TaskFormPage/>} /> 
          <Route path="/tasks/:id" element={<TaskFormPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Route>

      </Routes>
    </BrowserRouter>
    </ViewContext>
    </AuthProvider>  

    <AuthProviderAdmin>
    <AdminContext> 
      <BrowserRouter>
        <Routes>
          <Route path="/Admin-Register" element={<AdminRegister/>} />
          <Route path="/Admin-Login" element={<AdminLogin/>} />
    
          <Route element={<ProtectedRouteAdmin/>}> 
              <Route path="/Admin" element={<Admin/>} />
          </Route>

        </Routes>
      </BrowserRouter>
      </AdminContext>
    </AuthProviderAdmin>  
    </>
  )
}

export default App
