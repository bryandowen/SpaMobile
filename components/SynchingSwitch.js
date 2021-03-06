import React from 'react';
import {connect} from 'react-redux';
import {
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styles from '../styles';
import PropTypes from 'prop-types';

// SynchingSwitch has three main display properties:
// 1. name -- What to display on the switch
// 2. isOn -- This is what the user has elected to set the switch to
// 3. isSynched -- This is whether the user-selected state matches the online state
//    (green track color = synched; some sort of yellow or amber = unsynched)

const SynchingSwitch = (props) => {
    console.log('isOn, isSynched', props.isOn, props.isSynched);
    return (
        <TouchableOpacity style={styles.switchField}>
            <Text style={styles.baseText}>{props.name}</Text>
            <Switch
                value={props.isOn}
                disabled={props.isDisabled}
                thumbColor={props.isSynched ? 'darkgray' : 'yellow'}
                onValueChange={(value) => props.switchChanged(props.tag, value)}
            />
        </TouchableOpacity>
    );
    // let switchContent = props.isDisabled ? (
    //     <View style={styles.switchField}>
    //         <Text style={styles.baseText}>{props.name}</Text>
    //         <Switch value={props.isOn} disabled={props.isDisabled} trackColor={props.isSynched ? 'green' : 'amber'} onValueChange={(value) => props.switchChanged(props.tag, value)}/>
    //     </View>
    // ) : (
    // )
    // return switchContent;
}

SynchingSwitch.propTypes = {
    name: PropTypes.string,
    isOn: PropTypes.bool,
    isSynched: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOn: ownProps.isOn,
        isSynched: ownProps.isSynched,
        tag: ownProps.tag,
        disabled: ownProps.disabled,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        switchChanged: (tag, value) => {
            dispatch({type: 'DESIRED_SWITCH_CHANGED', tag, value});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SynchingSwitch);
