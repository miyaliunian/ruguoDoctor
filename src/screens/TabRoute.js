/**
 * @flow
 */
import * as React from 'react';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Home from '../ui/home/';
import Hot from '../ui/hot/';
import Mine from '../ui/mine/';
import Discovery from '../ui/discovery/';
import {TabBarItem,StackTabItemConfig} from './BaseStack';
import {configRoute} from 'react-navigation-easy-helper';
import {Tab_Icon} from "../assest/Image";
import i18 from '../language';
import Test from "../ui/home/test";
const HomeScreen = createStackNavigator(
    configRoute({
        HomeScreen:{screen:Home},
        Test:{screen:Test}
    }),
    StackTabItemConfig
);

const DiscoveryScreen = createStackNavigator(
    configRoute({
        DiscoveryScreen:{screen:Discovery},
    }),
    StackTabItemConfig
);

const HotScreen = createStackNavigator(
    configRoute({
        HotScreen:{screen:Hot},
    }),
    StackTabItemConfig
);

const MineScreen = createStackNavigator(
    configRoute({
        MineScreen:{screen:Mine},
    }),
    StackTabItemConfig
);

const Tab = createBottomTabNavigator({
        Home:{screen:HomeScreen,navigationOptions:()=>(TabBarItem(i18.t('home.tab_home'),Tab_Icon.ic_home_selected,Tab_Icon.ic_home_normal))},
        Discovery:{screen:DiscoveryScreen,navigationOptions:()=>(TabBarItem(i18.t('home.tab_discovery'),Tab_Icon.ic_discovery_selected,Tab_Icon.ic_discovery_normal))},
        Hot:{screen:HotScreen,navigationOptions:()=>(TabBarItem(i18.t('home.tab_hot'),Tab_Icon.ic_hot_selected,Tab_Icon.ic_hot_normal))},
        Mine:{screen:MineScreen,navigationOptions:()=>(TabBarItem(i18.t('home.tab_mine'),Tab_Icon.ic_mine_selected,Tab_Icon.ic_mine_normal))},
    }, {
        initialRouteName:'Home',
        tabBarVisible:true,
        tabBarOptions:{
            backgroundColor:'rgba(255,255,255,.6)',
            activeTintColor:'#000'
        },
    }
);

const SplashView = initialRouteName=>createSwitchNavigator({
    //Splash:{screen:SplashScreen},
    Tab:{screen:Tab}
},{
    initialRouteName:initialRouteName,
});

export default SplashView;

/**
 * 隐藏底部tab
 * @param navigation
 */
HomeScreen.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'HomeScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};

DiscoveryScreen.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'DiscoveryScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};

HotScreen.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'HotScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};

MineScreen.navigationOptions=({navigation})=>{
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    if (routeName !== 'MineScreen') {
        navigationOptions.tabBarVisible = false;
    }
    return navigationOptions;
};



