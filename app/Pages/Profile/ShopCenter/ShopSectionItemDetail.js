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
const URL = Config.BASE_URL+ Config.API_SHOP_CENTER_DETAIL;
//const URL="http://rap2api.taobao.org/app/mock/1604/POST/shopCenter/shopDetail";
const htmlContent = `是上市搜索的附近时打开附件圣诞快乐附件说了冯老师登录是老地方是上市搜索的附近时打开附件圣诞快乐附件说了冯老师登录是老地方是上市搜索的附近时打开附件圣诞快乐附件说了冯老师登录是老地方是上市搜索的附近时打开附件圣诞快乐附件说了冯老师登录是老地方是上市搜索的附近时打开附件圣诞快乐附件说了冯老师登录是老地方是上市搜索的附近时打开附件圣诞快乐附件说了冯老师登录是老地方是上市搜索的附近时打开附件圣诞快乐附件说了冯老师登录是老地方是&lt;/p&gt;`;


export default class ShopSectionItemDetail extends Component {

    constructor(props) {
        super(props);
        this.navigation=this.props.navigation;
        this.state = {
            images: '',  //轮播图
            isSelected:1,
            productId:'',
            productName:'',
            productPrice:'',
            productDesc:'',
            productPriceDecimal:'',
            recommendId:'',
            recommendProducts:[{thumb:'http://dummyimage.com/140x140/00405d/FFF&text=Jessica',name:''},{thumb:'http://dummyimage.com/140x140/00405d/FFF&text=Jessica',name:''}],
            recommendPrice:'',
            recommendPriceDecimal:'',
            recommendSale:'',
            recommendSaleDecimal:'',
            carouseIndex:'',
            carouseTotal:''
        };
        this.dataRepository = new DataRepository();
    }

