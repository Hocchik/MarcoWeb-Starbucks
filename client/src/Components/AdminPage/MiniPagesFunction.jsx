import MiniPageCalendar from "./MiniPageCalendar";
import MiniPageClient from "./MiniPageClient";
import MiniPageDetallecuenta from "./MiniPageDetallecuenta";
import MiniPageReportes from "./MiniPageReportes";
import MiniPageProducts from "./MiniPageProducts";
import MiniPagePromos from "./MiniPagePromos";
import MiniPageGen from "./MiniPageGen";
import { useAuth } from "../../context/AuthContextAdmin";
import MiniPageVentas from "./MiniPageVentas";

function MiniPages(pathname){
    const  {logout} = useAuth()


    var page = <MiniPageGen/>;
    switch(pathname){
        case '/': page = <MiniPageGen/>; break;
        case '/dashboard': page = <MiniPageReportes/>; break;
        case '/clientes': page = <MiniPageClient/>; break;
        case '/productos': page = <MiniPageProducts/>; break;
        case '/promociones': page = <MiniPagePromos/>; break;
        case '/ventas': page = <MiniPageVentas/>; break;
        case '/calendario': page = <MiniPageCalendar/>; break;
        case '/cuenta/detallescuenta' : page = <MiniPageDetallecuenta/>; break;
        case '/cuenta/logout' : logout(); break;
        default: break;
      }
     return page
}

function MiniPagesFunction(pathname) {
  return MiniPages(pathname);
}

export default MiniPagesFunction