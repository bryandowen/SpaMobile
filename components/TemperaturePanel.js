import React from 'react';
import {Text, View} from 'react-native';
import styles from '../styles';
import { connect } from 'react-redux';

const TemperaturePanel = (props) => {
    degreeSymbol = props.appConfig.degreeSymbol.fahrenheit;
    //degreeSymbol = props.appConfig.degreeSymbol.celsius;
    //degreeSymbol = props.appConfig.degreeSymbol.agnostic;
    return (
        <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>
                {parseFloat(props.actual.temperature).toFixed(1) + degreeSymbol}
            </Text>
            <Text style={styles.asOf}>
                {props.actual.temperatureAge} ago
            </Text>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        actual: state.actual,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // dispatch handlers
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TemperaturePanel);
