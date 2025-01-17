import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Buscador from '../../../../Components/Buscador';
import FloatButtom from '../../../../Components/FloatButtom';
import SSRolesPermisos, { SSRolesPermisosValidate } from '../../../../SSRolesPermisos';
import { SScrollView2, SView, SOrdenador, SPage, SButtom, SImage, SLoad, SNavigation, STheme, ExportExcel, SDate } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usuario from '../..';
import Paquete_Item from './Paquete_Item';
import { SText } from 'servisofts-component';
import Sucursal from '../../../Sucursal';
import SucursalSelect from './SucursalSelect';
import sucursal_usuario from '../../../sucursal_usuario';
import xlsx from 'xlsx-color';

class ClientesPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key_sucursal: SNavigation.getParam("key_sucursal", ""),
      soloBecados: SNavigation.getParam("becados", false),
      soloNoBecados: SNavigation.getParam("nobecados", false),
      pagination: {
        curPage: 1,
      }
    };


  }
  componentDidMount() {
    // var object = {
    //   service: "usuario",
    //   component: "usuario",
    //   version: "2.0",
    //   type: "getAll",
    //   estado: "cargando",
    //   cabecera: "registro_administrador",
    //   key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
    // }
    // SSocket.send(object);

  }
  pagination = (listaKeys) => {
    if (!listaKeys) {
      return [];
    }
    if (listaKeys.length <= 0) {
      return [];
    }
    var pageLimit = 20
    var tamanho = listaKeys.length;
    var nroBotones = Math.ceil(tamanho / pageLimit);
    if (this.state.pagination.curPage > nroBotones) {
      this.state.pagination.curPage = nroBotones;
    }
    var actual = pageLimit * (this.state.pagination.curPage - 1);
    return listaKeys.slice(0, actual + pageLimit);
  }
  getRecuperar(data, isRecuperar) {
    if (!isRecuperar) {
      return <View />
    }
    if (data.estado != 0) {
      return <View />
    }
    return <SButtom
      props={{
        type: "danger",
        variant: "confirm"
      }}
      onPress={() => {
        Usuario.Actions.editar({
          ...data,
          estado: 1,
        }, this.props)
      }} >Recuperar</SButtom>
  }
  getSucursal(key_sucursal) {
    var data = Sucursal.Actions.getByKey(key_sucursal, this.props);
    if (!data) return <View />
    return <SView>
      <SText>Sucursal: {data.descripcion}</SText>
    </SView>
  }
  getUsuario(key_usuario) {
    var data = Usuario.Actions.getByKey(key_usuario, this.props);
    if (!data) return <View />
    return <SView>
      <SText>Admin: {data.Nombres}</SText>
    </SView>
  }

  render() {

    const getLista = () => {
      var data = Usuario.Actions.getAll(this.props);
      var ClientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
      if (!data) return <SLoad />
      if (!ClientesActivos) return <SLoad />
      if (!this.state.buscador) {
        return <View />
      }

      this.usuarios = data;

      var objFinal = {};
      Object.keys(ClientesActivos).map((key) => {
        if (this.state.key_sucursal) {
          if (this.state.key_sucursal != ClientesActivos[key]["caja"].key_sucursal) {
            return null
          }
        }
        if (ClientesActivos[key]["paquete"].precio == 0 && this.state.soloNoBecados) {
          return;
        }
        if (ClientesActivos[key]["paquete"].precio > 0 && this.state.soloBecados) {
          return;
        }

        var ca = ClientesActivos[key];
        var now = new SDate();
        if (!(new SDate(ca.fecha_inicio, "yyyy-MM-dd").isBefore(now) && new SDate(ca.fecha_fin, "yyyy-MM-dd").isAfter(now))) {
          return;
        }

        if (!sucursal_usuario.Actions.isActive(ClientesActivos[key]["caja"].key_sucursal, this.props)) return null;
        objFinal[key] = {
          ...data[ClientesActivos[key]?.key_usuario],
          vijencia: ClientesActivos[key],
          fecha_inicio: ClientesActivos[key].fecha_on,
          fecha_fin: ClientesActivos[key].fecha_fin,
          key: key,
        };
      });

      var isRecuperar = SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "recuperar_eliminado" });
      this.finalData = objFinal;
      return this.pagination(
        new SOrdenador([
          { key: "Peso", order: "desc", peso: 4 },
          // { key: "fecha_fin", order: "asc", peso: 3 },
        ]).ordernarObject(
          this.state.buscador.buscar(objFinal)
        )
      ).map((key) => {
        var obj = data[ClientesActivos[key]?.key_usuario];
        if (!obj) return null;
        var vijencia = objFinal[key]["vijencia"];

        return <TouchableOpacity style={{
          width: "90%",
          maxWidth: 600,
          padding: 4,
          height: 100,
          margin: 4,
          borderRadius: 10,
          backgroundColor: STheme.color.card,
        }} onPress={() => {
          SNavigation.navigate("ClientePerfilPage", {
            key: obj.key
          })
        }}>
          <View style={{
            flex: 1,
            justifyContent: "center"
          }}>
            <View style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
              alignItems: "center"
            }}>
              <View style={{
                width: 40,
                height: 40,
                marginRight: 8,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: STheme.color.card,
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario/" + key} />
              </View>
              <View style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: STheme.color.text,
                  textTransform: "capitalize",
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"]}</Text>
                {this.getSucursal(vijencia["caja"].key_sucursal)}
                {this.getUsuario(vijencia["caja"].key_usuario)}


                <Text style={{ fontSize: 10, color: STheme.color.text, }}>{vijencia.paquete.nombre}</Text>
              </View>
              <SView center>
                <View style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: STheme.color.card,
                  borderRadius: 100,
                  overflow: "hidden"
                }}>
                  <SImage src={SSocket.api.root + "paquete/" + vijencia.paquete.key} />
                </View>
                <Text style={{ fontSize: 10, color: STheme.color.text, textTransform: "lowercase" }}>{vijencia.paquete.descripcion}</Text>
              </SView>
            </View>

          </View>
          <Paquete_Item data={vijencia} paquete={vijencia.paquete} />
        </TouchableOpacity>
      })
    }

    return (
      <SPage disableScroll title={"Clientes"}>
        <Buscador placeholder={"Buscar por CI, Nombres, Apellidos, Correo o Telefono."} ref={(ref) => {
          if (!this.state.buscador) this.setState({ buscador: ref });
        }} repaint={() => { this.setState({ ...this.state }) }}
        />
        <SView col={"xs-12"} center>
          <ExportExcel
            header={[
              // { key: "key", label: "key", width: 100 },
              { key: "cliente_ci", label: "CI", width: 100 },
              { key: "cliente_nombre", label: "Cliente", width: 250 },
              { key: "cliente_telefono", label: "Telefono", width: 250 },
              { key: "paquete", label: "paquete", width: 200 },
              { key: "paquete_precio", label: "precio", width: 100 },
              { key: "fecha_inicio", label: "fecha_inicio", width: 100 },
              { key: "fecha_fin", label: "fecha_fin", width: 100 },
            ]}
            getDataProcesada={() => {
              var daFinal = {};
              Object.values(this.finalData).map((obj, i) => {
                var usr = this.usuarios[obj.key];
                if (!usr?.estado || usr?.estado <= 0) return;
                var toInsert = {
                  key: obj.key,
                  paquete: obj?.vijencia?.paquete?.descripcion,
                  paquete_precio: obj?.vijencia?.paquete?.precio,
                  fecha_inicio: obj?.vijencia?.fecha_inicio,
                  fecha_fin: obj?.vijencia?.fecha_fin,
                  cliente_nombre: usr?.Nombres + " " + usr?.Apellidos,
                  cliente_telefono: usr?.Telefono,
                  cliente_ci: usr?.CI,
                }
                daFinal[i] = toInsert
              })
              return daFinal
            }}
          />
        </SView>

        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SScrollView2
            disableHorizontal
            onScroll={(evt) => {
              var evn = evt.nativeEvent;
              var posy = evn.contentOffset.y + evn.layoutMeasurement.height;
              var heigth = evn.contentSize.height;
              if (heigth - posy <= 0) {
                this.state.pagination.curPage += 1;
                this.setState({ ...this.state })
              }
            }}
          >
            <SView col={"xs-12"} center>
              <SucursalSelect key_sucursal={this.state.key_sucursal}
                sucursal={this.state.sucursal} setSucursal={(suc) => {
                  // SStorage.setItem("sucursal", suc.key)
                  this.setState({ sucursal: suc, key_sucursal: suc.key });
                }} />
              {getLista()}
            </SView>
          </SScrollView2>
          {/* <FloatButtom esconder={!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "crear" })} onPress={() => {
            SNavigation.navigate("registro")
          }} /> */}
        </View>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientesPage);