import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MatchDetailsScreen from '../screens/AddEditMatchScreen';

const AppStack = createNativeStackNavigator();

const RootNavigation = () => {
    return (
        <AppStack.Navigator
            screenOptions={{ headerShown: false, }}>
            <AppStack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />

            <AppStack.Screen
                name="AddEditMatchScreen"
                component={MatchDetailsScreen}
            />
        </AppStack.Navigator>
    )
}

export default RootNavigation;