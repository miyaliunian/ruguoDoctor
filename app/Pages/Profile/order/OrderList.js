/**
 * Created by wufei on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles';
import {MoreMenu} from '../../../Common/MoreMenu';
import ViewUtil from '../../../Common/viewUtil';
import Px2dp from '../../../Common/px2dp'
import DataRepository from '../../../Expand/Dao/DataRepository'
import OrderListTab from './OrderListTab'
import NavigationBar from '../../../Component/NavigationBar'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import ProfileRecordTab from '../record/ProfileReacordTab'

let personId = '5eebe460bf2b458fb7a0a2101768599b';
export default class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectTab: 0,
        };
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
            // navigatePressRight: this.navigatePressRight
        })
        // this.loadData();
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();

        // if (0 === 0) {
        //     this.props.navigation.goBack();
        //     return
        // }
        // Alert.alert(
        //     '提示',
        //     '要保存修改吗 ？',
        //     [
        //         {text: '不保存', onPress: () => this.props.navigation.goBack(), style: 'cancel'},
        //         {
        //             text: '保存', onPress: () => {
        //                 this.navigatePressRight()
        //             }
        //         },
        //     ],
        //     {cancelable: false}
        // )
    };

    onClick(tab) {
        this.props.navigation.navigate(tab)
    }

    // toPersonInfo() {
    //     // console.log(this.props.navigation)
    //     this.props.navigation.navigate(MoreMenu.Profile.Record.menu_person_info, {title: '个人资料', personId: personId});
    //
    // }

    render() {
        return (
            <View style={[styles.container]}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title='我的订单'/>

                <ScrollableTabView
                    tabBarInactiveTextColor="rgb(196,196,196)"
                    tabBarActiveTextColor="rgb(51,51,51)"
                    tabBarTextStyle={{fontSize: Px2dp.getHeight(24), marginTop: Px2dp.getHeight(20)}}
                    tabBarUnderlineStyle={{backgroundColor: 'rgb(255,208,96)', height: 2}}
                    rendertabBar={() => <ScrollableTabBar/>}
                    onChangeTab={(obj) => {
                        // this.orderListTab.loadData(obj.i);
                        this.setState({
                            selectTab: obj.i
                        })
                    }}
                >
                    <OrderListTab tabLabel='全部' tabId='0' selectTab={this.state.selectTab} {...this.props}
                                  personId={personId}/>
                    <OrderListTab tabLabel='待付款' tabId='1' selectTab={this.state.selectTab}{...this.props}
                                  personId={personId}/>
                    <OrderListTab tabLabel='待收货' tabId='2' selectTab={this.state.selectTab}{...this.props}
                                  personId={personId}/>
                    <OrderListTab tabLabel='已完成' tabId='3' selectTab={this.state.selectTab} {...this.props}
                                  personId={personId}/>
                    <OrderListTab tabLabel='退款中' tabId='4' selectTab={this.state.selectTab}{...this.props}
                                  personId={personId}/>
                </ScrollableTabView>

            </View>
        );
    }
}

// class ProfileRecordTab extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {}
//         this.dataRepository = new DataRepository();
//     }
//
//     componentDidMount() {
//         // this.loadData();
//         // let personId = '5eebe460bf2b458fb7a0a2101768599b';
//         // this.props.navigation.navigate(MoreMenu.Profile.Record.menu_person_info, {title: '个人资料', personId: personId});
//     }
//
//     render() {
//         let {tabLabel} = this.props
//         return (
//             <View><Text>{tabLabel}</Text>
//                 <TouchableOpacity onPress={() => this.delStorge()}>
//                     <Text style={{
//                         marginTop: 50,
//                         height: 50,
//                         width: 100,
//                         alignItems: 'center',
//                         textAlign: 'center',
//                         textAlignVertical: 'center',
//                         backgroundColor: 'rgb(155,255,255)',
//                     }}>清除缓存</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
//
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',
        backgroundColor: 'rgb(255,255,255)',
    },
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(192),
        // borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLeft: {
        flexDirection: 'row',
    },
    AvatarStyle: {
        height: Px2dp.getHeight(128),
        width: Px2dp.getWidth(128),
        borderRadius: Px2dp.getHeight(128),
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        borderWidth: 5,
        borderColor: 'rgb(254,232,181)'
    },
    imgRight: {
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(32),
        width: Px2dp.getWidth(32),
        tintColor: 'rgb(196,196,196)'
    },
    rowInfo: {
        width: Px2dp.getWidth(400),
        justifyContent: 'center',
        flexDirection: 'column',
    },
    rowInfoLabel: {
        fontSize: Px2dp.getHeight(22),
        color: 'rgb(153,153,153)'
    },
    rowLabel: {
        width: 100,
        marginLeft: Px2dp.getWidth(30)
    },
    fontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(51,51,51)'
    },
    fontText: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(196,196,196)',

    }
});

