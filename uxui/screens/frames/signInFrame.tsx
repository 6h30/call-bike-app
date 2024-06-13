import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const mockLogin = async (email: string, password: string) => {
    // Simulate API call or async task
    return new Promise<boolean>((resolve) => {
        setTimeout(() => {
            // Mock logic for successful login
            if (email === 'test@example.com' && password === 'password') {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000); // Simulate delay
    });
};

const SigninFrame = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const navigation = useNavigation();

    const onSubmit = async (data: any) => {
        const { email, password } = data;

        try {
            const loggedIn = await mockLogin(email, password);

            if (loggedIn) {
                // Navigate to another screen upon successful login
                router.replace('/');
            } else {
                // Handle authentication failure (show error message, etc.)
                console.log('Authentication failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            Keyboard.dismiss();
        }
    };

    return (
        <SigninContainer>
            <SigninTitle>Login</SigninTitle>

            {/* Email Input */}
            <SigninUser>
                <SigninUserText>Email/Username</SigninUserText>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <UserInput
                            placeholder="your username or email"
                            placeholderTextColor="#888"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onSubmitEditing={handleSubmit(onSubmit)}
                            returnKeyType="done"
                        />
                    )}
                />
              
            </SigninUser>

            {/* Password Input */}
            <SigninPassword>
                <SigninUserText>Password</SigninUserText>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PassInput
                            placeholder="your password"
                            placeholderTextColor="#888"
                            secureTextEntry={true}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onSubmitEditing={handleSubmit(onSubmit)}
                            returnKeyType="done"
                        />
                    )}
                />
              
            </SigninPassword>

            {/* Forgot Password Link */}
            <SigninFogot>
                <ForgotPassText>Forgot password?</ForgotPassText>
            </SigninFogot>

            {/* Sign In Button */}
            <SigninButton onPress={handleSubmit(onSubmit)}>
                <SignInPress>Sign In</SignInPress>
            </SigninButton>
        </SigninContainer>
    );
};

export default SigninFrame;


const SigninContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 50px;
    background-color: #f5f5f5;
`;

const SigninTitle = styled.Text`
    font-size: 40px;
    font-weight: bold;
    color: #333;
    margin-bottom: 100px;
`;

const SigninUser = styled.View`
    width: 100%;
    margin-bottom: 50px;
`;

const SigninUserText = styled.Text`
    font-size: 16px;
    color: #666;
    margin-bottom: 8px;
`;

const UserInput = styled.TextInput`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #ddd;
`;

const SigninPassword = styled.View`
    width: 100%;
    margin-bottom: 16px;
`;

const PassInput = styled.TextInput`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #ddd;
`;

const SigninFogot = styled.View`
    width: 100%;
    align-items: flex-start;
    margin-bottom: 50px;
`;

const ForgotPassText = styled.Text`
    font-size: 14px;
    color: #888;
`;

const SigninButton = styled.TouchableOpacity`
    width: 50%;
    padding: 12px;
    border-radius: 8px;
    border-color: black;
    border-width: medium;
    align-items: center;
`;

const SignInPress = styled.Text`
    font-size: 18px;
    color: #333;
    font-weight: bold;
`;