import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SImage, SLoad, SPage, SText, SView, SNavigation, SIcon } from 'servisofts-component';
import Entrenamiento from '../..';
import Sucursal from '../../../Sucursal';
import Usuario from '../../../Usuario';
import RelojEntrenamiento from './RelojEntrenamiento';
import SSocket from 'servisofts-socket';
import Asistencia from '../../../Asistencia';

class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentDidMount() {
        Entrenamiento.Actions.getAll(this.props, true);
    }
    getSucursal = (key) => {
        var sucursal = Sucursal.Actions.getByKey(key, this.props);
        if (!sucursal) return <SLoad />
        return <SView col={"xs-12"} row>
            <SView width={40} height={40} style={{
                borderRadius: "50%",
                overflow: "hidden",
            }} >
                <SImage src={SSocket.api.root + "sucursal_" + key} />
            </SView>
            <SView flex style={{
                justifyContent: "center",
            }}>
                <SText>{`${sucursal.descripcion}`}</SText>
                <SText fontSize={10} color={"#999"}>{`${sucursal.direccion}`}</SText>
            </SView>
        </SView>
    }
    getUsuario = (key) => {
        var usuario = Usuario.Actions.getByKey(key, this.props);
        if (!usuario) return <SLoad />
        return <SView col={"xs-12"} center>
            {/* <SText fontSize={10} color={"#999"} >{`Entrenador`}</SText> */}

            <SView width={70} height={70}>
                <SImage src={SSocket.api.root + "usuario_" + key} />
            </SView>
            <SHr height={8} />
            <SText fontSize={18} capitalize>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>
        </SView>
    }
    getAsistencia = (obj) => {
        var asistencia = Asistencia.Actions.getByKeyEntrenamiento({
            key_entrenamiento: obj.key,
        }, this.props);
        if (!asistencia) return <SLoad />

        return <SView col={"xs-12"} center>
            <SView col={"xs-12"} center row>
                {Object.keys(asistencia).map((key) => {
                    var usuario = Usuario.Actions.getByKey(asistencia[key].key_usuario, this.props);
                    if (!usuario) return <SLoad />
                    return <SView col={"xs-2 md-1.5"} colSquare style={{
                        padding: 4,
                    }}>
                        <SView card height col={"xs-12"} center style={{
                            overflow: "hidden",
                        }}>
                            <SView width={40} height={40}>
                                <SImage src={SSocket.api.root + "usuario_" + usuario.key} />
                            </SView>
                            <SText key={key} capitalize center fontSize={10}>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>
                        </SView>

                    </SView>
                })}
            </SView>
        </SView>
    }
    getLista() {
        var data = Entrenamiento.Actions.getAll(this.props);
        var usuarios = Usuario.Actions.getAll(this.props);
        var sucursales = Sucursal.Actions.getAll(this.props);
        if (!data) return <SLoad />
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (!obj.key) return <SView col={"xs-12"} center>
                <SHr height={50} />
                <SIcon name={"Alert"} width={50} height={50} />
                <SHr height={16} />
                <SText center>No existen entrenamientos en curso</SText>
            </SView>;
            return <>
                <SHr height={16} />
                <SView col={"xs-11 md-8 xl-6"} key={key} card style={{
                    padding: 4,
                }}>
                    <SView col={"xs-12"} style={{
                        alignItems: "flex-end",
                    }}>
                        <SText fontSize={10} color={"#999"}>{`${new SDate(obj.fecha_on).toString("dd de MONTH, yyyy")}`}</SText>
                    </SView>
                    {this.getSucursal(obj.key_sucursal)}
                    <SHr height={16} />
                    {this.getUsuario(obj.key_usuario)}
                    <SHr height={16} />
                    {/* <SText>{`Hora de inicio: ${new SDate(obj.fecha_on).toString("hh:mm")}`}</SText> */}
                    <SView col={"xs-12"} center>
                        <RelojEntrenamiento data={obj} />
                    </SView>
                    <SHr height={16} />
                    {this.getAsistencia(obj)}
                    {/* <SText>{`json: ${JSON.stringify(obj, "\n", "\t")}`}</SText> */}
                </SView>
            </>
        });
    }
    render() {
        return (
            <SPage title={"Entrenamientos"}>
                <SView center>
                    <SView col={"xs-11 md-8 xl-6"} card style={{
                        padding: 4,
                    }} height={40} center onPress={() => {
                        SNavigation.navigate("entrenamientos_historial")
                    }}>
                        <SText fontSize={16} bold color={"#999"}>Ver historial</SText>
                    </SView>
                    {this.getLista()}
                    <SHr height={32} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);