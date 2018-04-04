/**
 * Created by hl on 2017/12/4.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';

import Px2dp from '../../../Common/px2dp';
import DataRepository from '../../../Expand/Dao/DataRepository'
import {MoreMenu} from '../../../Common/MoreMenu';
import PropTypes from 'prop-types'
import {Config} from '../../../Expand/Dao/Config'
const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 5,//每页显示数
    total: 0,//总记录数
    rows: [],//数据集
};


export default class OrderListTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
        this.tabId = '';
        this.state = {
            data: '',
            isLoadingTail: false,//标识数据是否加载中
            refreshing: false, //初始化不刷新
        }
    }

    componentDidMount() {
        let {tabId} = this.props;
        this.tabId = parseInt(tabId);
    }

    componentWillUnmount() {
        this.clean()
    }

    componentWillReceiveProps(nextProps) {

        if (this.tabId === nextProps.selectTab) {
            this.onRefresh();
        }
    }

    showOrderDetail = (rowData) => {
        let menu = '';
        switch (rowData.item.orderStatus) {
            case '0':
                // menu = '待支付';
                menu = MoreMenu.Profile.Order.menu_order_to_be_pay;
                break;
            case '1':
                // menu = '待收货';
                menu = MoreMenu.Profile.Order.menu_order_already_pay;
                break;
            case '2':
                // menu = '已完成';
                menu = MoreMenu.Profile.Order.menu_order_have_complete;
                break;
            case '3':
                // menu = '退款中';
                menu = MoreMenu.Profile.Order.menu_order_refunding;
                break;
            case '4':
                // menu = '关闭';
                menu = MoreMenu.Profile.Order.menu_order_have_close;
                break;
            default:
                menu = '';
        }
        if (menu === '') {
            DeviceEventEmitter.emit('toastInfo', '无效的请求路径', 'fail');
            return;
        }
        this.props.navigation.navigate(menu, {
            orderId: rowData.item.id
        });
    };
    orderHandler = (rowData, handlerId) => {
        alert(JSON.stringify(rowData) + ' ' + handlerId);
    };

    fetchData() {
        this.isLoadingMore = true;
        let {personId} = this.props;
        let orderStatus = '';
        switch (this.tabId) {
            case 1:
                // 待支付
                orderStatus = '0';
                break;
            case 2:
                // 待收货
                orderStatus = '1';
                break;
            case 3:
                // 已完成
                orderStatus = '2';
                break;
            case 4:
                // 退款中
                orderStatus = '3';
                break;
        }
        console.log(personId, ' ' + this.tabId);
        // this.clean()
        // 请求数据时显示菊花
        this.setState({
            isLoadingTail: true,
        });
        let param = {
            accessToken: '22',
            personId: personId,
            current: CACHE_RESULTS.current,//当前页
            rowCount: CACHE_RESULTS.rowCount,//每页显示数
            orderStatus: orderStatus
        };

        //let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/order';
        let uri =Config.BASE_URL+ Config.API_ORDER_LIST;
        this.dataRepository.postJsonRepository(uri, param)
            .then((data) => {
            console.log(data);
                if (data) {
                    if(data.total>0){
                        let item = CACHE_RESULTS.rows.slice();
                        item = item.concat(data.rows);
                        CACHE_RESULTS.rows = item;
                        CACHE_RESULTS.current += 1;
                        CACHE_RESULTS.total = data.total;
                        this.setState({
                            data: CACHE_RESULTS.rows
                        });
                    }
                    this.setState({
                        isLoadingTail: false, //数据请求成功后隐藏菊花
                        refreshing: false
                    });
                } else {
                    this.setState({
                        data: CACHE_RESULTS.rows,
                        isLoadingTail: false,//数据请求失败后隐藏菊花
                        refreshing: false
                    });
                }
                this.isLoadingMore = false;
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

    //返回每一行cell的样式
    renderRow(rowData) {
        //alert(JSON.stringify(rowData))
        let orderStatusViewStyle = '';
        let orderStatusTextStyle = '';
        let orderStatusText = '';
        switch (rowData.item.orderStatus) {
            case '0':
                orderStatusViewStyle = styles.orderStatusViewRed;
                orderStatusTextStyle = styles.orderStatusTextWhite;
                orderStatusText = '待支付';
                break;
            case '1':
                orderStatusViewStyle = styles.orderStatusViewGreen;
                orderStatusTextStyle = styles.orderStatusTextWhite;
                orderStatusText = '待收货';
                break;
            case '2':
                orderStatusViewStyle = styles.orderStatusViewOrange;
                orderStatusTextStyle = styles.orderStatusTextBlack;
                orderStatusText = '已完成';
                break;
            case '3':
                orderStatusViewStyle = styles.orderStatusViewBlack;
                orderStatusTextStyle = styles.orderStatusTextWhite;
                orderStatusText = '退款中';
                break;
            case '4':
                orderStatusViewStyle = styles.orderStatusViewGrey;
                orderStatusTextStyle = styles.orderStatusTextWhite;
                orderStatusText = '关闭';
                break;
            default:
                orderStatusViewStyle = '';
                orderStatusText = '';
        }
        return (
            <View style={[styles.container]}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.row}>
                        <View style={styles.rowTop}>
                            <Text style={styles.orderDate}>{rowData.item.orderTime}</Text>
                            <View style={[styles.orderStatusView, orderStatusViewStyle]}>
                                <Text style={orderStatusTextStyle}>{orderStatusText}</Text>
                            </View>
                        </View>
                        {/*<TouchableOpacity onPress={() => this.showOrderDetail(rowData)}>*/}
                        <OrderGoodItem goodsList={rowData.item.orderGoodsList}/>
                        {/*</TouchableOpacity>*/}
                        <View style={styles.rowBottom}>


                            {rowData.item.orderStatus === '0'
                                ? <TouchableOpacity onPress={() => this.showOrderDetail(rowData, '0')}>
                                    <View style={[styles.orderButtonView, styles.orderButtonViewGreen]}>
                                        <Text style={styles.orderButtonGreen}>去支付</Text>
                                    </View>
                                </TouchableOpacity>
                                : <View/>
                            }
                            {rowData.item.orderStatus === '0'
                                ? <TouchableOpacity onPress={() => this.orderHandler(rowData, '1')}>
                                    <View style={[styles.orderButtonView, styles.orderButtonViewGrey]}>
                                        <Text style={styles.orderButtonGrey}>取消订单</Text>
                                    </View>
                                </TouchableOpacity>
                                : <View/>
                            }
                            {rowData.item.orderStatus === '2'
                                ? <TouchableOpacity onPress={() => this.orderHandler(rowData, '2')}>
                                    <View style={[styles.orderButtonView, styles.orderButtonViewRed]}>
                                        <Text style={styles.orderButtonRed}>删除订单</Text>
                                    </View>
                                </TouchableOpacity>
                                : <View/>
                            }
                            {rowData.item.orderStatus
                                ? <TouchableOpacity onPress={() => this.showOrderDetail(rowData)}>
                                    <View style={[styles.orderButtonView, styles.orderButtonViewBlack]}>
                                        <Text style={styles.orderButtonBlack}>查看详情</Text>
                                    </View>
                                </TouchableOpacity>
                                : <View/>
                            }

                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    // separatorView = () => {
    //     return <View style={GlobalStyles.line}/>;
    // };

    renderListEmptyComponent() {
        return (
            this.state.data ?
                <View style={{alignItems: 'center', marginTop: Px2dp.getHeight(100)}}>
                    <Image source={require('../../../Resource/Imags/ic_default_order.png')}/>
                    <Text style={{
                        fontSize: 14,
                        color: 'rgb(153,153,153)', marginTop: Px2dp.getHeight(30)
                    }}>您还没有订单哦~</Text>
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
                    <Text style={{fontSize: 14, color: 'rgb(196,196,196)'}}>~已显示全部订单~</Text>
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

    /*renderRow2(rowData) {
        return (
            <View style={styles.row}>
                <View style={styles.rowTop}>
                    <Text style={styles.orderDate}>2017-12-14 10:49</Text>
                    <Text style={[styles.orderStatus, styles.orderStatusRed]}>待支付</Text>
                </View>
                <TouchableOpacity onPress={() => this.showOrderDetail()}>
                    <View style={styles.rowCenter}>
                        <Image source={require('../../../Resource/Imags/ic_accountManager_weic.png')}
                               style={styles.productImage}/>
                        <View style={styles.productContent}>
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.productTitle}>产品服务包</Text>
                                    <Text style={styles.productTitleSub}>(一年包)</Text>
                                </View>
                                <Text style={styles.productPrice}>￥8000.00</Text>
                            </View>
                            <View style={styles.productContentLine3}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.productCoupon}>优惠券：</Text>
                                    <Text style={styles.productCoupon}>200.00</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.productPriceTotalLable}>合计：</Text>
                                    <Text style={styles.productPriceTotal}>￥8000.00</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
                <View style={styles.rowBottom}>
                    <TouchableOpacity onPress={() => this.showOrderDetail()}>
                        <Text style={styles.orderButtonRed}>删除订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.showOrderDetail()}>
                        <Text style={styles.orderButtonGrey}>取消订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.showOrderDetail()}>
                        <Text style={styles.orderButtonBlack}>查看详情</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.showOrderDetail()}>
                        <Text style={styles.orderButtonGreen}>去支付</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }*/

    render() {
        return (
            <FlatList style={{backgroundColor: 'rgb(244,244,244)'}}
                      data={this.state.data}
                      ListEmptyComponent={() => this.renderListEmptyComponent()}
                      renderItem={(rowData) => this.renderRow(rowData)}
                      keyExtractor={(item, index) => index}
                      onRefresh={() => this.onRefresh()}
                      refreshing={this.state.refreshing}
                      onEndReachedThreshold={0.1}
                      onEndReached={() => this.fetchMoreData()}
                      ListFooterComponent={() => this.renderFooter()}/>
        )
    }
}

class OrderGoodItem extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        goodsList: PropTypes.array
    };

    renderList(list) {
        return list.map(item => this.renderItem(item));
    }

    renderItem(good) {
        return (
            <View style={styles.rowCenter} key={good.id}>
                {good.goodsIconUrl ?
                    <Image source={{uri: good.goodsIconUrl}}
                           style={styles.productImage} resizeMode={'stretch'}/>
                    :
                    <Image source={require('../../../Resource/Imags/mycenter_bg_botton.png')}
                           style={styles.productImage} resizeMode={'stretch'}/>
                }
                <View style={styles.productContent}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.productTitle}>{good.goodsName}</Text>
                        <Text style={styles.productTitleSub}>
                            {good.goodsTitle === '' || good.goodsTitle == null ? '' : '(' + good.goodsTitle + ')'}
                        </Text>
                    </View>
                    <View style={styles.productContentLine3}>
                        <Text style={styles.productPriceTotal}>￥{good.goodsPrice}</Text>
                        <Text style={styles.productCount}>x{good.goodsUintNum}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const {goodsList} = this.props;
        return <View>
            {this.renderList(goodsList)}
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(244,244,244)',
    },
    row: {
        flexDirection: 'column',
        backgroundColor: 'rgb(255,255,255)',
        marginBottom: Px2dp.getHeight(10)
    },
    rowTop: {
        height: Px2dp.getHeight(60),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)'
    },
    rowCenter: {
        paddingVertical: Px2dp.getWidth(20),
        paddingHorizontal: Px2dp.getWidth(30),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)',
        // borderStyle:'dashed',
        // borderWidth:1
    },
    rowBottom: {
        height: Px2dp.getHeight(100),
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)'
    },

    orderDate: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: 12,
        color: 'rgb(51,51,51)',
    },

    orderStatusView: {
        marginRight: Px2dp.getWidth(30),
        width: Px2dp.getWidth(80),
        height: Px2dp.getHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Px2dp.getWidth(15)
    },

    orderStatusViewRed: {
        backgroundColor: 'rgb(239,94,82)',
    },
    orderStatusViewGreen: {
        backgroundColor: 'rgb(129,197,141)',
    },
    orderStatusViewOrange: {
        backgroundColor: 'rgb(255,208,96)',
    },
    orderStatusViewBlack: {
        backgroundColor: 'rgb(51,51,51)',
    },
    orderStatusViewGrey: {
        backgroundColor: 'rgb(196,196,196)',
    },
    orderStatusTextWhite: {
        fontSize: 11,
        color: 'rgb(255,255,255)',
    },
    orderStatusTextBlack: {
        fontSize: 11,
        color: 'rgb(51,51,51)',
    },
    orderStatusTextGrey: {
        fontSize: 11,
        color: 'rgb(196,196,196)',
    },

    orderButtonView: {
        marginRight: Px2dp.getWidth(30),
        width: Px2dp.getWidth(120),
        height: Px2dp.getHeight(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgb(29,197,141)',
        borderRadius: Px2dp.getWidth(6),
        borderWidth: 1,
    },
    orderButtonViewGreen: {
        borderColor: 'rgb(29,197,141)',
    },
    orderButtonViewGrey: {
        borderColor: 'rgb(196,196,196)',
    },
    orderButtonViewRed: {
        borderColor: 'rgb(239,94,82)',
    },
    orderButtonViewBlack: {
        borderColor: 'rgb(51,51,51)',
    },
    orderButtonGreen: {
        fontSize: 12,
        color: 'rgb(29,197,141)'
    },
    orderButtonGrey: {
        fontSize: 12,
        color: 'rgb(196,196,196)'
    },
    orderButtonRed: {
        fontSize: 12,
        color: 'rgb(239,94,82)'
    },
    orderButtonBlack: {
        fontSize: 12,
        color: 'rgb(51,51,51)'
    },
    productImage: {
        height: Px2dp.getHeight(140),
        width: Px2dp.getWidth(140),
    },

    productContent: {
        flex: 1,
        // borderWidth: 1,
        height: Px2dp.getHeight(140),
        marginLeft: Px2dp.getWidth(30),
        justifyContent: 'center'
        // marginRight: Px2dp.getWidth(30),
    },
    productContentLine3: {
        flexDirection: 'row',
        // borderWidth: 1,
        // marginBottom: 1,
        // alignItems: 'flex-end',
        marginTop: Px2dp.getHeight(20),
        justifyContent: 'space-between'

        // height: Px2dp.getHeight(140),
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
    // productPrice: {
    //     fontSize: Px2dp.getHeight(28),
    //     color: 'rgb(153,153,153)',
    // },
    // productCoupon: {
    //     fontSize: Px2dp.getHeight(24),
    //     color: 'rgb(153,153,153)',
    //     textAlignVertical: 'bottom'
    // },
    // productPriceTotalLable: {
    //     fontSize: Px2dp.getHeight(24),
    //     color: 'rgb(153,153,153)',
    //     textAlignVertical: 'bottom',
    // },
    productPriceTotal: {
        fontSize: 18,
        color: 'rgb(239,94,82)',
        textAlignVertical: 'bottom',
    },
    productCount: {
        fontSize: 13,
        color: 'rgb(153,153,153)',
        textAlignVertical: 'bottom',
    }

});