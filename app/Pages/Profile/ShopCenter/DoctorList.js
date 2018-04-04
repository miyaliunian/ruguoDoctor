/**
 * Created by wufei on 2017/12/29.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';
import ViewUtil from '../../../Common/viewUtil'
import {MoreMenu} from '../../../Common/MoreMenu'
import Px2dp from '../../../Common/px2dp'
import GlobalStyles from '../../../Common/GlobalStyles'
import ScreenUtil from '../../../Common/screenUtil'
import NavigationBar from '../../../Component/NavigationBar'
import DataRepository from '../../../Expand/Dao/DataRepository'
import DoctorListCell from './DoctorListCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
let DoctorItem = require('./SelectDoctorItem.json');
const CACHE_RESULTS = {
    DATA_LIST: [], //数据装载
    NEXT_PAGE: 1, //用于翻页
    TOTAL: 0  //总数据条数
};
export default class DoctorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipTabs: '',//数据列表
        };
        this.dataRepository = new DataRepository();
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        let url = 'http://rap2api.taobao.org/app/mock/2902/POST/api/tiptabs';
        this.dataRepository.postJsonRepository(url)
            .then((response) => {
                if (response.success) {
                    this.setState({
                        tipTabs: response.datas, //数据列表
                    })
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
            })
            .done()
    }


    render() {
        let content = this.state.tipTabs.length > 0 ?
            <ScrollableTabView
                tabBarUnderlineStyle={{backgroundColor: 'rgb(255,208,96)', height: 2}}
                tabBarTextStyle={{fontSize: Px2dp.getHeight(32), marginTop: Px2dp.getHeight(20)}}
                tabBarInactiveTextColor="rgb(196,196,196)"
                tabBarActiveTextColor="rgb(51,51,51)"
                ref="scrollableTabView"
                renderTabBar={() => <ScrollableTabBar style={{height: 40,borderWidth: 0,}}
                                                      tabStyle={{height: 39}}/>}
            >
                {this.state.tipTabs.map((reuslt, i, arr)=> {
                    let item = arr[i];
                    return  <DoctorListTabs key={i} tabLabel={item.title} {...this.props}/>
                })}
            </ScrollableTabView> : null;

        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor: 'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'医生列表'}/>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{margin:Px2dp.getWidth(16)}}>
                        <Image style={{width:Px2dp.getWidth(160),height:Px2dp.getHeight(160),borderRadius:Px2dp.getWidth(75)}}  source={require('../../../Resource/Imags/huanglin.png')}/>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:Px2dp.getWidth(40),marginRight:Px2dp.getWidth(30),color:'black'}}>黄****</Text>
                            <Text style={{color:'black'}}>副主任医师</Text>
                        </View>
                        <Text style={{marginTop:15}}>国际软件园医院</Text>
                    </View>
                    <Image style={{
                        position:'absolute',
                        right: Px2dp.getWidth(30),
                    }} source={require('../../../Resource/Imags/icon_arrow_black.png')}/>
                </View>
                <View style={{flexDirection:'row',borderTopWidth:1,borderTopColor:'#c4c4c4',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{margin:Px2dp.getWidth(16)}}>服务结束日期：2018-01-20</Text>
                    <TouchableOpacity>
                        <View style={styles.ButtonSelected}>
                            <Text style={{fontSize:15}}>续费</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[GlobalStyles.line_space_10,{backgroundColor:'#D4D4D4'}]}/>
                {content}
            </View>
        );
    }
}

// 每个Tab页面
class DoctorListTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBanner: '',//数据列表头部Banner
            data: '',//数据列表
            isLoadingTail: false//标识数据是否加载中
        };
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
    }

    componentDidMount() {
        this.fetchData(1)
    }

    componentWillUnmount() {

    }

    fetchData(PAGE) {
        this.setState({
            isLoadingTail: true//数据正在加载中
        });

        let url = 'http://rap2api.taobao.org/app/mock/2902/POST/api/healthTips';
        this.dataRepository.postJsonRepository(url)
            .then((response) => {
                if (response.success) {
                    let ITEMS = CACHE_RESULTS.DATA_LIST.slice();
                    ITEMS = ITEMS.concat(DoctorItem.datas);
                    CACHE_RESULTS.DATA_LIST = ITEMS;
                    CACHE_RESULTS.NEXT_PAGE += 1;
                    CACHE_RESULTS.TOTAL =5;
                    this.setState({
                        dataBanner: response.banner, //数据列表头部Banner
                        data: CACHE_RESULTS.DATA_LIST, //数据列表
                        isLoadingTail: false//数据加载结束
                    });
                    this.isLoadingMore = false;
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
                this.setState({
                    isLoading: false, //数据加载成功后，隐藏菊花
                });
                this.isLoadingMore = false;
            })
            .done()
    }

    hasMore() {
        return CACHE_RESULTS.DATA_LIST.length !== CACHE_RESULTS.TOTAL
    }

    fetchMoreData() {
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

    onRefresh() {
    }

    genUrl() {
        return URL + this.props.tabLabel
    }

    onClick(target,info) {
        this.props.navigation.navigate(target,{id:info})
    }

    renderItem(item) {
        return <DoctorListCell itemData={item} callback={() => this.onClick(MoreMenu.HomePage.menu_health_info_detail,item.item.id)}/>
    }

    separatorView = () => {
        return <View style={GlobalStyles.line}/>;
    };

    renderHeader() {
        return <View style={styles.bannerContainer}>
            <Image style={styles.headerBanner} source={{uri: this.state.dataBanner}}/>
        </View>
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
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',padding:Px2dp.getWidth(20),
                    marginTop:Px2dp.getWidth(20),marginBottom:Px2dp.getWidth(20),borderWidth:1,borderColor:'#D4D4D4'}}>
                    <TouchableOpacity>
                        <View style={styles.ButtonUnSelect}>
                            <Text style={{fontSize:15}}>专家</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.ButtonSelected}>
                            <Text style={{fontSize:15}}>续费</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={(item) => this.renderItem(item)}
                    ItemSeparatorComponent={ this.separatorView }
                    keyExtractor={(item, index) => index}
                    initialNumToRender={5}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isLoadingTail}
                    onEndReachedThreshold={0.1}
                    onEndReached={(info) => this.fetchMoreData(info)}
                    // ListHeaderComponent={() => this.renderHeader()}
                    ListFooterComponent={() => this.renderFooter()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bannerContainer: {
        paddingTop: Px2dp.getHeight(20),
        paddingLeft: Px2dp.getWidth(30),
        paddingRight: Px2dp.getWidth(30),
        paddingBottom: Px2dp.getHeight(20),
    },
    headerBanner: {
        width: ScreenUtil.screenSize.width - Px2dp.getWidth(60),
        height: Px2dp.getHeight(200)
    },
    ButtonSelected: {
        height: 24,
        width: 90,
        alignItems: 'center',
        backgroundColor: 'rgb(255,208,96)',
        justifyContent: 'center',
        padding: Px2dp.getHeight(10),
        borderRadius:5,
        marginRight:15
    },
    ButtonUnSelect: {
        height: 24,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Px2dp.getHeight(10),
        borderRadius:5,
        marginRight:15,
        borderWidth:1,
        borderColor:'#D4D4D4'
    },
});

