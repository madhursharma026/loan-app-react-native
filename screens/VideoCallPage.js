import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const HomePage = ({navigation}) => {
    return (
        <View style={styles.container}>
        <Text style={{fontSize: 20}}>Hii... Working on Video Call Page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default HomePage;
