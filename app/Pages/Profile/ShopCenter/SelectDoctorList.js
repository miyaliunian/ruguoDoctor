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
import {observer} from 'mobx-react/native';
import {action, autorun} from 'mobx';

import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
import GlobalStyles from '../../../Common/GlobalStyles'
import NavigationBar from '../../../Component/NavigationBar'
import DataRepository from '../../../Expand/Dao/DataRepository'
let DoctorItem = require('./SelectDoctorItem.json');
import {Config} from '../../../Expand/Dao/Config'
import SelectDoctorItemDetail from './SelectDoctorItemDetail'
import DoctorListStore from "./SelectDoctorListStore";

//const URL ="http://rap2api.taobao.org/app/mock/1604/POST/shopCenter/doctorList"
const URL =Config.BASE_URL+Config.API_DOCTORINFO_LIST;
const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 5,//每页显示数
    DATA_LIST: [], //数据装载
    NEXT_PAGE: 1, //用于翻页
    TOTAL: 0  //总数据条数
}
@observer
export default class SelectDoctorList extends Component {

    constructor(props) {
        super(props)
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
        this.state = {
            data: '',
            isLoadingTail: false,//标识数据是否加载中
        }
        this.data = new DoctorListStore();
    }

    componentDidMount() {
        this.fetchData(1);
    };

    componentWillUnmount(){
        this.clean();
    }
    @action
    hasMore() {
        this.data.hasMore()
    }

    @action
    clean(){
        // CACHE_RESULTS.current= 1;//当前页
        // CACHE_RESULTS.rowCount= 5;//每页显示数
        // CACHE_RESULTS.DATA_LIST=[];
        // CACHE_RESULTS.NEXT_PAGE=1;
        // CACHE_RESULTS.TOTAL=0
        this.data.clean()
    }
    navigatePressLeft = () => {
        this.props.navigation.goBack();
    }
    navigatePressRight = () => {
       // alert(JSON.stringify(this.data.selectItem));
        const {state, goBack} = this.props.navigation;
        state.params.callBack({selectItem: this.data.selectItem});
        goBack();
    }

    fetchData(PAGE) {
        // 请求数据时显示菊花
        this.setState({
            isLoadingTail: true,
        });
        this.dataRepository.postJsonRepository(URL, {
            current: PAGE,//当前页
            rowCount: this.data.CACHE_RESULTS.rowCount,//每页显示数
        }) .then((data) => {
          // alert(JSON.stringify(data))
                if (data) {
                    if(data.total>0){
                        this.data.addDataToList(data.rows)
                    }
                    // let ITEMS = CACHE_RESULTS.DATA_LIST.slice()
                    // ITEMS = ITEMS.concat(DoctorItem.datas)
                    // CACHE_RESULTS.DATA_LIST = ITEMS
                    // CACHE_RESULTS.NEXT_PAGE += 1
                    // CACHE_RESULTS.TOTAL = 5
                   // CACHE_RESULTS.TOTAL = data.total
                    this.setState({
                     //   data: CACHE_RESULTS.DATA_LIST,
                        isLoadingTail: false, //数据请求成功后隐藏菊花
                    });
                    this.isLoadingMore = false;
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err.status, 'sad')
                this.setState({
                    isLoadingTail: false,//数据请求失败后隐藏菊花
                });
                this.isLoadingMore = false;
            })
    }




    @action
    fetchMoreData() {
        if (this.isLoadingMore) {
            return;
        }
        if (!this.hasMore() || this.state.isLoadingTail) {
            return
        }

        this.isLoadingMore = true;

        let NEXTPAGE = this.data.CACHE_RESULTS.NEXT_PAGE
        this.fetchData(NEXTPAGE)
    }

    onReshing(){

    }

    onClick(item) {
        item.isSelect = "false"
        //let {navigation} = this.props
        // navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_detail, {id: id})
        //navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_detail, {id: id})
    }

    renderItem(item) {
        return <SelectDoctorItemDetail itemData={item.item}data={this.data}/>
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

    render() {
        let {title} = this.props.navigation.state.params;
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    rightButton={
                        <TouchableOpacity onPress={()=>this.navigatePressRight()}>
                            <View style={{margin: 10}}>
                                <Text>确认</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    title={title}/>
                <FlatList
                    data={this.data.CACHE_RESULTS.DATA_LIST}
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

