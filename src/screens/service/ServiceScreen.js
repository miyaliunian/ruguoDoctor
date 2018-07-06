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
    Image,
    DeviceEventEmitter
} from 'react-native';
import PageListView from 'react-native-page-listview'
import theme from '../../config/theme'
import {Config} from '../../config/config'
import Px2dp from '../../common/px2dp'
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons'
import DataRepository from '../../common/dataRepository'
import Cell from './cell/Cell'

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
        this.state = {
            data: '',//数据
            dataCounts:'',//总数据条数
        }
    }

    componentWillMount() {
        // ////debugger
        this.startHeaderHeight = 80;
    }

    componentDidMount() {
        // ////debugger
        let {account} = this.props;
        //this.code = account.code;
        this.code = '05eae86bddeb4142a24b5eea30249dbf';
        console.log(account)
    }


    renderRow(rowData, index) {
        return <Cell data={rowData} index = {index}/>
    }

    separatorView = () => {
        return <View style={theme.line}/>;
    };

    refresh = (callBack) => {
         ////debugger
        let PARAM = {};
        //医生变好
        PARAM.code = '05eae86bddeb4142a24b5eea30249dbf'
        //当前第几页
        PARAM.current = "1"
        //每次请求数据总数
        PARAM.rowCount = Config.rowCount
        this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_ServiceAllList, PARAM)
            .then((data) => {
                //debugger
                this.setState({
                    dataCounts:data.total
                })
                //debugger
                let arr = data.rows
                callBack(arr);

            })
            .catch((err) => {
                DeviceEventEmitter.emit('ToastInfo', err.status, 'stop');
            })
            .done()
    }

    loadMore=(page,callBack)=>{
        //debugger
        let PARAM = {};
        //医生编号
        PARAM.code = '05eae86bddeb4142a24b5eea30249dbf'
        //当前第几页
        PARAM.current = page
        //每次请求数据总数
        PARAM.rowCount = Config.rowCount
        this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_ServiceAllList, PARAM)
            .then((data) => {
                //debugger
                //if ( undefined == data.rows) return;
                let arr = data.rows
                callBack(arr);

            })
            .catch((err) => {
                DeviceEventEmitter.emit('ToastInfo', err.status, 'stop');
            })
            .done()

    };


    render() {
        return (
            <SafeAreaView style={theme.root_container}>
                <View style={{flex: 1}}>
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
                    {/*列表*/}
                    <PageListView
                        pageLen = {this.state.dataCounts}
                        renderRow={this.renderRow}
                        refresh={this.refresh}
                        loadMore={this.loadMore}
                        ItemSeparatorComponent = {this.separatorView}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    subTxt: {
        fontSize: 14,
        marginLeft: Px2dp(24)
    }
});

