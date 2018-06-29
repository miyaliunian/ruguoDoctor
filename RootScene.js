/**
 * Created by wufei on 2018/6/27.
 */
import React, {Component} from 'react';
import theme from './src/config/theme';

//导航布局
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
//切换动画
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import Icon from 'react-native-vector-icons/Ionicons'

//业务导入
import  LoginScreen from './src/screens/login/LoginScreen'
import  UserAgreement from './src/screens/login/UserAgreement'
import  SettingPassword from './src/screens/login/SettingPassword'
import  LoginProfileInfo from './src/screens/login/LoginProfileInfo'
//**************待办任务
import  HomeScreen from './src/screens/task/HomeScreen'
import  HomeScreenTwo from './src/screens/task/HomeScreenTwo'
//**************服务对象
import  ServiceScreen from './src/screens/service/ServiceScreen'
//**************我的
import  ProfileScreen from './src/screens/profile/ProfileScreen'

export default class App extends Component {

    render() {
        return (
            <SwitchNavigator/>
        );
    }
}


const TabStack = createMaterialBottomTabNavigator(
    {
        Task: {
            screen: createStackNavigator({
                index: {
                    screen: HomeScreen
                },
                HomeScreenTwo: {
                    screen: HomeScreenTwo,
                },
            },{
                navigationOptions:{
                    headerStyle:{
                        backgroundColor:theme.navColor,

                    }
                }

            }),
            navigationOptions: {
                tabBarLabel: '待办任务',
                tabBarIcon: ({focused, tintColor}) => (
                    <Icon name={`ios-home${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
                )
            }
        },
        Service: {
            screen: createStackNavigator({
                index: {
                    screen: ServiceScreen
                }
            },{
                navigationOptions:{
                    headerStyle:{
                        backgroundColor:theme.navColor,

                    }
                }

            }),
            navigationOptions: {
                tabBarLabel: '服务对象',
                tabBarIcon: ({focused, tintColor}) => (
                    <Icon name={`ios-apps${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
                )
            }
        },
        Profile: {
            screen: createStackNavigator({
                index: {
                    screen: ProfileScreen
                }
            },{
                navigationOptions:{
                    headerStyle:{
                        backgroundColor:theme.navColor,

                    }
                }

            }),
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <Icon name={`ios-people${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
                )
            }
        },
    },
    {

        initialRouteName: 'Task',
        order: ['Task', 'Service', 'Profile'],
        activeTintColor: theme.primaryColor,
        headerMode: 'screen',
        inactiveBackgroundColor: theme.lightGray,
        inactiveTintColor: theme.lightBlack,
        shifting: true,
    }
)

const AppStack = createStackNavigator(
    {
        TabStack: {
            screen: TabStack,
        },

    },
    {
        mode: 'card',// 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'none',// 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        navigationOptions: {
            gesturesEnabled: true,
        },
        transitionConfig: () => ({ //切换动画
            screenInterpolator: CardStackStyleInterpolator.forFade //水平动画
        })
    }
);

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        UserAgreement: {
            screen: UserAgreement,
        },
        SettingPassword: {
            screen: SettingPassword,
        },
        LoginProfileInfo: {
            screen: LoginProfileInfo,

        },
    }, {
        initialRouteName: 'Login',
        navigationOptions: {
            gesturesEnabled: false,
            headerStyle:{
                backgroundColor:theme.navColor,
            }
            //header: null  //去掉 react-navigation 提供的标题
        }
    }
)

const SwitchNavigator = createSwitchNavigator(
    {
        //AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        App: AppStack,

    },
    {
        initialRouteName: 'App',
    }
)

