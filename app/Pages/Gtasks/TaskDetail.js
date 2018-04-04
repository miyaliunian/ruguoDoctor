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
    DeviceEventEmitter
} from 'react-native';

// import CountDown from 'react_native_countdowntimer/CountDownReact'
// import CountDown from './CountDown'

import GlobalStyles from '../../Common/GlobalStyles'
import ViewUtil from '../../Common/viewUtil'
import Px2dp from '../../Common/px2dp'
import DataRepository, {FLAG_STORAGE} from '../../Expand/Dao/DataRepository'
import LoadingModal from '../../Component/LoadingModal'
import NavigationBar from '../../Component/NavigationBar'
import ScreenUtil from '../../Common/screenUtil'
import {Config} from '../../Expand/Dao/Config'
import SubmitBtn from '../../Component/SubmitBtn'
export default class TaskDetail extends Component {



    //右
    navigatePressRight = (isFollow) => {
        //alert('点击headerRight');

        // this.props.navigation.goBack();
    };
    //返回
    navigatePressLeft = () => {
        //alert('点击headerLeft');
        if(0 === 0){
            this.props.navigation.goBack();
            
        }
    };



    render() {
        return (
            <View style={[{}, this.state.keyboardShown && styles.bumpedContainer,GlobalStyles.root_container]}>

                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'推荐服务'}/>

                <StatusBar barStyle='dark-content'
                           translucent={true}/>
                <ScrollView style={{flex: 1}}>
                    {/*<View style={{height:Px2dp.getHeight(100),backgroundColor:'rgb(255,208,96)',*/}
                        {/*alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<Text style={{fontSize:18,color:'#ffffff'}}>退款中</Text>*/}
                    {/*</View>*/}


                    <View style={{backgroundColor: "white", paddingRight: 15,
                        flexDirection:'row',height:Px2dp.getHeight(200)}}>
                        <View style={{alignItems:'center',justifyContent:'center',marginLeft:Px2dp.getWidth(30)}}>
                            <Image source={require('../../Resource/Imags/address-icon.png')}
                                   style={{}}/>
                        </View>

                        <View style={{marginLeft:Px2dp.getWidth(30),}}>
                            <View style={{flexDirection: 'row', marginTop: Px2dp.getHeight(36)}}>
                                <Text style={{
                                    fontSize: 14,
                                    width: 60,
                                    alignSelf: 'center',
                                    color:'rgb(153,153,153)'
                                }}>收货人：</Text>
                                <Text style={{alignSelf: 'center',color:'rgb(51,51,51)', fontSize: 14}}>
                                    {this.state.personName}
                                </Text>
                                <Text style={{alignSelf: 'center', fontSize: 14,color:'rgb(51,51,51)',marginLeft:Px2dp.getWidth(166)}}>
                                    {this.state.mobilePhone}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: Px2dp.getHeight(5)}}>
                                <Text numberOfLines={2} style={{lineHeight:Px2dp.getHeight(50),width:Px2dp.getWidth(587)}}>
                                    <Text style={{ fontSize: 14,alignSelf: 'center',
                                        color:'rgb(153,153,153)'}}>收货地址：</Text>
                                    <Text  style={{alignSelf: 'center', fontSize: 14,color:'rgb(51,51,51)',
                                        marginLeft:5,}}>
                                        {this.state.provinceName}
                                        {this.state.cityName}
                                        {this.state.address}
                                    </Text>
                                </Text>

                            </View>
                        </View>
                    </View>


                    <View style={{marginTop: Px2dp.getHeight(10), alignItems: 'center',}}>
                        {this.renderGoodsItem()}
                    </View>
                    <View style={styles.line}/>
                    <View style={{alignItems: 'center',backgroundColor:'rgb(255,255,255)',paddingBottom:Px2dp.getHeight(0)}}>
                        <View style={styles.relaTextStyle}>
                            <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>购买人关系</Text>
                            <Text style={{fontSize:15,color:'rgb(153,153,153)'}}>{this.state.relaName}</Text>
                        </View>
                        <View style={styles.relaTextStyle}>
                            <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>关系人姓名</Text>
                            <Text style={{fontSize:15,color:'rgb(153,153,153)'}}>{this.state.relaPerName}</Text>
                        </View>
                        <View style={styles.relaTextStyle}>
                            <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>商品合计</Text>
                            <Text style={{fontSize:15,color:'rgb(153,153,153)'}}>¥{this.state.goodTotalPrice}</Text>
                        </View>
                        <View style={styles.relaTextStyle}>
                            <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>运费({this.state.expressName})</Text>
                            <Text style={{fontSize:15,color:'rgb(153,153,153)'}}>¥{this.state.expressPrice}</Text>
                        </View>
                        <View style={styles.relaTextStyle}>
                            <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>优惠</Text>
                            <Text style={{fontSize:15,color:'rgb(153,153,153)'}}>¥{this.state.couponAmount}</Text>
                        </View>
                        <View style={styles.line}/>
                        <View style={{backgroundColor:'rgb(255,255,255)',flexDirection:'row',height:Px2dp.getHeight(100),justifyContent:'space-between',}}>
                            <View style={{flexDirection:'row',paddingLeft:Px2dp.getHeight(25),alignItems:'center',borderWidth:0,flex:1,}}>
                                <Image source={this.state.SMSNotification ?
                                    require('../../Resource/Imags/ic_group_selected.png')
                                    : require('../../Resource/Imags/ic_group_unselect.png')}/>
                                <Text style={{marginLeft:Px2dp.getWidth(20),fontSize:15,color:'rgb(153,153,153)'}}>短信通知</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',padding:Px2dp.getHeight(25),alignItems:'center',borderWidth:0,}}>
                                <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>实付款:</Text>
                                <Text style={{marginLeft:Px2dp.getWidth(20),color:'rgb(239,94,82)'}}>¥{this.state.ActualPayment}</Text>
                            </View>
                        </View>

                    </View>


                    <View style={{ backgroundColor:'rgb(255,255,255)',paddingBottom:Px2dp.getHeight(10),marginTop: Px2dp.getHeight(10)}}>
                        <View style={styles.timeTextStyle}>
                            <Text style={{fontSize:14,color:'rgb(51,51,51)',}}>订单编号:</Text>
                            <Text style={{marginLeft:Px2dp.getWidth(20),color:'rgb(153,153,153)'}}>{this.state.orderCode}</Text>
                        </View>
                        <View style={styles.timeTextStyle}>
                            <Text style={{fontSize:14,color:'rgb(51,51,51)',}}>交易单号:</Text>
                            <Text style={{marginLeft:Px2dp.getWidth(20),color:'rgb(153,153,153)'}}>{this.state.ordernumber}</Text>
                        </View>
                        <View style={styles.timeTextStyle}>
                            <Text style={{fontSize:14,color:'rgb(51,51,51)',}}>下单时间:</Text>
                            <Text style={{marginLeft:Px2dp.getWidth(20),color:'rgb(153,153,153)'}}>{this.state.orderTime}</Text>
                        </View>
                        <View style={styles.timeTextStyle}>
                            <Text style={{fontSize:14,color:'rgb(51,51,51)',}}>付款时间:</Text>
                            <Text style={{marginLeft:Px2dp.getWidth(20),color:'rgb(153,153,153)'}}>{this.state.payTime}</Text>
                        </View>
                        <View style={styles.timeTextStyle}>
                            <Text style={{fontSize:14,color:'rgb(51,51,51)',}}>成交时间:</Text>
                            <Text style={{marginLeft:Px2dp.getWidth(20),color:'rgb(153,153,153)'}}>{this.state.transactionTime}</Text>
                        </View>
                        <View style={styles.timeTextStyle}>
                            <Text style={{fontSize:14,color:'rgb(51,51,51)',}}>发货时间:</Text>
                            <Text style={{marginLeft:Px2dp.getWidth(20),color:'rgb(153,153,153)'}}>{this.state.deliveryTime}</Text>
                        </View>
                    </View>

                    <View style={{marginVertical: Px2dp.getHeight(20), alignItems: 'center',}}>
                        <SubmitBtn onSubmit={() => this.navigatePressLeft()} styles={{
                            backgroundColor: 'rgb(255,208,96)',
                            height: Px2dp.getHeight(80),
                            width: Px2dp.getWidth(650)
                        }}
                                   titleStyle={{color: 'rgb(51,51,51)'}} txtTitle='确定'/>

                    </View>



                </ScrollView>
                {/*加载Model弹出层   */}
                <LoadingModal txtTitle="加载中... ..." visible={this.state.showLodingModal}/>

            </View>
        );
    }
    //f付款时间结束更改状态
    isEndFlag(isEnd){
        this.setState({isEnd: !isEnd})
    }
    //填充商品list
    renderGoodsItem(){
        let itemPricesArr = [];
        var goodsList = this.state.goodsList;
        if(goodsList!=''){
            for (let i = 0; i < goodsList.length; i++) {
                let data = goodsList[i];
                itemPricesArr.push(
                    <View key={i}>
                        <View style={[styles.cellContainer]}>
                            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                <Image style={styles.imageStyle} source={require('../../Resource/Imags/ic_product_dec.png')}/>
                            </View>

                            <View style={{flexDirection: 'row',flex:1,justifyContent:'space-between'}}>
                                <View style={{marginLeft: Px2dp.getWidth(30),height:Px2dp.getHeight(150)}}>
                                    <Text style={styles.titleStyle}>{data.goodsName}</Text>
                                    <Text style={styles.subtitleStyle} numberOfLines={3}>
                                        {data.goodsTitle}
                                    </Text>

                                </View>
                                <View style={{height:Px2dp.getHeight(150),
                                    alignItems:'flex-end',justifyContent:'space-between'}}>
                                    <Text style={styles.pricetitleStyle}>¥{data.goodsPrice}</Text>
                                    <Text style={styles.numtitleStyle}>
                                        X{data.goodsUintNum}
                                    </Text>
                                </View>
                            </View>


                        </View>
                    </View>
                )
            }
        }
        return itemPricesArr;
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
        params.isDefault = this.state.isSelect ? '1':'0';
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
                                // this.refs.toast.show('保存成功', DURATION.LENGTH_LONG);
                                this.props.navigation.navigate('address', {})
                            }
                        })
                        .catch(error => {
                            // this.refs.toast.show('保存失败', DURATION.LENGTH_LONG);
                        })
                } else {
                    // this.refs.toast.show(response.msg, DURATION.LENGTH_LONG);
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });
                // this.refs.toast.show(error.status, DURATION.LENGTH_LONG);
            })
            .done();
    };
    constructor(props) {
        super(props);
        this.reproductiveModeMap = new Map([
        ]);
        this.state = {
            showLodingModal: false,//标识数据是否加载中
            personName:'杰森斯坦森',//收货地址姓名
            mobilePhone:'18623567845',//收货地址电话
            provinceName:'辽宁省',
            cityName:'沈阳市',
            address:'浑南新区 国际软件园 F9# 217',

            //购买的商品信息集合
            goodsList:[{id:'1',goodsUintNum:'2',goodsName:"牛板筋",goodsPrice:"299",goodsTitle:'黄老板独家秘制 小包装牛筋 麻辣味牛板筋125g/袋。',img:'.../../Resource/Imags/ic_product_dec'},
                {id:'2',goodsUintNum:'2',goodsName:"黄氏拌饭",goodsPrice:"99",goodsTitle:'황 씨 비빔밥, 백 년 정선, 최적 원료 제작, 맛있는 만만하다。',img:'http:////img12.360buyimg.com/n7/jfs/t3076/55/3503449239/312803/c5ba0686/57f4a1d2N88ec78ab.jpg'},
                {id:'3',goodsUintNum:'1',goodsName:"大瓜",goodsPrice:"997",goodsTitle:'黄老板菜地出品，不甜不要钱。',img:'http://img10.360buyimg.com/n4/s130x130_jfs/t10945/175/2172045473/162582/5bf301ef/59f05afdN3c13f6ed.jpg'}],

            relaName:'宠物',//购买人关系
            relaPerName:'黄大林',//服务对象姓名
            goodTotalPrice:'3999',//商品合计总价
            expressName:'老岳快递',//快递名称
            expressPrice:'12',//快递费用
            couponAmount:'1',//优惠金额
            SMSNotification:true,//短信通知
            ActualPayment:'10000',//实际付款

            orderCode:'85696523656642',//订单编码
            ordernumber:'562356456465133545645',//交易单号
            orderTime:'2017-03-05 12:12:30',//下单时间
            payTime:'2017-03-05 12:12:30',//付款时间
            transactionTime:'2017-03-05 12:12:30',//成交时间
            deliveryTime:'2017-03-05 12:12:30',//发货时间

            SurplusTime:'30',//剩余时间

            isEnd : false,
            showModalTitle: '正在加载',
            flag: true,
            goodsType : '1',
        };
        this.dataRepository = new DataRepository();
    }
    componentDidMount() {
        // this.fetchData();
    }
    fetchData() {
        let orderId = this.props.navigation.state.params.orderId;
      //  let orderId='10';
        // 请求数据时显示菊花
        this.setState({
            showLodingModal: true,
        });
        let param = {
            id: orderId,
        };

        //let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/order';
        let uri =Config.BASE_URL+ Config.API_ORDER_DETAIL;
        this.dataRepository.postJsonRepository(uri, param)
            .then((data) => {
                console.log(data);
                if (data) {
                    this.setState({
                        showLodingModal: false, //数据请求成功后隐藏菊花
                        personName:data.addrInfo,
                        mobilePhone:data.addrPhone,//收货地址电话
                        address:data.addrName,
                        goodsList:data.orderGoodsList,
                        expressName:data.expressName,
                        expressPrice:data.expressPrice,
                        ActualPayment:data.discountPrice,
                        goodTotalPrice:data.totalPrice,
                        couponAmount:data.couponAmount,
                        SMSNotification:data.isMsgNotice=='1'? true:false,
                        relaName:data.relaName,//购买人关系
                        relaPerName:data.relaPerName,//服务对象姓名
                        orderCode:data.orderCode,//订单编码
                        ordernumber:data.outTradeNo,//交易单号
                        orderTime:data.orderTime,//下单时间
                        payTime:data.payTime,//付款时间
                        transactionTime:data.transactionTime,//成交时间
                        deliveryTime:data.deliveryTime,//发货时间
                        SurplusTime:'30',//剩余时间
                        goodsType : '1',

                    });
                } else {
                    this.setState({
                        showLodingModal: false,//数据请求失败后隐藏菊花
                    });
                }
            })
            .catch((error) => {
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
                this.setState({
                    showLodingModal: false,//数据请求失败后隐藏菊花
                });
            });
    }

}

