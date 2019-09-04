import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './Login';
import HomScreen from './Home';
import colors from '../../assets/colors';

const AuthStack = createStackNavigator (
  {
    Login: LoginScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Login',
      headerStyle: {
        backgroundColor: colors.secondaryColor,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const HomeStack = createStackNavigator (
  {
    Home: HomScreen 
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Gas App',
      headerStyle: {
        backgroundColor: colors.secondaryColor,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default createAppContainer (
  createSwitchNavigator (
    {
      Auth: AuthStack,
      Home: HomeStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);