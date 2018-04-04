/**
 * Created by wufei on 2017/11/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    StatusBar,
    DeviceEventEmitter,
    Platform,
    Text,
    Animated
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import NetInfoDecorator from './Component/NetInfoDecorator'
import GTasks from './Pages/Gtasks/GTasksList'
import Profile from './Pages/Profile/Profile'
import ServiceTargetList from './Pages/ServiceTarget/ServiceTargetList'
import {Toast} from 'teaset';

const TabBarText = {
    tab1: "待办任务",
    tab2: "服务对象",
    tab3: "我的",
};


@NetInfoDecorator
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            promptPosition: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('toastInfo', (info, type) => {
            if (type === 'success') {
                Toast.success(info, 1500, 'center');
                return
            }
            if (type === 'fail') {
                Toast.fail(info, 1500, 'center');
                return
            }
            if (type === 'smile') {
                Toast.smile(info, 1500, 'center');
                return
            }
            if (type === 'sad') {
                Toast.sad(info, 1500, 'center');
                return
            }
            if (type === 'stop') {
                Toast.stop(info, 1500, 'center');

            }

        })
    }

    componentWillReceiveProps(nextProps) {
        const {isConnected} = nextProps;
        // 无网络
        if (!isConnected) {
            Animated.timing(this.state.promptPosition, {
                toValue: 1,
                duration: 200
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(this.state.promptPosition, {
                        toValue: 0,
                        duration: 200
                    }).start()
                }, 3000);
            })
        }
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    render() {
        let positionY = this.state.promptPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, 20]
        });
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'hsla(360, 100%, 100%,0)'}
                           translucent={true}/>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title={TabBarText.tab1}
                        titleStyle={{fontSize: 10, color: 'rgb(170,170,170)'}}
                        selectedTitleStyle={{fontSize: 10, color: 'rgb(51,51,51)'}}
                        renderIcon={() => <Image style={styles.tabBarStyle}
                                                 source={require('./Resource/TabIcons/ic_tab_home_nor.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.tabBarStyle}
                                                         source={require('./Resource/TabIcons/ic_tab_home_press.png')}/>}
                        badgeText='1'
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <GTasks {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'async'}
                        title={TabBarText.tab2}
                        titleStyle={{fontSize: 10, color: 'rgb(170,170,170)'}}
                        selectedTitleStyle={{fontSize: 10, color: 'rgb(51,51,51)'}}
                        renderIcon={() => <Image style={styles.tabBarStyle}
                                                 source={require('./Resource/TabIcons/ic_tab_manager_nor.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.tabBarStyle}
                                                         source={require('./Resource/TabIcons/ic_tab_manager_press.png')}/>}
                        badgeText='2'
                        onPress={() => this.setState({selectedTab: 'async'})}>
                        <ServiceTargetList {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        title={TabBarText.tab3}
                        titleStyle={{fontSize: 10, color: 'rgb(170,170,170)'}}
                        selectedTitleStyle={{fontSize: 10, color: 'rgb(51,51,51)'}}
                        renderIcon={() => <Image style={styles.tabBarStyle}
                                                 source={require('./Resource/TabIcons/ic_tab_profile_nor.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.tabBarStyle}
                                                         source={require('./Resource/TabIcons/ic_tab_profile_press.png')}/>}
                        badgeText='3'
                        onPress={() => this.setState({selectedTab: 'profile'})}>
                        <Profile {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
                <Animated.View style={[styles.netInfoView, {top: positionY}]}>
                    <Text style={styles.netInfoPrompt}>网络异常，请检查网络稍后重试~</Text>
                </Animated.View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabBarStyle: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25
    },
    netInfoView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        position: 'absolute',
        right: 0,
        left: 0,
        backgroundColor: 'rgb(217, 51, 58)'
    },
    netInfoPrompt: {
        color: 'white',
        fontWeight: 'bold'
    }
});

