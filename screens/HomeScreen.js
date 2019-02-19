import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import TemperaturePanel from '@components/TemperaturePanel';
import SwitchPanel from '@components/SwitchPanel';

class HomeScreen extends Component {
    static navigationOptions = {
        // header: null <-- to disable
        title: '',//'Hot Tub Mobile',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            color: '#fff',
        },
        headerStyle: {
            backgroundColor: '#000',
        }
    };
    
    getActualState = () => {
        // TODO: Move to initial Redux state so we don't have to calculate every time
        getActualStateUrl = this.props.appConfig.thingSpeak.readUrl.replace('{id}', this.props.appConfig.thingSpeak.dataChannel.id).replace('{read_key}', this.props.appConfig.thingSpeak.dataChannel.read_key);
        fetch(getActualStateUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson) {
                this.props.gotActualState(responseJson);
            } else {
                // TODO: What if responseJson is null?
            }
        })
        .catch((error) => {
            console.error(error);
        }).done();
    };

    setDesiredState = () => {
        if (this.props.isDirty) {
            // TODO: Move to initial Redux state so we don't have to calculate every time
            setDesiredStateUrl = this.props.appConfig.thingSpeak.writeUrl.replace('{write_key}', this.props.appConfig.thingSpeak.controlChannel.write_key);
            var url = setDesiredStateUrl
                .replace('{1}', this.props.desired.temperature)
                .replace('{2}', boolToBin(this.props.desired.jets))
                .replace('{3}', boolToBin(this.props.desired.light))
                .replace('{4}', boolToBin(this.props.desired.coldBlower))
                .replace('{5}', boolToBin(this.props.desired.hotBlower));
            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                this.props.clearDirtyFlag();
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };

    getDesiredState = () => {
        // TODO: Decide how often/when this should be refreshed
        getDesiredStateUrl = this.props.appConfig.thingSpeak.readUrl.replace('{id}', this.props.appConfig.thingSpeak.controlChannel.id).replace('{read_key}', this.props.appConfig.thingSpeak.controlChannel.read_key);
        fetch(getDesiredStateUrl, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson) {
                this.props.gotDesiredState(responseJson);
            }
        })
        .catch((error) => {
            console.error(error);
        }).done();
    };

    componentDidMount = () => {
        this.getActualState(); // immediately render initial state
        this.getDesiredState();
        this.getTimer = setInterval(() => this.setDesiredState(), this.props.appConfig.setInterval);
        this.setTimer = setInterval(() => this.getActualState(), this.props.appConfig.getInterval);
    };

    componentWillUnmount = () => {
        clearInterval(this.getTimer);
        clearInterval(this.setTimer);
    };

    render = () => {
        return (
            <View style={{flex:2}}>
                <TemperaturePanel />
                <SwitchPanel />
            </View>
        );
    }
}

boolToBin = (inval) => {
    if (inval) {
        return '1';
    } else {
        return '0';
    }
};

binToBool = (inval) => {
    //checks to see if a value of 0 or 1 is given and then returns true or false
    if(inval === '0' || inval == 0) {
        return false;
    } else {
        return true;
    }
};

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig,
        desired: state.desired,
        isDirty: state.isDirty,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        gotActualState: (responseJson) => {
            temperatureAgeMillis = Date.now() - Date.parse(responseJson['feeds'][0]['created_at']); // in milliseconds
            if (temperatureAgeMillis > 31536000000) {
                temperatureAge = Math.round(temperatureAgeMillis/31536000000) + " year(s)";
            } else if (temperatureAgeMillis > 2592000000) {
                temperatureAge = Math.round(temperatureAgeMillis/2592000000) + " month(s)";
            } else if (temperatureAgeMillis > 86400000) {
                temperatureAge = Math.round(temperatureAgeMillis/86400000) + " day(s)";
            } else if (temperatureAgeMillis > 3600000) {
                temperatureAge = Math.round(temperatureAgeMillis/3600000) + " hour(s)";
            } else {
                temperatureAge = Math.round(temperatureAgeMillis/60000) + " minute(s)"
            }

            temperatureFreshness = 1; // green - TODO: enumeration? color?
            if (temperatureAgeMillis > 3600000) { // 1 hour
                temperatureFreshness = 3; // red
            } else if (temperatureAgeMillis > 300000) { // 5 minutes
                temperatureFreshness = 2; // yellow
            }

            // Transform responseJson and temp data into "actual" object
            let a = {}
            a.temperature = responseJson.feeds[0].field1;
            a.heater = binToBool(responseJson.feeds[0].field2);
            a.coldBlower = binToBool(responseJson.feeds[0].field5);
            a.hotBlower = binToBool(responseJson.feeds[0].field6);
            a.lights = binToBool(responseJson.feeds[0].field4);
            a.jets = binToBool(responseJson.feeds[0].field3);
            a.cleanCycle = false; // TODO: Figure out how this will work
            a.temperatureAge = temperatureAge;
            a.temperatureFreshness = temperatureFreshness;
            a.heatRate = responseJson.feeds[0].field8;
            a.alertMessage = responseJson.feeds[0].field7;
            dispatch({type: 'RECEIVED_ACTUAL', a});
        },
        gotDesiredState: (responseJson) => {
            let d = {}
            d.temperature = parseFloat(responseJson.feeds[0].field1).toFixed(1);
            d.jets = binToBool(responseJson.feeds[0].field2);
            d.lights = binToBool(responseJson.feeds[0].field3);
            d.coldBlower = binToBool(responseJson.feeds[0].field4);
            d.hotBlower = binToBool(responseJson.feeds[0].field5);
            d.shutdownReset = binToBool(responseJson.feeds[0].field6);
            dispatch({type: 'RECEIVED_DESIRED', d});
        },
        clearDirtyFlag: () => {
            dispatch({type: 'CLEAR_DIRTY_FLAG'});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

/*

    newTargetTemp(newTargetTemp) {
        let temp = parseFloat(newTargetTemp);
        if(temp > 0 && temp < 104){
            this.setState({targetTemp:newTargetTemp, stateChanged:true}); 
        }
    }

    switchStateChange(stateName) {
        switch(stateName){
            case 'cBlower':
                this.setState({coldBlowerState: !this.state.coldBlowerState})
                break;
            case 'hBlower':
                this.setState({hotBlowerState: !this.state.hotBlowerState});
                break;
            case 'lights':
                this.setState({lightsState: !this.state.lightsState});
                break;
            case 'jets':
                this.setState({jetsState: !this.state.jetsState});
                break;
            default:
                console.error('ERROR: switchStateChange called but with ' + stateName + ' value instead of expected value');
                break;
        }
        this.setState({stateChanged:true});
    }
*/
