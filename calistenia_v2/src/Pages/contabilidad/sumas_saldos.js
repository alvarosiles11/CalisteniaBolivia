import { Component } from 'react';
import { SHr, SNavigation, SPage, STheme, SView, SText, SLoad, SInput } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { PlanDeCuentasTable } from 'servisofts-rn-contabilidad';
import Model from '../../Model';
// import { PlanDeCuentasTable } from 'servisofts-rn-contabilidad'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ano: 2023,
            fecha_inicio: "2023-01-01",
            fecha_fin: "2023-12-31"
        }
    }

    componentDidMount() {


    }
    getData() {
        this.empresa = Model.empresa.Action.getSelect();
        if (!this.empresa) return null;
        if (this.state.loading) return null;
        if (this.state.data) return this.state.data;
        this.setState({ loading: "cargando..." });
        Model.asiento_contable_detalle.Action.getByFecha({
            fecha_inicio: this.state.fecha_inicio,
            fecha_fin: this.state.fecha_fin,
            key_empresa: this.empresa.key
        }).then(resp => {
            this.setState({ loading: false, data: resp.data });
        }).catch(e => {
            this.setState({ loading: false });
        })
        return null;
    }

    loadData() {
        if (!this.getData()) return <SLoad />
        let arr_data = Object.values(this.state.data);
        return <PlanDeCuentasTable width={600} itemProps={{ underline: true }}
            allowExport
            close
            excelName={`SUMAS_Y_SALDOS_CALISTENIA_${this.state.fecha_inicio}_${this.state.fecha_fin}`}
            renderTotal={(obj) => {
                return Model.cuenta_contable.Action.calcular_debe_haber(arr_data.find(o => o.codigo === obj.codigo))
            }} />
    }
    render() {

        return (<SPage title={"Sumas y saldos"} disableScroll center>
            <SView col={"xs-12"} center>
                <SView width={100}>
                    <SInput value={this.state.ano} onChangeText={(val) => {
                        if (val.length == 4) {
                            this.state.fecha_inicio = val + "-01-01";
                            this.state.fecha_fin = val + "-12-31";
                            this.state.data = null;
                            this.getData();
                        }
                        this.setState({ ano: val })
                    }} />
                </SView>
            </SView>
            <SView col={"xs-12"} flex center>
                {this.loadData()}
            </SView>
        </SPage>)
    }
}
export default connect(index);