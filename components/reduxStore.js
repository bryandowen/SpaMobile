import {createStore} from 'redux';
import appConfig from '../appconfig.json';

const initialState = {
    desired: {
        temperature: '0.0',
        coldBlower: false,
        hotBlower: false,
        light: false,
        jets: false,
        shutdownReset: false, // implement!
        cleanCycle: false, // figure out how to implement!
    },
    actual: {
        temperature: '0.0',
        heater: false,
        coldBlower: false,
        hotBlower: false,
        light: false,
        jets: false,
        cleanCycle: false,
        temperatureAge: '',
        temperatureFreshness: 3,
        heatRate: 0.0,
        alertMessage: '',
    },
    isDirty: false,
    appConfig: appConfig,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'RECEIVED_ACTUAL':
            return Object.assign({}, state, {
                actual: action.a,
            });
        case 'RECEIVED_DESIRED':
            return Object.assign({}, state, {
                desired: action.d
            });
        case 'SET_DESIRED': // May ditch in favor of SETTING_CHANGED
            return state;
        case 'DESIRED_SWITCH_CHANGED':
            switch(action.tag) {
                case 'jets':
                    return Object.assign({}, state, {
                        isDirty: true,
                        desired: {
                            ...state.desired,
                            jets: action.value,
                        }
                    });
                case 'light':
                    return Object.assign({}, state, {
                        isDirty: true,
                        desired: {
                            ...state.desired,
                            light: action.value,
                        }
                    });
                case 'hotblower':
                    return Object.assign({}, state, {
                        isDirty: true,
                        desired: {
                            ...state.desired,
                            hotBlower: action.value,
                        }
                    });
                case 'coldblower':
                    return Object.assign({}, state, {
                        isDirty: true,
                        desired: {
                            ...state.desired,
                            coldBlower: action.value,
                        }
                    });
                case 'cleancycle':
                    return Object.assign({}, state, {
                        isDirty: true,
                        desired: {
                            ...state.desired,
                            cleanCycle: action.value,
                        }
                    });
                default:
                    return state;
            }
        case 'DESIRED_TEMP_CHANGED':
            return Object.assign({}, state, {
                isDirty: true,
                desired: {
                    ...state.desired,
                    temperature: action.temp,
                }
            })
        case 'CLEAR_DIRTY_FLAG':
            return Object.assign({}, state, {isDirty: false});
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;
