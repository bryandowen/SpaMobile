import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import reduxStore from '@components/reduxStore';
import {Provider} from 'react-redux';
import NavigationService from './components/NavigationService';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <Provider store={reduxStore}><AppNavigator ref={(navigatorRef) => {NavigationService.setTopLevelNavigator(navigatorRef);}}/></Provider>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
