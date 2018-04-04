import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import GlobalStyles from '../../../Common/GlobalStyles';
import Px2dp from '../../../Common/px2dp';
import ViewUtil from '../../../Common/viewUtil';
import Picker from 'react-native-picker';
import DataRepository, {FLAG_STORAGE} from '../../../Expand/Dao/DataRepository'
import SubmitBtn from '../../../Component/SubmitBtn'
import {MoreMenu} from '../../../Common/MoreMenu';
import NavigationBar from '../../../Component/NavigationBar'
import screenUtil from "../../../Common/screenUtil";

export default class AddServiceObject extends Component {
    constructor(props) {
        super(props);
        this.genderMap = new Map([
            ['1', '男'],
            ['2', '女'],
        ]);
this.emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        this.dataRepository = new DataRepository();
        // this.keyboardDidShowListener = null;
        this.keyboardDidHideListener = null;
        this.state = {
            name: null,
            genderName: null,
            genderCode: null,
            birthday: null,
            memberLevelCode: null,
            certificateNo: null,
            email: null,
            mobilePhone: null,
            remarks: null,
            totalAreaLength:200,
            haveWrittenLength:0
        }
    }
    //转换身份证号，星号显示
    setCertificateNo = (certificateNo) => {
        return (certificateNo != null) ? (certificateNo).replace(/^(.{3})(?:\d+)(.{4})$/, "$1***********$2") : '';
    };

