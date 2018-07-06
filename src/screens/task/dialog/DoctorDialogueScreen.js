/**
 * Created by hl on 2018/3/20.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    FlatList,
    ActivityIndicator,
    Image,
    TextInput,
    Platform
} from 'react-native';
import Px2dp from '../../../common/px2dp'
import DataRepository from '../../../config/DataRepository'
import {Config} from '../../../config/config'
import {MoreMenu} from "../../../config/moreMenu";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons'
import theme from '../../../config/theme'
const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 10,//每页显示数
    total: 0,//总记录数
    rows: [],//数据集
};
export default class DoctorDialogueScreen extends PureComponent {

    // static navigationOptions = ({navigation}) => ({
        // headerLeft: (
        //     // ViewUtil.getLeftButton(() => navigation.goBack())
        //     navigation.goBack()
        // ),
        // headerTitle: navigation.state.params.title,
        // headerRight: (
        //     <TouchableOpacity onPress={navigation.state.params.navigatePressRight}>
        //         <View style={{margin: 10}}>
        //             <Text style={styles.navigatePressRight}>资料</Text>
        //         </View>
        //     </TouchableOpacity>
        // )
    // });

    static navigationOptions = ({navigation})=>( {
        headerLeft: (
            <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color= "#cccccc" />} iconSize={23} color={theme.navItemColor}>
                <HeaderButtons.Item title="add" iconName="ios-arrow-back" onPress={() => navigation.goBack()} />
            </HeaderButtons>
        ),
        headerTitle:navigation.state.params.title,
        headerRight: (
            <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color= "#cccccc" />} iconSize={23} color={theme.navItemColor}>
                <HeaderButtons.Item title="资料" iconName="ios-search" onPress={() => console.warn('add')} />
            </HeaderButtons>
        ),
    })

    navigatePressRight(target) {
        // if (target === 1) {
        // this.props.navigation.navigate(MoreMenu.HomePage.Doctor.menu_doctor_dialogue_details, {re_relaId: this.receiverCode})
        // this.props.navigation.navigate(MoreMenu.HomePage.Doctor.menu_doctor_list, {re_relaId: this.receiverCode})
        // }

        let menu = MoreMenu.Profile.Shop.menu_doctor_details;
        let title = '医生详情';
        this.props.navigation.navigate(menu, {
            title: title,
            personId: this.patientId,
            doctorId: this.doctorId,
        });






    }

    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.isLoadingMore = false;
        this.state = {
            data: '',
            isLoadingTail: false,//标识数据是否加载中
            refreshing: false, //初始化不刷新
            inverted: false, //从上至下加载
            flag:false
        }
    }

    componentDidMount() {

        this.props.navigation.setParams({navigatePressRight: () => this.navigatePressRight()});
        this.receiverCode = this.props.navigation.state.params.re_relaId;//本人,医生code
        this.patientId = this.props.navigation.state.params.re_patientId;
        this.senderCode = "72c3ebe85e3145768d55e32a60c55da8";//发送方，患者
        this.goodsCode = '';
        this.doctorId = this.props.navigation.state.params.doctorId;

        // this.patientId = '61ab3d6fb6624f09abee972b5d897a3f';
        // this.receiverCode = '08d1f85e39814087969683c30718e6a9';

        if (this.receiverCode === '' ||  this.receiverCode === "undefined") {
            DeviceEventEmitter.emit('toastInfoDetail', '请求参数[re_relaId]错误', 'fail');
            return;
        }

        if (this.patientId === '' || typeof this.patientId === "undefined") {
            DeviceEventEmitter.emit('toastInfoDetail', '请求参数[re_patientId]错误', 'fail');
            return;
        }
        // this.patientId = '61ab3d6fb6624f09abee972b5d897a3f';
        // this.receiverCode = '08d1f85e39814087969683c30718e6a9';
        this.fetchServiceInfo();
        this.fetchData();
    };

    componentWillUnmount() {
        // this.props.navigation.state.params.callback();
        this.clean();
    }

    fetchServiceInfo() {
        let uri = Config.BASE_URL + Config.API_MY_SERVICE_LIST;
        // let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/goodslist';
        let param = {
            relaPerCode: this.receiverCode
        };
        this.dataRepository.postJsonRepository(uri, param)
            .then((data) => {
                if (data.status === 'success') {
                    this.goodsCode = data.data.goodsCode;
                } else {
                    console.log(data)
                }
            })
            .catch((error) => {
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
            });
    }

    fetchData() {

        this.isLoadingMore = true;
        // 请求数据时显示菊花
        this.setState({
            isLoadingTail: true,
        });

        // let uri = Config.BASE_URL + Config.API_FAMILY_LIST;
        let uri = Config.BASE_URL + Config.API_DOCTOR_DIALOGUE;
        // let uri = 'http://rap2api.taobao.org/app/mock/1368/GET/goodslist';
        let param = {
            senderCode: this.senderCode,
            receiverCode: this.receiverCode,
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
                    //总记录数大于10条，则从下至上显示
                    if (data.total > CACHE_RESULTS.rowCount) {
                        this.setState({
                            inverted: true
                        });
                    } else {
                        this.scrollToBottom();
                    }
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

    renderListEmptyComponent() {
        // return(
        //     <View></View>
        // )
        return (
            this.state.data ?
                <View style={{alignItems: 'center', marginTop: Px2dp(30)}}>
                    {/*<Image source={require('../../../Resource/Imags/ic_default_bl.png')}/>*/}
                    <Text style={{fontSize: 14, color: 'rgb(196,196,196)'}}>~杳无音讯~</Text>
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
        if (!this.hasMore() && CACHE_RESULTS.total !== 0 && this.state.data.length > CACHE_RESULTS.rowCount) {
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', margin: Px2dp(30)}}>
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
                marginVertical: Px2dp(30)
            }}>
                <ActivityIndicator animating={true} size='small'/>
                <Text style={{fontSize: 14, marginLeft: Px2dp(10)}}>数据加载中...</Text>
            </View>
        )
    }

    //old
    fetchData2(data) {
        //拼接参数
        let PARAM = {};
        PARAM.senderCode = "9";
        PARAM.receiverCode = data;
        //翻页
        PARAM.current = 1;
        PARAM.rowCount = 100;

        //发送请求
        this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_DOCTOR_DIALOGUE, PARAM)
            .then((data) => {
                this.setState({
                    data: data.rows
                });
                // this.onScroll()
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
            })
            .done()
    }

    fetchDialogue(data) {
        let re_relaId = this.props.navigation.state.params.re_relaId;
        this.fetchData(re_relaId)
    }

    scrollToBottom() {

        //数据时 才做滚动到底部
        if (this.refs._flatlist.props.data.length > 0) {
            setTimeout(() => {
                // this.refs._flatlist.scrollToEnd()
                this.refs._flatlist.scrollToIndex({viewPosition: 1, index: this.refs._flatlist.props.data.length - 1})
                // this.refs._flatlist.scrollToOffset({animated: false, offset: 500});
            }, 10)
        }

    }

    showDetail = (itemId) => {
        if (this.goodsCode === '' || typeof this.goodsCode === "undefined") {
            DeviceEventEmitter.emit('toastInfo', '请求参数[goodsCode]错误', 'fail');
            return;
        }
        this.props.navigation.navigate(MoreMenu.HomePage.Evaluate.menu_health_assessment, {
            interactiveId: itemId,
            goodsCode: this.goodsCode,
            callBack: () => this.onRefresh()
        });

    };

    onBtnClick(tab) {
        if (tab === 0) {
            let re_relaId = this.props.navigation.state.params.re_relaId;
            this.props.navigation.navigate(MoreMenu.HomePage.Doctor.menu_doctor_question, {
                callback: (data) => this.fetchDialogue(data),
                re_relaId: re_relaId
            });
        } else if (tab === 1) {
            this.refs._flatlist.scrollToEnd()
        } else if (tab === 2) {
            let re_relaId = this.props.navigation.state.params.re_relaId;
            this.props.navigation.navigate(MoreMenu.HomePage.Doctor.menu_doctor_question_list, {
                // callback: (data) => this.fetchDialogue(data),
                callBack: () => this.onRefresh(),
                re_relaId: re_relaId
            });
        }
    }


    onDetail(target) {
        // 0：代表医生发送,1：代表自己发送的
        if (target == 0) {
            // alert('我医生')
            this.props.navigation.navigate(MoreMenu.HomePage.Doctor.menu_doctor_dialogue_details, {re_relaId: this.props.navigation.state.params.re_relaId})
        }
        if (target == 1) {
            // alert('我用户数据')
            this.props.navigation.navigate(MoreMenu.Profile.Record.menu_record, {re_relaId: this.props.navigation.state.params.re_relaId})
        }
    }

    renderItem(item) {
        let re_relaId = this.props.navigation.state.params.re_relaId;
        return (
            <View style={{
                flexDirection: 'row',
                marginBottom: Px2dp(10),
                marginTop: Px2dp(10),
                justifyContent: 'space-between',
                padding: 10,
            }}>

                {item.item.receiverCode === this.receiverCode ?
                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.onDetail(0)}>
                        < Image
                            style={{
                                width: Px2dp(100),
                                height: Px2dp(100),
                                borderRadius: Px2dp(50),
                                borderWidth: 4,
                                borderColor: 'white'
                            }}
                            source={require('../../../icons/task_icon/huanglin.png')}/>
                    </TouchableOpacity>
                    :
                    <View style={{width: Px2dp(100), height: Px2dp(100)}}/>
                }

                <View style={{

                    marginTop: Px2dp(20),
                    backgroundColor: 'white',
                    width: theme.screenWidth * 0.6,
                    height: Px2dp(100),
                    borderRadius: 6

                }}>
                    <Text>{item.item.messageContent}</Text>
                </View>

                {item.item.senderCode === this.receiverCode ?
                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.onDetail(1)}>
                        < Image
                            style={{
                                width: Px2dp(100),
                                height: Px2dp(100),
                                borderRadius: Px2dp(50),
                                borderWidth: 4,
                                borderColor: 'white'
                            }}
                            source={require('../../../icons/task_icon/huanglin.png')}/>
                    </TouchableOpacity>
                    :
                    <View style={{width: Px2dp(100), height: Px2dp(100)}}/>
                }
            </View>

        )
    }

    renderEmpty() {
        return (<View><Text></Text></View>)
    }

    renderRow(rowData) {
        return (
            rowData.item.senderCode === this.receiverCode ?
                <View style={styles.rowCenter}>
                    <View style={styles.mgsRight}>
                        {/*<TouchableOpacity style={{flex: 1, flexDirection: 'row'}}*/}
                        {/*onPress={() => this.showDetail(rowData.item.id)}>*/}
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.msgContent}>
                                {/*<View style={styles.msgTypeContent}>*/}
                                {/*<Text style={styles.msgContentConfirmText}>{rowData.item.messageContent}</Text>*/}
                                {/*</View>*/}
                                <View style={styles.msgContentTop}>
                                    {/*{this.senderPicUrl ?*/}
                                    {/*<Image source={{uri: this.senderPicUrl}}*/}
                                    {/*style={styles.productImage} resizeMode={'stretch'}/>*/}
                                    {/*:*/}
                                    {/*<Image source={require('../../../Resource/Imags/ic_record.png')}*/}
                                    {/*style={styles.productImage} resizeMode={'stretch'}/>*/}
                                    {/*}*/}
                                    <View style={styles.messageContent}>
                                        <View>
                                            {/*<View style={{flexDirection: 'row'}}>*/}
                                            {/*<Text style={styles.productTitle}>123</Text>*/}
                                            {/*<Text style={styles.productTitleSub}>333*/}
                                            {/*{rowData.item.goodsTitle === '' || rowData.item.goodsTitle == null ? '' : '(' + rowData.item.goodsTitle + ')'}*/}
                                            {/*</Text>*/}
                                            {/*</View>*/}
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={styles.productDescribe}
                                                >{rowData.item.messageContent}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/*<View style={styles.msgContentTop}>*/}
                                {/*{rowData.item.goodsMainPicUrl ?*/}
                                {/*<Image source={{uri: rowData.item.goodsMainPicUrl}}*/}
                                {/*style={styles.productImage} resizeMode={'stretch'}/>*/}
                                {/*:*/}
                                {/*<Image source={require('../../../Resource/Imags/ic_record.png')}*/}
                                {/*style={styles.productImage} resizeMode={'stretch'}/>*/}
                                {/*}*/}
                                {/*<View style={styles.productContent}>*/}
                                {/*<View>*/}
                                {/*<View style={{flexDirection: 'row'}}>*/}
                                {/*<Text style={styles.productTitle}>{rowData.item.goodsName}</Text>*/}
                                {/*<Text style={styles.productTitleSub}>*/}
                                {/*{rowData.item.goodsTitle === '' || rowData.item.goodsTitle == null ? '' : '(' + rowData.item.goodsTitle + ')'}*/}
                                {/*</Text>*/}
                                {/*</View>*/}
                                {/*<View style={styles.productContentLine2}>*/}
                                {/*<Text style={styles.productDescribe}*/}
                                {/*numberOfLines={2}>{rowData.item.messageContent}</Text>*/}
                                {/*</View>*/}
                                {/*</View>*/}
                                {/*</View>*/}
                                {/*</View>*/}
                                <View style={styles.msgContentBottom}>
                                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
                                        <Text style={styles.msgContentConfirmText}>{rowData.item.createTime}</Text>
                                        {/*<Text style={styles.msgContentConfirmText}>完成时间{rowData.item.createTime}</Text>*/}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.msgArrowRight}/>
                        </View>
                        {/*</TouchableOpacity>*/}
                        <View style={styles.msgType}>
                            <Image source={require('../../../icons/task_icon/res_photo_man.png')}
                                   style={styles.typeImage} resizeMode={'stretch'}/>
                        </View>
                    </View>
                </View>
                :
                <View style={styles.rowCenter}>
                    <View style={styles.mgsLeft}>
                        <View style={styles.msgType}>
                            <Image source={require('../../../icons/task_icon/icon_home_wdys.png')}
                                   style={styles.typeImage} resizeMode={'stretch'}/>
                        </View>
                        {/* 消息类型，1消息，2即使报告*/}
                        {rowData.item.messageType === '1' ?
                            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}
                                              onPress={() => this.showDetail(rowData.item.id)}>
                                <View style={styles.msgArrowLeft}/>
                                <View style={styles.msgContent}>
                                    {/*<View style={styles.msgTypeContent}>*/}
                                    {/*<Text style={styles.msgContentConfirmText}>推荐服务</Text>*/}
                                    {/*</View>*/}
                                    <View style={styles.msgContentTop}>
                                        {this.senderPicUrl ?
                                            <Image source={{uri: this.senderPicUrl}}
                                                   style={styles.productImage} resizeMode={'stretch'}/>
                                            :
                                            <Image source={require('../../../icons/task_icon/ic_record.png')}
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
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={styles.productDescribe}
                                                          numberOfLines={2}>{rowData.item.messageContent}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.msgContentBottom}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                                            <Text
                                                style={styles.msgContentConfirmText}>{rowData.item.status === '0' ? '未填写' : '已完成'}</Text>
                                            <Text style={styles.msgContentConfirmText}>{rowData.item.createTime}</Text>
                                            {/*<Text style={styles.productCount}>x{good.goodsUintNum}</Text>*/}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            :
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={styles.msgArrowLeft}/>
                                <View style={styles.msgContent}>
                                    {/*<View style={styles.msgTypeContent}>*/}
                                    {/*<Text style={styles.msgContentConfirmText}>风险报告</Text>*/}
                                    {/*</View>*/}
                                    <View style={styles.msgContentTop}>
                                        {/*{this.senderPicUrl ?*/}
                                        {/*<Image source={{uri: this.senderPicUrl}}*/}
                                        {/*style={styles.productImage} resizeMode={'stretch'}/>*/}
                                        {/*:*/}
                                        {/*<Image source={require('../../../Resource/Imags/ic_record.png')}*/}
                                        {/*style={styles.productImage} resizeMode={'stretch'}/>*/}
                                        {/*}*/}
                                        <View style={styles.messageContent}>
                                            <View>
                                                {/*<View style={{flexDirection: 'row'}}>*/}
                                                {/*<Text style={styles.productTitle}>123</Text>*/}
                                                {/*<Text style={styles.productTitleSub}>333*/}
                                                {/*{rowData.item.goodsTitle === '' || rowData.item.goodsTitle == null ? '' : '(' + rowData.item.goodsTitle + ')'}*/}
                                                {/*</Text>*/}
                                                {/*</View>*/}
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={styles.productDescribe}
                                                    >{rowData.item.messageContent}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.msgContentBottom}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                                            <Text
                                                style={styles.msgContentConfirmText}>风险报告</Text>
                                            <Text style={styles.msgContentConfirmText}>{rowData.item.createTime}</Text>
                                            {/*<Text style={styles.productCount}>x{good.goodsUintNum}</Text>*/}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </View>


        )
            ;
    };

    render() {
        return (
            <View style={{flex: 1,}}>

                {/*<View*/}
                {/*style={{height: ScreenUtil.screenSize.height - Px2dp.getHeight(100) - (Platform.OS === 'ios' ? 64 : 74)}}>*/}
                {/*<FlatList*/}
                {/*ref="_flatlist"*/}
                {/*data={this.state.data}*/}
                {/*renderItem={(item) => this.renderRow(item)}*/}
                {/*keyExtractor={(item, index) => index}*/}
                {/*getItemLayout={(data, index) => ({length: 100, offset: (100) * index, index})}*/}
                {/*automaticallyAdjustContentInsets={true}*/}
                {/*ListEmptyComponent={() => this.renderEmpty()}*/}

                {/*/>*/}
                {/*</View>*/}

                <FlatList
                    ref='_flatlist'
                    getItemLayout={(data, index) => ({length: 100, offset: (100) * index, index})}
                    data={this.state.data}
                    ListEmptyComponent={() => this.renderListEmptyComponent()}
                    renderItem={(rowData) => this.renderRow(rowData)}
                    keyExtractor={(item, index) => index}
                    // onRefresh={() => this.onRefresh()}
                    refreshing={this.state.refreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.fetchMoreData()}
                    ListFooterComponent={() => this.renderFooter()}
                    inverted={this.state.inverted}
                />


                <View style={styles.bottomBtn}>
                    <View style={{backgroundColor:'#F0F0F0',height:Px2dp(70),width:Px2dp(580)}}>
                        <TextInput
                            style={styles.inputStyle}
                            textAlignVertical={'center'}
                            autoCapitalize='none'
                            clearButtonMode={'always'}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.onPlusClick()}>

                        < Image
                            style={{marginLeft:Px2dp(20)
                            }}
                            source={require('../../../icons/task_icon/plus.png')}/>

                    </TouchableOpacity>
                </View>


                {this.displayIndex()}


                {/*<View style={styles.bottomBtn}>*/}
                {/*<TouchableOpacity activeOpacity={0.9} onPress={() => this.onBtnClick(0)} >*/}
                {/*<View style={styles.btnLeft}><Text>查看报告</Text></View>*/}
                {/*</TouchableOpacity>*/}
                {/*/!*<TouchableOpacity activeOpacity={0.9} onPress={() => this.onBtnClick(1)}>*!/*/}
                {/*/!*<View style={styles.btnRight}><Text>申请转诊</Text></View>*!/*/}
                {/*/!*</TouchableOpacity>*!/*/}
                {/*</View>*/}
            </View>
        );
    }

    onPlusClick(){

        this.setState({
            flag: !this.state.flag
        });
    }

    displayIndex(){
        if(this.state.flag){
            return <View style={{height:Px2dp(200),backgroundColor:'#FCFCFC',
                flexDirection: 'row',
                justifyContent: 'space-around',}}>
                <View style={{height:Px2dp(50)}}>
                    < Image
                        style={{marginTop:Px2dp(20),
                            height:Px2dp(110),
                            width:Px2dp(110)
                        }}
                        source={require('../../../icons/task_icon/sfmb.png')}/>
                    <Text style={{marginTop:Px2dp(8)}}>随访模板</Text>
                </View>
                <View style={{height:Px2dp(50)}}>
                    < Image
                        style={{marginTop:Px2dp(20),
                            height:Px2dp(110),
                            width:Px2dp(110)
                        }}
                        source={require('../../../icons/task_icon/sfgl.png')}/>
                    <Text style={{marginTop:Px2dp(8)}}>随访管理</Text>
                </View>
                <View style={{height:Px2dp(50)}}>
                    < Image
                        style={{marginTop:Px2dp(20),
                            height:Px2dp(110),
                            width:Px2dp(110)
                        }}
                        source={require('../../../icons/task_icon/tjsc.png')}/>
                    <Text style={{marginTop:Px2dp(8)}}>推荐商城</Text>
                </View>
                <View style={{height:Px2dp(50)}}>
                    < Image
                        style={{marginTop:Px2dp(20),
                            height:Px2dp(110),
                            width:Px2dp(110)
                        }}
                        source={require('../../../icons/task_icon/tslb.png')}/>
                    <Text style={{marginTop:Px2dp(8)}}>推送量表</Text>
                </View>
            </View>;
        }else{
            return <View/>
        }
    }


}

