import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SPage } from 'servisofts-component';
import ListaCajas from './ListaCajas';

export default class CajasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage
                title="Historico de cajas"
                disableScroll
            >
                <ListaCajas navigation={this.props.navigation} />
            </SPage>
        );
    }
}
