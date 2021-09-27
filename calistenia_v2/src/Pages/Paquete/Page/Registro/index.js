import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SLoad, SNavigation, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import Paquete from '../..';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FotoPerfilComponent from '../../../../Components/FotoPerfilComponent';
import ServicioDePaquete from '../ServicioDePaquete';

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicios: {}
        };
        this.key_paquete = SNavigation.getParam("key");
        props.state.paqueteReducer.estado = ""
    }
    getForm() {

        return <SForm
            ref={(ref) => { this.form = ref }}
            props={{
                col: "xs-12",
                dir: "row",
            }}
            style={{
                // justifyContent: "space-between",
                justifyContent: "center"
            }}
            inputProps={{
                customStyle: "calistenia",
            }}
            inputs={{
                descripcion: { label: 'Descripcion', type: 'text', isRequired: true, defaultValue: this.data.descripcion },
                precio: { label: 'Precio', type: 'money', isRequired: true, defaultValue: this.data.precio, style: { width: "48%", marginStart: "25%", marginEnd: "25%" } },
                dias: { label: 'Cantidad de dias', type: 'number', isRequired: true, defaultValue: this.data.dias, style: { width: "48%", marginEnd: "2%" } },
                participantes: { label: 'Participantes', type: 'number', isRequired: true, defaultValue: this.data.participantes, style: { width: "48%", marginStart: "2%" } },
            }}
            onSubmit={(data) => {
                var serviciosSelec = Object.keys(this.state.servicios);
                if (this.key_paquete) {
                    Paquete.Actions.editar({
                        ...this.data,
                        ...data
                    }, serviciosSelec, this.props);
                } else {
                    if (serviciosSelec.length <= 0) {
                        alert("Debe activar almenos 1 servicio");
                        return;
                    }
                    Paquete.Actions.registro(data, serviciosSelec, this.props);
                }
            }}
        >

        </SForm>
    }
    getEliminar(data) {
        if (!this.key_paquete) return <SView />
        var serviciosSelec = Object.keys(this.state.servicios);
        return <> <SButtom props={{
            type: "danger",
            variant: "confirm"
        }}
            onPress={() => {
                Paquete.Actions.editar({
                    ...data,
                    estado: 0,
                }, serviciosSelec, this.props);
            }}
        >{"Eliminar"}</SButtom>
            <SView col={"xs-1"} />
        </>
    }
    getPerfil() {
        var data = {}
        if (this.key_paquete) {
            data = Paquete.Actions.getByKey(this.key_paquete, this.props);
            if (!data) return <SLoad />
        }
        this.data = data;
        return (<><SView center col={"xs-10 md-8 lg-6 xl-4"}>
            {!this.key_paquete ? <SView /> : <SView style={{
                width: 150,
                height: 150,
            }}><FotoPerfilComponent data={data} component={"paquete"} />
            </SView>}
            {this.getForm()}
            {/* <SView height={32} /> */}
        </SView>
            <ServicioDePaquete keyPaquete={data.key} onChange={(resp) => {
                this.setState({ servicios: resp });
            }} />
            <SView col={"xs-11"} row center>
                {this.getEliminar(data)}
                <SButtom props={{
                    type: "outline"
                }}
                    onPress={() => {
                        this.form.submit();
                    }}
                >{(this.key_paquete ? "Editar" : "Crear")}</SButtom>
            </SView>
        </>)
    }
    render() {
        if (this.props.state.paqueteReducer.estado == "exito" && this.props.state.paqueteReducer.type == "registro") {
            this.props.state.paqueteReducer.estado = ""
            SNavigation.goBack();
        }
        if (this.props.state.paqueteReducer.estado == "exito" && this.props.state.paqueteReducer.type == "editar") {
            this.props.state.paqueteReducer.estado = ""
            SNavigation.goBack();
        }
        return (
            <SPage hidden disableScroll>
                <BarraSuperior title={(this.key_paquete ? "Perfil de" : "Registro de") + " paquete"} goBack={() => {
                    SNavigation.goBack();
                }} />
                <SScrollView2 disableHorizontal>
                    <SView center col={"xs-12"}>
                        {this.getPerfil()}
                    </SView>
                    <SView height={32} />
                </SScrollView2>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);