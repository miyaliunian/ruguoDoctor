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
    Alert,
    Platform,
    TextInput,
    Keyboard,
    ScrollView,
    FlatList,
    DeviceEventEmitter
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
import Picker from 'react-native-picker';
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import LoadingModal from '../../../Component/LoadingModal'
import SubmitBtn from '../../../Component/SubmitBtn'
import NavigationBar from '../../../Component/NavigationBar'
import ScreenUtil from '../../../Common/screenUtil'
import {MoreMenu} from '../../../Common/MoreMenu'
let jsonData = require('../address/address.json');
import {Config} from '../../../Expand/Dao/Config'
const URL = Config.BASE_URL+Config.API_SHOP_CENTER_DOCTOR_DETAIL;
export default class ShopDoctorDetail_old extends Component {



    //喜欢，取消喜欢
    navigatePressRight = (isFollow) => {
        if (isFollow == '1') {
            this.setState({isFollow: '0'});
        } else {
            this.setState({isFollow: '1'});
        }
    }
    //返回
    navigatePressLeft = () => {
        if (0 === 0) {
            this.props.navigation.goBack();
            return
        }
    }

    render() {
        let itemRightArrow = <Image source={require('../../../Resource/Imags/address-select-xila.png')}
                                    style={styles.imgRight}/>;
        return (
            <View style={[{}, this.state.keyboardShown && styles.bumpedContainer, GlobalStyles.root_container]}>

                <NavigationBar
                    statusBar={{backgroundColor: 'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'服务详情'}
                    rightButton={
                        <TouchableOpacity onPress={() => this.navigatePressRight(this.state.isFollow)}>
                            <View style={{margin: 10, marginRight: Px2dp.getWidth(40)}}>
                                <Image
                                    style={{
                                        width: Px2dp.getWidth(40),
                                        height: Px2dp.getHeight(40),
                                        marginLeft: Px2dp.getWidth(30)
                                    }}
                                    source={this.state.isFollow == '1' ?
                                        require('../../../Resource/Imags/doctor-collection.png')
                                        : require('../../../Resource/Imags/doctor-collection-empty.png')}
                                    resizeMethod='scale'
                                />
                            </View>
                        </TouchableOpacity>
                    }/>
                <ScrollView style={{flex: 1}}>
                    <View style={{}}>
                        <Image
                            style={{width: ScreenUtil.screenSize.width, height: Px2dp.getHeight(260)}}
                            source={require('../../../Resource/Imags/doctor-background.png')}
                            resizeMode={'stretch'}
                        />
                    </View>


                    <View style={{
                        position: 'absolute',
                        marginTop: Px2dp.getHeight(165),
                        marginLeft: Px2dp.getWidth(76)
                    }}>
                        <View style={{
                            width: ScreenUtil.screenSize.width - Px2dp.getWidth(152),
                            height: 185, borderRadius: Px2dp.getHeight(15),
                            backgroundColor: 'rgb(255,255,255)', alignItems: 'center'
                        }}>
                            <View style={{flexDirection: 'row', marginTop: Px2dp.getHeight(90), alignItems: 'center'}}>
                                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                                    {this.state.doctorName}
                                </Text>
                                <Text style={{marginLeft: Px2dp.getWidth(10), fontWeight: 'bold'}}>
                                    {this.state.doctorPosition}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.hospitalDetailed()}>
                                <View style={{
                                    height: Px2dp.getHeight(70),
                                    width: Px2dp.getWidth(350),
                                    alignItems: 'center',
                                    borderRadius: Px2dp.getHeight(32),
                                    backgroundColor: 'rgb(255,208,96)',
                                    justifyContent: 'center', marginTop: Px2dp.getHeight(10)
                                }}>
                                    <Text style={{color: 'rgb(255,255,255)', fontWeight: 'bold'}}>
                                        {this.state.workplaceName}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{
                                width: ScreenUtil.screenSize.width - Px2dp.getWidth(152),
                                height: Px2dp.getHeight(70), borderRadius: Px2dp.getHeight(15),
                                backgroundColor: 'rgb(255,255,255)', alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: Px2dp.getHeight(10),
                                    alignItems: 'center'
                                }}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                                        已服务
                                    </Text>
                                    <Text style={{marginLeft: Px2dp.getWidth(10), fontWeight: 'bold', color: 'red'}}>
                                        {this.state.serviceNumber}
                                    </Text>
                                    <Text style={{marginLeft: Px2dp.getWidth(10), fontWeight: 'bold', fontSize: 15}}>
                                        次
                                    </Text>
                                </View>
                            </View>

                            <View style={[styles.line]}/>

                            <View style={{
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'rgb(153,153,153)', alignItems: 'center',
                                    marginLeft: Px2dp.getWidth(20),
                                    marginRight: Px2dp.getWidth(20)
                                }}>
                                    {this.state.doctorIntroduce}

                                </Text>
                            </View>


                        </View>

                    </View>


                    <View style={{
                        alignItems: 'center',
                        position: 'absolute',
                        marginTop: Px2dp.getHeight(95),
                        marginLeft: ScreenUtil.screenSize.width / 2 - Px2dp.getWidth(66)
                    }}>
                        <View style={styles.AvatarStyle1}>
                            <Image source={require('../../../Resource/Imags/huanglin.png')}
                                   style={styles.AvatarStyle}/>
                        </View>

                    </View>


                    <View style={{marginTop: Px2dp.getHeight(340), alignItems: 'center',}}>

                        <View style={{
                            backgroundColor: 'rgb(255,255,255)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: 5
                        }}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: ScreenUtil.screenSize.width,
                                height: Px2dp.getHeight(70)
                            }}>
                                <Text style={{fontWeight: 'bold'}}>服务期限</Text>
                            </View>

