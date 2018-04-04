/**
 * Created by hl on 2018/1/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles';
import Px2dp from '../../../Common/px2dp';
import ViewUtil from '../../../Common/viewUtil';
import DataRepository from '../../../Expand/Dao/DataRepository'
import NavigationBar from '../../../Component/NavigationBar'
import {MoreMenu} from "../../../Common/MoreMenu";

const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 10,//每页显示数
    total: 0,//总记录数
    rows: [],//数据集
};
export default class GoodsSearchList extends Component {

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
        this.state = {
            data: '',
            isLoadingTail: false,//标识数据是否加载中
            refreshing: false, //初始化不刷新
        }
    }

    componentDidMount() {
        // this.props.navigation.setParams({
        //     navigatePressLeft: this.navigatePressLeft,
        // });
        // this.setState({
        //     id: this.props.navigation.state.params.personId
        // });
        this.fetchData();
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    componentWillMount() {
    }

    componentWillUnmount() {
        this.clean()
    }

    fetchData() {
        this.isLoadingMore = true;
        // 请求数据时显示菊花
        this.setState({
            isLoadingTail: true,
        });
        // Config.BASE_URL+Config.API_SHOP_CENTER_TYPE3
        let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/goodslist';
        this.dataRepository.postJsonRepository(uri, {
            accessToken: '22',
            current: CACHE_RESULTS.current,//当前页
            rowCount: CACHE_RESULTS.rowCount,//每页显示数
        })
            .then((data) => {
                if (data.status) {

                    let item = CACHE_RESULTS.rows.slice();
                    item = item.concat(data.rows);
                    CACHE_RESULTS.rows = item;
                    CACHE_RESULTS.current += 1;
                    CACHE_RESULTS.total = data.total;
                    this.setState({
                        data: CACHE_RESULTS.rows,
                        isLoadingTail: false, //数据请求成功后隐藏菊花
                        refreshing: false
                    });
                    this.isLoadingMore = false;
                } else {

                }
            })
            .catch((error) => {
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
                this.setState({
                    data: CACHE_RESULTS.rows,
                    isLoadingTail: false,//数据请求失败后隐藏菊花
                    refreshing: false
                });
                this.isLoadingMore = false;
            });
    }

    hasMore = () => {
        return CACHE_RESULTS.rows.length !== CACHE_RESULTS.total
    };

    fetchMoreData() {
        if (this.isLoadingMore) {
            return;
        }
        if (!this.hasMore() || this.state.isLoadingTail) {
            return
        }
        this.isLoadingMore = true;
        this.fetchData();
    }

    clean = () => {
        CACHE_RESULTS.rows = [];
        CACHE_RESULTS.current = 1;
        CACHE_RESULTS.total = 0
    };

    showDetail = (itemId) => {
        alert(itemId);
        return;
        let menu = MoreMenu.Profile.Record.Report.menu_questionnaire_report;
        let title = '商品详情';
        this.props.navigation.navigate(menu, {
            title: title,
        });
    };

    //返回每一行cell的样式
    renderRow(rowData) {
        return (
            <TouchableOpacity onPress={() => this.showDetail(rowData.item.id)}>
                <View style={styles.rowCenter} key={rowData.item.id}>
                    {rowData.item.goodsMainPicUrl ?
                        <Image source={{uri: rowData.item.goodsMainPicUrl}}
                               style={styles.productImage} resizeMode={'stretch'}/>
                        :
                        <Image source={require('../../../Resource/Imags/mycenter_bg_botton.png')}
                               style={styles.productImage} resizeMode={'stretch'}/>
                    }
                    <View style={styles.productContent}>
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.productTitle}>{rowData.item.goodsName}</Text>
                                <Text style={styles.productTitleSub}>
                                    {rowData.item.goodsTitle === '' || rowData.item.goodsTitle == null ? '' : '(' + rowData.item.goodsTitle + ')'}
                                </Text>
                            </View>
                            <View style={styles.productContentLine2}>
                                <Text style={styles.productDescribe}
                                      numberOfLines={2}>{rowData.item.goodsDescribe}</Text>
                            </View>
                        </View>
                        <View style={styles.productContentLine3}>
                            <Text style={styles.productPriceTotal}>￥{rowData.item.goodsPrice}</Text>
                            {/*<Text style={styles.productCount}>x{good.goodsUintNum}</Text>*/}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
    };

    // separatorView = () => {
    //     return <View style={GlobalStyles.line}/>;
    // };

    renderListEmptyComponent() {
        return (
            this.state.data ?
                <View style={{alignItems: 'center', marginTop: Px2dp.getHeight(100)}}>
                    <Image source={require('../../../Resource/Imags/ic_default_bl.png')}/>
                </View>
                : <View/>
        )
    }

    onRefresh() {
        if (this.isLoadingMore) {
            return;
        }
        this.setState({
            data: '',
        });
        this.clean();
        this.fetchData();
    }

    renderFooter() {
        if (!this.hasMore() && CACHE_RESULTS.total !== 0) {
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', margin: Px2dp.getHeight(30)}}>
                    <Text style={{fontSize: 14, color: 'rgb(196,196,196)'}}>~已显示全部~</Text>
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
                marginVertical: Px2dp.getHeight(30)
            }}>
                <ActivityIndicator animating={true} size='small'/>
                <Text style={{fontSize: 14, marginLeft: Px2dp.getWidth(10)}}>数据加载中...</Text>
            </View>
        )
    }

    render() {
        // let title = this.props.navigation.state.params.title;
        return (
            <View style={[styles.container]}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title='商品列表'/>

                <FlatList
                    data={this.state.data}
                    ListEmptyComponent={() => this.renderListEmptyComponent()}
                    renderItem={(rowData) => this.renderRow(rowData)}
                    keyExtractor={(item, index) => index}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.refreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.fetchMoreData()}
                    ListFooterComponent={() => this.renderFooter()}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(244,244,244)',
    },
    //商品
    rowCenter: {
        paddingVertical: Px2dp.getWidth(20),
        paddingHorizontal: Px2dp.getWidth(30),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)',
        backgroundColor: 'rgb(255,255,255)',
        // borderWidth:1
    },
    productImage: {
        height: Px2dp.getHeight(140),
        width: Px2dp.getWidth(140),
    },
    productContent: {
        flex: 1,
        height: Px2dp.getHeight(140),
        marginLeft: Px2dp.getWidth(30),
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    productContentLine2: {
        flexDirection: 'row',
    },
    productContentLine3: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productTitle: {
        fontSize: 17,
        color: 'rgb(51,51,51)',
    },
    productTitleSub: {
        fontSize: 17,
        color: 'rgb(153,153,153)',
        marginLeft: Px2dp.getWidth(10)
    },
    productDescribe: {
        fontSize: 15,
        color: 'rgb(196,196,196)'
    },
    productPriceTotal: {
        fontSize: 15,
        color: 'rgb(239,94,82)',
        textAlignVertical: 'bottom',
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    }
});

