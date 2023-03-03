import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import FinanzaPage from './Pages/FinanzaPage'
import ReporteBancos from './Pages/ReporteBancos'
import PaquetesVendidos from './Pages/PaquetesVendidos'
import ReporteAsistencia from './Pages/ReporteAsistencia'
import IngresosEgresos from './Pages/IngresosEgresos'
import EstadoFinanciero from './Pages/EstadoFinanciero'
import EstadoFinancieroSelect from './Pages/EstadoFinancieroSelect'
import UsuariosTabla from './Pages/UsuariosTabla'
import ReporteProrroga from './Pages/ReporteProrroga'
import modelo from "./Pages/Modelo";
import reporte_montos_actuales_todas_las_cajas from './Pages/reporte_montos_actuales_todas_las_cajas';
const Pages: SPageListProps = {
    FinanzaPage,
    ReporteBancos,
    PaquetesVendidos,
    ReporteAsistencia,
    IngresosEgresos,
    EstadoFinanciero,
    EstadoFinancieroSelect,
    UsuariosTabla,
    ReporteProrroga,
    reporte_montos_actuales_todas_las_cajas,
    modelo

}

import reporteReducer from './Reducer/reporteReducer'
const Reducers = {
    reporteReducer
}


export default {
    Pages,
    Actions,
    Reducers
};