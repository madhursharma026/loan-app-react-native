import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { USER_APPLY_FOR_LOAN } from '../graphqlAPI/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

const DetailedPage = ({ navigation }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [fullNameValue, setFullNameValue] = useState('');
    const [alertAuthToken, setAlertAuthToken] = useState('');
    const [loanAmountValue, setLoanAmountValue] = useState('');
    const [occupationValue, setOccupationValue] = useState('');
    const [userApplyForLoan] = useMutation(USER_APPLY_FOR_LOAN);
    const [emailAddressValue, setEmailAddressValue] = useState('');
    const [maritalStatusValue, setMaritalStatusValue] = useState('');
    const [panCardNumberValue, setPanCardNumberValue] = useState('');
    const [alertMessageAddress, setAlertMessageAddress] = useState(false);
    const [aadharCardNumberValue, setAadharCardNumberValue] = useState('');
    const [alertMessageFullName, setAlertMessageFullName] = useState(false);
    const [alertMessageOccupation, setAlertMessageOccupation] = useState(false);
    const [alertMessageLoanAmount, setAlertMessageLoanAmount] = useState(false);
    const [alertMessageEmailAddress, setAlertMessageEmailAddress] = useState(false);
    const [alertMessageMaritalStatus, setAlertMessageMaritalStatus] = useState(false);
    const [alertMessagePanCardNumber, setAlertMessagePanCardNumber] = useState(false);
    const [alertMessageAadharCardNumber, setAlertMessageAadharCardNumber] = useState(false);

    useEffect(async () => {
        const value = await AsyncStorage.getItem('AUTH_TOKEN');
        if (value !== null) {
            setAlertAuthToken(value)
        } else {
            console.log("No Login Detail Found")
        }
    }, [1])

    async function submitLoanForm() {
        if (fullNameValue === '') {
            setAlertMessageFullName(true)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (emailAddressValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(true)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (addressValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(true)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (occupationValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(true)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (maritalStatusValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(true)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (loanAmountValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(true)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(false)
        } else if (panCardNumberValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(true)
            setAlertMessageAadharCardNumber(false)
        } else if (aadharCardNumberValue === '') {
            setAlertMessageFullName(false)
            setAlertMessageEmailAddress(false)
            setAlertMessageAddress(false)
            setAlertMessageOccupation(false)
            setAlertMessageLoanAmount(false)
            setAlertMessageMaritalStatus(false)
            setAlertMessagePanCardNumber(false)
            setAlertMessageAadharCardNumber(true)
        } else {
            await userApplyForLoan({
                variables: {
                    addLoansArgs: {
                        loanAmount: loanAmountValue,
                        FullName: fullNameValue,
                        EmailAddress: emailAddressValue,
                        Address: addressValue,
                        Occupation: occupationValue,
                        MaritalStatus: maritalStatusValue,
                        PanCardNumber: panCardNumberValue,
                        AadharCardNumber: aadharCardNumberValue,
                        user_id: "1"
                    }
                }, context: {
                    headers: {
                        Authorization: `Bearer ${alertAuthToken}`
                    }
                }
            })
                .then(async (res) => {
                    setAlertStatus(false)
                    setLoanAmountValue('')
                    setFullNameValue('')
                    setEmailAddressValue('')
                    setAddressValue('')
                    setOccupationValue('')
                    setMaritalStatusValue('')
                    setPanCardNumberValue('')
                    setAadharCardNumberValue('')
                    navigation.navigate('VideoCallPage')
                })
                .catch(error => {
                    setAlertMessageFullName(false)
                    setAlertMessageEmailAddress(false)
                    setAlertMessageAddress(false)
                    setAlertMessageOccupation(false)
                    setAlertMessageLoanAmount(false)
                    setAlertMessageMaritalStatus(false)
                    setAlertMessagePanCardNumber(false)
                    setAlertMessageAadharCardNumber(false)
                    setAlertStatus(true)
                    setAlertMessage(error?.message)
                });
        }
    }

    return (
        <ScrollView style={styles.container}>
            {alertStatus ?
                <View style={{ backgroundColor: '#F8D7DA', padding: 15, borderRadius: 5, marginBottom: 10 }}>
                    <Text style={{ fontSize: 15, color: 'red' }}>{alertMessage}</Text>
                </View>
                :
                <></>
            }
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Full Name *</Text>
                <TextInput onChangeText={(value) => setFullNameValue(value)} style={styles.InputStyle} />
                {alertMessageFullName ?
                    <Text style={styles.errorAlert}>Fullname field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Email Address *</Text>
                <TextInput keyboardType='email-address' onChangeText={(value) => setEmailAddressValue(value)} style={styles.InputStyle} />
                {alertMessageEmailAddress ?
                    <Text style={styles.errorAlert}>Email address field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Address *</Text>
                <TextInput onChangeText={(value) => setAddressValue(value)} style={styles.InputStyle} />
                {alertMessageAddress ?
                    <Text style={styles.errorAlert}>Address field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Occupation *</Text>
                <TextInput onChangeText={(value) => setOccupationValue(value)} style={styles.InputStyle} />
                {alertMessageOccupation ?
                    <Text style={styles.errorAlert}>Occupation field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Marital Status *</Text>
                <RNPickerSelect
                    onValueChange={(value) => setMaritalStatusValue(value)}
                    items={[
                        { label: 'Single', value: 'Single' },
                        { label: 'Married', value: 'Married' },
                        { label: 'Divorced', value: 'Divorced' },
                    ]}
                />
                {alertMessageMaritalStatus ?
                    <Text style={styles.errorAlert}>Marital status field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Loan Amount *</Text>
                <TextInput keyboardType='phone-pad' onChangeText={(value) => setLoanAmountValue(value)} style={styles.InputStyle} />
                {alertMessageLoanAmount ?
                    <Text style={styles.errorAlert}>Loan amount field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>PAN Card Number *</Text>
                <TextInput keyboardType='phone-pad' onChangeText={(value) => setPanCardNumberValue(value)} style={styles.InputStyle} />
                {alertMessagePanCardNumber ?
                    <Text style={styles.errorAlert}>Pan card number field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 5 }}>
                <Text style={styles.labelStyle}>Aadhar Card Number *</Text>
                <TextInput keyboardType='phone-pad' onChangeText={(value) => setAadharCardNumberValue(value)} style={styles.InputStyle} />
                {alertMessageAadharCardNumber ?
                    <Text style={styles.errorAlert}>Aadhar card number field is required</Text>
                    :
                    <></>
                }
            </View>
            <View style={{ marginBottom: 50 }}>
                <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 4, paddingVertical: 10, marginHorizontal: 8 }} onPress={() => submitLoanForm()}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    labelStyle: {
        fontSize: 16,
        marginLeft: 10,
        color: 'black',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    InputStyle: {
        fontSize: 15,
        color: 'black',
        borderRadius: 4,
        marginBottom: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
    },
    errorAlert: {
        color: 'red',
        fontSize: 13,
        marginLeft: 10,
        marginBottom: 5
    }
});

export default DetailedPage;
