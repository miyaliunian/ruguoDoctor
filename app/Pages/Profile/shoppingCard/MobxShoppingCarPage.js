import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import {observer} from 'mobx-react/native';
import {action, autorun} from 'mobx';

import MobxStore from './MobxStore';
import MobxShopItemComponent from './MobxShopItemComponent';
import GlobalStyles from '../../../Common/GlobalStyles'
import NavigationBar from '../../../Component/NavigationBar'
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'


let jsonData = require('./shoping.json');

@observer
export default class MobxShoppingCarPage extends Component {
    // static navigationOptions = ({navigation}) => ({
    //     headerStyle: {backgroundColor: 'rgb(255,208,96)'},
    //     headerTitle: '购物车',
    //     headerTitleStyle: {alignSelf: 'center'},
    //     headerTintColor: GlobalStyles.headerTintColor,
    //     headerLeft: (ViewUtil.getLeftButton(navigation.state.params.navigatePressLeft)),
    // });

    constructor(props) {
        super(props);
        this.data = new MobxStore();
    };

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft
        });

        this.data.replace(jsonData)
    };

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };

    @action
    allSelect = () => {
        DeviceEventEmitter.emit('allSelect', !this.data.itemData.isAllSelect);
        this.data.selectAll();
    };

    renderItem = (item) => {
        return (
            <MobxShopItemComponent itemData={ item } data={ this.data }/>
        )
    };

    separatorView = () => {

        return <View style={GlobalStyles.line}/>;

    };

    keyExtractor = (item) => item.name;

    render() {
        return (
            <View style={ GlobalStyles.root_container}>
                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={'购物车'}/>
                <TouchableOpacity onPress={ this.allSelect }>
                    <View style={{
                        flexDirection: 'row',
                        height: Px2dp.getHeight(60),
                        backgroundColor: 'white',
                        paddingLeft: Px2dp.getWidth(30),
                        alignItems: 'center'
                    }}>
                        <Image
                            source={ this.data.itemData.isAllSelect ?
                                require('../../../Resource/Imags/login_radio_selected.png')
                                : require('../../../Resource/Imags/login_radio_normall.png') }
                        />
                        <Text style={{color: 'rgb(51,51,51)', marginLeft: Px2dp.getWidth(20)}}>全选</Text>
                    </View>
                </TouchableOpacity>
                <View style={GlobalStyles.line_space_13}/>
                <FlatList data={ this.data.itemData.datas}
                          ItemSeparatorComponent={ this.separatorView }
                          renderItem={ ({item}) => this.renderItem(item) }
                          keyExtractor={ this.keyExtractor }

                />
                <View style={ styles.tool }>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={ styles.select } onPress={ this.allSelect }>
                            <Image source={ this.data.itemData.isAllSelect ?
                                require('../../../Resource/Imags/login_radio_selected.png')
                                : require('../../../Resource/Imags/login_radio_normall.png') }/>

                        </TouchableOpacity>
                        <View style={{flexDirection: 'column',marginLeft:Px2dp.getWidth(10)}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: 3, color: 'rgb(250,59,59)', fontSize: 16}}>合计:</Text>
                                <Text style={[styles.allMoneyText, {color: 'rgb(250,59,59)', fontSize: 16}]}>
                                    ￥{ this.data.itemData.totalMoney }
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{marginLeft: 3, color: 'rgb(153,153,153)', fontSize: 12}}>满减优惠</Text>
                                <Text style={ [styles.allMoneyText, {color: 'rgb(153,153,153)', fontSize: 12}]}>
                                    ￥{ this.data.itemData.totalMoney }
                                </Text>
                            </View>
                        </View>

                    </View>
                    <TouchableOpacity style={ styles.balance } onPress={ this.allSelect }>
                        <Text style={ styles.balanceText }>去结算</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    select: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },

    allMoneyText: {
        fontSize: 16,
        marginLeft: Px2dp.getWidth(5)
    },
    tool: {
        height: Px2dp.getHeight(120),
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: Px2dp.getWidth(30),
        backgroundColor: 'white'
    },
    balance: {
        width: Px2dp.getWidth(100),
        height: Px2dp.getHeight(40),
        backgroundColor: 'rgb(247,133,133)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    balanceText: {
        fontSize: 12,
        color: 'rgb(255,255,255)'
    }
});