    componentDidMount() {

        this.fetchData();
    };
    fetchData() {
        let productId = this.props.navigation.state.params.id;
        this.dataRepository.postJsonRepository(URL, {"id":productId})
            .then((data) => {
             //   alert(data.recommendPrice);
                if (data) {
                    this.setState({
                        images: data.moGoodsPicList,
                        productPrice:data.moGoodsPriceList[0].goodsPrice,
                        productPriceDecimal:data.productPriceDecimal,
                        productName:data.goodsName,
                        productDesc:data.goodsDetailsMobile,
                        recommendPrice:data.recommendPrice==undefined? '5000':data.recommendPrice,
                        recommendProducts:data.recommendProducts==undefined? this.state.recommendProducts:data.recommendProducts,
                        recommendPriceDecimal:data.recommendPriceDecimal==undefined? '00':data.recommendPriceDecimal,
                        recommendSale:data.recommendSale==undefined? '5000':data.recommendSale,
                        recommendSaleDecimal:data.recommendSaleDecimal==undefined? '00':data.recommendSaleDecimal,
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
        let itemImagesArr = [];
        var sectionImagesItem = this.state.images;
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

    selectPress(){
        if(this.state.isSelected==1){
            this.setState({
                isSelected:0
            });
        }else{
            this.setState({
                isSelected:1
            });
        }
    }
    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };
    navigatePressRight=()=>{
        this.props.navigation.navigate(MoreMenu.Profile.menu_customer_service,{});
    };

    _returnProductPric(){
            if(this.state.productPriceDecimal==''){
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
                </Text>);
            }
    }

    _returnRecommendPrice(){
        console.log(this.state.recommendProducts);
        if(this.state.recommendPriceDecimal==''){
            return(<Text style={{marginLeft:Px2dp.getWidth(30)}}>
                <Text style={{fontSize:17,marginLeft:Px2dp.getWidth(30)}}>组合推荐：¥ {this.state.recommendPrice}</Text>

            </Text>);
        }else{
            return(
                <Text style={{marginLeft:Px2dp.getWidth(30)}}>
                    <Text style={{fontSize:17,marginLeft:Px2dp.getWidth(30)}}>组合推荐：¥ {this.state.recommendPrice}</Text>
                    <Text style={{fontSize:10,color:'rgb(153,153,153)'}}>
                        .
                    </Text>
                    <Text style={{fontSize:10,color:'rgb(153,153,153)'}}>
                        {this.state.recommendPriceDecimal}
                    </Text>
                </Text>
            );
        }
    }
    _returnRecommendSale(){
        if(this.state.recommendSale==''){

        }else{
            if(this.state.recommendSaleDecimal==''){
                return(
                    <Text style={[styles.priceContainStyle,{borderColor:'rgb(239,94,82)',borderWidth:0.5,padding:Px2dp.getWidth(15),borderRadius:5}]}>
                        <Text style={styles.priceStyle}>
                            立减：¥{this.state.recommendSale}
                        </Text>
                    </Text>
                );
            }else{
                return(
                    <Text style={[styles.priceContainStyle,{borderColor:'rgb(239,94,82)',borderWidth:0.5,padding:Px2dp.getWidth(15),borderRadius:5}]}>
                        <Text style={styles.priceStyle}>
                            立减：¥{this.state.recommendSale}
                        </Text>
                        <Text style={styles.priceStyle1}>
                            .
                        </Text>
                        <Text style={styles.priceStyle1}>
                            {this.state.recommendSaleDecimal}
                        </Text>
                    </Text>
                );
            }
        }
    }
    _purseFun(){
        let {state,navigate}=this.props.navigation;
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
                        {this._returnProductPric()}
                    </View>
                    <View style={styles.imageViewStyle}>
                        <View style={styles.descImageViewStyle}>
                            <Image source={require('../../../Resource/Imags/ic_product_dec.png')}/>
                            <Text style={{fontSize:17,marginLeft:5,color:'black'}}>商品详情</Text>
                        </View>
                        <View>
                            <HTMLView value={this.state.productDesc} style={{margin:Px2dp.getWidth(20)}}/>
                        </View>
                    </View>

                    <View style={styles.imageViewStyle}>
                        <View style={styles.descImageViewStyle}>
                            <Image source={require('../../../Resource/Imags/ic_buyer_tips.png')}/>
                            <Text style={{fontSize:17,marginLeft:5,color:'black'}}>购买须知</Text>
                        </View>
                        <View style={{height:Px2dp.getHeight(140)}}>
                            <Text style={{fontSize:14,margin:Px2dp.getWidth(20)}}>收到订单后，客服会第一时间安排发货，正常情况下发货后3-5天内送达（地区远近不同，到达天数不同）。</Text>
                        </View>
                    </View>

                    <View style={this.state.recommendProducts==''?styles.hideStyle:styles.imageViewStyle}>
                        <View style={styles.descImageViewStyle}>
                            <Image source={require('../../../Resource/Imags/ic_tuijian.png')}/>
                            <Text style={{fontSize:17,marginLeft:5,color:'black'}}>推荐搭配</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            {this._returnRecommendPrice()}
                            {this._returnRecommendSale()}
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',margin:Px2dp.getHeight(20)}}>
                            <TouchableOpacity onPress={() => this.selectPress()}>
                                <Image source={this.state.isSelected==1 ?
                                    require('../../../Resource/Imags/ic_group_selected.png')
                                    : require('../../../Resource/Imags/ic_group_unselect.png')}/>
                            </TouchableOpacity>
                            <View style={styles.groupStyle}>
                                <Image style={{borderWidth:0.5,borderColor:'rgb(153,153,153)',width:80,height:120}} source={{uri:this.state.recommendProducts==''?'':this.state.recommendProducts[0].thumb}}/>
                                <Text>{this.state.recommendProducts==''?'':this.state.recommendProducts[0].name}</Text>
                            </View>

                            <Image source={require('../../../Resource/Imags/ic_plus.png')}/>

                            <View style={styles.groupStyle}>
                                <Image style={{borderWidth:0.5,borderColor:'rgb(153,153,153)',width:80,height:120}} source={{uri:this.state.recommendProducts==''?'':this.state.recommendProducts[1].thumb}}/>
                                <Text>{this.state.recommendProducts==''?'':this.state.recommendProducts[1].name}</Text>
                            </View>

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
                                <Text style={{fontSize: 16}}>购买</Text>
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
        alignItems:'center',
        backgroundColor:"#FFFFFF",
        padding:Px2dp.getHeight(20),
        borderBottomWidth:0.5,
        borderBottomColor:'rgb(153,153,153)',
    },
    groupStyle:{
        alignItems:'center',
        marginLeft:Px2dp.getHeight(40),
        marginRight:Px2dp.getHeight(36)
    },
    hideStyle:{
        display:'none',
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