                            <View style={styles.line}/>

                            <View>
                                {this.renderItem()}
                            </View>

                        </View>

                        <View style={{backgroundColor: 'rgb(255,255,255)', alignItems: 'center', marginTop: 10}}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: ScreenUtil.screenSize.width,
                                height: Px2dp.getHeight(70)
                            }}>
                                <Text style={{fontWeight: 'bold'}}>服务内容</Text>
                            </View>

                            <View style={styles.line}/>

                            <View
                                style={{height: Px2dp.getHeight(150), alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{
                                    color: 'rgb(153,153,153)',
                                    alignItems: 'center',
                                    width: Px2dp.getWidth(700)
                                }}>
                                    {this.state.serviceIntroduce}
                                    {/*服务内容详情,服务内容详情,服务内容详情,服务内容详情,服务内容详情,服务内容详情,服务内容详情,服务内容详情。*/}

                                </Text>
                            </View>
                        </View>


                        <View style={{backgroundColor: 'rgb(255,255,255)', alignItems: 'center', marginTop: 10}}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: ScreenUtil.screenSize.width,
                                height: Px2dp.getHeight(70)
                            }}>
                                <Text style={{fontWeight: 'bold'}}>购买流程</Text>
                            </View>

                            <View style={styles.line}/>

                            <View style={{flexDirection: 'row', height: Px2dp.getHeight(100), alignItems: 'center',}}>
                                <Image source={require('../../../Resource/Imags/doctor-1.png')}
                                       style={{}}/>
                                <Image source={require('../../../Resource/Imags/doctor-2.png')}
                                       style={{marginLeft: Px2dp.getWidth(30)}}/>
                                <Image source={require('../../../Resource/Imags/doctor-3.png')}
                                       style={{marginLeft: Px2dp.getWidth(30)}}/>
                                <Image source={require('../../../Resource/Imags/doctor-4.png')}
                                       style={{marginLeft: Px2dp.getWidth(30)}}/>
                            </View>
                        </View>

                    </View>


                    <LoadingModal txtTitle={this.state.showModalTitle} visible={this.state.showModal}/>
                </ScrollView>
                <TouchableOpacity onPress={() => this.purchaseService()}>
                    <View style={styles.ButtonStyle1}>
                        <Text style={[styles.fontLabel]}>购买服务</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    //修改选择价格
    choicePrice(id) {
        var goodspricelist = this.state.goodsPriceList;
        var newList = [];
        for (let i = 0; i < goodspricelist.length; i++) {
            let data = goodspricelist[i];
            if (data.id == id) {
                data.isDefault = '1'
            } else {
                data.isDefault = '0'
            }
            newList.push(data);
        }
        this.setState({goodsPriceList: newList});
    }

    //填充价格list
    renderItem = (item) => {
        let itemPricesArr = [];
        var goodspricelist = this.state.goodsPriceList;
        if (goodspricelist != '') {
            for (let i = 0; i < goodspricelist.length; i++) {
                let data = goodspricelist[i];
                itemPricesArr.push(
                    <TouchableOpacity onPress={() => this.choicePrice(data.id)} key={i}>
                        <View style={data.isDefault == '1' ? styles.ButtonStyle : styles.EmptyButtonStyle}>
                            <Text style={[data.isDefault == '1' ? styles.fontLabel : styles.EmptyfontLabel]}>
                                {data.goodsPrice}
                            </Text>
                            <Text style={[styles.EmptyfontLabelTwo]}>
                                {data.discountPrice}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
        return itemPricesArr;
    };
    //跳转医院详细
    hospitalDetailed() {

    }

    //购买
    purchaseService = () => {
        let {state, navigate} = this.props.navigation
        navigate(MoreMenu.Profile.Order.menu_order_purchase_doctor, {
            memberCode: '5eebe460bf2b458fb7a0a2101768599b',
            callBack: (obj) => this.editAddress(obj),
            go_back_key: state.key
        })

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
    //选中默认地址
    selectPress(isSelect) {
        this.setState({isSelect: !isSelect})
    }

    //强制隐藏键盘
    onDismissKeyBoard() {
        Keyboard.dismiss();
    }

    constructor(props) {
        super(props)
        this.onDismissKeyBoard = this.onDismissKeyBoard.bind(this);
        this.reproductiveModeMap = new Map([]);
        this.state = {
            doctorName: '',              //医生名称
            isFollow: '1',                     //是否喜欢该医生
            doctorPosition: '',     //医生职称
            serviceNumber: '356',             //服务次数
            doctorIntroduce: '',          //医生介绍
            serviceIntroduce: '',
            ProvinceData: null,
            province_code: null,
            showModal: false,
            showModalTitle: '正在加载',
            flag: true,
            goodsPriceList:[],
            data: jsonData,
            workplaceName:'',
        }
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let productId = this.props.navigation.state.params.id;
        this.dataRepository.postJsonRepository(URL, {"id":productId})
            .then((data) => {
                if(data){
                    this.setState({
                        doctorName: data.moDoctorBasicInfo.doctorName,              //医生名称
                        doctorPosition: data.moDoctorBasicInfo.positionalTitlesName,     //医生职称
                        doctorIntroduce: data.moDoctorBasicInfo.introduction,          //医生介绍
                        serviceIntroduce: data.goodsDetails,
                        goodsPriceList: data.moGoodsPriceList,//[{id: '1', isDefault: "1", goodsPrice: "4999/半年", discountPrice: '', key: '1'},
                                                                   // {id: '2', isDefault: "0", goodsPrice: "9599/1年", discountPrice: '(省399元)', key: '2'},
                                                                    //{id: '3', isDefault: "0", goodsPrice: "19097/2年", discountPrice: '(省899元)', key: '3'}]
                        workplaceName:data.moDoctorBasicInfo.workplaceName
                    });
                }

            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err, 'sad')
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
        width: ScreenUtil.screenSize.width,
    },
    rowLabel: {
        width: 60,
        marginLeft: Px2dp.getWidth(42)
    },
    fontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(51,51,51)'
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
        height: Px2dp.getHeight(90),
        width: ScreenUtil.screenSize.width,
        alignItems: 'center',
        backgroundColor: 'rgb(255,208,96)',
        justifyContent: 'center',
        marginTop: Px2dp.getHeight(10),
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
});

