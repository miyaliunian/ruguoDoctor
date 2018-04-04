/**
 * Created by wufei on 2017/12/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    DeviceEventEmitter,
    FlatList,
    StatusBar
} from 'react-native';
import ShopDoctorListStore from './ShopDoctorListStore'
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
import GlobalStyles from '../../../Common/GlobalStyles'
import {MoreMenu} from '../../../Common/MoreMenu'
import NavigationBar from '../../../Component/NavigationBar'
import DataRepository from '../../../Expand/Dao/DataRepository'
import DoctorListSectionDetail from './DoctorListSectionDetail'
import SelectItemCommon from './SelectItemCommon';
import {Config} from '../../../Expand/Dao/Config'

//const URL ="http://rap2api.taobao.org/app/mock/1604/POST/shopCenter/doctorList"
const URL =Config.BASE_URL+Config.API_SHOP_CENTER_SERVICELIST;
const SELECTURL = Config.BASE_URL+Config.API_SHOP_CENTER_DOCTOR_SUBCLASS;
//const SELECTURL ="http://rap2api.taobao.org/app/mock/1604/POST/shopCenter/doctorType"
const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 5,//每页显示数
    DATA_LIST: [], //数据装载
    NEXT_PAGE: 1, //用于翻页
    TOTAL: 0  //总数据条数
};
export default class ShopDoctorList extends Component {

    constructor(props) {
        super(props);
        this.targetUrl = this.props.navigation.state.params.targetUrl;
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
        this.state = {
            data: '',
            isLoadingTail: false,//标识数据是否加载中
            selectedItem:'全部',
            modalVisible: false,
            arrowD:require('../../../Resource/Imags/ic_down_arrow.png')
        };
        this.items=null;
        this.listData=new ShopDoctorListStore();
    }
    setModalVisible(visible) {
    if(this.state.modalVisible){
        this.setState({modalVisible: false,arrowD:require("../../../Resource/Imags/ic_down_arrow.png")});
    }else{
        this.setState({modalVisible: visible,arrowD:require("../../../Resource/Imags/ic_up_arrow.png")});
    }

    }
    componentDidMount() {
       this.fetchSelectItemData();
        this.fetchData(1);
    };

    componentWillUnmount(){
        this.clean();
    }
    hasMore() {
        return CACHE_RESULTS.DATA_LIST.length !== CACHE_RESULTS.TOTAL
    }

    clean(){
        CACHE_RESULTS.current= 1;//当前页
        CACHE_RESULTS.rowCount= 5;//每页显示数
        CACHE_RESULTS.DATA_LIST=[];
        CACHE_RESULTS.NEXT_PAGE=1;
        CACHE_RESULTS.TOTAL=0
    }
    navigatePressLeft = () => {
        if (this.state.modalVisible){
            this.setState({modalVisible: !this.state.modalVisible,arrowD:require("../../../Resource/Imags/ic_down_arrow.png")});
        }
        this.props.navigation.goBack();
    };
    fetchSelectItemData() {
        this.dataRepository.postJsonRepository(SELECTURL, {"parentClassCode":this.targetUrl})
            .then((data) => {
                console.log(data);
                if (data) {
                    this.items= data;
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err, 'sad')
            })
    }
    fetchData(PAGE) {
        // 请求数据时显示菊花
        this.setState({
            isLoadingTail: true,
        });
        this.dataRepository.postJsonRepository(URL, {
            accessToken: 'abcdef',
            goodsClassCode:this.targetUrl,
            current: PAGE,//当前页
            rowCount: CACHE_RESULTS.rowCount,//每页显示数
        }) .then((data) => {
            console.log(data);
                if (data.rows) {
                    let ITEMS = CACHE_RESULTS.DATA_LIST.slice();
                    ITEMS = ITEMS.concat(data.rows);
                    CACHE_RESULTS.DATA_LIST = ITEMS;
                    CACHE_RESULTS.NEXT_PAGE += 1;
                    CACHE_RESULTS.TOTAL = data.total;
                    this.setState({
                        data: CACHE_RESULTS.DATA_LIST,
                        isLoadingTail: false, //数据请求成功后隐藏菊花
                    });
                    this.isLoadingMore = false;
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
                this.setState({
                    isLoadingTail: false,//数据请求失败后隐藏菊花
                });
                this.isLoadingMore = false;
            })
    }




    fetchMoreData() {
        if (this.isLoadingMore) {
            return;
        }
        if (! this.hasMore() || this.state.isLoadingTail) {
            return
        }

        this.isLoadingMore = true;

        let NEXTPAGE = CACHE_RESULTS.NEXT_PAGE;
        this.fetchData(NEXTPAGE)
    }

    onReshing(){

    }

    onClick(id) {
        let {navigation} = this.props;
        // navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_detail, {id: id})
        navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_detail, {id: id})
    }

    renderItem(item) {
        return <DoctorListSectionDetail image={item.item.goodsIcon} title={item.item.goodsName} subtitle={item.item.goodsTitle}
                              price={item.item.goodsPrice}serviceTime={item.item.goodsValidityNum} serviceUnit={item.item.goodsValidityUnit} callback={() => this.onClick(item.item.id)}/>
    }

    separatorView = () => {
        return <View style={GlobalStyles.line}/>;
    };

    renderFooter() {
        if (!this.hasMore() && CACHE_RESULTS.TOTAL !== 0) {
            return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 14}}>~~已经到底啦~~</Text>
                </View>
            )
        }

        if (!this.state.isLoadingTail) {
            return <View/>
        }

        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: Px2dp.getHeight(20)
            }}>
                <ActivityIndicator animating={true} size='small'/>
                <Text style={{fontSize: 14, marginLeft: Px2dp.getWidth(10)}}>数据加载中</Text>
            </View>
        )
    }

    _returnSelectedItem(){
        let items=[];
        for (let i=0;i<this.items.length;i++){
            let item=this.items[i];
            items.push(<TouchableOpacity key={i} activeOpacity={0.8} onPress={() =>this.queryData(item)}>
                <View style={{backgroundColor:'#fff',padding:Px2dp.getHeight(30)}}><Text>{item}</Text></View>

            </TouchableOpacity>);
        }

        return items;
    }
    queryData(goodsClassCode,goodsClassName) {
        this.setState({
            selectedItem : goodsClassName
        });
        this.targetUrl = goodsClassCode;
        this.clean();
        this.fetchData(1);
        this.setModalVisible(!this.state.modalVisible);
    }
    render() {
        let {title} = this.props.navigation.state.params;
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(51,51,51)'}}
                    style={{backgroundColor: 'rgb(255,255,255)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={title}/>

                <View style={{height:Px2dp.getHeight(80),backgroundColor:'#fdd060',flexDirection:'row',alignItems:'center'}}>
                    <Text style={{borderRightWidth:0.5,borderRightColor:'black',paddingRight:20,paddingLeft:20}}>服务类别</Text>

                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() => {
                        this.setModalVisible(true)}}>
                        <Text style={{marginLeft:Px2dp.getWidth(20),width:Px2dp.getWidth(300)}}>{this.state.selectedItem}</Text>
                        <Image style={{marginLeft:Px2dp.getWidth(20)}} source={this.state.arrowD}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={(item) => this.renderItem(item)}
                    ItemSeparatorComponent={ this.separatorView }
                    keyExtractor={(item, index) => index}
                    initialNumToRender={6}
                    onRefresh={() => this.onReshing()}
                    refreshing={this.state.isLoadingTail}
                    onEndReachedThreshold={0.1}
                    onEndReached={(info) => this.fetchMoreData(info)}
                    ListFooterComponent={() => this.renderFooter()}
                />
                <Modal
                    pointerEvents={'box-none'}
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({modalVisible: !this.state.modalVisible,arrowD:require("../../../Resource/Imags/ic_down_arrow.png")});}}
                >
                    <SelectItemCommon
                        removeModal={(data) => {
                            this.setState({modalVisible: !this.state.modalVisible,arrowD:require("../../../Resource/Imags/ic_down_arrow.png")});}}
                        data={this.items}
                        queryData={(goodsClassCode,goodsClassName) => this.queryData(goodsClassCode,goodsClassName)}/>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    refreshControlStyle: {},
    blackStyle : {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
    },
 shadowStyle : {
    shadowColor: '#777',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
}
});

