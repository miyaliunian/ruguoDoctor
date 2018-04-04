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
import CountDown from './CountDown'

import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import LoadingModal from '../../../Component/LoadingModal'
import NavigationBar from '../../../Component/NavigationBar'
import ScreenUtil from '../../../Common/screenUtil'
import {MoreMenu} from '../../../Common/MoreMenu'
export default class OrderPurchase extends Component {



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

    //新增服务页面
    newService(){
        DeviceEventEmitter.emit('toastInfo', '新增服务页面跳转', 'success');
    }
    //选择快递
    choiceExpress(){
        DeviceEventEmitter.emit('toastInfo', '选择快递页面跳转', 'success');
    }
    //选择优惠
    choiceDiscount(){
        DeviceEventEmitter.emit('toastInfo', '选择优惠页面跳转', 'success');
    }
    //选择地址
    choiceAddress(){
        let {navigation} = this.props;
        navigation.navigate(MoreMenu.Profile.Order.menu_order_address,{
            memberCode: '5eebe460bf2b458fb7a0a2101768599b',
            addressId:this.state.addressId,
            callBack: (obj) => this.editAddress(obj)})
    }
    //选择地址回掉函数
    editAddress(obj){
        this.setState({
            addressId:obj.id,
            personName:obj.personName,
            mobilePhone:obj.mobilePhone,
            address:obj.address,
            provinceName:obj.provinceName,
            cityName:obj.cityName,
        });
    }
    render() {
        return (
            <View style={[{}, this.state.keyboardShown && styles.bumpedContainer,GlobalStyles.root_container]}>

                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={'购买'}
                />
                <StatusBar barStyle='dark-content'
                           translucent={true}/>
                <ScrollView style={{flex: 1}}>
                    <TouchableOpacity onPress={() => this.choiceAddress()}>
                        <View style={{backgroundColor: "white", paddingRight: 15,
                            flexDirection:'row',height:Px2dp.getHeight(170)}}>
                            <View style={{alignItems:'center',justifyContent:'center',marginLeft:Px2dp.getWidth(30)}}>
                                <Image source={require('../../../Resource/Imags/address-icon.png')}
                                       style={{}}/>
                            </View>

                            <View style={{marginLeft:Px2dp.getWidth(30),}}>
                                <View style={{flexDirection: 'row', marginTop: Px2dp.getHeight(14)}}>
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
                                <View style={{flexDirection: 'row', marginTop: Px2dp.getHeight(2)}}>
                                    <Text numberOfLines={2} style={{lineHeight:Px2dp.getHeight(50),width:Px2dp.getWidth(567)}}>
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

                            <View style={{alignItems:'center',justifyContent:'center',marginLeft:Px2dp.getWidth(20)}}>
                                <Image source={require('../../../Resource/Imags/icon_arrow_gray.png')}
                                       style={{}}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center',}}>
                        <Image source={require('../../../Resource/Imags/address-colour-bar.png')}
                               style={{}}/>
                    </View>


                    <View style={{marginTop: Px2dp.getHeight(10), alignItems: 'center',}}>
                        {this.renderGoodsItem()}
                    </View>


                    <View style={{alignItems: 'center',backgroundColor:'rgb(255,255,255)',marginTop:Px2dp.getHeight(10),}}>
                        <Image source={require('../../../Resource/Imags/service-bean.png')}
                               style={{height:Px2dp.getHeight(32),marginTop:Px2dp.getHeight(10),}}/>
                        {this.renderServiceItem()}

                        <TouchableOpacity onPress={() => this.newService()}>
                            <View style={{padding: Px2dp.getHeight(20), alignItems: 'center',
                                flexDirection:'row',width: ScreenUtil.screenSize.width,justifyContent:'center'}}>
                                <Image source={require('../../../Resource/Imags/add-service.png')}
                                       style={{}}/>
                                <Text style={{marginLeft:Px2dp.getWidth(8),color:'#999999'}}>
                                    新增服务对象
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>




                    <View style={{alignItems: 'center',marginTop:Px2dp.getHeight(10),
                        backgroundColor:'rgb(255,255,255)',paddingBottom:Px2dp.getHeight(0)}}>

                        <TouchableOpacity onPress={() => this.choiceExpress()}>
                            <View style={styles.discountViewStyle}>
                                <View style={{flexDirection:'row',alignItems:'center',borderWidth:0,flex:1,}}>
                                    <Text style={{fontSize:15,color:'rgb(51,51,51)'}}>快递方式</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',borderWidth:0,}}>
                                    <Text style={{fontSize:15,color:'rgb(153,153,153)',}}>顺丰</Text>
                                </View>
                                <View style={{alignItems:'center',justifyContent:'center',}}>
                                    <Image source={require('../../../Resource/Imags/icon_arrow_gray.png')}
                                           style={{}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                        <TouchableOpacity onPress={() => this.choiceDiscount()}>
                            <View style={styles.discountViewStyle}>
                                <View style={{flexDirection:'row',alignItems:'center',borderWidth:0,flex:1,}}>
                                    <Text style={{fontSize:15,color:'rgb(51,51,51)'}}>优惠券</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center',borderWidth:0,}}>
                                    <Text style={{fontSize:15,color:'rgb(153,153,153)',}}>无</Text>
                                </View>
                                <View style={{alignItems:'center',justifyContent:'center',}}>
                                    <Image source={require('../../../Resource/Imags/icon_arrow_gray.png')}
                                           style={{}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.line}/>


                        <View style={styles.relaTextStyle}>
                            <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>商品合计</Text>
                            <Text style={{fontSize:15,color:'rgb(153,153,153)'}}>¥{this.state.goodTotalPrice}</Text>
                        </View>
                        <View style={styles.relaTextStyle}>
                            <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>运费</Text>
                            <Text style={{fontSize:15,color:'rgb(153,153,153)'}}>+¥{this.state.expressPrice}</Text>
                        </View>
                        <View style={styles.relaTextStyle}>
                            <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>优惠</Text>
                            <Text style={{fontSize:15,color:'rgb(153,153,153)'}}>-¥{this.state.couponAmount}</Text>
                        </View>
                        <View style={styles.line}/>
                        <View style={{backgroundColor:'rgb(255,255,255)',flexDirection:'row',height:Px2dp.getHeight(80),justifyContent:'space-between',}}>
                            <View style={{flexDirection:'row',paddingLeft:Px2dp.getHeight(25),alignItems:'center',borderWidth:0,flex:1,}}>
                                <TouchableOpacity onPress={() => this.isSMSService(this.state.SMSNotification)}>
                                    <Image source={this.state.SMSNotification ?
                                        require('../../../Resource/Imags/ic_group_selected.png')
                                        : require('../../../Resource/Imags/ic_group_unselect.png')}/>
                                </TouchableOpacity>
                                <Text style={{marginLeft:Px2dp.getWidth(20),fontSize:15,color:'rgb(153,153,153)'}}>短信通知</Text>
                            </View>
                        </View>

                    </View>



                    <View style={{ backgroundColor:'rgb(255,255,255)',
                        paddingBottom:Px2dp.getHeight(10),
                        marginTop: Px2dp.getHeight(10)}}>
                        <View style={{backgroundColor:'rgb(255,255,255)',flexDirection:'row',
                            height:Px2dp.getHeight(100),justifyContent:'space-between',}}>
                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',
                                paddingLeft:Px2dp.getHeight(25),borderWidth:0,}}>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',
                                padding:Px2dp.getHeight(25),alignItems:'center',borderWidth:0,}}>
                                <View style={{flexDirection:'row',justifyContent:'flex-end',padding:Px2dp.getHeight(25),alignItems:'center',borderWidth:0,}}>
                                    <Text style={{fontSize:15,color:'rgb(51,51,51)',}}>实付款:</Text>
                                    <Text style={{marginLeft:Px2dp.getWidth(20),color:'rgb(239,94,82)'}}>¥{this.state.ActualPayment}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.submitGoToPay()}>
                                    <View style={styles.ButtonStyle2}>
                                        <Text style={[styles.fontLabel1]}>去支付</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={{marginTop: Px2dp.getHeight(150), alignItems: 'center',}}>


                    </View>



                </ScrollView>


            </View>
        );
    }
    submitGoToPay(){
        let {state, navigate} = this.props.navigation;
        navigate(MoreMenu.Profile.pay.menu_pay,{title: '支付',ActualPayment:this.state.ActualPayment,go_back_key:state.params.go_back_key});

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
                                <Image style={styles.imageStyle} source={{uri: data.img}}/>
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
                                        <Text style={{fontSize:10}}>X</Text>{data.goodsUintNum}
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
    //填充服务对象list
    renderServiceItem(){
        let itemPricesArr = [];
        var serviceList = this.state.serviceList;
        if(serviceList!=''){
            for (let i = 0; i < serviceList.length; i++) {
                let data = serviceList[i];
                itemPricesArr.push(
                    <View key={i}>
                        <TouchableOpacity onPress={() => this.isServiceFlag(data.id)}>
                        <View style={[styles.cellContainer]}>
                            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                <Image style={styles.serviceimageStyle} source={{uri: data.img}}/>
                            </View>

                            <View style={{flexDirection: 'row',flex:1,
                                alignItems: 'center',}}>
                                <View style={{marginLeft: Px2dp.getWidth(30),
                                    height:Px2dp.getHeight(92),borderWidth:0,}}>
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
    isServiceFlag(id){
        var serviceList = this.state.serviceList;
        var newList = [];
        for (let i = 0; i < serviceList.length; i++) {
            let data = serviceList[i];
            if(data.id==id){
                data.isflag = true
            }else{
                data.isflag = false
            }
            newList.push(data);
        }
        DeviceEventEmitter.emit('toastInfo', '选择成功', 'success');
        this.setState({serviceList:newList});
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
    //选中默认地址
    isSMSService(isSelect){
        this.setState({SMSNotification: !isSelect})
    }
    constructor(props) {
        super(props);
        this.reproductiveModeMap = new Map([
        ]);
        this.state = {
            addressId:'1',//地址ID
            personName:'황 림',//收货地址姓名
            mobilePhone:'18623567845',//收货地址电话
            provinceName:'辽宁省',
            cityName:'沈阳市',
            address:'浑南新区奥体中心名流印象 2号楼 15-3',

            //购买的商品信息集合
            goodsList:[{id:'1',goodsUintNum:'2',goodsName:"牛板筋",goodsPrice:"299",goodsTitle:'黄老板独家秘制 小包装牛筋 麻辣味牛板筋125g/袋。',img:'http:////img10.360buyimg.com/n7/jfs/t16243/132/42795260/438474/affa3631/5a262cb7N67a23ebf.jpg'},
                {id:'2',goodsUintNum:'2',goodsName:"黄氏拌饭",goodsPrice:"99",goodsTitle:'황 씨 비빔밥, 백 년 정선, 최적 원료 제작, 맛있는 만만하다。',img:'http:////img12.360buyimg.com/n7/jfs/t3076/55/3503449239/312803/c5ba0686/57f4a1d2N88ec78ab.jpg'},
                {id:'3',goodsUintNum:'1',goodsName:"竹盐派缤",goodsPrice:"52",goodsTitle:'薄荷竹盐牙膏去渍美白 宋钟基代言。',img:'http://img10.360buyimg.com/n7/jfs/t2851/149/778914225/162231/3f124a57/5726e576N35254bfd.jpg'}],


            serviceList:[{id:'1',serviceName:"黄男",isflag : true,serviceSex:"男",serviceBirthday:'六个月',img:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=8232468,2916696848&fm=27&gp=0.jpg'},
                {id:'2',serviceName:"黄女",isflag : false,serviceSex:"女",serviceBirthday:'1年八个月',img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1018364764,1223529536&fm=27&gp=0.jpg'},
                {id:'3',serviceName:"黄博士",isflag : false,serviceSex:"博士",serviceBirthday:'不详',img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2924858960,2264534403&fm=27&gp=0.jpg'}],

            goodTotalPrice:'3999',//商品合计总价
            expressPrice:'12',//快递费用
            couponAmount:'1',//优惠金额
            SMSNotification:true,//短信通知
            ActualPayment:'4100',//实际付款


            SurplusTime:'30',//剩余时间

            isEnd : false,
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

    headerBarStyle:{
        backgroundColor: 'rgb(255,208,96)',height:Px2dp.getHeight(148),paddingTop:Px2dp.getHeight(54)
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
        width:ScreenUtil.screenSize.width-20,
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
        borderColor:'rgb(255,208,96)',
        backgroundColor:'rgb(255,208,96)',
        borderRadius: Px2dp.getHeight(12),
        marginTop:Px2dp.getHeight(10),
        marginLeft:Px2dp.getWidth(0),
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
    serviceimageStyle: {
        width: Px2dp.getWidth(80),
        height: Px2dp.getHeight(80),
    },
    titleStyle: {
        fontSize:17,color:'rgb(51,51,51)',
    },
    servicetitleStyle: {
        fontSize:16,color:'rgb(51,51,51)',
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
    servicesubtitleStyle: {
        marginTop:Px2dp.getHeight(0),
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
        paddingRight:Px2dp.getHeight(40),
        paddingLeft:Px2dp.getHeight(25),
        paddingTop:Px2dp.getHeight(10),
        paddingBottom:Px2dp.getHeight(10),
        justifyContent:'space-between',
    },
    timeTextStyle:{
        flexDirection:'row',
        paddingLeft:Px2dp.getHeight(25),
        paddingTop:Px2dp.getHeight(10),
        borderWidth:0,
    },
    discountViewStyle:{
        backgroundColor:'rgb(255,255,255)',
        flexDirection:'row',height:Px2dp.getHeight(80),
        justifyContent:'center',alignItems: 'center',
        width: ScreenUtil.screenSize.width,
        padding: Px2dp.getWidth(25),
    },
});

