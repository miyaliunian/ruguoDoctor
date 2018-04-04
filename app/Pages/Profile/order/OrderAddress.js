/**
 * Created by wufei on 2017/11/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';
import {observer} from 'mobx-react/native';
import {action, autorun} from 'mobx';

import Px2dp from '../../../Common/px2dp'
import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import SubmitBtn from '../../../Component/SubmitBtn'
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import LoadingModal from '../../../Component/LoadingModal'
import NavigationBar from '../../../Component/NavigationBar'
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
let jsonData = require('../address/address.json');

export default class OrderAddress extends Component {
    fechAddressListData(){
        this.setState({
            showModal: true
        });
        let url = FLAG_STORAGE.serverUrl + "/personaldata/momemberaddresslist/findAllList";
        let params = {memberCode: '5eebe460bf2b458fb7a0a2101768599b'};
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    console.log(response);
                    this.setState({
                        flagData : true
                    });
                    jsonData = response.data;
                    this.data.replace(jsonData);

                } else {
                    DeviceEventEmitter.emit('toastInfo', response.msg, 'fail');
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });
                DeviceEventEmitter.emit('toastInfo', error.status, 'fail');
            })
            .done();
    }
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            showModal: false,
            flagData : true,
            addressDataList:[{id:'1',personName:"黄男",isDefault:'1',isSelect : true,mobilePhone:"13523562356",
                provinceName:'辽宁省',cityName:'沈阳市',address:'东洲区龙凤街53街道2委67组2-20',},
                {id:'2',personName:"황림",isDefault:'0',isSelect : false,mobilePhone:"13523562356",
                    provinceName:'辽宁省',cityName:'大连市',address:'东洲区龙凤街53街道2委67组2-20',},
                {id:'3',personName:"黄博士",isDefault:'0',isSelect : false,mobilePhone:"13523562356",
                    provinceName:'辽宁省',cityName:'抚顺市',address:'东洲区龙凤街53街道2委67组2-20',}],

        }
    };
    //刷新执行
    componentWillMount(){
        var addressId = this.props.navigation.state.params.addressId;
        var addressDataList = this.state.addressDataList;
        var newList = [];
        for (let i = 0; i < addressDataList.length; i++) {
            let data = addressDataList[i];
            if(data.id==addressId){
                data.isSelect = true
            }else{
                data.isSelect = false
            }
            newList.push(data);
        }
        this.setState({addressDataList:newList});
        // this.fechAddressListData();
    }

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };
    renderItem = (item) => {
        return (
            <View/>
        )
    };
    //选中地址
    isaddress(id,personName,mobilePhone,provinceName,cityName,address){
        var addressDataList = this.state.addressDataList;
        var newList = [];
        for (let i = 0; i < addressDataList.length; i++) {
            let data = addressDataList[i];
            if(data.id==id){
                data.isSelect = true
            }else{
                data.isSelect = false
            }
            newList.push(data);
        }
        this.setState({addressDataList:newList});

        const {state, goBack} = this.props.navigation;
        state.params.callBack({id: id,personName:personName,mobilePhone:mobilePhone,address:address,provinceName:provinceName,cityName:cityName});
        goBack();
    }
    //填充地址list
    renderAddressDataItem(){
        let newItemList = [];
        var addressDataList = this.state.addressDataList;
        if(addressDataList!=''){
            for (let i = 0; i < addressDataList.length; i++) {
                let data = addressDataList[i];
                newItemList.push(
                    <View key={i}>
                        <TouchableOpacity onPress={() => this.isaddress(data.id,data.personName,data.mobilePhone,data.provinceName,data.cityName,data.address)}>
                        <View style={{backgroundColor: "white", marginTop: 10, paddingRight: 15}}>
                            <View style={{flexDirection: 'row', marginTop: 8}}>
                                {this.isSelectRight(data.isSelect)}
                                {this.isSelectAddress(data.isSelect,data.personName)}
                                {this.isSelectPhone(data.isSelect,data.mobilePhone)}

                            </View>
                            <View style={{flexDirection: 'row', marginTop: 8,}}>
                                <Text style={{marginLeft: 20, fontSize: 12}}>{data.provinceName}{data.cityName}{data.address}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                marginBottom: 8,
                                justifyContent: 'space-between'
                            }}>
                                <View style={{flexDirection: 'row'}}>
                                    {this.isDefaultAddress(data.isDefault)}
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        style={{flexDirection: 'row',marginLeft: 20, alignSelf: 'center'}}
                                        onPress={() => this.updateAddress(data)}>
                                        <Image style={{alignSelf: 'center', width: 16, height: 16}}
                                               source={require('../../../Resource/Imags/edit_address_list2x.png')}/>
                                        <Text style={{marginLeft: 2, alignSelf: 'center', fontSize: 12}}>修改</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        return newItemList;
    }
    //显示选中地址的状态√
    isSelectRight(isSelect){
        if(isSelect){
            return (
                <Text style={{alignSelf: 'center',marginLeft: 20,color:'red',fontSize: 14}}>
                    √
                </Text>
            )
        }else {
            return (
                <Text>
                </Text>
            )
        }
    }
    //显示选中地址的电话
    isSelectPhone(isSelect,mobilePhone){
        if(isSelect){
            return (
                <Text style={{alignSelf: 'center',color:'red',fontSize: 14}}>
                    {mobilePhone}
                </Text>
            )
        }else {
            return (
                <Text style={{alignSelf: 'center',color:'#333333', fontSize: 14}}>
                    {mobilePhone}
                </Text>
            )
        }
    }
    //显示选中地址的姓名
    isSelectAddress(isSelect,personName){
        if(isSelect){
            return (
                <View>
                    <Text style={{
                        marginLeft: 10,
                        fontSize: 16, width: 60,
                        alignSelf: 'center',color:'red'}}>
                        {personName}
                    </Text>
                </View>
            )
        }else {
            return (
                <View>
                    <Text style={{
                        marginLeft: 20,
                        fontSize: 16, width: 60,
                        alignSelf: 'center',color:'#333333'}}>
                        {personName}
                    </Text>
                </View>
            )
        }
    }
    //显示默认地址
    isDefaultAddress(isDefault){
        if(isDefault=='1'){
            return (
                <View style={styles.ButtonStyle2}>
                    <Text style={[styles.fontLabel1]}>默认</Text>
                </View>
            )
        }else {
            return (
                <View></View>
            )
        }
    }

    render() {
        if(this.state.flagData){
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                }}>
                    <NavigationBar
                        statusBar={{backgroundColor:'rgb(255,208,96)'}}
                        style={{backgroundColor: 'rgb(255,208,96)'}}
                        leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                        title={'选择地址'}/>

                    {this.renderAddressDataItem()}

                    <SubmitBtn  onSubmit={() => this.formSubmit()} styles={{backgroundColor: 'rgb(255,208,96)',marginBottom:5,marginTop:15}}
                                txtTitle='添加地址'/>

                    <LoadingModal txtTitle='正在加载' visible={this.state.showModal}/>
                </View>
            );
        }else{
            return (
                <View style={GlobalStyles.root_container}>

                    <NavigationBar
                        statusBar={{backgroundColor:'rgb(255,208,96)'}}
                        style={{backgroundColor: 'rgb(255,208,96)'}}
                        leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                        title={'地址管理'}/>

                    <View style={{alignItems:"center",marginTop:Px2dp.getHeight(150)}}>
                        <Image source={require('../../../Resource/Imags/ic_shopping_card_bg.png')} resizeMethod='scale'/>
                        <Text style={{color:'rgb(196,196,196)',fontSize:13,marginTop:Px2dp.getHeight(20),marginBottom:Px2dp.getHeight(48)}}>地址为空</Text>
                        <TouchableOpacity onPress={() => this.formSubmit(this.itemData)}>
                            <View style={{backgroundColor:'rgb(255,208,96)',width:Px2dp.getWidth(180),height:Px2dp.getHeight(60),borderRadius:3,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:14}}>去添加</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <LoadingModal txtTitle='正在加载' visible={this.state.showModal}/>
                </View>
            );
        }



    }
    //修改地址
    updateAddress = (obj) => {
        // alert(JSON.stringify(obj));
        this.props.navigation.navigate('addressEdit', {...obj});
    };
    formSubmit(){
        this.props.navigation.navigate('addressAdd', {...this.props})
    }
    selectPress(obj) {

        let newData = [];

        for(var i=0;i<this.data.itemData.datas.length;i++){

            if(obj.id==this.data.itemData.datas[i].id){
                this.data.itemData.datas[i].isSelect = true;
            }else{
                this.data.itemData.datas[i].isSelect = false;
            }
        }
        newData = this.data.itemData.datas;
        this.setState({data: newData});

    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C6E2FF',
    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    },
    btn: {
        width: '100%',
        height: Px2dp.getHeight(80),
        backgroundColor: 'rgb(255,208,96)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btnText: {
        fontSize: 14
    },
    ButtonStyle2: {
        height: Px2dp.getHeight(45),
        width: Px2dp.getWidth(70),
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'red',
        borderRadius: Px2dp.getHeight(8),
        marginLeft:Px2dp.getWidth(40),
    },
    fontLabel1: {
        fontSize: Px2dp.getHeight(26),
        color:'red'
    },
});

