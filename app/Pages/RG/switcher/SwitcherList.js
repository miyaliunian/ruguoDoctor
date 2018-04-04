/**
 * Created by wufei on 2018/1/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
    FlatList
} from 'react-native';
import Px2dp from '../../../Common/px2dp';
import ScreenUtil from '../../../Common/screenUtil';
import MemberCell from './MemberCell'
import DataRepository from '../../../Expand/Dao/DataRepository'

import SwitcherMobxStore from './SwitcherMobxStore';
let ScrollItem = require('./ScrollItem.json');
import {observer} from 'mobx-react/native';
import {action, observe} from 'mobx';
import RiskItemBtn from './RiskItemBtn'
@observer
export default class SwitcherList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            isLoadingTail: false//标识数据是否加载中
        };
        this.dataRepository = new DataRepository();
        this.data = new SwitcherMobxStore();
    }

    componentDidMount() {
        this.data.replace(ScrollItem.datas);
        this.fetchData();
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    navigatePressRight = () => {
        // this.props.navigation.goBack();
    };

    fetchData() {
        this.setState({
            isLoadingTail: true
        });
        let url = 'http://rap2api.taobao.org/app/mock/2902/POST/api/switcher';
        // this.dataRepository.postJsonRepository(Config.BASE_URL + Config.API_SHOP_CENTER, '')
        this.dataRepository.postJsonRepository(url)
            .then((data) => {
            debugger;
                if (data.success) {
                    this.setState({
                        data: data.datas,
                        isLoadingTail: false //数据加载成功后，隐藏菊花
                    })
                }
            })
            .catch((err) => {
                DeviceEventEmitter.emit('toastInfo', err.status, 'sad');
                this.setState({
                    isLoading: false, //数据加载成功后，隐藏菊花
                })
            })
            .done()
    }

    renderItem(item) {
        return <MemberCell image={item.item.avatar}
                           name={item.item.name}
                           relationship={item.item.relationship}
                           gender={item.item.gender}
                           age={item.item.age}
                           keyword={item.item.healthStatus}
                           callback={() => this.onHealthItemClick(MoreMenu.HomePage.menu_health_info_detail, item.item.id)}/>
    }

    onRefresh() {}

    separatorView = () => {
        return <View style={GlobalStyles.line}/>;
    };

    renderHeader() {
        return (
            <View style={{
                backgroundColor: "white",
                flexDirection: "row",
                height: Px2dp.getHeight(100),
                justifyContent: 'center',
                alignItems: "center"
            }}>
                <Text style={styles.subTitle}>选择家人</Text>
            </View>
        )
    }
    renderFooter() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {/*<Text style={{fontSize: 14}}>~~已经到底啦~~</Text>*/}
            </View>
        )
    }

    addTarget(target) {
        let {navigation} = this.props;
        navigation.navigate(target, {title: '添加人家'});
    }

    @action
    selectPress(itemData) {
        itemData.isSelect = !itemData.isSelect;
    };

    renderHealthCell() {
        let row = [];
        let itemArr = [];
        var dates = this.data.itemData;
        let rowNum = dates.length / 3;
        let lastRowNum = dates.length % 3;
        for (let i = 0; i < dates.length; i++) {
            let data = dates[i];
            itemArr.push(<RiskItemBtn
                    title={data.title}
                    isSelect={data.isSelect}
                    key={i}
                    callback={() => this.selectPress(data)}
                />
            );
            if (i + lastRowNum % 3 == dates.length) {
                row.push(<View key={i} style={{flexDirection: 'row', marginTop: Px2dp.getHeight(40)}}>
                    {itemArr}
                </View>)
            }
            else {

                if ((i + 1) % 3 == 0) {
                    row.push(<View key={i} style={{flexDirection: 'row', marginTop: Px2dp.getHeight(40)}}>
                        {itemArr}
                    </View>);
                    itemArr = [];
                }
            }
        }
        return row
    }

    render() {
        return (
            <View style={GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={'切换'}
                    rightButton={ViewUtil.getRightButton(title='说明',() => this.navigatePressRight())}
                />
                {/*健康状态*/}
                <View style={styles.line}/>
                <View style={{
                    paddingTop: Px2dp.getHeight(30),
                    paddingBottom: Px2dp.getHeight(20),
                    backgroundColor: 'white'
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}><Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: 'rgb(51,51,51)',
                    }}>请选择健康状态</Text></View>
                    {this.renderHealthCell()}
                </View>
                <View style={GlobalStyles.line_space_10}/>
                <FlatList
                    data={this.state.data}
                    renderItem={(item) => this.renderItem(item)}
                    ItemSeparatorComponent={this.separatorView}
                    keyExtractor={(item, index) => index}
                    initialNumToRender={5}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isLoadingTail}
                    ListHeaderComponent={() => this.renderHeader()}
                    ListFooterComponent={() => this.renderFooter()}
                />
                <View style={GlobalStyles.line}/>
                <TouchableOpacity onPress={() => this.addTarget(MoreMenu.HomePage.Switch.menu_home_switch_add)}
                                  activeOpacity={0.6}>
                    <View style={styles.btnContainer}>
                        <Image style={{marginRight: Px2dp.getHeight(10)}}
                               source={require('../../../Resource/Imags/add-service.png')} resizeMode={'center'}/>
                        <Text style={styles.btnTitle}>添加家人信息</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        height: Px2dp.getHeight(160),
        backgroundColor: 'white',
        paddingTop: Px2dp.getHeight(30),

    },
    headerTitle: {
        fontSize: 15,
        color: 'rgb(51,51,15)',
        fontWeight: "800"
    },
    headerBody: {
        width: ScreenUtil.screenSize.width - Px2dp.getWidth(152),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Px2dp.getHeight(20)
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,208,96)',
        width: Px2dp.getWidth(260),
        height: Px2dp.getHeight(60),
        borderRadius: Px2dp.getWidth(6),
    },
    subTitle: {
        fontSize: 12,
        color: 'rgb(51,51,15)'
    },
    btnContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: Px2dp.getHeight(125)
    },
    btnTitle: {
        fontSize: 13,
        color: 'rgb(153,153,153)'
    }
});

