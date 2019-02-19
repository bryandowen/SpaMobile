import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Thinkspeak Settings',
    };

    render() {
        return (
            // Data: id, readkey
            // Control: id, readkey, writekey
            <View>
                <Text>Data</Text>
                <Text>Channel ID</Text>
                <TextInput/>
                <Text>Read Key</Text>
                <TextInput/>
                <Text>Control</Text>
                <Text>Channel ID</Text>
                <TextInput/>
                <Text>Read Key</Text>
                <TextInput/>
                <Text>Write Key</Text>
                <TextInput/>
            </View>
        );
    }
}