const styles = StyleSheet.create({
    // bottomBtn: {
    //     // alignItems: 'flex-start',
    //     // borderBottomWidth: 1,
    //     justifyContent: 'space-between',
    //     flexDirection: 'row',
    //     position: 'absolute',
    //     bottom: 0,
    //     backgroundColor: 'white',
    //     width: '100%',
    //     height: Px2dp.getHeight(100),
    //     alignItems: 'center',
    // },
    btnLeft: {
        // flex:1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // width: ScreenUtil.screenSize.width,
        width: '100%',
        height: Px2dp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36c4ca'
    },
    btnRight: {
        width: theme.screenWidth * 0.5,
        height: Px2dp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    //待办任务
    rowCenter: {
        paddingVertical: Px2dp(20),
        paddingHorizontal: Px2dp(20),
        flexDirection: 'row',
        // alignItems: 'flex-start',
        // borderBottomWidth: 1,
        justifyContent: 'space-between',
        // borderBottomColor: 'rgb(244,244,244)',
        // backgroundColor: 'rgb(240,240,240)',
        // borderWidth: 1
    },
    mgsLeft: {
        flex: 1,
        flexDirection: 'row',
        // borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginRight: Px2dp(130),
    },
    mgsRight: {
        flex: 1,
        flexDirection: 'row',
        // borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginLeft: Px2dp(130)
    },
    msgType: {
        // borderWidth: 1,
        width: Px2dp(100),
        height: Px2dp(100),
        // backgroundColor: 'white',
        // borderRadius: 5,
    },
    msgArrowLeft: {
        marginLeft: Px2dp(10),
        marginTop: Px2dp(40),
        width: 0,
        height: 0,
        borderTopColor: 'transparent',
        borderTopWidth: Px2dp(15),
        borderRightColor: 'white',
        borderRightWidth: Px2dp(20),
        borderBottomColor: 'transparent',
        borderBottomWidth: Px2dp(15),
    },
    msgArrowRight: {
        marginRight: Px2dp(10),
        marginTop: Px2dp(40),
        width: 0,
        height: 0,
        borderTopColor: 'transparent',
        borderTopWidth: Px2dp(15),
        borderLeftColor: 'white',
        borderLeftWidth: Px2dp(20),
        borderBottomColor: 'transparent',
        borderBottomWidth: Px2dp(15),
    },
    msgContent: {
        flex: 1,
        // borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: Px2dp(20),
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
        // borderTopWidth: 1,
        // borderTopColor: 'rgb(244,244,244)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)',
        paddingVertical: Px2dp(10),
    },
    msgContentTopLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgb(244,244,244)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(244,244,244)',
        paddingVertical: Px2dp(10),
    },
    msgContentBottom: {
        marginTop: Px2dp(10),
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // borderWidth: 1
    },
    typeImage: {
        height: Px2dp(100),
        width: Px2dp(100),
    },
    msgContentConfirmText: {
        fontSize: 15,
        color: 'rgb(153,153,153)',
        // textAlignVertical: 'bottom',
    },
    productImage: {
        height: Px2dp(80),
        width: Px2dp(80),
        borderRadius: Px2dp(40)
    },
    productContent: {
        flex: 1,
        // height: Px2dp.getHeight(140),
        marginLeft: Px2dp(20),
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    messageContent: {
        flex: 1,
        // height: Px2dp.getHeight(140),
        // marginLeft: Px2dp.getWidth(20),
        justifyContent: 'space-between',
        flexDirection: 'column'
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
        marginLeft: Px2dp(10)
    },
    productDescribe: {
        fontSize: 15,
        // color: 'rgb(196,196,196)',
        color: '#333333',
    },
    productPriceTotal: {
        fontSize: 15,
        color: 'rgb(196,196,196)',
    },
    bottomBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Px2dp(100),
        backgroundColor: '#FFFFFF',
    },
    navigatePressRight: {
        fontSize: 15,
        color: 'white',
    },
    inputStyle:{
        borderWidth:1,
        borderColor:'red',
        backgroundColor:'#E0E0E0',
        marginLeft:Px2dp(15),
        borderColor:'transparent',
        borderRadius:0,
        height:Px2dp(86),
        flex:1,
        backgroundColor:'transparent',
    },
});

