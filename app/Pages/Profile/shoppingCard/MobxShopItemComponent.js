import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';

import Px2dp from '../../../Common/px2dp'
import { observer } from 'mobx-react/native';
import { action, observe } from 'mobx';



@observer
export default class MobxShopItemComponent extends Component {

    static propTypes = {
        itemData : PropTypes.object.isRequired,
        data : PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.itemData = this.props.itemData;
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener('allSelect', (isSelAll) => {
            this.itemData.isSelect = isSelAll;
        })
    };

    componentWillUnmount() {
        this.subscription && this.subscription.remove();
    };

    @action
    selectPress = () => {
        this.itemData.isSelect = !this.itemData.isSelect;
        let money = this.itemData.money * this.itemData.count;
        if (this.itemData.isSelect) {
            this.props.data.increase(money);
        }
        else {
            this.props.data.reduce(money)
        }
        this.props.data.itemPress();
    };

    @action
    undock=()=>{
        this.itemData.isRemove = !this.itemData.isRemove;
        let money=this.itemData.money;
        if (this.itemData.isRemove==true){
            this.props.data.reduce(money)
        }
        this.props.data.undock(this.itemData)
    };

    @action
    increase = () => {

        this.itemData.count += 1;
        if (this.itemData.isSelect) {
            this.props.data.increase(this.itemData.money);
        }else{
            this.itemData.isSelect = !this.itemData.isSelect;
            this.props.data.increase(this.itemData.money * this.itemData.count);
        }

    };

    @action
    reduce = () => {
        debugger;
        if (this.itemData.count <= 1) {
            if(this.itemData.isSelect){
                this.itemData.isSelect = !this.itemData.isSelect;
                this.props.data.reduce(this.itemData.money);
            }
            return;
        }
        this.itemData.count -= 1;
        if (this.itemData.isSelect) {
            this.props.data.reduce(this.itemData.money);
        }
    };

    render() {
        return (
            <View style={ styles.container }>
                <TouchableOpacity
                    style={{ marginLeft : 15 }}
                    onPress={ this.selectPress }>
                    <Image source={ this.itemData.isSelect ?
                        require('../../../Resource/Imags/login_radio_selected.png')
                        : require('../../../Resource/Imags/login_radio_normall.png')}/>
                </TouchableOpacity>
                <View style={ styles.right }>
                    <Text style={ styles.nameStyle } numberOfLines={ 2 }>{ this.itemData.name }</Text>
                    <View style={ styles.right_bot}>
                        < Text style={ styles.moneyStyle }>￥{ this.itemData.money }</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={ this.undock} style={{width:Px2dp.getWidth(120),height:Px2dp.getHeight(120),justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../../Resource/Imags/ic_cart_item_del.png')}  style={{width:Px2dp.getWidth(26),height:Px2dp.getHeight(26)}} />
                </TouchableOpacity>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : 'white',
        paddingRight:Px2dp.getWidth(30),
        height:Px2dp.getHeight(120)
    },
    right : {
        marginLeft : 10,
        flex : 1,
        marginTop : 10,
        marginBottom : 10,
    },
    nameStyle : {
        fontSize : 14,
        color : 'rgb(153,153,153)'
    },
    right_bot : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 1,
        alignItems : 'center',
    },
    moneyStyle : {
        fontSize : 16,
        color : 'rgb(250,59,59)'
    }
});

