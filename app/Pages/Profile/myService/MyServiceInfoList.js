/**
 * Created by hl on 2018-1-8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    DeviceEventEmitter,
    TextInput
} from 'react-native';

import Px2dp from '../../../Common/px2dp';
import DataRepository from '../../../Expand/Dao/DataRepository'
import GlobalStyles from "../../../Common/GlobalStyles";
import Switch from '../../../Component/Switch';
let serviceJson = require('./serviceInfoListJson.json');
const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 5,//每页显示数
    total: 0,//总记录数
    rows: [],//数据集
};
export default  class MyServiceInfoList  extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            data: '',
            isLoadingTail: false,//标识数据是否加载中
            refreshing: false, //初始化不刷新
            searchText: ''
        }
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {
        this.memberCode = '';
        // let {tabId, personId} = this.props;/
        // alert(personId)
        // this.fetchData();
        this.fetchData();
    }

    componentWillUnmount() {
    }

    onDeleteSearchText() {
        this.refs.searchTextInput.clear();
        // this.setState({
        //     searchText: ''
        // });
    }

    submitContext(text) {
        // alert(this.state.searchText)
        if (text === '') {
            DeviceEventEmitter.emit('toastInfo', '请输入搜索内容', 'sad');
            return;
        }
        this.state.searchText = text;
        this.onRefresh();
        return;
        this.setState({
            data: '',
            showModal: false,
            isLoading: true
        });

        // let url = FLAG_STORAGE.serverUrl + "http://10.101.22.208:6080/ruguo-bs/personaldata/momemberbasicinfo/get";
        let url = 'http://rap2api.taobao.org/app/mock/1368/GET/searchList';
        let params = {id: this.state.id};
        this.dataRepository.postJsonRepository(url, params)
            .then((result) => {
                this.setState({
                    isLoading: false
                });
                if (result.status === 'success') {
                    if (serviceJson.rows) {
                        this.setState({
                            showModal: true,
                            data: result.data,
                        });
                    }

                } else {
                    DeviceEventEmitter.emit('toastInfo', result.msg, 'fail');
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                });
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
            })
            .done();
    }

    fetchData() {
        this.isLoadingMore = true;
        // 请求数据时显示菊花
        this.setState({
            isLoadingTail: true,
        });

        // let uri = Config.BASE_URL + Config.API_FAMILY_LIST;
        let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/goodslist';
        let param = {
            memberCode: this.memberCode,
            current: CACHE_RESULTS.current,//当前页
            rowCount: CACHE_RESULTS.rowCount,//每页显示数
        };
        this.dataRepository.postJsonRepository(uri, param)
            .then((data) => {
                data = serviceJson;
                if (data && data.rows) {
                    let item = CACHE_RESULTS.rows.slice();
                    item = item.concat(data.rows);
                    CACHE_RESULTS.rows = item;
                    CACHE_RESULTS.current += 1;
                    CACHE_RESULTS.total = 3;
                    this.setState({
                        data: CACHE_RESULTS.rows,
                        isLoadingTail: false, //数据请求成功后隐藏菊花
                        refreshing: false
                    });
                    this.isLoadingMore = false;
                } else {
                    this.setState({
                        data: CACHE_RESULTS.rows,
                        isLoadingTail: false,//数据请求失败后隐藏菊花
                        refreshing: false
                    });
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
       alert(JSON.stringify(rowData.item))

        return (

            <View key={rowData.item.id} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
                padding:Px2dp.getWidth(20),backgroundColor:'white',borderTopWidth:1,borderTopColor:'rgb(196,196,196)'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:rowData.item.serviceIcon}} style={{width: 40, height: 40,marginRight:Px2dp.getWidth(20)}} resizeMode={'stretch'}/>
                    <Text>{rowData.item.serviceName}</Text>
                </View>
                <View>
                    <Switch
                        value={rowData.item.isSelect}
                        onAsyncPress={(callback) => {
                            callback(true, value => rowData.item.value)
                        }}
                    />
                </View>
            </View>


        );
    };

    renderListEmptyComponent() {
        return (
            this.state.data ?
                <View style={{alignItems: 'center', marginTop: Px2dp.getHeight(100)}}>
                    {/*<Image source={require('../../../Resource/Imags/ic_default_bl.png')}/>*/}
                    <Text style={{fontSize: 14, color: 'rgb(196,196,196)'}}>~已显示全部~</Text>
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
        // let {tabId} = this.props;
        return (
            <View style={styles.container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    // leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title='您注册的服务项目信息'/>

                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={require('../../../Resource/Imags/ic_search.png')}
                                   style={styles.searchIcon}/>
                            <TextInput style={styles.TextInputStyle} maxLength={20}
                                       underlineColorAndroid='#f4f4f4'
                                       placeholderTextColor='rgb(196,196,196)'
                                       placeholder='请输入'
                                       returnKeyType={'search'}
                                       onSubmitEditing={(event) => this.submitContext( // 数据提交
                                           event.nativeEvent.text
                                       )}
                                       ref='searchTextInput'
                            />
                        </View>
                        <TouchableOpacity onPress={() => this.onDeleteSearchText()} style={styles.searchDeleteIcon}>
                            <Image source={require('../../../Resource/Imags/ic_search_delete.png')}
                                   style={styles.searchDeleteIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
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
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(244,244,244)',
    },
    searchRow:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Px2dp.getHeight(70),
        backgroundColor: 'rgb(255,255,255)',
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        width: '95%',
        height: Px2dp.getHeight(56),
        borderRadius: Px2dp.getHeight(28),
        borderWidth: 1,
        borderColor: '#f4f4f4',
        alignItems: 'center',
    },
    searchIcon: {
        width: Px2dp.getWidth(24),
        height: Px2dp.getHeight(24),
        margin: Px2dp.getWidth(20),
    },
    searchDeleteIcon: {
        width: Px2dp.getWidth(28),
        height: Px2dp.getHeight(28),
        marginRight: Px2dp.getWidth(20),
    },
    TextInputStyle: {
        width: '80%',
        height: Px2dp.getHeight(52),
        padding: 0,
        fontSize: 13,
        color: 'rgb(51,51,51)',
    },
    loadingMore: {
        marginVertical: 20,
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    },
    //待办任务
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
        color: 'rgb(196,196,196)',
        textAlignVertical: 'bottom',
    },

});