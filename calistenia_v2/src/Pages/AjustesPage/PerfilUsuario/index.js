import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SImage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';

class PerfilUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var usr = this.props.state.usuarioReducer.usuarioLog;
        if(!usr) return null;
        return <SView col={"xs-12"} style={{
            // height: 120,
            backgroundColor: STheme.color.card,
            borderRadius: 4,
            overflow: "hidden"
        }} center >
            <SView col={"xs-12"} row style={{
                height: 80,
            }} onPress={() => {
                this.props.navigation.navigate("perfil");
            }}>
                <SView style={{
                    width: 80,
                    height: "100%",
                }} center>
                    <SView style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                        overflow: "hidden",
                    }}>
                        <SImage src={SSocket.api.root + "usuario/" + this.props.state.usuarioReducer.usuarioLog?.key} />
                        {/* {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key, { */}
                        {/* width: "100%", */}
                        {/* height: "100%", */}
                        {/* })} */}
                    </SView>
                </SView>
                <SView flex style={{
                    height: "100%",
                    justifyContent: "center",
                    // borderBottomWidth: 1,
                    borderBottomColor: "#66666644",
                    paddingStart: 4,
                }}>
                    <SText style={{ fontSize: 18, fontWeight: "600", textTransform: "capitalize" }}>{`${usr.Nombres} ${usr.Apellidos}`}</SText>
                    <SText style={{ fontSize: 12, }}>{`${usr.Correo}`}</SText>
                </SView>
            </SView>
            {/* <SView col={"xs-12"}  center row style={{
                height: 50,
            }} onPress={() => {

            }}>
                <SView flex style={{
                    paddingStart: 8,
                }}>
                    <SText style={{
                        fontSize: 14,
                    }}>Ver ajustes de usuario</SText>
                </SView>
                <SView style={{
                    width: 60,
                    height: "100%",
                }} center>
                    <Svg name={"Login"} style={{
                        width: 25,
                        height: 25,
                    }} />
                </SView>
            </SView> */}
        </SView>
    }
}

export default connect((state) => {
    return { state }
})(PerfilUsuario);