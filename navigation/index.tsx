/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *heart-outline
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import { theme } from '../theme'; 
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { SearchScreen } from '../screens/SearchScreen';
import { PortfolioScreen } from '../screens/PortfolioScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { FindLocationScreen } from '../screens/FindLocationScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
return (
    <NavigationContainer
        linking={LinkingConfiguration}
        theme={DefaultTheme}>
        <RootNavigator />
    </NavigationContainer>
);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
return (
    <Stack.Navigator>
    <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="FindLocations" component={FindLocationScreen} options={{ headerShown: false }} />
    </Stack.Group>
    </Stack.Navigator>
);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

return (
    <BottomTab.Navigator
        initialRouteName="Search"
        screenOptions={{
            tabBarActiveTintColor: theme['color-primary-500'],
        }}
        >
        <BottomTab.Screen
            name="Search"
            component={SearchScreen}
            options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="magnify" color={color} />,
            }} 
            />
        <BottomTab.Screen
            name="Portfolio"
            component={PortfolioScreen}
            options={{
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="heart-outline" color={color} />,
            }} 
            />
        <BottomTab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <TabBarIcon name="account-circle-outline" color={color} />,
            }} 
            />
    </BottomTab.Navigator>
);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
color: string;
}) {
return <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
