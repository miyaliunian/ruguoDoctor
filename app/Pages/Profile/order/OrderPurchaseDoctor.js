/**
 * Created by yanqizhi on 2017/11/20.
 * 地址管理
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
    ScrollView,
    StatusBar,
    DeviceEventEmitter,
} from 'react-native';

// import CountDown from 'react_native_countdowntimer/CountDownReact'
import CountDown from './CountDown'
import Picker from 'react-native-picker';
import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import LoadingModal from '../../../Component/LoadingModal'
import NavigationBar from '../../../Component/NavigationBar'
import ScreenUtil from '../../../Common/screenUtil'
import {MoreMenu} from '../../../Common/MoreMenu'
import area from './area.json';
export default class OrderPurchaseDoctor extends Component {



    //右
    navigatePressRight = (isFollow) => {
        //alert('点击headerRight');

        // this.props.navigation.goBack();
    };
    //返回
    navigatePressLeft = () => {
        //alert('点击headerLeft');
        if (0 === 0) {
            Picker.isPickerShow(status => {
                if (status) {
                    Picker.hide();
                }
            });
            this.props.navigation.goBack();

        }
    };

    componentWillUnmount() {
        Picker.hide();
    }

    //新增服务页面
    newService() {
        DeviceEventEmitter.emit('toastInfo', '新增服务页面跳转', 'success');
    }

    //选择优惠
    choiceDiscount() {
        DeviceEventEmitter.emit('toastInfo', '选择优惠页面跳转', 'success');
    }

    //选择地址
    choiceAddress() {
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: this.state.addressRemarks,
            pickerFontSize: 16,
            pickerTitleText: '选择地址',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleColor: [20, 20, 20, 1],
            onPickerConfirm: pickedValue => {
                console.log('area', pickedValue);
                this.setState({
                    address: (pickedValue[0] + ' ' + pickedValue[1] + ' ' + pickedValue[2]),
                    addressRemarks: pickedValue
                });
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                //Picker.select(['山东', '青岛', '黄岛区'])
                console.log('area', pickedValue);
            }
        });
        Picker.show();
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    render() {
        return (
            <View style={[{}, this.state.keyboardShown && styles.bumpedContainer, GlobalStyles.root_container]}>

                <NavigationBar
                    statusBar={{backgroundColor: 'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'购买'}
                />
                <StatusBar barStyle='dark-content'
                           translucent={true}/>
                <ScrollView style={{flex: 1}}>

                    <View style={styles.discountUpViewStyle}>
                        <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0, flex: 1,}}>
                            <Text style={{fontSize: 15, color: 'rgb(51,51,51)'}}>医生姓名</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0,}}>
                            <Text style={{fontSize: 15, color: 'rgb(153,153,153)',}}>{this.state.doctorName}</Text>
                        </View>
                    </View>
                    <View style={styles.line1}/>
                    <View style={styles.discountUpViewStyle}>
                        <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0, flex: 1,}}>
                            <Text style={{fontSize: 15, color: 'rgb(51,51,51)'}}>订单名称</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0,}}>
                            <Text style={{fontSize: 15, color: 'rgb(153,153,153)',}}>{this.state.serviceType}</Text>
                        </View>
                    </View>
                    <View style={styles.line1}/>
                    <View style={styles.discountUpViewStyle}>
                        <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0, flex: 1,}}>
                            <Text style={{fontSize: 15, color: 'rgb(51,51,51)'}}>订单编号</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0,}}>
                            <Text style={{fontSize: 15, color: 'rgb(153,153,153)',}}>{this.state.orderNumber}</Text>
                        </View>
                    </View>


                    <View style={{
                        alignItems: 'center',
                        backgroundColor: 'rgb(255,255,255)',
                        marginTop: Px2dp.getHeight(10),
                    }}>
                        <Image source={require('../../../Resource/Imags/service-bean.png')}
                               style={{height: Px2dp.getHeight(32), marginTop: Px2dp.getHeight(10),}}/>
                        {this.renderServiceItem()}

                        <TouchableOpacity onPress={() => this.newService()}>
                            <View style={{
                                padding: Px2dp.getHeight(20), alignItems: 'center',
                                flexDirection: 'row', width: ScreenUtil.screenSize.width, justifyContent: 'center'
                            }}>
                                <Image source={require('../../../Resource/Imags/add-service.png')}
                                       style={{}}/>
                                <Text style={{marginLeft: Px2dp.getWidth(8), color: '#999999'}}>
                                    新增服务对象
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{
                        alignItems: 'center', marginTop: Px2dp.getHeight(10),
                        backgroundColor: 'rgb(255,255,255)', paddingBottom: Px2dp.getHeight(0)
                    }}>


                        <TouchableOpacity onPress={() => this.choiceAddress()}>
                            <View style={styles.discountViewStyle}>
                                <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0, flex: 1,}}>
                                    <Text style={{fontSize: 15, color: 'rgb(51,51,51)'}}>所在地区</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: 0,
                                    marginRight: 5
                                }}>
                                    <Text style={{fontSize: 15, color: 'rgb(153,153,153)',}}>
                                        {this.state.address}
                                    </Text>
                                </View>
                                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                                    <Image source={require('../../../Resource/Imags/icon_arrow_gray.png')}
                                           style={{}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.line}/>

                        <TouchableOpacity onPress={() => this.choiceDiscount()}>
                            <View style={styles.discountViewStyle}>
                                <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 0, flex: 1,}}>
                                    <Text style={{fontSize: 15, color: 'rgb(51,51,51)'}}>优惠券</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: 0,
                                    marginRight: 5
                                }}>
                                    <Text style={{fontSize: 15, color: 'rgb(153,153,153)',}}>无</Text>
                                </View>
                                <View style={{alignItems: 'center', justifyContent: 'center',}}>
                                    <Image source={require('../../../Resource/Imags/icon_arrow_gray.png')}
                                           style={{}}/>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.priceViewStyle}>
                        <Text style={{fontSize: 15, color: 'rgb(51,51,51)',}}>商品总价</Text>
                        <Text style={{fontSize: 15, color: 'rgb(153,153,153)'}}>¥{this.state.goodTotalPrice}</Text>
                    </View>

                </ScrollView>
                <View style={{
                    backgroundColor: 'rgb(255,255,255)',
                    paddingBottom: Px2dp.getHeight(10),
                    marginTop: Px2dp.getHeight(10)
                }}>
                    <View style={{
                        backgroundColor: 'rgb(255,255,255)', flexDirection: 'row',
                        height: Px2dp.getHeight(100), justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            paddingLeft: Px2dp.getHeight(25), borderWidth: 0,
                        }}>
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'flex-end',
                            padding: Px2dp.getHeight(25), alignItems: 'center', borderWidth: 0,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                padding: Px2dp.getHeight(25),
                                alignItems: 'center',
                                borderWidth: 0,
                            }}>
                                <Text style={{fontSize: 15, color: 'rgb(51,51,51)',}}>实付款:</Text>
                                <Text style={{
                                    marginLeft: Px2dp.getWidth(20),
                                    color: 'rgb(239,94,82)'
                                }}>¥{this.state.ActualPayment}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.submitGoToPay()}>
                                <View style={styles.ButtonStyle2}>
                                    <Text style={[styles.fontLabel1]}>去支付</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        );
    }

    submitGoToPay() {
        let {state, navigate} = this.props.navigation;
        navigate(MoreMenu.Profile.pay.menu_pay, {
            title: '支付',
            ActualPayment: this.state.ActualPayment,
            go_back_key: state.params.go_back_key
        });
    }

    //f付款时间结束更改状态
    isEndFlag(isEnd) {
        this.setState({isEnd: !isEnd})
    }

    //填充服务对象list
    renderServiceItem() {
        let itemPricesArr = [];
        var serviceList = this.state.serviceList;
        if (serviceList != '') {
            for (let i = 0; i < serviceList.length; i++) {
                let data = serviceList[i];
                itemPricesArr.push(
                    <View key={i}>
                        <TouchableOpacity onPress={() => this.isServiceFlag(data.id)}>
                            <View style={[styles.cellContainer]}>
                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                    <Image style={styles.serviceimageStyle} source={{uri: data.img}}/>
                                </View>

                                <View style={{
                                    flexDirection: 'row', flex: 1,
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        marginLeft: Px2dp.getWidth(30),
                                        height: Px2dp.getHeight(92), borderWidth: 0,
                                    }}>
                                        <Text style={styles.servicetitleStyle}>{data.serviceName}</Text>
                                        <Text style={styles.servicesubtitleStyle}>
                                            {data.serviceSex} | {data.serviceBirthday}
                                        </Text>
                                    </View>
                                </View>


                                <Image source={data.isflag ?
                                    require('../../../Resource/Imags/ic_group_selected.png')
                                    : require('../../../Resource/Imags/ic_group_unselect.png')}/>

                            </View>
                            <View style={styles.line}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        return itemPricesArr;
    }


    //修改购买人
    isServiceFlag(id) {
        var serviceList = this.state.serviceList;
        var newList = [];
        for (let i = 0; i < serviceList.length; i++) {
            let data = serviceList[i];
            if (data.id == id) {
                data.isflag = true
            } else {
                data.isflag = false
            }
            newList.push(data);
        }
        DeviceEventEmitter.emit('toastInfo', '选择成功', 'success');
        this.setState({serviceList: newList});
    }

    //购买
    purchaseService = () => {
        return;
        this.setState({
            showModalTitle: '正在保存',
            showModal: true
        });
        let params = {};


        params.mobilePhone = this.state.phone;
        params.personName = this.state.name;
        params.provinceName = this.state.province_name;
        params.cityName = this.state.city_name;
        params.address = this.state.address;
        params.provinceCode = this.state.province_code;
        params.isDefault = this.state.isSelect ? '1' : '0';
        params.memberCode = "5eebe460bf2b458fb7a0a2101768599b";//会员code，先写死，后期更改

        let url = FLAG_STORAGE.serverUrl + "/personaldata/momemberaddresslist/save";

        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    this.dataRepository.saveLocalRepository('personInfo', params)
                        .then(result => {
                            if (result) {
                                this.props.navigation.navigate('address', {})
                            }
                        })
                        .catch(error => {
                        })
                } else {
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });

            })
            .done();
    };

    constructor(props) {
        super(props);
        this.reproductiveModeMap = new Map([]);
        this.state = {
            addressId: '1',//地址ID
            doctorName: '황 림',//收货地址姓名
            serviceType: '半年服务',//服务mingc
            orderNumber: '656258956563232',

            address: '无',
            addressRemarks: ['河北', '唐山', '古冶区'],

            serviceList: [{
                id: '1',
                serviceName: "黄男",
                isflag: true,
                serviceSex: "男",
                serviceBirthday: '六个月',
                img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=8232468,2916696848&fm=27&gp=0.jpg'
            },
                {
                    id: '2',
                    serviceName: "黄女",
                    isflag: false,
                    serviceSex: "女",
                    serviceBirthday: '1年八个月',
                    img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1018364764,1223529536&fm=27&gp=0.jpg'
                },
                {
                    id: '3',
                    serviceName: "黄博士",
                    isflag: false,
                    serviceSex: "博士",
                    serviceBirthday: '不详',
                    img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2924858960,2264534403&fm=27&gp=0.jpg'
                }],

            goodTotalPrice: '3999',//商品合计总价
            couponAmount: '1',//优惠金额
            ActualPayment: '4100',//实际付款


            SurplusTime: '30',//剩余时间

            isEnd: false,
            showModalTitle: '正在加载',
            flag: true,
        };
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
            navigatePressRight: this.navigatePressRight
        })
    }

}

const styles = StyleSheet.create({

    headerBarStyle: {
        backgroundColor: 'rgb(255,208,96)', height: Px2dp.getHeight(148), paddingTop: Px2dp.getHeight(54)
    },
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(92),
        borderWidth: 0,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 1,
        backgroundColor: 'rgb(244,244,244)',
        marginLeft: Px2dp.getWidth(30),
        width: ScreenUtil.screenSize.width - 20,
    },
    line1: {
        height: 1,
        backgroundColor: 'rgb(244,244,244)',
        marginLeft: Px2dp.getWidth(30),
        width: ScreenUtil.screenSize.width,
    },
    rowLabel: {
        width: 60,
        marginLeft: Px2dp.getWidth(42)
    },
    fontLabel: {
        fontSize: Px2dp.getHeight(32),
        color: 'rgb(153,153,153)'
    },
    fontLabel1: {
        fontSize: Px2dp.getHeight(32),
    },
    EmptyfontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: '#BEBEBE',
    },
    EmptyfontLabelTwo: {
        fontSize: Px2dp.getHeight(28),
        color: 'red',
    },
    ButtonStyle1: {
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(180),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgb(153,153,153)',
        borderRadius: Px2dp.getHeight(12),
        marginTop: Px2dp.getHeight(10),
    },
    ButtonStyle2: {
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(180),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgb(255,208,96)',
        backgroundColor: 'rgb(255,208,96)',
        borderRadius: Px2dp.getHeight(12),
        marginTop: Px2dp.getHeight(10),
        marginLeft: Px2dp.getWidth(0),
    },

    ButtonStyle: {
        flexDirection: 'row',
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(650),
        alignItems: 'center',
        borderRadius: Px2dp.getHeight(12),
        backgroundColor: 'rgb(255,208,96)',
        justifyContent: 'center',
        marginTop: Px2dp.getHeight(10),
    },
    EmptyButtonStyle: {
        flexDirection: 'row',
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(650),
        alignItems: 'center',
        borderRadius: Px2dp.getHeight(12),
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        marginTop: Px2dp.getHeight(10),
        borderWidth: 1,
        borderColor: '#BEBEBE',
    },
    AvatarStyle: {
        height: Px2dp.getHeight(145),
        width: Px2dp.getWidth(135),
        borderRadius: Px2dp.getHeight(135)
    },
    AvatarStyle1: {
        height: Px2dp.getHeight(160),
        width: Px2dp.getWidth(150),
        borderRadius: Px2dp.getHeight(150),
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellContainer: {
        flexDirection: 'row',
        padding: Px2dp.getWidth(25),
        alignItems: 'center',
        backgroundColor: 'white',
        width: ScreenUtil.screenSize.width,
    },
    imageStyle: {
        width: Px2dp.getWidth(150),
        height: Px2dp.getHeight(150),
    },
    serviceimageStyle: {
        width: Px2dp.getWidth(80),
        height: Px2dp.getHeight(80),
    },
    titleStyle: {
        fontSize: 17, color: 'rgb(51,51,51)',
    },
    servicetitleStyle: {
        fontSize: 16, color: 'rgb(51,51,51)',
    },
    pricetitleStyle: {
        fontSize: 15, color: 'rgb(51,51,51)',
    },
    numtitleStyle: {
        fontSize: 14,
    },
    subtitleStyle: {
        marginTop: Px2dp.getHeight(10),
        fontSize: 13,
        width: Px2dp.getWidth(280),
        // width: Px2dp.getWidth(380)- (13+42+5+45+11+18+10),
        color: 'rgb(196,196,196)'
    },
    servicesubtitleStyle: {
        marginTop: Px2dp.getHeight(0),
        fontSize: 13,
        width: Px2dp.getWidth(280),
        // width: Px2dp.getWidth(380)- (13+42+5+45+11+18+10),
        color: 'rgb(196,196,196)'
    },
    priceStyle1: {
        fontSize: 10,
        color: 'rgb(239,94,82)',
    },
    relaTextStyle: {
        flexDirection: 'row',
        flex: 1,
        width: ScreenUtil.screenSize.width,
        paddingRight: Px2dp.getHeight(40),
        paddingLeft: Px2dp.getHeight(25),
        paddingTop: Px2dp.getHeight(10),
        paddingBottom: Px2dp.getHeight(10),
        justifyContent: 'space-between',
    },
    timeTextStyle: {
        flexDirection: 'row',
        paddingLeft: Px2dp.getHeight(25),
        paddingTop: Px2dp.getHeight(10),
        borderWidth: 0,
    },
    discountViewStyle: {
        backgroundColor: 'rgb(255,255,255)',
        flexDirection: 'row', height: Px2dp.getHeight(80),
        justifyContent: 'center', alignItems: 'center',
        width: ScreenUtil.screenSize.width,
        padding: Px2dp.getWidth(25),
    },
    discountUpViewStyle: {
        backgroundColor: 'rgb(255,255,255)',
        flexDirection: 'row', height: Px2dp.getHeight(92),
        justifyContent: 'center', alignItems: 'center',
        width: ScreenUtil.screenSize.width,
        padding: Px2dp.getWidth(25),
    },
    priceViewStyle: {
        alignItems: 'center', marginTop: Px2dp.getHeight(10), height: Px2dp.getHeight(80),
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: Px2dp.getHeight(30),
        paddingLeft: Px2dp.getHeight(25),
    }
});

