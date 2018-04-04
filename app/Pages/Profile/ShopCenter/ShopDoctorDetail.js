/**
 * Created by wufei on 2017/12/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Platform,
    ScrollView,
    DeviceEventEmitter,
    PermissionsAndroid,
    StatusBar
} from 'react-native';
import ViewUtil from '../../../Common/viewUtil'
import GlobalStyles from '../../../Common/GlobalStyles'
import NavigationBar from '../../../Component/NavigationBar'
import DataRepository from '../../../Expand/Dao/DataRepository'
import Px2dp from '../../../Common/px2dp'
import ScreenUtil from '../../../Common/screenUtil'
import HTMLView from 'react-native-htmlview'
import {Carousel} from 'teaset'
import {MoreMenu} from '../../../Common/MoreMenu'
import {Config} from '../../../Expand/Dao/Config'
const URL = Config.BASE_URL+ Config.API_SHOP_CENTER_DOCTOR_DETAIL;
import SelectDoctorMobxStore from './SelectDoctorMobxStore'
import {observer} from 'mobx-react/native';
import {observable, action, computed, autorun} from 'mobx';
@observer
export default class ShopDoctorDetail extends Component {

    constructor(props) {
        super(props);
        this.navigation=this.props.navigation;
        this.state = {
            images: '',  //轮播图
            productId:'',
            productName:'',
            productPrice:'',
            productDesc:'',
            productPriceDecimal:'',
            goodsValidityNum:'',
            goodsValidityUnit:'',
            carouseIndex:'',
            carouseTotal:'',
            doctorIcon:require('../../../Resource/Imags/ic_select_doctor.png'),
            doctorId:''
        }
        this.dataRepository = new DataRepository();
        this.mobxStore = new SelectDoctorMobxStore();
    }

    componentDidMount() {
        this.fetchData();
    };
    fetchData() {
        let productId = this.props.navigation.state.params.id;
        this.dataRepository.postJsonRepository(URL, {"id":productId})
            .then((data) => {
                if (data) {
                    this.setState({
                        images: data.moGoodsPicList,
                        productPrice:data.productPrice,
                        productPriceDecimal:data.productPriceDecimal,
                        goodsValidityNum:data.goodsValidityNum,
                        goodsValidityUnit:data.goodsValidityUnit,
                        productName:data.goodsName,
                        productDesc:data.goodsDetailsMobile,
                        carouseTotal:data.moGoodsPicList.length,
                        carouseIndex:data.moGoodsPicList.length
                    })
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err, 'sad')
            })
    }
    renderCarousel() {
        let itemImagesArr = []
        var sectionImagesItem = this.state.images
        if (sectionImagesItem != '') {
            sectionImagesItem.map((cell) => {
                console.log(cell)

            })
        }
        if (sectionImagesItem != '') {
            for (let i = 0; i < sectionImagesItem.length; i++) {
                let data = sectionImagesItem[i];
                itemImagesArr.push(<Image
                    style={{width: ScreenUtil.screenSize.width, height: Px2dp.getHeight(500)}}
                    source={{uri: data.goodsPicUrl}}
                    key={i}
                />)
            }
        }
        return itemImagesArr;
    }
    navigatePressLeft = () => {
        this.props.navigation.goBack();
    }
    navigatePressRight=()=>{
        this.props.navigation.navigate(MoreMenu.Profile.menu_customer_service,{});
    }

    _returnProductPric(){
        if(this.state.productPriceDecimal==undefined){
            return( <Text style={styles.priceContainStyle}>
                <Text style={styles.priceStyle1}>
                    ¥
                </Text>
                <Text style={styles.priceStyle}>
                    {this.state.productPrice}
                </Text>
            </Text>);
        }else{
            return( <Text style={styles.priceContainStyle}>
                <Text style={styles.priceStyle1}>
                    ¥
                </Text>
                <Text style={styles.priceStyle}>
                    {this.state.productPrice}
                </Text>
                <Text style={styles.priceStyle1}>
                    .
                </Text>
                <Text style={styles.priceStyle1}>
                    {this.state.productPriceDecimal}
                </Text>
                    /{this.state.goodsValidityNum}{this.state.goodsValidityUnit}
            </Text>

            );
        }
    }
    _selectDoctor(){
        let {navigation} = this.props
        // navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_detail, {id: id})
        navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_select_list, {title: "选择医生",
            callBack: (obj) => this.selectedDidHandler(obj)})
    }
    selectedDidHandler(obj){

        if(obj.selectItem !=''){
            this.mobxStore.DoctorInfo = obj.selectItem;
          //  this.changeDoctorInfo()
        }
    }
    _purseFun(){
        let {state,navigate}=this.props.navigation
        navigate(MoreMenu.Profile.Order.menu_order_purchase,{go_back_key: state.key});
    }
    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,255,255)'}}
                    style={{backgroundColor: 'rgb(255,255,255)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    rightButton={
                        <TouchableOpacity onPress={()=>this.navigatePressRight()}>
                            <View style={{margin: 10}}>
                                <Image
                                    style={{width: Px2dp.getWidth(44), height: Px2dp.getHeight(44), marginLeft: Px2dp.getWidth(30)}}
                                    source={require('../../../Resource/Imags/ic_title_chat.png')}
                                    resizeMethod='scale'
                                />
                            </View>
                        </TouchableOpacity>
                    }
                    title={'商品详情页'}/>
                <StatusBar barStyle='dark-content'
                           translucent={true}/>
                <ScrollView>
                    <View style={[styles.imageViewStyle]} >
                        <Carousel ref='_carousel' style={{height: Px2dp.getHeight(500), width: ScreenUtil.screenSize.width}}
                                  onChange={(index, total)=>{
                                      this.setState({
                                          carouseIndex:index+1
                                      });
                                  }}>

                            {this.renderCarousel()}
                        </Carousel>
                        <View style={styles.pageNumStyle}>
                            <Text>{this.state.carouseIndex}\{this.state.carouseTotal}</Text>
                        </View>
                        <Text style={styles.TitleStyle}>{this.state.productName}</Text>
                        {/*{this._returnProductPric()}*/}
                    </View>

                    <View style={styles.imageViewStyle}>
                        <View style={styles.descImageViewStyle} >
                            <TouchableOpacity  onPress={()=>this._selectDoctor()}>
                                <Image style={{width: 40, height: 40,borderRadius:20}} resizeMode={'stretch'} source={this.mobxStore.DoctorInfo==''?this.state.doctorIcon:{uri:this.mobxStore.DoctorInfo.iconUrl}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize:17,marginLeft:5,color:'black'}}>点击选择医生</Text>
                        </View>
                    </View>

                    <View style={styles.imageViewStyle}>
                        <View style={styles.descImageViewStyle}>
                            <Text style={{fontSize:17,marginLeft:5,color:'black'}}>服务内容</Text>
                        </View>
                        <View>
                            <HTMLView value={this.state.productDesc} style={{margin:Px2dp.getWidth(20)}}/>
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

                    <View style={styles.imageViewStyle}>
                        <TouchableOpacity onPress={()=>this._purseFun()}>
                            <View style={{
                                height: Px2dp.getHeight(100),
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgb(255,208,96)'
                            }}>
                                <Text style={{fontSize: 16}}>购买服务</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView >
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(153,153,153)",
    },
    TitleStyle: {
        marginTop:Px2dp.getHeight(20),
        fontSize: 18,
        color: 'rgb(153,153,153)',
        marginLeft:Px2dp.getWidth(30)
    },
    priceContainStyle: {
        flexDirection:'row',
        alignItems:'flex-end',
        marginTop:Px2dp.getHeight(20),
        paddingBottom:Px2dp.getHeight(20),
        marginLeft:Px2dp.getWidth(30),

    },
    priceStyle: {
        fontSize: 17,
        color: 'rgb(239,94,82)',
    },
    priceStyle1: {
        fontSize: 10,
        color: 'rgb(239,94,82)',
    },
    imageViewStyle:{
        flex:1,
        backgroundColor:"#FFFFFF",
        marginTop:Px2dp.getHeight(20)
    },
    descImageViewStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#FFFFFF",
        padding:Px2dp.getHeight(20),
        borderBottomWidth:0.5,
        borderBottomColor:'rgb(244,244,244)',
    },
    groupStyle:{
        alignItems:'center',
        marginLeft:Px2dp.getHeight(40),
        marginRight:Px2dp.getHeight(36)
    },
    hideStyle:{
        display:'none',
    },
    line: {
        height: 1,
        backgroundColor: 'rgb(244,244,244)',
        marginLeft: Px2dp.getWidth(30),
        width: ScreenUtil.screenSize.width,
    },
    pageNumStyle:{
        width:Px2dp.getHeight(60),
        height:Px2dp.getHeight(60),
        borderRadius:Px2dp.getWidth(60),
        position:'absolute',
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent: 'center',
        right:Px2dp.getWidth(30),
        top:Px2dp.getHeight(400),
        opacity:0.8
    }
});

