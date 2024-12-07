/* import { AuthProvider } from "./context/AuthContext.jsx" */
import { AuthProviderAdmin } from "./context/AuthContextAdmin.jsx"
import {ViewContext} from './context/ClientContext.jsx'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

/* import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx" */
import HomePage from "./pages/HomePage/HomePage.jsx"
import Rewards from "./pages/RewardPage/Rewards.jsx"
import AdminLogin from "./pages/Admin/AdminLogin.jsx"
import ProtectedRouteAdmin from "./pages/Admin/ProtectedRouteAdmin.jsx"
import Admin from "./pages/Admin/Admin.jsx"
import { AdminContext } from "./context/AdminContext.jsx"
import AdminRegister from "./pages/Admin/AdminRegister.jsx"
import MenuPage from "./pages/MenuPage/MenuPage.jsx"
import TiendasPage from "./pages/TiendasPage/TiendasPage.jsx"
import ProductPage from "./pages/MenuPage/ProductPage.jsx"
import ProductDetailPage from "./pages/MenuPage/ProductDetailPage.jsx"


function App() {
  return (
    <>
    {/* <AuthProvider> */}
    <ViewContext>
    <BrowserRouter>
      <Routes>
        {/* Son rutas publicas para el mundo */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/menu/:category/:type" element={<ProductPage/>} />
        <Route path="/menu/:category/:type/:name" element={<ProductDetailPage/>}/>
        <Route path="/rewards" element={<Rewards/>} />
        <Route path="/tiendas" element={<TiendasPage/>} />

      </Routes>
    </BrowserRouter>
    </ViewContext>
    {/* </AuthProvider> */}  

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
