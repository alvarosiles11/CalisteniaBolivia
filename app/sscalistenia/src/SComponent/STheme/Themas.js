import { StyleSheet, View, ColorPropType } from 'react-native';
export type propsTypeText = {
    colorPrimary: String,
    colorSecondary: Stirng,
}
export type propsType = {
    colorPrimary: ColorPropType,
    colorSecondary: ColorPropType,
    backgroundColor: ColorPropType,
    colorDanger: ColorPropType,
    colorOpaque: ColorPropType,

}
const Themas = {
    default: {
        colorPrimary: "#ffffff",
        colorSecondary: "#ffffff",
        backgroundColor: "#222222",
        colorDanger: "#C31C37",
        colorOpaque:"#444444"
    },
    dark: {
        colorPrimary: "#000000",
        colorSecondary: "#ffffff",
        backgroundColor: "#dddddd",
        colorDanger: "#C31C37",
        colorOpaque:"#884444"

    }
};
export default Themas;