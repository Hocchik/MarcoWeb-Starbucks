import MiniPageCalendar from "./MiniPageCalendar";
import MiniPageClient from "./MiniPageClient";
import MiniPageConfiguracion from "./MiniPageConfiguracion";
import MiniPageDetallecuenta from "./MiniPageDetallecuenta";
import MiniPageGen from "./MiniPageGen";
import MiniPageReportes from "./MiniPageReportes";
import MiniPageProducts from "./MiniPageProducts";
import MiniPagePromos from "./MiniPagePromos";
import { useAuth } from "../../context/AuthContextAdmin";

function MiniPages(pathname){
    const  {logout} = useAuth()

    var page = <MiniPageGen/>;
    switch(pathname){
        case '/': page = <MiniPageGen/>; break;
        case '/clientes': page = <MiniPageClient/>; break;
        case '/productos': page = <MiniPageProducts/>; break;
        case '/reportes': page = <MiniPageReportes/>; break;
        case '/promociones': page = <MiniPagePromos/>; break;
        case '/calendario': page = <MiniPageCalendar/>; break;
        case '/cuenta/detallescuenta' : page = <MiniPageDetallecuenta/>; break;
        case '/cuenta/configuracion' : page = <MiniPageConfiguracion/>; break;
        case '/cuenta/logout' : logout(); break;
      }
     return page
}



function MiniPagesFunction(pathname) {
  return MiniPages(pathname);
}

export default MiniPagesFunction