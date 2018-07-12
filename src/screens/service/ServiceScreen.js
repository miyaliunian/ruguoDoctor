/**
 * Created by wufei on 2018/6/27.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView,
    Platform,
    DeviceEventEmitter
} from 'react-native';
import RefreshListView ,{RefreshState} from 'react-native-refresh-list-view'
import theme from '../../config/theme'
import {Config} from '../../config/config'
import Px2dp from '../../common/px2dp'
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons'
import DataRepository from '../../common/dataRepository'
import Cell from './cell/Cell'
import {inject} from 'mobx-react/native'


const CACHE_RESULTS = {
    current: 1,//当前页
    rowCount: 10,//每页显示数
    total: 0,//总记录数
    rows: [],//数据集
};

@inject('account')
export default class ServiceScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: '服务对象',
        headerRight: (
            <HeaderButtons IconComponent={Icon} OverflowIcon={<Icon name="ios-more" size={23} color="#cccccc"/>}
                           iconSize={23} color={theme.navItemColor}>
                <HeaderButtons.Item title="add" iconName="ios-menu" onPress={() => console.warn('add')}/>
            </HeaderButtons>
        ),

    });

    constructor(props) {
        super(props)
        this.dataRepository = new DataRepository();
        this.renderRow = this.renderRow.bind(this)
        this.onHeaderRefresh = this.onHeaderRefresh.bind(this)
        this.onFooterRefresh = this.onFooterRefresh.bind(this)
        this.isLoadingMore = false;
        this.state = {
            data: '',
            refreshState: RefreshState.HeaderRefreshing,
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        let {account} = this.props;
        this.code = account.code;
        this.fetchData();
    }

    fetchData() {
        let PARAM = {
            //医生编号
            code : this.code,
            current: 1,
            rowCount: Config.rowCount
        };
        this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_ServiceAllList, PARAM)
            .then((data) => {
                if (data && data.rows) {
                    let item = CACHE_RESULTS.rows.slice();
                    item = item.concat(data.rows);
                    CACHE_RESULTS.rows = item;
                    CACHE_RESULTS.current += 1;
                    CACHE_RESULTS.total = data.total;
                    this.setState({
                         refreshState: RefreshState.Idle,
                        data: CACHE_RESULTS.rows,
                    });
                } else {
                    this.setState({
                        refreshState: RefreshState.NoMoreData,
                        data: CACHE_RESULTS.rows,
                    });
                }
            })
            .catch((error) => {
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
                this.setState({
                    refreshState: RefreshState.Failure,
                    data: CACHE_RESULTS.rows,
                });
            });
    }

    fetchMoreData(pageNum ,code ){
        this.setState({
            refreshState: RefreshState.FooterRefreshing,
        });
        let PARAM = {
            //医生编号
            code : code,
            current: pageNum,
            rowCount: CACHE_RESULTS.rowCount
        };
        this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_ServiceAllList, PARAM)
            .then((data) => {
            
                if (data && data.rows) {
                    let item = CACHE_RESULTS.rows.slice();
                    item = item.concat(data.rows);
                    CACHE_RESULTS.rows = item;
                    CACHE_RESULTS.current += 1;
                    CACHE_RESULTS.total = data.total;
                    this.setState({
                        refreshState: RefreshState.Idle,
                        data: CACHE_RESULTS.rows,
                    });
                } else {
                    this.setState({
                        refreshState: RefreshState.NoMoreData,
                        data: CACHE_RESULTS.rows,
                    });
                }
            })
            .catch((error) => {
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
                this.setState({
                    refreshState: RefreshState.Failure,
                    data: CACHE_RESULTS.rows,
                });
            });
    }

    onHeaderRefresh(){
        //下拉刷新重新加载数据
        this.fetchData()
    }

    onFooterRefresh ()  {
        //没有更多数据
        if (CACHE_RESULTS.total <= CACHE_RESULTS.rows.length){
            this.setState({
                refreshState: RefreshState.NoMoreData,
            });
            return
        }
        //加载更多数据
        pageNum = CACHE_RESULTS.current //页码
        code = this.code// 医生编号

        this.fetchMoreData(pageNum ,code )
    }

    cellClick(rowData) {
        console.log(rowData)
    }

    renderRow(rowData, index) {
        return <Cell data={rowData.item} index={index} callback={() => this.cellClick(rowData)}/>
    }

    separatorView = () => {
        return <View style={theme.line}/>;
    };

    render() {
        return (

                <View style={theme.root_container}>
                    <View style={{
                        height: Px2dp(90),
                        backgroundColor: 'white',
                        borderBottomWidth: 1,
                        borderBottomColor: '#dddddd',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            borderRadius: Px2dp(30),
                            flexDirection: 'row',
                            padding: Px2dp(10),
                            backgroundColor: 'white',
                            marginHorizontal: Px2dp(20),
                            shadowOffset: {width: 0, height: 0},
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                        }}>
                            <Icon name="ios-search" size={20}/>
                            <TextInput
                                underlineColorAndroid={"transparent"}
                                placeholder={"输入查询条件"}
                                placeholderTextColor={"grey"}
                                style={{flex: 1, fontWeight: "700", backgroundColor: 'white'}}
                            />
                        </View>
                    </View>
                    <View style={theme.line_space_10}/>
                    <RefreshListView
                        data={this.state.data}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderRow}
                        refreshState={this.state.refreshState}
                        onHeaderRefresh={this.onHeaderRefresh}
                        onFooterRefresh={this.onFooterRefresh}

                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    subTxt: {
        fontSize: 14,
        marginLeft: Px2dp(24)
    }
});