    navigatePressLeft = () => {
        this.props.navigation.goBack();
    };
    onChangeGender = () => {
       // this.onDismissKeyBoard();
        // let data = ['男', '女'];
        let data = [...this.genderMap.values()];
        Picker.init({
            pickerData: data,
            selectedValue: ['男'],
            pickerTitleText: '选择性别',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: data => {
                this.setState({genderName: data[0]});
                let tempKey;
                this.genderMap.forEach(function (value, key) {
                    if (value === data[0]) {
                        tempKey = key;
                    }
                });
                this.state.genderCode = tempKey;
            },
            onPickerCancel: data => {
            },
            onPickerSelect: data => {
            }
        });
        Picker.show();
    };
    IdentityCodeValid=(code)=> {
        let city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        let tip = "";
        let pass = true;
        if (!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }

        else if (!city[code.substr(0, 2)]) {
            tip = "地址编码错误";
            pass = false;
        }
        else {
            //18位身份证需要验证最后一位校验位
            if (code.length === 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                let last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    tip = "校验位错误";
                    pass = false;
                }
            }
        }
        if (!pass) {
            DeviceEventEmitter.emit('toastInfo', tip, 'stop');
        }
        return pass;
    };
    onChangeCertificateNo = () => {

    };
    onChangeMobilePhone = () => {

    };
    componentWillUnmount() {
        Picker.hide();
    }
    _createDateData() {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                       // day.push(k+'日');
                        day.push(k);
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        //day.push(29+'日');
                        day.push(29);
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        //day.push(k+'日');
                        day.push(k);
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        //day.push(k+'日');
                        day.push(k);
                    }
                }
                let _month = {};
               // _month[j+'月'] = day;
                _month[j] = day;
                month.push(_month);
            }
            let _date = {};
            //_date[i+'年'] = month;
            _date[i] = month;
            date.push(_date);
        }
        return date;
    }
    _showDatePicker() {
        Picker.init({
            pickerData: this._createDateData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerTitleText: '选择出生日期',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: (pickedValue, pickedIndex) => {
                //console.log('date', pickedValue, pickedIndex);
                this.setState({
                    birthday:pickedValue[0]+"-"+pickedValue[1]+"-"+pickedValue[2]
                });
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        });
        Picker.show();
    }
    saveServiceObjectInfo(){
        if(this.state.name==null||this.state.name==''){
            DeviceEventEmitter.emit('toastInfo', '姓名不能为空', 'fail');
        }else if(this.state.genderCode==null||this.state.genderCode==''){
            DeviceEventEmitter.emit('toastInfo', '性别不能为空', 'fail');
        }else if(this.state.birthday==null||this.state.birthday==''){
            DeviceEventEmitter.emit('toastInfo', '出生日期不能为空', 'fail');
        }else if(this.state.certificateNo==null||this.state.certificateNo==''){
            DeviceEventEmitter.emit('toastInfo', '身份证不能为空', 'fail');
        }else if(!this.IdentityCodeValid(this.state.certificateNo)){
            
        }else if(this.state.email==null||this.state.email==''){
            DeviceEventEmitter.emit('toastInfo', '电子邮箱不能为空', 'fail');
        }else if(this.emailReg.test(this.state.email)){
            DeviceEventEmitter.emit('toastInfo', '电子邮箱格式不正确', 'fail');
        } else if(this.state.mobilePhone==null||this.state.mobilePhone==''){
            DeviceEventEmitter.emit('toastInfo', '手机号码不能为空', 'fail');
        }else if(!this.state.mobilePhone.match(/^1[3|4|5|7|8][0-9]{9}$/)){
            DeviceEventEmitter.emit('toastInfo', '手机号码不正确', 'fail');
        }
    }
    render() {

       // let title = this.props.navigation.state.params.title;
        let title = '新增服务对象';
        let itemRightArrow = <Image source={require('../../../Resource/Imags/icon_arrow_black.png')}
                                    style={styles.imgRight}/>;
        return (
            <View style={[styles.container]}>
                <NavigationBar
                    statusBar={GlobalStyles.navigationBarColor_yellow}
                    style={GlobalStyles.navigationBarColor_yellow}
                    leftButton={ViewUtil.getLeftButton(() => this.navigatePressLeft())}
                    title={title}/>

                <ScrollView style={{flex: 1}}>

                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>姓名</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <TextInput style={[styles.TextInputStyle, styles.fontText,{width:Px2dp.getWidth(300),textAlign: 'right',}]} maxLength={10}
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
                    <TouchableOpacity onPress={this.onChangeGender.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>性别</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.state.genderName}{this.state.genderName != null ? '' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <TouchableOpacity onPress={this._showDatePicker.bind(this)}>
                        <View style={styles.row}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>出生日期</Text>
                            </View>
                            <View style={styles.rowContent}>
                                <Text
                                    style={styles.fontText}>{this.state.birthday}{this.state.birthday != null ? '' : '请选择'}</Text>
                                {itemRightArrow}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line}/>

                    <View style={[styles.row]}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>身份证号</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <TextInput style={[styles.TextInputStyle, styles.fontText,{width:Px2dp.getWidth(400),textAlign: 'right',}]}
                                       ref='emailTextInput'
                                       maxLength={30}
                                       underlineColorAndroid='rgb(255,255,255)'
                                       placeholderTextColor='rgb(196,196,196)'
                                       placeholder={'请输入'}
                                       keyboard='numeric'
                                       onFocus={() => {
                                           Picker.hide()
                                       }}
                                       onChangeText={(text) => {
                                           this.state.certificateNo = text
                                       }}
                                // value={this.state.email}
                            >{this.state.email}</TextInput>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={[styles.row]}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>电子邮箱</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <TextInput style={[styles.TextInputStyle, styles.fontText,{width:Px2dp.getWidth(300),textAlign: 'right',}]}
                                       ref='emailTextInput'
                                       maxLength={30}
                                       underlineColorAndroid='rgb(255,255,255)'
                                       placeholderTextColor='rgb(196,196,196)'
                                       placeholder={'请输入'}
                                       keyboard='numeric'
                                       onFocus={() => {
                                           Picker.hide()
                                       }}
                                       onChangeText={(text) => {
                                           this.state.email = text
                                       }}
                                // value={this.state.email}
                            >{this.state.email}</TextInput>
                        </View>
                    </View>
                    <View style={styles.line}/>

                    <View style={[styles.row]}>
                        <View style={styles.rowLabel}>
                            <Text style={styles.fontLabel}>手机号</Text>
                        </View>
                        <View style={styles.rowContent}>
                            <TextInput style={[styles.TextInputStyle, styles.fontText,{width:Px2dp.getWidth(300),textAlign: 'right',}]}
                                       ref='emailTextInput'
                                       maxLength={11}
                                       underlineColorAndroid='rgb(255,255,255)'
                                       placeholderTextColor='rgb(196,196,196)'
                                       placeholder={'请输入'}
                                       keyboard='numeric'
                                       onFocus={() => {
                                           Picker.hide()
                                       }}
                                       onChangeText={(text) => {
                                               this.state.mobilePhone = text
                                       }}
                                // value={this.state.email}
                            >{this.state.mobilePhone}</TextInput>
                        </View>
                    </View>
                    <View style={styles.line}/>
                    <View style={{}}>
                        <View style={[styles.row, {marginTop: Px2dp.getHeight(10)}]}>
                            <View style={styles.rowLabel}>
                                <Text style={styles.fontLabel}>备注</Text>
                            </View>
                        </View>
                        <View style={[styles.row,{height:Px2dp.getHeight(350),padding:Px2dp.getWidth(18)}]}>
                            <TextInput style={{
                                width:screenUtil.screenSize.width-Px2dp.getWidth(36),
                                height: Px2dp.getHeight(300),
                                borderWidth: 1,
                                borderColor: 'rgba(190,190,190,0.5)',
                                color: '#333',
                                textAlignVertical: 'top'
                            }}
                                       ref="textInput"
                                       underlineColorAndroid='rgb(255,255,255)'
                                       placeholderTextColor='rgb(196,196,196)'
                                       multiline={true}
                                       returnKeyType='done'
                                       maxLength={200}
                                       onChangeText={(text) => {
                                           this.setState({
                                               haveWrittenLength:text.length,
                                           });
                                       }}
                                       onFocus={()=>{
                                            Picker.hide();
                                       }}
                            />
                            <View style={styles.pageNumStyle}>
                                <Text>{this.state.haveWrittenLength}/{this.state.totalAreaLength}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        marginTop: Px2dp.getHeight(76),
                        marginBottom: Px2dp.getHeight(76),
                        alignItems: 'center'
                    }}>
                        <SubmitBtn onSubmit={() => this.saveServiceObjectInfo()} styles={{
                            backgroundColor: 'rgb(255,208,96)',
                            height: Px2dp.getHeight(80),
                            width: Px2dp.getWidth(650)
                        }}
                                   titleStyle={{color: 'rgb(51,51,51)'}} txtTitle='保存'/>

                        {/*<TouchableOpacity onPress={() => this.savePersonInfo()}>*/}
                        {/*<View style={styles.ButtonStyle}>*/}
                        {/*<Text style={[styles.fontLabel]}>保存</Text>*/}
                        {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(244,244,244)',
    },
    bumpedContainer: {
        marginTop: -210,
        // marginBottom: 210
    },
    row: {
        backgroundColor: 'rgb(255,255,255)',
        height: Px2dp.getHeight(92),
        borderWidth: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowLabel: {
        width: 100,
        marginLeft: Px2dp.getWidth(30)
    },
    rowContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        height: 1,
        backgroundColor: 'rgb(244,244,244)',
        marginLeft: Px2dp.getWidth(30)
    },
    // line_space: {
    //     height: 5,
    //     // opacity:0.5,
    //     backgroundColor: 'rgb(244,244,244)'
    // }
    fontLabel: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(51,51,51)'
    },
    fontText: {
        fontSize: Px2dp.getHeight(28),
        color: 'rgb(196,196,196)',

    },
    imgRight: {
        marginLeft: Px2dp.getWidth(30),
        marginRight: Px2dp.getWidth(30),
        height: Px2dp.getHeight(30),
        width: Px2dp.getWidth(30),
        tintColor: 'rgb(196,196,196)'
    },
    AvatarStyle: {
        height: Px2dp.getHeight(58),
        width: Px2dp.getWidth(58),
        borderRadius: Px2dp.getHeight(29)
    },
    TextInputStyle: {
        marginRight: Px2dp.getWidth(40),
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        textAlign: 'center',
        width:Px2dp.getWidth(100),
    },
    areaContent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:0.5,
        borderColor:'#999999',

    },
    areaTextInputStyle: {
        textAlign: 'right',
        width:Px2dp.getWidth(345),
        backgroundColor:'red'
    },
    pageNumStyle:{
        position:'absolute',
        alignItems:'center',
        justifyContent: 'center',
        right:Px2dp.getWidth(50),
        top:Px2dp.getHeight(250),
        opacity:0.8
    },
});