import { SPageListProps } from 'servisofts-component'

import InicioPage from "./InicioPage";
import CargaPage from './CargaPage/index';
import Presentacion from './Presentacion';

import Usuario from './Usuario';
import SSRolesPermisosPages from '../SSRolesPermisos/Pages';
import AjustesPage from './AjustesPage';
import Sucursal from './Sucursal';
import TipoPago from './TipoPago';
import Paquete from './Paquete';
import Servicio from './Servicio';
const Pages: SPageListProps = {
    "inicio": InicioPage,
    "carga": CargaPage,
    "presentacion": Presentacion,
    AjustesPage,
    ...Usuario.Pages,
    ...Sucursal.Pages,
    ...SSRolesPermisosPages,
    ...TipoPago.Pages,
    ...Paquete.Pages,
    ...Servicio.Pages
}
export default Pages;