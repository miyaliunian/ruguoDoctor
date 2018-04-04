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
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import LoadingModal from '../../../Component/LoadingModal'

@observer
export default class MobxShopItemComponent extends Component {

    static propTypes = {
        itemData : PropTypes.object.isRequired,
        data : PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.itemData = this.props.itemData;
        this.dataRepository = new DataRepository();
        this.state = {
            showModal: false,
            showModalTitle: '正在加载',
        }
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
    updateAddress = (obj) => {
        //alert(JSON.stringify(this.itemData));
        this.props.navigation.navigate('addressEdit', {...this.itemData});
    };
    @action
    delAddress = (obj) => {
        //alert(obj.id);
        this.setState({
            showModal: true
        });
        //逻辑删除地址，调用服务器，修改方法
        let url = FLAG_STORAGE.serverUrl + "/personaldata/momemberaddresslist/save";
        let params = {id : obj.id,delFlag:'1',isDefault:'0'};
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    // this.refs.toast.show('删除地址成功', DURATION.LENGTH_LONG);
                    DeviceEventEmitter.emit('showToastAddress','删除地址成功');
                    //alert('删除地址成功');
                    // alert(JSON.stringify(this.itemData));
                    this.itemData.delFlag = '1';
                    this.props.data.undock(this.itemData)

                } else {
                    // this.refs.toast.show(response.msg, DURATION.LENGTH_LONG);
                    DeviceEventEmitter.emit('showToastAddress','删除地址失败');
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });
                DeviceEventEmitter.emit('showToastAddress','服务器异常');
            })
            .done();
    };
    //选择默认地址
    @action
    selectPress = (obj) => {
        debugger;
        this.setState({
            showModal: true
        });
        let url = FLAG_STORAGE.serverUrl + "/personaldata/momemberaddresslist/selectDefault";
        let params = {memberCode: '5eebe460bf2b458fb7a0a2101768599b',id : obj.id};
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    // this.refs.toast.show('选择默认地址成功', DURATION.LENGTH_LONG);
                    DeviceEventEmitter.emit('showToastAddress','选择默认地址成功');
                    for(var i=0;i<this.props.data.itemData.length;i++){

                        if(obj.id==this.props.data.itemData[i].id){
                            this.props.data.itemData[i].isDefault = 1;
                        }else{
                            this.props.data.itemData[i].isDefault = 0;
                        }
                    }
                } else {
                    // this.refs.toast.show(response.msg, DURATION.LENGTH_LONG);
                    DeviceEventEmitter.emit('showToastAddress','选择默认地址失败');
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });
                // this.refs.toast.show(error.status, DURATION.LENGTH_LONG);
                DeviceEventEmitter.emit('showToastAddress','服务器异常');
            })
            .done();
       // alert(JSON.stringify(this.props.data.itemData.datas));


        //this.itemData.isSelect = !this.itemData.isSelect;
        // let money = this.itemData.money * this.itemData.count;
        // if (this.itemData.isSelect) {
        //     this.props.data.increase(money);
        // }
        // else {
        //     this.props.data.reduce(money)
        // }
        // this.props.data.itemPress();
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
            <View style={{backgroundColor: "white", marginTop: 10, paddingRight: 15}}>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Text style={{
                        marginLeft: 20,
                        fontWeight: 'bold',
                        fontSize: 16,
                        width: 60,
                        alignSelf: 'center'
                    }}>{this.itemData.personName}</Text>
                    <Text style={{alignSelf: 'center', fontSize: 14}}>{this.itemData.mobilePhone}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                    <Text style={{marginLeft: 20, fontSize: 12}}>{this.itemData.address}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    marginBottom: 8,
                    justifyContent: 'space-between'
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{marginLeft: 20, alignSelf: 'center'}}
                            onPress={() => this.selectPress(this.itemData)}>
                            <Image source={this.itemData.isDefault==1 ?
                                require('../../../Resource/Imags/address-selected.png')
                                : require('../../../Resource/Imags/login_radio_normall.png')}/>
                        </TouchableOpacity>
                        <Text style={{marginLeft: 10, alignSelf: 'center', fontSize: 12}}>默认地址</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{flexDirection: 'row',marginLeft: 20, alignSelf: 'center'}}
                            onPress={() => this.updateAddress(this.itemData)}>
                            <Image style={{alignSelf: 'center', width: 16, height: 16}}
                                   source={require('../../../Resource/Imags/edit_address_list2x.png')}/>
                            <Text style={{marginLeft: 2, alignSelf: 'center', fontSize: 12}}>修改</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flexDirection: 'row',marginLeft: 20, alignSelf: 'center'}}
                            onPress={() => this.delAddress(this.itemData)}>
                            <Image style={{marginLeft: 8, alignSelf: 'center', width: 16, height: 16}}
                                   source={require('../../../Resource/Imags/del_address_list2x.png')}/>
                            <Text style={{marginLeft: 2, alignSelf: 'center', fontSize: 12}}>删除</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <LoadingModal txtTitle={this.state.showModalTitle} visible={this.state.showModal}/>
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

