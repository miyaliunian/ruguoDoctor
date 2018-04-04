/**
 * Created by wufei on 2017/12/8.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    DeviceEventEmitter,
    FlatList,
    StatusBar
} from 'react-native';
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
import GlobalStyles from '../../../Common/GlobalStyles'
import {MoreMenu} from '../../../Common/MoreMenu'
import NavigationBar from '../../../Component/NavigationBar'
import DataRepository from '../../../Expand/Dao/DataRepository'
import SectionDetail from './SectionDetail'
import {Config} from '../../../Expand/Dao/Config'
const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 5,//每页显示数
    DATA_LIST: [], //数据装载
    NEXT_PAGE: 1, //用于翻页
    TOTAL: 0  //总数据条数
};
export default class ShopSctionDetail extends PureComponent {

    constructor(props) {
        super(props);
        this.targetUrl = this.props.navigation.state.params.targetUrl;
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
        this.state = {
            data: '',
            isLoadingTail: false//标识数据是否加载中
        }
    }

    componentDidMount() {
        this.fetchData(1)

    };

    componentWillUnmount(){
        this.clean()
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    fetchData(PAGE) {
        let shopType = this.props.navigation.state.params.targetUrl;
        // 请求数据时显示菊花
        this.setState({
            isLoadingTail: true,
        });
        let uri =Config.BASE_URL+ Config.API_SHOP_CENTER_SHOPLIST;
        this.dataRepository.postJsonRepository(uri, {
            accessToken: 'abcdef',
            goodsType:shopType,
            current: PAGE,//当前页
            rowCount: CACHE_RESULTS.rowCount,//每页显示数
        })
            .then((data) => {
                if (data) {
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

    hasMore() {
        return CACHE_RESULTS.DATA_LIST.length !== CACHE_RESULTS.TOTAL
    }


    fetchMoreData(info) {
        if (this.isLoadingMore) {
            return;
        }

        if (!this.hasMore() || this.state.isLoadingTail) {
            return
        }

        this.isLoadingMore = true;
        let NEXTPAGE = CACHE_RESULTS.NEXT_PAGE;
        this.fetchData(NEXTPAGE)
    }

    clean(){
        CACHE_RESULTS.current= 1;//当前页
        CACHE_RESULTS.rowCount= 5;//每页显示数
        CACHE_RESULTS.DATA_LIST=[];
        CACHE_RESULTS.NEXT_PAGE=1;
        CACHE_RESULTS.TOTAL=0
    }

    onClick(id,goodsType) {
        let {navigation} = this.props;
        // navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_detail, {id: id})
        if(goodsType=='2'){
            navigation.navigate(MoreMenu.Profile.Shop.menu_shop_doctor_detail,{id:id})
        }else{
            navigation.navigate(MoreMenu.Profile.Shop.menu_shop_item_detail, {id: id})
        }
    }

    renderItem(item) {
        return <SectionDetail image={item.item.goodsIcon} title={item.item.goodsName} subtitle={item.item.goodsTitle}
                              price={item.item.moGoodsPriceList[0].goodsPrice} callback={() => this.onClick(item.item.id,item.item.goodsClassCode)}/>
    }

    separatorView = () => {
        return <View style={GlobalStyles.line}/>;
    };


    onReshing() {
    }

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
                    statusBar={{backgroundColor: 'rgb(255,255,255)'}}
                    style={{backgroundColor: 'rgb(255,255,255)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={title}/>
                <StatusBar barStyle='dark-content'
                           translucent={true}/>
                <View style={GlobalStyles.line_space_13}/>
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
            </View>
        );
    }
}
const styles = StyleSheet.create({
    refreshControlStyle: {}
});

