import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomePage = ({ navigation }) => {

    async function logoutUser() {
        await AsyncStorage.setItem('AUTH_TOKEN', "");
        await AsyncStorage.setItem('AUTH_USER_ID', "");
        const value = await AsyncStorage.getItem('AUTH_TOKEN');
        if (value === null) {
            navigation.navigate('Authentication')
        } else {
            console.log("User Still Login")
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>
                Loan App brings personal loan offers from 30+ banks and NBFCs to cater to diverse consumer segments. This allows consumers to compare the key loan features offered by top lenders and then apply for the best option available on their credit profiles. We have also tied up with some of the top banks and NBFCs to offer pre-approved/pre-qualified personal loan with end-to-end digital processing and instant disbursal. Banks and Housing Finance Companies (HFCs) offer home loans of up to 75% to 90% of the property’s value depending on the credit profiles of their loan applicant, subject to the caps on the LTV ratios set by the lenders and the RBI. Home loan tenures can go up to 30 years with Bajaj Housing Finance offering maximum tenure of up to 40 years. At Loanapp.com, we help you compare housing loan interest rates and other features offered by top banks and HFCs and apply online for the best option available on your credit profile. Banks and NBFCs offer secured and unsecured business loans to finance the business or business related activities of self-employed individuals, MSME borrowers, self-employed professionals, etc. Loanapp.com allows the prospective business loan borrowers to compare the features and business loan interest rates offered by top lenders. The applicants can then apply online for the best options available based on their credit profiles.
            </Text>
            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detailed Page')}> */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VideoCallPage')}>
                <Text style={styles.buttonText}>
                    Apply For A Loan
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { marginBottom: 50 }]} onPress={() => logoutUser()}>
                <Text style={styles.buttonText}>
                    Logout
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        borderRadius: 4,
        marginBottom: 15,
        paddingVertical: 10,
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomePage;
