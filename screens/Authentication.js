import { useState } from 'react';
import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FIRST_STEP_USER_LOGIN, USER_LOGIN_VERIFICATION } from '../graphqlAPI/mutation';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, } from 'react-native';
import { FETCH_USER_DETAILS } from '../graphqlAPI/query';

export default function Authentication({ navigation }) {
  const [OTPCodeValue, setOTPCodeValue] = useState(false);
  const [fetchUserDetails] = useLazyQuery(FETCH_USER_DETAILS);
  const [phoneNumberValue, setPhoneNumberValue] = useState(false);
  const [firstStepUserLogin] = useMutation(FIRST_STEP_USER_LOGIN);
  const [showOTPInputField, setShowOTPInputField] = useState(false);
  const [userLoginVerification] = useMutation(USER_LOGIN_VERIFICATION);
  const [errorMessageOTPCode, setErrorMessageOTPCode] = useState(false);
  const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState(false);

  useEffect(() => {
    async function fetchLoginData() {
      const value = await AsyncStorage.getItem('AUTH_TOKEN');
      if (value !== null) {
        navigation.navigate('Home Page')
      } else {
        console.log("No Login Detail Found")
      }
    }
    fetchLoginData();
  }, [1]);

  async function generateOTP() {
    if (phoneNumberValue.length === 10) {
      setErrorMessagePhoneNumber('')
      await firstStepUserLogin({
        variables: {
          firstStepUserLoginInput: {
            mobileNumber: phoneNumberValue,
          }
        }
      })
        .then(async (res) => {
          alert('OTP Sent Successfully!')
          setShowOTPInputField(true)
        })
        .catch(error => {
          alert(error?.message)
        });
    } else {
      setErrorMessagePhoneNumber('Invalid Phone Number')
    }
  }

  async function formSubmit() {
    await userLoginVerification({
      variables: {
        loginVerificationInput: {
          mobileNumber: phoneNumberValue,
          otpCode: OTPCodeValue
        }
      }
    })
      .then(async (res1) => {
        alert('Login Successfully!')
        await AsyncStorage.setItem('AUTH_TOKEN', res1.data.userLoginVerification.jwtToken);
        const AUTH_TOKEN = await AsyncStorage.getItem('AUTH_TOKEN');
        await fetchUserDetails({
          variables: {
            mobileNumber: phoneNumberValue
          }, context: {
            headers: {
              Authorization: `Bearer ${res1.data.userLoginVerification.jwtToken}`
            }
          }
        })
          .then(async (res2) => {
            await AsyncStorage.setItem('AUTH_USER_ID', String(res2.data.user.id));
            const AUTH_USER_ID = await AsyncStorage.getItem('AUTH_USER_ID');
            navigation.navigate('Home Page')
          })
          .catch(error => {
            setErrorMessageOTPCode(error?.message)
          });
        // navigation.navigate('Home Page')
      })
      .catch(error => {
        setErrorMessageOTPCode(error?.message)
      });
  }

  return (
    <View style={{ flex: 1, }}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 50 }}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Z887uufI1eGoh28uZFIeaapWCHnwlVCLQF2mHiUeUg&s' }} style={{ width: 200, height: 200, borderRadius: 100 }} />
        </View>
        <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, flex: 1, backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 50, minHeight: 400 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.labelStyle}>Phone Number</Text>
            <TextInput keyboardType="phone-pad" autoFocus={true} editable={!showOTPInputField} onChangeText={(value) => setPhoneNumberValue(value)} style={styles.InputStyle} />
            {errorMessagePhoneNumber != '' ?
              <Text style={styles.errorAlert}>{errorMessagePhoneNumber}</Text>
              :
              <></>
            }
          </View>
          {showOTPInputField ?
            <>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.labelStyle}>OTP Code</Text>
                <TextInput keyboardType="phone-pad" autoFocus={true} onChangeText={(value) => setOTPCodeValue(value)} style={styles.InputStyle} secureTextEntry />
                {errorMessageOTPCode != '' ?
                  <Text style={styles.errorAlert}>{errorMessageOTPCode}</Text>
                  :
                  <></>
                }
              </View>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 4, paddingVertical: 10, marginHorizontal: 8 }} onPress={() => formSubmit()}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
            :
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={{ backgroundColor: 'black', borderRadius: 4, paddingVertical: 10, marginHorizontal: 8 }} onPress={() => generateOTP()}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Get OTP</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5
  }
});
