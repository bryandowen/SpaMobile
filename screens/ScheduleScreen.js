import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button } from 'react-native';

export default class ScheduleScreen extends React.Component {
    static navigationOptions = {
        title: 'Schedule',
    };

    render() {
        return (
        <ScrollView style={styles.container}>
            <Text>Quiet Hours</Text>
            <Text>Begin</Text>
            <TextInput/>
            <Text>End</Text>
            <TextInput/>
            <Button title="Save"/>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
