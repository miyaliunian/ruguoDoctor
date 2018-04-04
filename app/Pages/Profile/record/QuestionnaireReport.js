/**
 * Created by hl on 2017/11/29.
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

const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 10,//每页显示数
    total: 0,//总记录数
    rows: [],//数据集
};
export default class QuestionnaireReport extends Component {

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
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
        });
        this.setState({
            id: this.props.navigation.state.params.personId
        });
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
        let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/QuestionnaireReport';
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

    //返回每一行cell的样式
    renderRow(rowData) {
        return (
            <View>
                <View style={[styles.row, {backgroundColor: 'rgb(244,244,244)'}]}>
                    <View style={styles.rowLeft}>
                        <Text style={[styles.fontLabel, {color: 'rgb(153,153,153)'}]}>{rowData.item.date}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <Text style={styles.fontLabel}>《{rowData.item.title}》</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}
                                   style={styles.imgRight}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
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
                    <Text style={{fontSize: 14, color: 'rgb(196,196,196)'}}>~已显示全部报告~</Text>
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
        let title = this.props.navigation.state.params.title;
        return (
            <View style={[styles.container]}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={title}/>

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
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(80),
        borderWidth: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fontLabel: {
        marginLeft: Px2dp.getWidth(30),
        fontSize: Px2dp.getHeight(24),
        color: 'rgb(250,124,99)'
    },
    imgRight: {
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(28),
        width: Px2dp.getWidth(28),
        tintColor: 'rgb(196,196,196)'
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    }
});