const styles = StyleSheet.create({

    headerBarStyle:{
        backgroundColor: 'rgb(255,208,96)',
        height:Px2dp.getHeight(148),
        paddingTop:Px2dp.getHeight(54)
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
        width:ScreenUtil.screenSize.width,
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
        color: '#333333'
    },
    EmptyfontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: '#BEBEBE',
    },
    EmptyfontLabelTwo:{
        fontSize: Px2dp.getHeight(28),
        color: 'red',
    },
    ButtonStyle1: {
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(180),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'rgb(153,153,153)',
        borderRadius: Px2dp.getHeight(12),
        marginTop:Px2dp.getHeight(10),
    },
    ButtonStyle2: {
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(180),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'#333333',
        borderRadius: Px2dp.getHeight(12),
        marginTop:Px2dp.getHeight(10),
        marginLeft:Px2dp.getWidth(30),
    },

    ButtonStyle: {
        flexDirection:'row',
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(650),
        alignItems: 'center',
        borderRadius: Px2dp.getHeight(12),
        backgroundColor: 'rgb(255,208,96)',
        justifyContent: 'center',
        marginTop:Px2dp.getHeight(10),
    },
    EmptyButtonStyle:{
        flexDirection:'row',
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(650),
        alignItems: 'center',
        borderRadius: Px2dp.getHeight(12),
        backgroundColor: 'rgb(255,255,255)',
        justifyContent: 'center',
        marginTop:Px2dp.getHeight(10),
        borderWidth:1,
        borderColor:'#BEBEBE',
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
    titleStyle: {
        fontSize:17,color:'rgb(51,51,51)',
    },
    pricetitleStyle: {
        fontSize:15,color:'rgb(51,51,51)',
    },
    numtitleStyle: {
        fontSize:14,
    },
    subtitleStyle: {
        marginTop:Px2dp.getHeight(10),
        fontSize:13,
        width:Px2dp.getWidth(280),
        // width: Px2dp.getWidth(380)- (13+42+5+45+11+18+10),
        color: 'rgb(196,196,196)'
    },
    priceStyle1: {
        fontSize: 10,
        color: 'rgb(239,94,82)',
    },
    relaTextStyle:{
        flexDirection:'row',
        flex:1,
        width: ScreenUtil.screenSize.width,
        paddingRight:Px2dp.getHeight(25),
        paddingLeft:Px2dp.getHeight(25),
        paddingTop:Px2dp.getHeight(20),
        justifyContent:'space-between',
    },
    timeTextStyle:{
        flexDirection:'row',
        paddingLeft:Px2dp.getHeight(25),
        paddingTop:Px2dp.getHeight(10),
        borderWidth:0,
    }
});

