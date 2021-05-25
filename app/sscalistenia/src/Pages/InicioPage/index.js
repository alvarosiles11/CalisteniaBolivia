import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import SCarrusel from '../../Component/SCarrusel';
import SImage from '../../Component/SImage';
import * as SSNavigation from '../../SSNavigation'
import Svg from '../../Svg';
import Graphic1 from './Graphic1';
import Graphic2 from './Graphic2';
import MenuModulos from './MenuModulos';


class InicioPage extends Component {
  static navigationOptions = {
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
    SSNavigation.setProps(props);

  }

  render() {
    return (<>
      <View style={{
        flex: 1,
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        alignItems: "center"
        // backgroundColor:"#000",
      }}>
        <BackgroundImage source={require("../../img/background.png")} />
        <BarraSuperior navigation={this.props.navigation} title={"Inicio"} />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <View style={{
            width: "100%",
            // height: 170,
            // minHeight: 200,
            height: 300,
            // overflow: "hidden",
          }}>
            <SCarrusel time={15000}>
              {/* <Graphic2 data={{}} /> */}
              <View style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}>
                <SImage source={require("../../img/portadas/3.jpg")} style={{
                  width: "100%",
                  height: "100%",
                  // objectFit: "cover",
                  resizeMode: "contain",
                }} />
              </View>
              <Graphic1 data={{}} />

            </SCarrusel>
          </View>

          <MenuModulos navigation={this.props.navigation} />
        </View>
        {/* <NaviDrawerButtom open={() => {
          this.state.naviDrawer.open();
        }} /> */}
      </View>
      {/* <NaviDrawer ref={(ref) => {
        this.state.naviDrawer = ref;
      }} navigation={this.props.navigation} /> */}
    </>
    );
  }
}
export default InicioPage;