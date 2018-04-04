/**
 * Created by wufei on 2017/12/20.
 * 支付页面
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from '../../../Component/NavigationBar'
import ViewUtil from '../../../Common/viewUtil'
import ScreenUtil from '../../../Common/screenUtil'
import GlobalStyles from '../../../Common/GlobalStyles'
import ConfirmModal from '../../../Component/ConfirmModal'
import LoadingModal from '../../../Component/LoadingModal'
import {MoreMenu} from '../../../Common/MoreMenu'
import Px2dp from '../../../Common/px2dp'
import PayCell from './PayCell'
import MobxStore from './MobxStore';
let JSON_DATA = require('./payCell.json');

import {observer} from 'mobx-react/native';
import {action, observe} from 'mobx';
@observer
export default class PayPage extends Component {

    constructor(props) {
        super(props);
        this.data = new MobxStore();
        this.state = {
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            isToBePay: false,//立即支付Model
        };
    };

    componentDidMount() {
        this.data.replace(JSON_DATA.datas)
    };

    navigatePressLeft = () => {
        // 弹出modal
        this.startShow()
    };

    onChangeTab(tab) {
        if (tab == 0) {
            this._setModalVisible(false)
        }
        if (tab == 1) {
            this._setModalVisible(false);
            this.props.navigation.goBack();
        }
    }

    @action
    selectPress(itemData) {
        this.data.itemPress();
        itemData.isSelect = !itemData.isSelect;
    };


    _setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    startShow = () => {
        this.setState({
            modalVisible: true
        })
    };


    renderPayCell() {
        let itemArr = [];
        var dates = this.data.itemData;
        let icon_wx = require('../../../Resource/Imags/icon_pay_wx.png');
        let icon_zfb = require('../../../Resource/Imags/icon_pay_zfb.png');
        let icon_yl = require('../../../Resource/Imags/icon_pay_yl.png');
        let icon_left = '';
        for (let i = 0; i < dates.length; i++) {
            let data = dates[i];
            if (i == 0) {
                icon_left = icon_wx;
            }
            if (i == 1) {
                icon_left = icon_zfb;
            }
            if (i == 2) {
                icon_left = icon_yl;
            }
            itemArr.push(<PayCell
                iconLeft={icon_left}
                title={data.title}
                iconRight={data.isSelect}
                key={i}
                data={this.data}
                callback={() => this.selectPress(data)}
            />)
        }
        return itemArr
    }

    toBePay(target) {
        let {state, navigate} = this.props.navigation;
        this.setState({
            isToBePay: true
        });
        setTimeout(() => {
            this.setState({
                isToBePay: false
            });
            navigate(target, {go_back_key: state.params.go_back_key, naviBarTitle: '支付结果'});
        }, 2000)

    }


    render() {
        let {title, ActualPayment} = this.props.navigation.state.params;
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={title}
                />
                <View style={styles.textContain}>
                    <Text style={styles.title}>请选择支付方式</Text>
                </View>
                <View style={GlobalStyles.line}/>
                <ScrollView>
                    {this.renderPayCell()}
                </ScrollView>

                <View style={{
                    height: Px2dp.getHeight(100),
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'flex-end'
                }}>
                    <View style={styles.payContain}>
                        <Text style={styles.payTitle}>实付款：</Text>
                        <Text style={styles.payPrice}>{ActualPayment}</Text>
                    </View>
                    <TouchableOpacity style={styles.payBtn}
                                      onPress={() => this.toBePay(MoreMenu.Profile.pay.menu_pay_result)}>
                        <Text style={styles.payBtnTitle}>立即付款</Text>
                    </TouchableOpacity>
                </View>

                {/*Modal弹出层   */}
                <ConfirmModal transparent={this.state.transparent} visible={this.state.modalVisible}
                              confirmTitle='健康最重要，请三思啊~'
                              onRequestClose={() => this._setModalVisible(false)}
                              onRequestConfirm={() => this.onChangeTab(0)}
                              onRequestCancle={() => this.onChangeTab(1)}
                              confirmBtnTitle='继续购买' cancleBtnTitle='去意已决'
                />

                {/*立即付款Model弹出层   */}
                <LoadingModal txtTitle="支付中... ..." visible={this.state.isToBePay}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContain: {
        height: Px2dp.getHeight(60),
        paddingLeft: Px2dp.getWidth(30),
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 13,
        color: 'rgb(153,153,153)'
    },
    payContain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    payTitle: {
        fontSize: 13,
        color: 'rgb(51,51,51)'
    },
    payPrice: {
        fontSize: 17,
        color: 'rgb(239,94,82)'
    },
    payBtn: {
        width: Px2dp.getWidth(220),
        backgroundColor: 'rgb(255,208,96)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Px2dp.getWidth(70)
    },
    payBtnTitle: {
        fontSize: 15,
        color: 'rgb(51,51,51)'
    },
});

