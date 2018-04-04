/**
 * Created by yanqizhi on 2017/11/20.
 * 地址管理
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Platform,
    TextInput,
    Keyboard,
    DeviceEventEmitter
} from 'react-native';

import GlobalStyles from '../../../Common/GlobalStyles'
import ViewUtil from '../../../Common/viewUtil'
import Px2dp from '../../../Common/px2dp'
import Picker from 'react-native-picker';
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import LoadingModal from '../../../Component/LoadingModal'
import SubmitBtn from '../../../Component/SubmitBtn'
import NavigationBar from '../../../Component/NavigationBar'
export default class ProfileAddressAdd extends Component {

    //返回
    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };



    render() {
        let itemRightArrow = <Image source={require('../../../Resource/Imags/address-select-xila.png')}
                                    style={styles.imgRight}/>;
        return (
            <View style={[styles.container, this.state.keyboardShown && styles.bumpedContainer]}>

                <NavigationBar
                    statusBar={{backgroundColor:'rgb(255,208,96)'}}
                    style={{backgroundColor: 'rgb(255,208,96)'}}
                    leftButton={ViewUtil.getLeftButton(()=>this.navigatePressLeft())}
                    title={'添加地址'}/>

                <View style={styles.row}>
                    <View style={styles.rowLabel}>
                        <Text style={styles.fontLabel}>姓   名</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <TextInput style={[styles.TextInputStyle, styles.fontText]} maxLength={10}
                                   underlineColorAndroid='rgb(255,255,255)'
                                   placeholderTextColor='rgb(196,196,196)'
                                   placeholder='请输入'
                                   onFocus={() => {
                                       Picker.hide()
                                   }}
                                   onChangeText={(text) => {
                                       this.state.name = text
                                   }}
                        >{this.state.name}</TextInput>
                    </View>
                </View>
                <View style={styles.line}/>

                <View style={styles.row}>
                    <View style={styles.rowLabel}>
                        <Text style={styles.fontLabel}>电   话</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <TextInput style={[styles.TextInputStyle, styles.fontText]} maxLength={10}
                                   underlineColorAndroid='rgb(255,255,255)'
                                   placeholderTextColor='rgb(196,196,196)'
                                   placeholder='请输入'
                                   onFocus={() => {
                                       Picker.hide()
                                   }}
                                   onChangeText={(text) => {
                                       this.state.phone = text
                                   }}
                        >{this.state.phone}</TextInput>
                    </View>
                </View>
                <View style={styles.line}/>

                <TouchableOpacity onPress={this.onChangeProvince.bind(this)}>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>省   市</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text
                                style={styles.fontText}>{this.state.province_name != null ? this.state.province_name : '请选择'}</Text>
                            {itemRightArrow}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.line}/>

                <TouchableOpacity onPress={this.onChangeCityName.bind(this)}>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>市   区</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <Text
                                style={styles.fontText}>{this.state.city_name != null ? this.state.city_name : '请选择'}</Text>
                            {itemRightArrow}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.line}/>

                <View style={styles.row1}>
                    <View style={styles.rowLabel}>
                        <Text style={styles.fontLabel}>地   址</Text>
                    </View>
                    <View style={styles.rowContent}>
                        <TextInput style={[styles.TextInputStyle, styles.fontText1]} maxLength={100}
                                   underlineColorAndroid='rgb(255,255,255)'
                                   placeholderTextColor='rgb(196,196,196)'
                                   placeholder='请输入'
                                   multiline={true}
                                   onFocus={() => {
                                       Picker.hide()
                                   }}
                                   onChangeText={(text) => {
                                       this.state.address = text
                                   }}
                        >{this.state.address}</TextInput>
                    </View>
                </View>

                <View style={{flexDirection: 'row',height:Px2dp.getHeight(80),
                    backgroundColor: 'rgb(255,255,255)',marginTop:Px2dp.getHeight(10)}}>
                    <TouchableOpacity
                        style={{marginLeft: 20, alignSelf: 'center'}}
                        onPress={() => this.selectPress(this.state.isSelect)}>
                        <Image source={this.state.isSelect ?
                            require('../../../Resource/Imags/address-selected.png')
                            : require('../../../Resource/Imags/login_radio_normall.png')}/>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 10, alignSelf: 'center', fontSize: 12,color: 'rgb(51,51,51)'}}>设置为默认地址</Text>
                </View>
                <View style={{marginTop: Px2dp.getHeight(76), alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.saveAddress()}>
                        <View style={styles.ButtonStyle}>
                            <Text style={[styles.fontLabel]}>保存并使用</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <LoadingModal txtTitle={this.state.showModalTitle} visible={this.state.showModal}/>
            </View>
        );
    }
    //保存
    saveAddress = () => {
        this.setState({
            showModalTitle: '正在保存',
            showModal: true
        });
        let params = {};

        params.mobilePhone = this.state.phone;
        params.personName = this.state.name;
        params.provinceName = this.state.province_name;
        params.cityName = this.state.city_name;
        params.address = this.state.address;
        params.provinceCode = this.state.province_code;
        params.isDefault = this.state.isSelect ? '1':'0';
        params.memberCode = "5eebe460bf2b458fb7a0a2101768599b";//会员code，先写死，后期更改

        let url = FLAG_STORAGE.serverUrl + "/personaldata/momemberaddresslist/save";

        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                this.setState({
                    showModal: false
                });
                if (response.status === 'success') {
                    this.dataRepository.saveLocalRepository('personInfo', params)
                        .then(result => {
                            if (result) {
                                DeviceEventEmitter.emit('toastInfo', '保存成功', 'success');
                                this.props.navigation.navigate('address', {})
                            }
                        })
                        .catch(error => {
                            DeviceEventEmitter.emit('toastInfo', '保存失败', 'fail');
                        })
                } else {
                    DeviceEventEmitter.emit('toastInfo', response.msg, 'fail');
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });
                DeviceEventEmitter.emit('toastInfo', response.msg, 'fail');
            })
            .done();
    };
    //选中默认地址
    selectPress(isSelect){
        this.setState({isSelect: !isSelect})
    }
    //强制隐藏键盘
    onDismissKeyBoard() {
        Keyboard.dismiss();
    }
    constructor(props) {
        super(props);
        this.onDismissKeyBoard = this.onDismissKeyBoard.bind(this);
        this.reproductiveModeMap = new Map([
        ]);
        this.state = {
            name: null,
            phone: null,
            province_name: null,
            city_name: null,
            address: null,
            isSelect : true,
            ProvinceData: null,
            province_code:null,
            showModal: false,
            showModalTitle: '正在加载',
        };
        this.dataRepository = new DataRepository();
    }
    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressLeft: this.navigatePressLeft,
            navigatePressRight: this.navigatePressRight
        });
        this.fechProvinceData();
        // this.loadData();
    }
    fechProvinceData(){
        let url = FLAG_STORAGE.serverUrl + "/common/getDictZoneListByParentCodeForApp";
        let params = {parentCode: '000000000',isEnable:'1'};
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                if (response.status === 'success') {
                    console.log(response);
                    this.state.ProvinceData = response.data;
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
    onChangeProvince = () => {
        this.onDismissKeyBoard();
         //alert(JSON.stringify(this.state.ProvinceData));
        let data = [];
        console.log(this.state.ProvinceData);
        if(this.state.ProvinceData==null||this.state.ProvinceData.length<=0){
            DeviceEventEmitter.emit('toastInfo', '网络请求失败', 'fail');
            return;
        }
        for(let i=0;i<this.state.ProvinceData.length;i++){
            //data.push(this.state.ProvinceData[i].province);
            this.reproductiveModeMap.set(this.state.ProvinceData[i].code,this.state.ProvinceData[i].province)
        }
        data = [...this.reproductiveModeMap.values()];
        // data.push({name:'北京市',code:'21000000'});
        // data.push({name:'辽宁省',code:'21000000'});

        Picker.init({
            pickerData: data,
            selectedValue: [this.state.province_name != null ? this.state.province_name : 170],
            pickerTitleText: '选择省份',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.setState({province_name: data[0]});
                let tempKey;
                this.reproductiveModeMap.forEach(function (value, key) {
                    if (value === data[0]) {
                        tempKey = key;
                    }
                });
                this.state.province_code = tempKey;
            },
        });
        Picker.show();
    };
    //选择城市
    onChangeCityName = () => {
        this.onDismissKeyBoard();

        if(this.state.province_code!=null){
            let code = this.state.province_code;
            this.fechCityData(code);
        }else{
            DeviceEventEmitter.emit('toastInfo', '请选择省份', 'fail');
            
        }


    };
    fechCityData(code){
        let data = [];
        let url = FLAG_STORAGE.serverUrl + "/common/getDictZoneListByParentCodeForApp";
        let params = {parentCode: code,isEnable:'1'};
        this.dataRepository.postJsonRepository(url, params)
            .then((response) => {
                if (response.status === 'success') {
                    console.log(response);
                    //this.state.ProvinceData = response.data;
                    if(response.data==null||response.data.length<=0){
                        DeviceEventEmitter.emit('toastInfo', '网络请求失败', 'fail');
                        return;
                    }
                    for(let i=0;i<response.data.length;i++){
                        data.push(response.data[i].city);
                        // this.reproductiveModeMap.set(this.state.ProvinceData[i].code,this.state.ProvinceData[i].province)
                    }
                    Picker.init({
                        pickerData: data,
                        selectedValue: [this.state.city_name != null ? this.state.city_name : 170],
                        pickerTitleText: '选择市区',
                        pickerConfirmBtnText: '确认',
                        pickerCancelBtnText: '取消',
                        onPickerConfirm: data => {
                            this.setState({city_name: data[0]})
                        },
                    });
                    Picker.show();



                } else {
                    DeviceEventEmitter.emit('toastInfo', response.msg, 'fail');
                }
            })
            .catch(error => {
                this.setState({
                    showModal: false
                });
                DeviceEventEmitter.emit('toastInfo',error.status, 'fail');
            })
            .done();
    }

}

const styles = StyleSheet.create({

    headerBarStyle:{
        backgroundColor: 'rgb(255,208,96)',height:Px2dp.getHeight(148),paddingTop:Px2dp.getHeight(54)
    },
    row1: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(122),
        borderWidth: 0,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(92),
        borderWidth: 0,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 1,
        backgroundColor: 'rgb(244,244,244)',
        marginLeft: Px2dp.getWidth(30)
    },
    TextInputStyle: {
        marginRight: Px2dp.getWidth(82),
        width: 200,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        textAlign: 'left',
        textAlignVertical: 'top'
    },
    fontText1: {
        height:122,
        width: 230,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(196,196,196)',
    },
    fontText: {
        width: 230,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(196,196,196)',
    },
    rowLabel: {
        width: 60,
        marginLeft: Px2dp.getWidth(42)
    },
    fontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(51,51,51)'
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
    }
    ,
    ButtonStyle: {
        height: Px2dp.getHeight(80),
        width: Px2dp.getWidth(650),
        alignItems: 'center',
        borderRadius: Px2dp.getHeight(6),
        backgroundColor: 'rgb(255,208,96)',
        justifyContent: 'center'
    }
    ,imgRight: {
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(14),
        width: Px2dp.getWidth(28),
        tintColor: 'rgb(196,196,196)'
    }
});

