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
    TextInput,
    ScrollView
} from 'react-native';

import Px2dp from '../../Common/px2dp';
import DataRepository from '../../Expand/Dao/DataRepository'
import {MoreMenu} from '../../Common/MoreMenu';
import {Config} from '../../Expand/Dao/Config';
import GlobalStyles from "../../Common/GlobalStyles";
import ViewUtil from '../../Common/viewUtil';
import {observer, inject} from 'mobx-react/native'

const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 20,//每页显示数
    total: 0,//总记录数
    rows: [],//数据集
};
@inject('account')
export default class Task extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
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
        this.senderName = this.props.navigation.state.params.senderName;
        this.senderCode = this.props.navigation.state.params.senderCode;
        this.senderPicUrl = this.props.navigation.state.params.senderPicUrl;
        const {account: {id}} = this.props;
        this.doctorId = id;
        // let {tabId, personId} = this.props;/
        // alert(personId)
        // this.fetchData();
        this.fetchData();
    }

    componentWillUnmount() {
        this.clean();
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
                    if (result.data && result.data.goodsList.length === 0 && result.data.newsList.length === 0 && result.data.questionnaireList.length === 0) {
                        this.setState({
                            showModal: true,
                        });
                    } else {
                        this.setState({
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
        let uri = Config.BASE_URL + Config.API_TASK_LIST;
        // let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/goodslist';
        let param = {
            senderCode: this.senderCode,
            receiverCode: this.doctorId,
            current: CACHE_RESULTS.current,//当前页
            rowCount: CACHE_RESULTS.rowCount,//每页显示数
        };
        this.dataRepository.postJsonRepository(uri, param)
            .then((data) => {
                if (data && data.rows) {
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
            rowData.item.senderCode === this.senderCode ?
                <View style={styles.rowCenter}>
                    <View style={styles.mgsLeft}>
                        <View style={styles.msgType}>
                            <Image source={require('../../Resource/Imags/icon_home_wdys.png')}
                                   style={styles.typeImage} resizeMode={'stretch'}/>
                        </View>
                        <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}
                                          onPress={() => this.showDetail(rowData.item.senderCode)}>
                            <View style={styles.msgArrowLeft}/>
                            <View style={styles.msgContent}>
                                <View style={styles.msgTypeContent}>
                                    <Text style={styles.msgContentConfirmText}>推荐服务</Text>
                                </View>
                                <View style={styles.msgContentTop}>
                                    {this.senderPicUrl ?
                                        <Image source={{uri: this.senderPicUrl}}
                                               style={styles.productImage} resizeMode={'stretch'}/>
                                        :
                                        <Image source={require('../../Resource/Imags/ic_record.png')}
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
                                                      numberOfLines={2}>{rowData.item.messageContent}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.msgContentBottom}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                                        <Text style={styles.msgContentConfirmText}>未确认</Text>
                                        <Text style={styles.msgContentConfirmText}>{rowData.item.createTime}</Text>
                                        {/*<Text style={styles.productCount}>x{good.goodsUintNum}</Text>*/}
                                    </View>
                                </View>
                            </View>

                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={styles.rowCenter}>
                    <View style={styles.mgsRight}>
                        <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}
                                          onPress={() => this.showDetail(rowData.item.id)}>
                            <View style={styles.msgContent}>
                                <View style={styles.msgTypeContent}>
                                    <Text style={styles.msgContentConfirmText}>推荐服务</Text>
                                </View>
                                <View style={styles.msgContentTop}>
                                    {rowData.item.goodsMainPicUrl ?
                                        <Image source={{uri: rowData.item.goodsMainPicUrl}}
                                               style={styles.productImage} resizeMode={'stretch'}/>
                                        :
                                        <Image source={require('../../Resource/Imags/ic_record.png')}
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
                                                      numberOfLines={2}>{rowData.item.messageContent}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.msgContentBottom}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                                        <Text style={styles.msgContentConfirmText}>未确认</Text>
                                        <Text style={styles.msgContentConfirmText}>{rowData.item.createTime}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.msgArrowRight}/>
                        </TouchableOpacity>
                        <View style={styles.msgType}>
                            <Image source={require('../../Resource/Imags/res_photo_man.png')}
                                   style={styles.typeImage} resizeMode={'stretch'}/>
                        </View>
                    </View>
                </View>

        )
            ;
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

    showDetail = (itemId) => {
        // alert(itemId);
        // return;
        // let menu = MoreMenu.Profile.Record.Report.menu_questionnaire_report;
        // let title = '商品详情';
        // this.props.navigation.navigate(menu, {
        //     title: title,
        // });
        let menu = MoreMenu.GTasks.menu_task_detail;
        let {navigation} = this.props;
        navigation.navigate(menu, {
            title: '修改家人信息',
            id: itemId,
            memberCode: this.doctorId,
            callBack: () => this.onRefresh()
        });
    };

    showMemberInfo() {
        this.props.navigation.navigate(MoreMenu.GTasks.menu_member_info, {
            senderCode: this.senderCode,
            senderName: this.senderName
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    rightButton={ViewUtil.getRightButton('档案', () => this.showMemberInfo())}
                    title={this.senderName}/>

                <FlatList
                    data={this.state.data}
                    ListEmptyComponent={() => this.renderListEmptyComponent()}
                    renderItem={(rowData) => this.renderRow(rowData)}
                    keyExtractor={(item, index) => index}
                    // onRefresh={() => this.onRefresh()}
                    refreshing={this.state.refreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.fetchMoreData()}
                    ListFooterComponent={() => this.renderFooter()}
                    inverted={false}
                />

                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <View style={{flexDirection: 'row', alignItems: 'center',}}>
                            <Image source={require('../../Resource/Imags/ic_search.png')}
                                   style={styles.searchIcon}/>
                            <TextInput style={styles.TextInputStyle} maxLength={20}
                                       underlineColorAndroid='rgb(255,255,255)'
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
                            <Image source={require('../../Resource/Imags/ic_search_delete.png')}
                                   style={styles.searchDeleteIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(240,240,240)',
    },
    searchRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Px2dp.getHeight(70),
        backgroundColor: 'rgb(255,255,255)',
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255,255,255)',
        width: '95%',
        height: Px2dp.getHeight(56),
        borderRadius: Px2dp.getHeight(28),
        borderWidth: 1,
        borderColor: 'rgb(196,196,196)',
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
        backgroundColor: 'white',
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
        paddingHorizontal: Px2dp.getWidth(20),
        flexDirection: 'row',
        // alignItems: 'flex-start',
        // borderBottomWidth: 1,
        justifyContent: 'space-between',
        // borderBottomColor: 'rgb(244,244,244)',
        backgroundColor: 'rgb(240,240,240)',
        // borderWidth: 1
    },
    mgsLeft: {
        flex: 1,
        flexDirection: 'row',
        // borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginRight: Px2dp.getWidth(130),
    },
    mgsRight: {
        flex: 1,
        flexDirection: 'row',
        // borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginLeft: Px2dp.getWidth(130)
    },
    msgType: {
        // borderWidth: 1,
        width: Px2dp.getWidth(100),
        height: Px2dp.getHeight(100),
        // backgroundColor: 'white',
        // borderRadius: 5,
    },
    msgArrowLeft: {
        marginLeft: Px2dp.getWidth(10),
        marginTop: Px2dp.getHeight(40),
        width: 0,
        height: 0,
        borderTopColor: 'transparent',
        borderTopWidth: Px2dp.getWidth(15),
        borderRightColor: 'white',
        borderRightWidth: Px2dp.getWidth(20),
        borderBottomColor: 'transparent',
        borderBottomWidth: Px2dp.getWidth(15),
    },
    msgArrowRight: {
        marginRight: Px2dp.getWidth(10),
        marginTop: Px2dp.getHeight(40),
        width: 0,
        height: 0,
        borderTopColor: 'transparent',
        borderTopWidth: Px2dp.getWidth(15),
        borderLeftColor: 'white',
        borderLeftWidth: Px2dp.getWidth(20),
        borderBottomColor: 'transparent',
        borderBottomWidth: Px2dp.getWidth(15),
    },
    msgContent: {
        flex: 1,
        // borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: Px2dp.getWidth(20),
        flexDirection: 'column',
        alignItems: 'flex-start',
        // borderBottomWidth: 1,

        // borderBottomColor: 'rgb(244,244,244)',
        // backgroundColor: 'rgb(240,240,240)',
        // borderWidth: 1
    },
    msgContentTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1
        borderTopWidth: 1,
        borderTopColor: 'rgb(244,244,244)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)',
        paddingVertical: Px2dp.getHeight(10),
    },
    msgContentBottom: {
        marginTop: Px2dp.getHeight(10),
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // borderWidth: 1
    },
    typeImage: {
        height: Px2dp.getHeight(100),
        width: Px2dp.getWidth(100),
    },
    msgContentConfirmText: {
        fontSize: 15,
        color: 'rgb(153,153,153)',
        // textAlignVertical: 'bottom',
    },

    productImage: {
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(80),
    },
    productContent: {
        flex: 1,
        // height: Px2dp.getHeight(140),
        marginLeft: Px2dp.getWidth(20),
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    productContentLine2: {
        flexDirection: 'row',
    },
    msgTypeContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },

});