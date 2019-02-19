import React, {Component} from 'react';
import {connect} from 'react-redux';
import { 
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import SynchingSwitch from './SynchingSwitch';
import styles from '../styles';

// TODO: Split target temperature out into its own control as well
const SwitchPanel = (props) => {
    return (
        <View style={styles.controlComplex}> 
            <TouchableOpacity>
                <View style={styles.targetTemp}>
                    <Text style={styles.baseText}>Target Temperature: {props.desired.temperature}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.switchesComplex}>
                <View style={styles.switchColumn}>
                    <View style={styles.switchRow}>
                        <SynchingSwitch name='Jets' tag='jets' isOn={props.desired.jets} isSynched={props.desired.jets === props.actual.jets}/>
                        <SynchingSwitch name='Light' tag='light' isOn={props.desired.light} isSynched={props.desired.light === props.actual.light}/>
                    </View>
                    <View style={styles.switchRow}>
                        <SynchingSwitch name='Hot Blower' tag='hotblower' isOn={props.desired.hotBlower} isSynched={props.desired.hotBlower === props.actual.hotBlower}/>
                        <SynchingSwitch name='Cold Blower' tag='coldblower' isOn={props.desired.coldBlower} isSynched={props.desired.coldBlower === props.actual.coldBlower}/>
                    </View>
                    <View style={styles.switchRow}>
                        <SynchingSwitch name='Clean Cycle' tag='cleancycle' isOn={props.desired.cleanCycle} isSynched={props.desired.cleanCycle === props.actual.cleanCycle}/>
                        <SynchingSwitch disabled={true} name='Heater' tag='heater' isOn={props.actual.heater} isSynched={true}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        desired: state.desired,
        actual: state.actual,
        //props: state,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatch handlers
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchPanel);
/*
    <TouchableOpacity onPress={this.setTtemp.bind(this)}>
    {this.makeTargetTempEditable()}

                    setTtemp() {
        this.setState({editTargetTemp:true});
    }

    //return a text component when not editing target temp 
    makeTargetTempEditable() {
        if(this.state.editTargetTemp === false) {
            return(
                <Text style={styles.baseText}>{props.actual.targetTemp}</Text>
            );
        } else if(this.state.editTargetTemp === true) {
            return(
                <TextInput
                    style={styles.tempControlInput}
                    editable={true}
                    maxLength={5}
                    clearTextOnFocus={true}
                    autoFocus={true}
                    keyboardType={'numeric'}
                    onChangeText={(text) => this.setState({targetTemp:text})}
                    value={this.state.targetTemp}
                    onSubmitEditing={
                        () => {
                            this.setState({editTargetTemp:false})
                            props.actual.callBackTempChange(this.state.targetTemp)
                        }
                    }
                />
            );
        }
    }
*/
